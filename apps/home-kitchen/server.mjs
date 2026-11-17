import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import {
  randomBytes,
  randomUUID,
  scrypt as scryptCallback,
  timingSafeEqual,
  createHash,
} from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, readFileSync, writeFileSync, chmodSync, existsSync } from 'node:fs';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { samples } from './seed.mjs';
import qrcode from 'qrcode-generator';
import { networkInterfaces } from 'node:os';

process.umask(0o077);
const scrypt = promisify(scryptCallback);
const root = dirname(fileURLToPath(import.meta.url));
const hash = (value) => createHash('sha256').update(value).digest('hex');
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const assert = (condition, message, status = 400) => {
  if (!condition) throw new HttpError(status, message);
};
const text = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const number = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
const dateOK = (value) =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
export function shoppingItems(meal) {
  const items = new Map();
  for (const entry of meal.finalPlan || []) {
    for (const ing of entry.recipe.ingredients) {
      const key = hash(`${ing.name.trim().toLowerCase()}|${ing.unit}`).slice(0, 24);
      const existing = items.get(key) || {
        key,
        name: ing.name,
        unit: ing.unit,
        quantity: ing.quantity === null ? null : 0,
        recipes: [],
      };
      if (existing.quantity !== null && ing.quantity !== null)
        existing.quantity =
          Math.round((existing.quantity + ing.quantity * entry.multiplier) * 1000) / 1000;
      else existing.quantity = null;
      if (!existing.recipes.includes(entry.recipe.name)) existing.recipes.push(entry.recipe.name);
      items.set(key, existing);
    }
  }
  return [...items.values()];
}

export function createKitchen({
  dataDir = process.env.DATA_DIR || join(root, '.data'),
  secureCookies = process.env.SECURE_COOKIES === '1',
} = {}) {
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  const dbPath = join(dataDir, 'kitchen.sqlite');
  const db = new DatabaseSync(dbPath);
  chmodSync(dbPath, 0o600);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, nickname TEXT NOT NULL, role TEXT NOT NULL, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id), expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS recipes (id TEXT PRIMARY KEY, data TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS meals (id TEXT PRIMARY KEY, data TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS orders (meal_id TEXT REFERENCES meals(id), user_id TEXT REFERENCES users(id), data TEXT NOT NULL, PRIMARY KEY(meal_id,user_id));
    CREATE TABLE IF NOT EXISTS shopping (meal_id TEXT REFERENCES meals(id), item_key TEXT, status TEXT NOT NULL, PRIMARY KEY(meal_id,item_key));
    CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data BLOB NOT NULL);`);
  const attempts = new Map();
  const getRecipe = (id) => {
    const row = db.prepare('SELECT data FROM recipes WHERE id=? AND deleted=0').get(id);
    return row ? JSON.parse(row.data) : null;
  };
  const getMeal = (id) => {
    const row = db.prepare('SELECT data FROM meals WHERE id=?').get(id);
    assert(row, '找不到这一餐', 404);
    return JSON.parse(row.data);
  };
  const saveMeal = (meal) =>
    db
      .prepare(
        'INSERT INTO meals(id,data) VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',
      )
      .run(meal.id, JSON.stringify(meal));
  const publicUsers = () =>
    db.prepare('SELECT id,username,nickname,role FROM users ORDER BY role').all();
  const transaction = (fn) => {
    db.exec('BEGIN IMMEDIATE');
    try {
      const result = fn();
      db.exec('COMMIT');
      return result;
    } catch (e) {
      db.exec('ROLLBACK');
      throw e;
    }
  };
  async function passwordHash(password) {
    const salt = randomBytes(16).toString('hex');
    return `${salt}:${(await scrypt(password, salt, 64)).toString('hex')}`;
  }
  function account(input, role) {
    assert(input && typeof input === 'object', '请填写两个人的账号');
    const username = text(input.username, 32).toLowerCase(),
      nickname = text(input.nickname, 24),
      password = input.password;
    assert(/^[a-z0-9_-]{3,32}$/.test(username), '账号请用 3–32 位英文字母、数字、下划线或短横线');
    assert(
      nickname && typeof password === 'string' && password.length >= 8 && password.length <= 128,
      '请填写昵称，密码至少 8 位、最多 128 位',
    );
    return { id: randomUUID(), username, nickname, password, role };
  }
  function validateRecipe(input) {
    assert(input && typeof input === 'object', '菜谱格式不正确');
    const recipe = {
      name: text(input.name, 60),
      category: text(input.category, 24) || '家常菜',
      description: text(input.description, 160),
      servings: input.servings,
      minutes: input.minutes,
      notes: text(input.notes, 2000),
      image: input.image || null,
      art: ['tomato', 'beef', 'greens', 'shrimp'].includes(input.art) ? input.art : 'tomato',
      sample: false,
    };
    assert(
      recipe.name &&
        number(recipe.servings, 1, 30) &&
        Number.isInteger(recipe.servings) &&
        number(recipe.minutes, 1, 1440),
      '请填写菜名、1–30 人份和有效用时',
    );
    assert(
      Array.isArray(input.ingredients) &&
        input.ingredients.length > 0 &&
        input.ingredients.length <= 60,
      '请添加 1–60 种食材',
    );
    recipe.ingredients = input.ingredients.map((i) => {
      assert(i && typeof i === 'object', '食材格式不正确');
      const name = text(i.name, 60),
        unit = text(i.unit, 16) || '适量',
        quantity = i.quantity === null || i.quantity === '' ? null : i.quantity;
      assert(
        name && (quantity === null || number(quantity, 0.001, 100000)),
        '请检查食材名称和用量，适量可留空',
      );
      return { name, unit, quantity };
    });
    assert(Array.isArray(input.steps) && input.steps.length <= 50, '做法最多支持 50 步');
    recipe.steps = input.steps.map((s) => text(s, 2000)).filter(Boolean);
    assert(recipe.steps.length, '至少写一步做法');
    assert(
      recipe.image === null ||
        (typeof recipe.image === 'string' &&
          db.prepare('SELECT id FROM images WHERE id=?').get(recipe.image)),
      '图片无效，请重新上传',
    );
    return recipe;
  }
  const server = http.createServer(async (req, res) => {
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy':
        "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      'Cache-Control': 'no-store',
    };
    const send = (status, value, extra = {}) => {
      res.writeHead(status, {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
        ...extra,
      });
      res.end(JSON.stringify(value));
    };
    const session = (user) => {
      const token = randomBytes(32).toString('hex');
      db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
      db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(
        hash(token),
        user.id,
        Date.now() + 30 * 86400000,
      );
      return `kitchen_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000${secureCookies ? '; Secure' : ''}`;
    };
    try {
      const url = new URL(req.url, 'http://localhost'),
        path = url.pathname,
        method = req.method;
      assert(!['TRACE', 'CONNECT'].includes(method), '不支持的请求', 405);
      if (!path.startsWith('/api/')) {
        assert(method === 'GET' || method === 'HEAD', '不支持的请求', 405);
        const requested =
          path === '/' ? 'index.html' : decodeURIComponent(path).replace(/^\/+/, '');
        const file = resolve(root, 'public', requested);
        assert(
          file.startsWith(resolve(root, 'public') + '/') && existsSync(file),
          '页面不存在',
          404,
        );
        const types = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'text/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.svg': 'image/svg+xml',
          '.webmanifest': 'application/manifest+json',
        };
        assert(types[extname(file)], '页面不存在', 404);
        res.writeHead(200, { ...headers, 'Content-Type': types[extname(file)] });
        res.end(method === 'HEAD' ? undefined : readFileSync(file));
        return;
      }
      let body = {};
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        // Browser mutations must be same-origin; no permissive CORS or forwarded host trust.
        assert(
          !req.headers.origin ||
            req.headers.origin === `http://${req.headers.host}` ||
            req.headers.origin === `https://${req.headers.host}`,
          '请求来源不匹配，请刷新页面',
          403,
        );
        assert(
          !req.headers['sec-fetch-site'] ||
            ['same-origin', 'none'].includes(req.headers['sec-fetch-site']),
          '请求来源不匹配',
          403,
        );
        assert(
          (req.headers['content-type'] || '').startsWith('application/json'),
          '请使用 JSON 请求',
          415,
        );
        const chunks = [];
        let length = 0;
        for await (const chunk of req) {
          length += chunk.length;
          assert(length <= 4 * 1024 * 1024, '上传内容太大，请使用较小的图片', 413);
          chunks.push(chunk);
        }
        try {
          body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
        } catch {
          throw new HttpError(400, '请求内容格式不正确');
        }
        assert(body && typeof body === 'object' && !Array.isArray(body), '请求格式不正确');
      }
      const token = /(?:^|;\s*)kitchen_session=([a-f0-9]{64})(?:;|$)/.exec(
        req.headers.cookie || '',
      )?.[1];
      const user = token
        ? db
            .prepare(
              'SELECT u.id,u.username,u.nickname,u.role FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.token=? AND s.expires>?',
            )
            .get(hash(token), Date.now())
        : null;
      const setup = db.prepare('SELECT count(*) AS n FROM users').get().n === 0;
      if (path === '/api/session' && method === 'GET')
        return send(200, { setup, user: user || null });
      if (path === '/api/setup' && method === 'POST') {
        assert(setup, '这个厨房已经初始化，请登录', 409);
        const chef = account(body.chef, 'chef'),
          partner = account(body.partner, 'partner');
        assert(chef.username !== partner.username, '两个人请使用不同的账号');
        const [chefPassword, partnerPassword] = await Promise.all([
          passwordHash(chef.password),
          passwordHash(partner.password),
        ]);
        transaction(() => {
          assert(
            db.prepare('SELECT count(*) AS n FROM users').get().n === 0,
            '这个厨房已经初始化',
            409,
          );
          for (const [u, p] of [
            [chef, chefPassword],
            [partner, partnerPassword],
          ])
            db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').run(
              u.id,
              u.username,
              u.nickname,
              u.role,
              p,
            );
          if (body.samples === true)
            for (const recipe of samples)
              db.prepare('INSERT INTO recipes(id,data) VALUES(?,?)').run(
                recipe.id,
                JSON.stringify({ ...recipe, createdAt: new Date().toISOString() }),
              );
        });
        const { password, ...safe } = chef;
        return send(201, { user: safe }, { 'Set-Cookie': session(chef) });
      }
      if (path === '/api/login' && method === 'POST') {
        const key = req.socket.remoteAddress || 'local',
          now = Date.now(),
          limit = attempts.get(key);
        assert(
          !limit || limit.until < now || limit.count < 10,
          '尝试次数过多，请 15 分钟后再试',
          429,
        );
        if (attempts.size > 1000)
          for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
        const u = db
          .prepare('SELECT * FROM users WHERE username=?')
          .get(text(body.username, 32).toLowerCase());
        const [salt, expected] = (u?.password || `${'0'.repeat(32)}:${'0'.repeat(128)}`).split(':');
        const derived = await scrypt(
          typeof body.password === 'string' ? body.password.slice(0, 128) : '',
          salt,
          64,
        );
        if (!u || !timingSafeEqual(derived, Buffer.from(expected, 'hex'))) {
          attempts.set(key, {
            count: limit && limit.until > now ? limit.count + 1 : 1,
            until: now + 900000,
          });
          throw new HttpError(401, '账号或密码不正确');
        }
        attempts.delete(key);
        const { password, ...safe } = u;
        return send(200, { user: safe }, { 'Set-Cookie': session(u) });
      }
      assert(user, '请先登录', 401);
      if (path === '/api/share' && method === 'GET') {
        const addresses = Object.entries(networkInterfaces())
          .filter(([name]) => /^(en\d|eth\d|wlan\d)/.test(name))
          .flatMap(([, entries]) => entries)
          .filter(
            (a) =>
              a.family === 'IPv4' &&
              !a.internal &&
              /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(a.address),
          );
        const local =
          process.env.PUBLIC_URL ||
          (addresses[0]
            ? `http://${addresses[0].address}:${server.address().port}`
            : `http://${req.headers.host}`);
        const shareUrl = new URL(local);
        if (url.searchParams.has('meal')) {
          const meal = getMeal(url.searchParams.get('meal'));
          shareUrl.hash = `meals/${meal.id}`;
        }
        const qr = qrcode(0, 'M');
        qr.addData(shareUrl.href);
        qr.make();
        return send(200, {
          url: shareUrl.href,
          svg: qr.createSvgTag({ cellSize: 5, margin: 20, scalable: true }),
          local: !process.env.PUBLIC_URL,
        });
      }
      if (path === '/api/logout' && method === 'POST') {
        if (token) db.prepare('DELETE FROM sessions WHERE token=?').run(hash(token));
        return send(
          200,
          { ok: true },
          {
            'Set-Cookie': `kitchen_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secureCookies ? '; Secure' : ''}`,
          },
        );
      }
      if (path === '/api/state' && method === 'GET') {
        const recipes = db
          .prepare('SELECT data FROM recipes WHERE deleted=0 ORDER BY rowid DESC')
          .all()
          .map((r) => JSON.parse(r.data));
        const meals = db
          .prepare('SELECT data FROM meals ORDER BY rowid DESC')
          .all()
          .map((r) => JSON.parse(r.data));
        for (const meal of meals) {
          meal.orders = db
            .prepare('SELECT user_id,data FROM orders WHERE meal_id=?')
            .all(meal.id)
            .map((r) => ({ userId: r.user_id, ...JSON.parse(r.data) }));
          const statuses = Object.fromEntries(
            db
              .prepare('SELECT item_key,status FROM shopping WHERE meal_id=?')
              .all(meal.id)
              .map((r) => [r.item_key, r.status]),
          );
          meal.shopping = shoppingItems(meal).map((i) => ({
            ...i,
            status: statuses[i.key] || 'need',
          }));
        }
        return send(200, { user, users: publicUsers(), recipes, meals });
      }
      const imageMatch = path.match(/^\/api\/images\/([a-f0-9-]+)$/);
      if (imageMatch && method === 'GET') {
        const img = db.prepare('SELECT mime,data FROM images WHERE id=?').get(imageMatch[1]);
        assert(img, '图片不存在', 404);
        res.writeHead(200, {
          ...headers,
          'Content-Type': img.mime,
          'Cache-Control': 'private, max-age=3600',
        });
        res.end(Buffer.from(img.data));
        return;
      }
      if (path === '/api/images' && method === 'POST') {
        assert(user.role === 'chef', '只有掌勺的人可以修改菜谱', 403);
        assert(typeof body.data === 'string' && body.data.length < 3900000, '图片过大');
        const bytes = Buffer.from(body.data, 'base64');
        const mime =
          bytes.length >= 12 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
            ? 'image/jpeg'
            : bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
              ? 'image/png'
              : bytes.toString('ascii', 0, 4) === 'RIFF' &&
                  bytes.toString('ascii', 8, 12) === 'WEBP'
                ? 'image/webp'
                : null;
        assert(mime && bytes.length <= 2800000, '仅支持不超过 2.8MB 的 JPG、PNG、WebP 图片');
        const id = randomUUID();
        db.prepare('INSERT INTO images VALUES(?,?,?)').run(id, mime, bytes);
        return send(201, { id });
      }
      const mealMatch = path.match(
        /^\/api\/meals\/([^/]+)(?:\/(order|confirm|reopen|complete|shopping))?$/,
      );
      if (mealMatch) {
        const meal = getMeal(mealMatch[1]),
          action = mealMatch[2];
        if (action === 'order' && method === 'PUT') {
          assert(meal.status === 'planning', '这一餐已经确认，暂时不能更改点菜', 409);
          assert(Array.isArray(body.recipeIds) && body.recipeIds.length <= 100, '点菜格式不正确');
          const ids = [...new Set(body.recipeIds)];
          assert(
            ids.every((id) => meal.recipeIds.includes(id) && getRecipe(id)),
            '有菜品不在本餐菜单中，请刷新',
          );
          db.prepare(
            'INSERT INTO orders VALUES(?,?,?) ON CONFLICT(meal_id,user_id) DO UPDATE SET data=excluded.data',
          ).run(
            meal.id,
            user.id,
            JSON.stringify({
              recipeIds: ids,
              note: text(body.note, 500),
              updatedAt: new Date().toISOString(),
            }),
          );
          return send(200, { ok: true });
        }
        if (action === 'shopping' && method === 'PUT') {
          assert(['confirmed', 'completed'].includes(meal.status), '请先确认菜单', 409);
          assert(
            shoppingItems(meal).some((i) => i.key === body.key) &&
              ['need', 'have', 'bought'].includes(body.status),
            '采购项无效',
          );
          db.prepare(
            'INSERT INTO shopping VALUES(?,?,?) ON CONFLICT(meal_id,item_key) DO UPDATE SET status=excluded.status',
          ).run(meal.id, body.key, body.status);
          return send(200, { ok: true });
        }
        assert(user.role === 'chef', '只有掌勺的人可以确认或调整这一餐', 403);
        if (action === 'confirm' && method === 'POST') {
          assert(meal.status === 'planning', '当前状态不能确认菜单', 409);
          assert(
            Array.isArray(body.plan) && body.plan.length > 0 && body.plan.length <= 100,
            '请至少确认一道菜',
          );
          assert(
            body.plan.every((p) => p && typeof p === 'object'),
            '菜单格式不正确',
          );
          assert(
            new Set(body.plan.map((p) => p.recipeId)).size === body.plan.length,
            '菜单里有重复菜品',
          );
          meal.finalPlan = body.plan.map((p) => {
            const recipe = getRecipe(p.recipeId);
            assert(
              recipe &&
                meal.recipeIds.includes(p.recipeId) &&
                Number.isInteger(p.multiplier) &&
                number(p.multiplier, 1, 20),
              '请检查菜品和份数',
            );
            return { recipeId: p.recipeId, multiplier: p.multiplier, recipe };
          });
          meal.status = 'confirmed';
          meal.confirmedAt = new Date().toISOString();
          saveMeal(meal);
          return send(200, { ok: true });
        }
        if (action === 'reopen' && method === 'POST') {
          assert(meal.status === 'confirmed', '只能调整尚未完成的一餐', 409);
          meal.status = 'planning';
          meal.finalPlan = [];
          transaction(() => {
            saveMeal(meal);
            db.prepare('DELETE FROM shopping WHERE meal_id=?').run(meal.id);
          });
          return send(200, { ok: true });
        }
        if (action === 'complete' && method === 'POST') {
          assert(meal.status === 'confirmed', '请先确认菜单', 409);
          meal.status = 'completed';
          saveMeal(meal);
          return send(200, { ok: true });
        }
      }
      assert(user.role === 'chef', '只有掌勺的人可以管理厨房', 403);
      if (path === '/api/recipes' && method === 'POST') {
        const recipe = {
          ...validateRecipe(body),
          id: randomUUID(),
          createdAt: new Date().toISOString(),
        };
        db.prepare('INSERT INTO recipes(id,data) VALUES(?,?)').run(
          recipe.id,
          JSON.stringify(recipe),
        );
        return send(201, { recipe });
      }
      const recipeMatch = path.match(/^\/api\/recipes\/([^/]+)$/);
      if (recipeMatch && ['PUT', 'DELETE'].includes(method)) {
        const existing = getRecipe(recipeMatch[1]);
        assert(existing, '找不到这道菜', 404);
        if (method === 'DELETE') {
          db.prepare('UPDATE recipes SET deleted=1 WHERE id=?').run(existing.id);
          return send(200, { ok: true });
        }
        const recipe = { ...validateRecipe(body), id: existing.id, createdAt: existing.createdAt };
        db.prepare('UPDATE recipes SET data=? WHERE id=?').run(JSON.stringify(recipe), existing.id);
        return send(200, { recipe });
      }
      if (path === '/api/meals' && method === 'POST') {
        assert(
          text(body.title, 60) &&
            dateOK(body.date) &&
            number(body.people, 1, 30) &&
            Number.isInteger(body.people),
          '请填写餐名、有效日期和人数',
        );
        assert(
          Array.isArray(body.recipeIds) &&
            body.recipeIds.length > 0 &&
            body.recipeIds.length <= 100 &&
            body.recipeIds.every((id) => getRecipe(id)),
          '请至少选择一道可点的菜',
        );
        const meal = {
          id: randomUUID(),
          title: text(body.title, 60),
          date: body.date,
          people: body.people,
          note: text(body.note, 500),
          status: 'planning',
          recipeIds: [...new Set(body.recipeIds)],
          finalPlan: [],
          createdAt: new Date().toISOString(),
        };
        saveMeal(meal);
        return send(201, { meal });
      }
      if (path === '/api/export' && method === 'GET') {
        const backup = {
          version: 1,
          exportedAt: new Date().toISOString(),
          users: publicUsers(),
          recipes: db
            .prepare('SELECT data,deleted FROM recipes')
            .all()
            .map((r) => ({ ...JSON.parse(r.data), deleted: !!r.deleted })),
          meals: db
            .prepare('SELECT data FROM meals')
            .all()
            .map((r) => JSON.parse(r.data)),
          orders: db
            .prepare('SELECT * FROM orders')
            .all()
            .map((r) => ({ ...r, data: JSON.parse(r.data) })),
          shopping: db.prepare('SELECT * FROM shopping').all(),
          images: db
            .prepare('SELECT * FROM images')
            .all()
            .map((r) => ({ ...r, data: Buffer.from(r.data).toString('base64') })),
        };
        return send(200, backup, {
          'Content-Disposition': 'attachment; filename="home-kitchen-backup.json"',
        });
      }
      throw new HttpError(404, '找不到这个操作');
    } catch (e) {
      if (!res.headersSent)
        send(e.status || 500, { error: e.status ? e.message : '暂时没有完成操作，请稍后重试' });
      else res.end();
      if (!e.status) console.error('Request failed:', e.message);
    }
  });
  server.requestTimeout = 30000;
  server.headersTimeout = 15000;
  server.on('close', () => db.close());
  return server;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4310),
    host = process.env.HOST || '127.0.0.1';
  const server = createKitchen();
  server.listen(port, host, () => console.log(`Home Kitchen ready at http://${host}:${port}`));
  const stop = () => server.close(() => process.exit(0));
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}
