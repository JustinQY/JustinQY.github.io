import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createKitchen } from '../server.mjs';

async function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'kitchen-test-'));
  let server = createKitchen({ dataDir: dir });
  const listen = async () => {
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    return `http://127.0.0.1:${server.address().port}`;
  };
  let base = await listen();
  const call = async (path, { method = 'GET', body, cookie, origin } = {}) => {
    const res = await fetch(base + '/api' + path, {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(cookie ? { Cookie: cookie } : {}),
        ...(origin ? { Origin: origin } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return {
      status: res.status,
      data: await res.json(),
      cookie: res.headers.get('set-cookie')?.split(';')[0],
    };
  };
  const chef = { username: 'test_chef', nickname: '测试掌勺', password: 'a-test-password-123' };
  const partner = {
    username: 'test_partner',
    nickname: '测试点菜',
    password: 'another-test-password-123',
  };
  const setup = await call('/setup', { method: 'POST', body: { chef, partner, samples: true } });
  assert.equal(setup.status, 201);
  const login = await call('/login', { method: 'POST', body: partner });
  assert.equal(login.status, 200);
  t.after(async () => {
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
    rmSync(dir, { recursive: true, force: true });
  });
  return {
    call,
    chef: setup.cookie,
    partner: login.cookie,
    restart: async () => {
      server.closeAllConnections();
      await new Promise((r) => server.close(r));
      server = createKitchen({ dataDir: dir });
      base = await listen();
    },
  };
}
test('two-account meal workflow, scaled groceries, snapshots, and restart persistence', async (t) => {
  const f = await fixture(t),
    { call, chef, partner } = f;
  const initial = await call('/state', { cookie: chef });
  assert.equal(initial.data.recipes.length, 4);
  const create = await call('/meals', {
    method: 'POST',
    cookie: chef,
    body: {
      title: '周五晚餐',
      date: '2026-10-30',
      people: 2,
      recipeIds: ['sample-tomato', 'sample-shrimp'],
    },
  });
  assert.equal(create.status, 201);
  const id = create.data.meal.id;
  assert.equal(
    (
      await call(`/meals/${id}/order`, {
        method: 'PUT',
        cookie: partner,
        body: { recipeIds: ['sample-tomato', 'sample-shrimp'], note: '少放盐' },
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await call(`/meals/${id}/order`, {
        method: 'PUT',
        cookie: chef,
        body: { recipeIds: ['sample-tomato'], note: '收到' },
      })
    ).status,
    200,
  );
  const pending = (await call('/state', { cookie: chef })).data.meals[0];
  assert.equal(pending.orders.length, 2);
  assert.equal(pending.shopping.length, 0);
  assert.equal(
    (
      await call(`/meals/${id}/confirm`, {
        method: 'POST',
        cookie: chef,
        body: {
          plan: [
            { recipeId: 'sample-tomato', multiplier: 2 },
            { recipeId: 'sample-shrimp', multiplier: 1 },
          ],
        },
      })
    ).status,
    200,
  );
  let meal = (await call('/state', { cookie: partner })).data.meals[0];
  assert.equal(meal.shopping.find((i) => i.name === '食用油').quantity, 45);
  assert.equal(meal.shopping.find((i) => i.name === '盐').quantity, null);
  assert.equal(meal.shopping.find((i) => i.name === '盐').recipes.length, 2);
  assert.equal(meal.shopping.find((i) => i.name === '鸡蛋').quantity, 6);
  assert.equal(
    (await call(`/meals/${id}/order`, { method: 'PUT', cookie: partner, body: { recipeIds: [] } }))
      .status,
    409,
  );
  const oil = meal.shopping.find((i) => i.name === '食用油');
  assert.equal(
    (
      await call(`/meals/${id}/shopping`, {
        method: 'PUT',
        cookie: partner,
        body: { key: oil.key, status: 'have' },
      })
    ).status,
    200,
  );
  const recipe = initial.data.recipes.find((r) => r.id === 'sample-tomato');
  recipe.ingredients.find((i) => i.name === '鸡蛋').quantity = 99;
  assert.equal(
    (await call('/recipes/sample-tomato', { method: 'PUT', cookie: chef, body: recipe })).status,
    200,
  );
  assert.equal(
    (await call('/recipes/sample-shrimp', { method: 'DELETE', cookie: chef, body: {} })).status,
    200,
  );
  await f.restart();
  meal = (await call('/state', { cookie: chef })).data.meals[0];
  assert.equal(meal.shopping.find((i) => i.name === '鸡蛋').quantity, 6);
  assert.equal(meal.shopping.find((i) => i.name === '食用油').status, 'have');
  assert.equal(meal.finalPlan[1].recipe.name, '香煎蒜香虾');
  assert.equal(
    (await call(`/meals/${id}/reopen`, { method: 'POST', cookie: chef, body: {} })).status,
    200,
  );
  meal = (await call('/state', { cookie: chef })).data.meals[0];
  assert.equal(meal.status, 'planning');
  assert.equal(meal.shopping.length, 0);
  assert.equal(meal.orders.length, 2);
});
test('account isolation, CSRF, validation, private images, and safe export', async (t) => {
  const { call, chef, partner } = await fixture(t);
  assert.equal((await call('/state')).status, 401);
  assert.equal((await call('/export', { cookie: partner })).status, 403);
  assert.equal((await call('/recipes', { method: 'POST', cookie: partner, body: {} })).status, 403);
  assert.equal(
    (
      await call('/recipes/sample-tomato', {
        method: 'DELETE',
        cookie: chef,
        origin: 'https://attacker.example',
        body: {},
      })
    ).status,
    403,
  );
  assert.equal((await call('/setup', { method: 'POST', body: {} })).status, 409);
  assert.equal(
    (
      await call('/login', {
        method: 'POST',
        body: { username: 'test_chef', password: 'wrong-password' },
      })
    ).status,
    401,
  );
  const recipes = (await call('/state', { cookie: chef })).data.recipes;
  const invalid = { ...recipes[0], ingredients: [{ name: '测试食材', quantity: -5, unit: '克' }] };
  assert.equal(
    (await call('/recipes', { method: 'POST', cookie: chef, body: invalid })).status,
    400,
  );
  assert.equal(
    (
      await call('/recipes', {
        method: 'POST',
        cookie: chef,
        body: { ...invalid, ingredients: [null] },
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await call('/images', {
        method: 'POST',
        cookie: chef,
        body: { data: Buffer.from('<svg onload="alert(1)"></svg>').toString('base64') },
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await call('/meals', {
        method: 'POST',
        cookie: chef,
        body: { title: '非法日期', date: '2026-02-30', people: 2, recipeIds: ['sample-tomato'] },
      })
    ).status,
    400,
  );
  const meal = (
    await call('/meals', {
      method: 'POST',
      cookie: chef,
      body: { title: '一餐', date: '2026-10-30', people: 2, recipeIds: ['sample-tomato'] },
    })
  ).data.meal;
  assert.equal(
    (
      await call(`/meals/${meal.id}/confirm`, {
        method: 'POST',
        cookie: partner,
        body: { plan: [{ recipeId: 'sample-tomato', multiplier: 1 }] },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await call(`/meals/${meal.id}/confirm`, {
        method: 'POST',
        cookie: chef,
        body: { plan: [null] },
      })
    ).status,
    400,
  );
  const share = await call(`/share?meal=${meal.id}`, { cookie: partner });
  assert.equal(share.status, 200);
  assert.match(share.data.svg, /<svg/);
  assert.ok(!share.data.url.includes('session'));
  const exported = await call('/export', { cookie: chef });
  assert.equal(exported.status, 200);
  assert.ok(!JSON.stringify(exported.data).includes('password'));
  assert.ok(!JSON.stringify(exported.data).includes('kitchen_session'));
  assert.equal((await call('/logout', { method: 'POST', cookie: chef, body: {} })).status, 200);
  assert.equal((await call('/state', { cookie: chef })).status, 401);
});
