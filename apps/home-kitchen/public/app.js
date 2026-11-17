const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const escape = (v) =>
  String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const icon = (n) => `<svg class="icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const button = (label, action, kind = '', id = '') =>
  `<button type="button" class="button ${kind}" data-action="${action}"${id ? ` data-id="${escape(id)}"` : ''}>${label}</button>`;
const image = (r) =>
  r.image ? `/api/images/${encodeURIComponent(r.image)}` : `/art/${r.art || 'tomato'}.svg`;
const amount = (i) =>
  i.quantity === null ? '适量' : `${Number(i.quantity.toFixed(3))} ${escape(i.unit)}`;
const localDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const prettyDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
const statusName = (s) => ({ planning: '正在点菜', confirmed: '准备开饭', completed: '已完成' })[s];
let state,
  session,
  category = '全部菜品',
  query = '',
  selectedMeal = null,
  syncError = false,
  loading = false;
const drafts = new Map();
let uploadedImage = null,
  uploadBusy = false,
  toastTimer;
async function api(path, method = 'GET', body) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401 && path != '/login') {
      session = { setup: false, user: null };
      state = null;
      renderAuth();
    }
    throw new Error(data.error || '暂时无法完成操作');
  }
  return data;
}
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3500);
}
function route() {
  const [tab, id] = location.hash.slice(1).split('/');
  return { tab: ['recipes', 'meals', 'shopping'].includes(tab) ? tab : 'recipes', id };
}
function currentMeal(tab = route().tab) {
  const list = state.meals.filter((m) => tab !== 'shopping' || m.status !== 'planning');
  const id = route().id || selectedMeal;
  return list.find((m) => m.id === id) || list.find((m) => m.status !== 'completed') || list[0];
}
const isChef = () => state?.user.role === 'chef';
const byId = (id) => state.recipes.find((r) => r.id === id);
function openModal(title, html) {
  const el = $('#modal');
  el.innerHTML = `<div class="modal-head"><h2>${escape(title)}</h2><button class="icon-button" data-action="close" aria-label="关闭">${icon('close')}</button></div><div class="modal-body">${html}</div>`;
  document.body.classList.add('no-scroll');
  el.showModal();
}
function closeModal() {
  $('#modal').close();
  document.body.classList.remove('no-scroll');
}
$('#modal').addEventListener('close', () => document.body.classList.remove('no-scroll'));
$('#modal').addEventListener('click', (e) => {
  if (e.target === $('#modal')) {
    const r = e.target.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      closeModal();
  }
});
function passwordInput(name, label, autocomplete = 'new-password') {
  return `<label class="form-field"><span>${label}</span><div class="password-field"><input name="${name}" type="password" minlength="8" maxlength="128" required autocomplete="${autocomplete}" placeholder="至少 8 位"><button type="button" class="password-toggle" data-action="password" aria-label="显示或隐藏密码">显示</button></div></label>`;
}
function brand() {
  return `<div class="brand"><img src="/icon.svg" alt=""><div><strong>今天吃什么</strong><small>OUR LITTLE KITCHEN</small></div></div>`;
}
function renderAuth() {
  const setup = session.setup;
  $('#app').innerHTML =
    `<main class="auth-page"><section class="auth-story">${brand()}<div><div class="eyebrow">A TABLE FOR TWO</div><h1>好好吃饭，<br>也好好在一起。</h1><p>把拿手菜收进小厨房，<br>把今天的想念，留在晚餐里。</p></div><img class="auth-art" src="/art/tomato.svg" alt="一盘番茄炒蛋插画"></section><div><div class="auth-mobile-brand">${brand()}</div><section class="auth-form-wrap"><div class="eyebrow">${setup ? 'MAKE YOURSELF AT HOME' : 'WELCOME HOME'}</div><h2>${setup ? '开一个两个人的小厨房' : '今天，也一起吃饭吧'}</h2><p>${setup ? '设置好两个人的账号，厨房就准备好了。' : '登录后就能查看菜谱、点菜和一起买菜。'}</p><form id="auth-form" data-mode="${setup ? 'setup' : 'login'}"><div class="form-error" role="alert"></div>${
      setup
        ? `
    <fieldset><legend><span>01</span>掌勺的人 · 管理菜谱与菜单</legend><div class="form-row"><label class="form-field"><span>昵称</span><input name="chefNickname" value="我" maxlength="24" autocomplete="off" required></label><label class="form-field"><span>登录账号</span><input name="chefUsername" value="chef" pattern="[a-zA-Z0-9_-]{3,32}" maxlength="32" autocapitalize="none" spellcheck="false" required></label></div>${passwordInput('chefPassword', '设置密码')}</fieldset>
    <fieldset><legend><span>02</span>点菜的人 · 选菜与共享采购清单</legend><div class="form-row"><label class="form-field"><span>昵称</span><input name="partnerNickname" value="老婆" maxlength="24" autocomplete="off" required></label><label class="form-field"><span>登录账号</span><input name="partnerUsername" value="partner" pattern="[a-zA-Z0-9_-]{3,32}" maxlength="32" autocapitalize="none" spellcheck="false" required></label></div>${passwordInput('partnerPassword', '设置密码')}</fieldset><label class="check-label"><input name="samples" type="checkbox" checked>先放入 4 道示例菜谱（可编辑、删除）</label>`
        : `<label class="form-field"><span>登录账号</span><input name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="32" placeholder="输入你的账号" required></label>${passwordInput('password', '密码', 'current-password')}`
    }<button class="button primary" type="submit">${setup ? '准备好了，开厨房' : '进入小厨房'}${icon('arrow')}</button></form><p class="auth-bottom">${setup ? '账号仅用于这个厨房。请记好两个人的账号和密码。' : '两个人，一张餐桌，一顿好饭。'}</p></section></div></main>`;
}
function render() {
  if (!state) return;
  const { tab } = route();
  const user = state.user;
  $('#app').innerHTML =
    `<aside class="sidebar">${brand()}<div class="nav-caption">我们的日常</div><nav class="nav" aria-label="主导航">${[
      ['recipes', 'book', '我的菜谱'],
      ['meals', 'fork', '今天吃什么'],
      ['shopping', 'bag', '采购清单'],
    ]
      .map(
        ([id, i, label]) =>
          `<a href="#${id}" class="${tab === id ? 'active' : ''}" ${tab === id ? 'aria-current="page"' : ''}>${icon(i)}<span>${label}</span>${id === 'recipes' ? `<span class="count">${state.recipes.length}</span>` : ''}</a>`,
      )
      .join(
        '',
      )}</nav><div class="side-note">${icon('leaf')}<p>一蔬一饭，<br>是我们的小日子。</p><small>A LITTLE KITCHEN, A LOT OF LOVE.</small></div></aside><div class="workspace"><header class="topbar"><div class="topbar-label"><span></span>我们的小厨房 <span></span> ${new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}</div><div class="user-area"><div class="avatar">${escape(user.nickname.slice(0, 1))}</div><div><strong>${escape(user.nickname)}</strong><small>${isChef() ? '今天我掌勺' : '今天我点菜'}</small></div><button class="logout" data-action="logout" aria-label="退出登录" title="退出登录">${icon('exit')}</button></div></header>${syncError ? '<div class="sync-error" role="status">暂时没有连上小厨房，正在重试。未提交的内容会保留。</div>' : ''}<main class="page">${tab === 'recipes' ? recipesPage() : tab === 'meals' ? mealsPage() : shoppingPage()}<footer class="footer"><span>把喜欢的味道，留给喜欢的人。 ♡</span><div><button data-action="share">手机打开</button>${isChef() ? '<span> · </span><a href="/api/export" download>导出厨房数据</a>' : ''}</div></footer></main></div>`;
}
function heading(kicker, title, subtitle, actions = '') {
  return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="actions">${actions}</div>` : ''}</div>`;
}
function nextMealCard() {
  const meal = state.meals.find((m) => m.status !== 'completed');
  return `<article class="next-meal"><div class="topline"><span>${icon('calendar')} ${meal ? '下一顿，安排好了' : '留一个位置，等你开饭'}</span>${meal ? `<span class="badge ${meal.status === 'planning' ? 'warm' : ''}">${statusName(meal.status)}</span>` : icon('heart')}</div><h3>${meal ? escape(meal.title) : '今晚吃什么？'}</h3><p>${meal ? `${prettyDate(meal.date)} · ${meal.people} 人一起吃饭` : '从一道想吃的菜，开始今天的小日子。'}</p>${meal ? `<a href="#meals/${meal.id}" class="meal-link">${meal.status === 'planning' ? '去点几道菜' : '看看今日菜单'}${icon('arrow')}</a>` : `<button class="meal-link button ghost" data-action="${isChef() ? 'new-meal' : 'waiting'}">${isChef() ? '发起我们的一餐' : '等掌勺的人发起一餐'}${icon('arrow')}</button>`}</article>`;
}
function recipesPage() {
  return `${heading('GOOD FOOD, GOOD COMPANY', '今天，想吃点什么？', '收藏拿手好菜，把每一顿都过成喜欢的样子。', isChef() ? button(`${icon('plus')} 添加菜谱`, 'new-recipe', 'primary') : '')}<section class="hero"><div class="hero-story"><div class="hero-copy"><div class="hero-label">${icon('leaf')} OUR DAILY RECIPE</div><h2>有人点菜，<br>有人把爱下锅。</h2><p>好好吃饭，是属于我们的默契。</p></div><img class="hero-art" src="/art/tomato.svg" alt="家常菜插画"></div>${nextMealCard()}</section><section aria-label="菜谱收藏"><div class="section-title"><h2>我们的拿手菜 <small>${state.recipes.length} 道日常里的好味道</small></h2><label class="search">${icon('search')}<input id="recipe-search" aria-label="搜索菜名或食材" placeholder="搜索菜名、食材…" value="${escape(query)}"></label></div><div class="filters">${['全部菜品', ...new Set(state.recipes.map((r) => r.category))].map((c) => `<button class="chip ${category === c ? 'active' : ''}" data-action="filter" data-id="${escape(c)}">${escape(c)}</button>`).join('')}</div><div class="recipe-grid" id="recipe-grid">${recipeCards()}</div></section>`;
}
function recipeCards() {
  const items = state.recipes.filter(
    (r) =>
      (category === '全部菜品' || r.category === category) &&
      `${r.name} ${r.ingredients.map((i) => i.name).join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return `${items.map((r) => `<article class="recipe-card"><button class="card-visual" data-action="recipe" data-id="${r.id}" aria-label="查看${escape(r.name)}"><img src="${image(r)}" alt="${escape(r.name)}${r.image ? '' : '示意插画'}" loading="lazy">${r.sample ? '<span class="sample-label">示例菜谱 · 示意插画</span>' : ''}</button><div class="card-body"><div class="card-heading"><h3><button class="card-name-button" data-action="recipe" data-id="${r.id}">${escape(r.name)}</button></h3>${icon('leaf')}</div><p class="card-description">${escape(r.description || '把这道拿手菜，做给喜欢的人。')}</p><div class="card-footer"><span class="card-meta"><span>${icon('clock')}${r.minutes} 分钟</span><span>${icon('people')}${r.servings} 人份</span></span><span class="card-category">${escape(r.category)}</span></div></div></article>`).join('')}${!items.length && (query || category !== '全部菜品') ? '<div class="clear-search">还没有找到这道菜，试试别的菜名或食材。</div>' : ''}${isChef() ? `<button class="add-card" data-action="new-recipe"><span class="plus-circle">${icon('plus')}</span><strong>再记下一道好菜</strong><small>今天的拿手菜，明天的期待</small></button>` : !state.recipes.length ? empty('book', '菜谱还在准备中', '等掌勺的人添加好菜谱，就可以一起选菜啦。') : ''}`;
}
function empty(i, title, desc, action = '') {
  return `<div class="empty span-all">${icon(i)}<h2>${title}</h2><p>${desc}</p>${action}</div>`;
}
function mealsPage() {
  const meal = currentMeal();
  return `${heading('A TABLE FOR TWO', '今天吃什么', '你来点菜，我来把这一餐安排好。', isChef() ? button(`${icon('plus')} 发起一餐`, 'new-meal', 'primary') : '')}${!meal ? empty('fork', '给下一顿留一点期待', '先发起一餐，挑选可点的菜，再邀请对方来选。', isChef() ? button('发起我们的一餐', 'new-meal', 'primary') : '') : `<div class="meal-layout">${mealList(state.meals, meal, 'meals')}<section class="panel">${mealDetail(meal)}</section></div>`}`;
}
function mealList(list, current, tab) {
  return `<nav class="meal-list" aria-label="选择用餐">${list.map((m) => `<a class="meal-tab ${m.id === current.id ? 'active' : ''}" href="#${tab}/${m.id}"><small>${prettyDate(m.date)}</small><strong>${escape(m.title)}</strong><span class="badge ${m.status === 'planning' ? 'warm' : ''}">${statusName(m.status)}</span></a>`).join('')}</nav>`;
}
function draft(meal) {
  if (!drafts.has(meal.id)) {
    const saved = meal.orders.find((o) => o.userId === state.user.id);
    drafts.set(meal.id, {
      recipeIds: saved?.recipeIds.slice() || [],
      note: saved?.note || '',
      dirty: false,
    });
  }
  const d = drafts.get(meal.id);
  d.recipeIds = d.recipeIds.filter((id) => meal.recipeIds.includes(id) && byId(id));
  return d;
}
function mealDetail(meal) {
  const orders = meal.orders,
    d = draft(meal);
  return `<div class="panel-heading"><div><h2>${escape(meal.title)}</h2><p>${prettyDate(meal.date)} · ${meal.people} 人一起吃饭</p></div><span class="badge ${meal.status === 'planning' ? 'warm' : ''}">${statusName(meal.status)}</span></div>${meal.note ? `<div class="notice">${escape(meal.note)}</div>` : ''}${
    meal.status === 'planning'
      ? `<div class="section-title"><strong>这餐，你想吃哪几道？</strong>${button('邀请点菜', 'share', 'small', meal.id)}</div><div class="order-grid">${meal.recipeIds
          .map((id) => byId(id))
          .filter(Boolean)
          .map((r) => {
            const who = orders
              .filter((o) => o.recipeIds.includes(r.id))
              .map((o) => state.users.find((u) => u.id === o.userId)?.nickname || '家人');
            return `<button class="order-card ${d.recipeIds.includes(r.id) ? 'selected' : ''}" data-action="toggle-order" data-id="${r.id}" data-meal="${meal.id}" aria-pressed="${d.recipeIds.includes(r.id)}"><img src="${image(r)}" alt=""><div><strong>${escape(r.name)}</strong><small>${r.minutes} 分钟 · ${r.servings} 人份</small><small>${who.length ? `${escape(who.join('、'))} 想吃` : '等一个想吃的人'}</small></div><span class="check-circle">${d.recipeIds.includes(r.id) ? icon('check') : ''}</span></button>`;
          })
          .join(
            '',
          )}</div><form id="order-form" data-id="${meal.id}"><label class="form-field"><span>留句话给掌勺的人 <span class="form-hint">· 忌口、口味或想吃的其他菜</span></span><textarea name="note" id="order-note" maxlength="500" placeholder="比如：今天想吃清淡一点，少放辣。">${escape(d.note)}</textarea></label><div class="form-error" role="alert"></div><div class="actions"><button type="submit" class="button primary">${icon('check')} ${meal.orders.some((o) => o.userId === state.user.id) ? '更新我的点菜' : '提交我的点菜'}</button><span class="form-hint">${d.recipeIds.length} 道已选${d.dirty ? ' · 尚未提交' : ''}</span></div></form><div class="order-notes">${state.users
          .map((u) => {
            const o = orders.find((o) => o.userId === u.id);
            return `<div class="order-note"><strong>${escape(u.nickname)}</strong>${o ? `想吃 ${o.recipeIds.filter((id) => byId(id)).length} 道${o.note ? ` · ${escape(o.note)}` : ''}` : '还没提交点菜'}</div>`;
          })
          .join(
            '',
          )}</div>${isChef() ? `<div class="form-actions">${button('确认菜单，生成采购清单', 'confirm-meal', 'rust', meal.id)}</div><p class="form-hint" style="margin-top:12px">大家提交的是心愿单，最终做哪些、做几份，由你确认。</p>` : ''}`
      : `<div class="notice">${meal.status === 'completed' ? '这一餐已经收进我们的日常。' : '菜单已确认，按清单买好食材，就可以准备开饭啦。'}</div>${meal.finalPlan.map((p) => `<div class="final-recipe"><img src="${image(p.recipe)}" alt=""><div><h3>${escape(p.recipe.name)}</h3><p>${p.recipe.servings} 人份 × ${p.multiplier} · ${p.recipe.minutes} 分钟</p></div><button class="button ghost small" style="margin-left:auto" data-action="snapshot" data-id="${p.recipeId}" data-meal="${meal.id}">看做法</button></div>`).join('')}<div class="order-notes">${orders
          .filter((o) => o.note)
          .map(
            (o) =>
              `<div class="order-note"><strong>${escape(state.users.find((u) => u.id === o.userId)?.nickname)}</strong>${escape(o.note)}</div>`,
          )
          .join(
            '',
          )}</div><div class="meal-end"><a class="button primary" href="#shopping/${meal.id}">${icon('bag')} 查看采购清单</a>${isChef() && meal.status === 'confirmed' ? `<div class="actions">${button('调整菜单', 'reopen', 'small', meal.id)}${button('这一餐完成了', 'complete', 'small', meal.id)}</div>` : ''}</div>`
  }`;
}
function shoppingPage() {
  const meal = currentMeal('shopping'),
    list = state.meals.filter((m) => m.status !== 'planning');
  return `${heading('FROM THE MARKET TO OUR TABLE', '买好食材，准备开饭', '相同食材按单位合并，家里有的就不用再买。')}${
    !meal
      ? empty(
          'bag',
          '采购清单，还差一张菜单',
          '到「今天吃什么」确认本餐的菜品和份数，清单会自动准备好。',
          '<a class="button primary" href="#meals">去看看菜单</a>',
        )
      : `<div class="meal-layout">${mealList(list, meal, 'shopping')}<section class="panel"><div class="shopping-summary"><div><div class="eyebrow">TODAY’S SHOPPING LIST</div><h2 style="margin-top:9px">${escape(meal.title)}</h2><p>${prettyDate(meal.date)} · ${meal.finalPlan.length} 道菜 · ${meal.people} 人吃饭</p></div>${icon('bag')}</div><div class="section-title"><h2>这一餐需要</h2>${button('复制清单', 'copy-shopping', 'small', meal.id)}</div><div class="status-strip"><progress max="${meal.shopping.length || 1}" value="${meal.shopping.filter((i) => i.status !== 'need').length}" aria-label="食材准备进度"></progress><span>${meal.shopping.filter((i) => i.status !== 'need').length} / ${meal.shopping.length} 项已准备</span></div><div class="shopping-list">${meal.shopping
          .map(
            (i) =>
              `<div class="shopping-row ${i.status !== 'need' ? 'done' : ''}"><button class="check-btn" data-action="check-shopping" data-id="${i.key}" data-meal="${meal.id}" aria-label="${i.status === 'need' ? '标为已买' : '标为待买'}${escape(i.name)}">${i.status !== 'need' ? icon('check') : ''}</button><div><span class="ingredient-name">${escape(i.name)}</span><span class="from-recipes">${escape(i.recipes.join(' · '))}</span></div><span class="ingredient-amount">${amount(i)}</span><select class="status-select" data-shopping="${i.key}" data-meal="${meal.id}" aria-label="${escape(i.name)}采购状态">${[
                ['need', '待购买'],
                ['have', '家里有'],
                ['bought', '买好了'],
              ]
                .map(
                  ([s, l]) =>
                    `<option value="${s}" ${i.status === s ? 'selected' : ''}>${l}</option>`,
                )
                .join('')}</select></div>`,
          )
          .join(
            '',
          )}</div><p class="form-hint" style="margin-top:19px">数量按确认时的菜谱与份数计算。「适量」食材请自行判断，改动菜谱不会影响这张清单。</p><div class="meal-end"><a class="button" href="#meals/${meal.id}">查看菜单</a>${button('打印清单', 'print', 'small')}</div></section></div>`
  }`;
}
function recipeDetail(recipe, snapshot = false) {
  openModal(
    recipe.name,
    `<img class="recipe-detail-hero" src="${image(recipe)}" alt="${escape(recipe.name)}${recipe.image ? '' : '示意插画'}"><span class="badge">${escape(recipe.category)}</span>${recipe.sample ? '<span class="form-hint" style="margin-left:10px">示例菜谱 · 可自行调整</span>' : ''}<p style="margin-top:12px">${escape(recipe.description)}</p><div class="detail-meta"><span>${icon('clock')}${recipe.minutes} 分钟</span><span>${icon('people')}${recipe.servings} 人份</span></div>${snapshot ? '<div class="notice">这是确认本餐时保存的做法与食材。</div>' : ''}<section class="detail-section"><h3>食材准备</h3><div class="ingredients-detail">${recipe.ingredients.map((i) => `<div>${escape(i.name)}<span>${amount(i)}</span></div>`).join('')}</div></section><section class="detail-section"><h3>把好味道做出来</h3><ol class="steps-list">${recipe.steps.map((s) => `<li>${escape(s)}</li>`).join('')}</ol></section>${recipe.notes ? `<section class="detail-section"><h3>厨房小记</h3><p class="muted">${escape(recipe.notes)}</p></section>` : ''}${isChef() && !snapshot ? `<div class="detail-edit">${button('删除这道菜', 'delete-recipe', 'ghost danger', recipe.id)}${button(`${icon('edit')} 编辑菜谱`, 'edit-recipe', 'primary', recipe.id)}</div>` : ''}`,
  );
}
function ingredientRow(i = {}) {
  const unit = i.unit || '克';
  return `<div class="ingredient-edit"><input name="ingredientName" aria-label="食材名称" placeholder="食材名称" value="${escape(i.name || '')}" maxlength="60" required><input type="number" name="ingredientQuantity" aria-label="食材用量，适量留空" placeholder="适量" min="0.001" max="100000" step="any" value="${i.quantity ?? ''}"><select name="ingredientUnit" aria-label="食材单位">${[...new Set(['克', '千克', '个', '根', '瓣', '毫升', '升', '勺', '把', '适量', unit])].map((u) => `<option ${u === unit ? 'selected' : ''}>${escape(u)}</option>`).join('')}</select><button type="button" data-action="remove-ingredient" aria-label="移除这项食材">${icon('close')}</button></div>`;
}
function recipeEditor(recipe) {
  uploadedImage = recipe?.image || null;
  const r = recipe || {
    name: '',
    category: '家常快手',
    description: '',
    servings: 2,
    minutes: 20,
    ingredients: [{}, {}],
    steps: [],
    notes: '',
    art: 'tomato',
  };
  openModal(
    recipe ? '编辑这道拿手菜' : '记下一道拿手菜',
    `<form id="recipe-form" data-id="${recipe?.id || ''}" data-art="${r.art}"><div class="form-error" role="alert"></div><div class="upload-area"><img id="upload-preview" src="${image(r)}" alt="菜谱封面预览"><div><strong style="font-size:12px">给拿手菜拍张照</strong><p>自动压缩照片，也可以先保留插画。</p><input id="recipe-image" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" aria-label="上传菜品照片"><small id="upload-status"></small></div></div><label class="form-field"><span>菜名</span><input name="name" maxlength="60" required placeholder="比如：我的拿手红烧肉" value="${escape(r.name)}"></label><div class="form-row"><label class="form-field"><span>分类</span><input name="category" list="category-list" maxlength="24" required value="${escape(r.category)}"><datalist id="category-list">${['家常快手', '清爽蔬菜', '慢慢炖煮', '汤汤水水', '主食小吃'].map((c) => `<option>${c}</option>`).join('')}</datalist></label><label class="form-field"><span>一句话介绍</span><input name="description" maxlength="160" placeholder="这道菜的味道或故事" value="${escape(r.description)}"></label></div><div class="form-row"><label class="form-field"><span>基础份量（人份）</span><input type="number" name="servings" min="1" max="30" step="1" required value="${r.servings}"></label><label class="form-field"><span>预计用时（分钟）</span><input type="number" name="minutes" min="1" max="1440" step="1" required value="${r.minutes}"></label></div><div class="section-title" style="margin:24px 0 12px"><strong>食材和用量</strong>${button(`${icon('plus')} 加一项`, 'add-ingredient', 'small')}</div><p class="form-hint" style="margin-bottom:12px">用量对应上面的基础人份。「适量」可不填数字。</p><div id="ingredients-editor">${r.ingredients.map((i) => ingredientRow(i)).join('')}</div><label class="form-field" style="margin-top:23px"><span>做法 <span class="form-hint">· 每行一步</span></span><textarea name="steps" rows="5" maxlength="20000" placeholder="准备好食材。&#10;热锅，开始做菜。" required>${escape(r.steps.join('\n'))}</textarea></label><label class="form-field"><span>厨房小记</span><textarea name="notes" maxlength="2000" placeholder="口味、忌口，或者下次想改进的地方。">${escape(r.notes)}</textarea></label><div class="form-actions">${button('先不记了', 'close')}<button type="submit" class="button primary">${icon('check')} 保存菜谱</button></div></form>`,
  );
}
function mealEditor() {
  if (!state.recipes.length) {
    toast('先记下一道菜，就可以发起一餐了');
    recipeEditor();
    return;
  }
  openModal(
    '安排我们的一餐',
    `<form id="meal-form"><div class="form-error" role="alert"></div><label class="form-field"><span>给这一餐起个名字</span><input name="title" value="今天的晚餐" maxlength="60" required></label><div class="form-row"><label class="form-field"><span>哪一天</span><input type="date" name="date" value="${localDate()}" required></label><label class="form-field"><span>几个人一起吃</span><input type="number" name="people" value="2" min="1" max="30" step="1" required></label></div><label class="form-field"><span>开饭前说一句</span><input name="note" placeholder="今晚我掌勺，你来点菜吧。" maxlength="500"></label><strong style="font-size:12px">这餐可以点的菜</strong><p class="form-hint">按时间和精力挑几道。最终菜单稍后再确认。</p><div class="recipe-checks">${state.recipes.map((r) => `<label class="meal-recipe-check"><input type="checkbox" name="recipe" value="${r.id}" checked><img src="${image(r)}" alt=""><span class="recipe-info">${escape(r.name)}<small>${r.servings} 人份 · ${r.minutes} 分钟</small></span></label>`).join('')}</div><div class="form-actions">${button('取消', 'close')}<button type="submit" class="button primary">发起这一餐 ${icon('arrow')}</button></div></form>`,
  );
}
function confirmEditor(meal) {
  const requested = new Set(meal.orders.flatMap((o) => o.recipeIds));
  openModal(
    '确认这一餐的菜单',
    `<form id="confirm-form" data-id="${meal.id}"><div class="form-error" role="alert"></div><p class="muted" style="font-size:12px;margin-bottom:18px">选好最后要做的菜，再决定每道做几份。相同菜品不会按点菜人数重复计算。</p><div class="recipe-checks">${meal.recipeIds
      .map((id) => byId(id))
      .filter(Boolean)
      .map(
        (r) =>
          `<label class="meal-recipe-check"><input type="checkbox" name="recipe" value="${r.id}" ${requested.has(r.id) ? 'checked' : ''}><img src="${image(r)}" alt=""><span class="recipe-info">${escape(r.name)}<small>每份 ${r.servings} 人份${requested.has(r.id) ? ' · 有人想吃' : ''}</small></span><span>×</span><input type="number" min="1" max="20" step="1" value="1" data-quantity="${r.id}" aria-label="${escape(r.name)}做几份"></label>`,
      )
      .join(
        '',
      )}</div><div class="notice">确认后会保存本餐菜谱，并自动合并食材生成采购清单。</div><div class="form-actions">${button('再想想', 'close')}<button class="button primary" type="submit">确认，准备买菜</button></div></form>`,
  );
}
async function refresh(renderPage = true) {
  state = await api('/state');
  session = { setup: false, user: state.user };
  syncError = false;
  if (renderPage) render();
}
async function upload(file) {
  if (!file) return;
  uploadBusy = true;
  const hint = $('#upload-status');
  hint.textContent = '正在压缩照片…';
  try {
    if (file.size > 30 * 1024 * 1024) throw new Error('请选择小于 30MB 的照片');
    const url = URL.createObjectURL(file);
    let img;
    try {
      img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('无法读取这张照片。HEIC 格式请先转换为 JPG。'));
        i.src = url;
      });
    } finally {
      URL.revokeObjectURL(url);
    }
    const ratio = Math.min(1, 1600 / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * ratio);
    canvas.height = Math.round(img.height * ratio);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/jpeg', 0.82);
    if (data.length > 3800000) throw new Error('压缩后图片仍过大，请裁剪后重试');
    const result = await api('/images', 'POST', { data: data.split(',')[1] });
    uploadedImage = result.id;
    $('#upload-preview').src = `/api/images/${result.id}`;
    hint.textContent = '照片已准备好，保存菜谱后生效。';
  } catch (e) {
    hint.textContent = e.message;
    toast(e.message);
  } finally {
    uploadBusy = false;
  }
}
async function share(id) {
  const result = await api(`/share${id ? `?meal=${encodeURIComponent(id)}` : ''}`);
  openModal(
    '一起打开小厨房',
    `<div class="share-box">${result.svg}<p>${result.local ? '手机和这台 Mac 连接同一个 Wi-Fi，<br>用相机或微信扫一扫打开。' : '用相机或微信扫一扫，打开我们的小厨房。'}</p><input class="field-input" id="share-url" value="${escape(result.url)}" readonly aria-label="访问地址"><div style="margin-top:18px">${button('复制链接', 'copy-link', 'primary')}</div><p class="form-hint" style="margin-top:18px">${result.local ? '这是本地测试地址，Mac 和本地服务需要保持运行。<br>微信若限制局域网地址，请先在手机浏览器测试。<br>' : ' '}打开后仍需使用自己的账号登录。</p></div>`,
  );
}
async function clipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    toast('已复制');
  } else {
    openModal(
      '复制内容',
      `<p class="form-hint">长按或选中下面的内容复制。</p><textarea class="field-input" rows="9" readonly>${escape(value)}</textarea>`,
    );
    $('textarea', $('#modal')).select();
  }
}
async function handleAction(el) {
  const a = el.dataset.action,
    id = el.dataset.id;
  if (a === 'close') return closeModal();
  if (a === 'password') {
    const input = el.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    el.textContent = input.type === 'password' ? '显示' : '隐藏';
    return;
  }
  if (a === 'new-recipe') return recipeEditor();
  if (a === 'recipe') return recipeDetail(byId(id));
  if (a === 'snapshot') {
    const m = state.meals.find((m) => m.id === el.dataset.meal);
    return recipeDetail(m.finalPlan.find((p) => p.recipeId === id).recipe, true);
  }
  if (a === 'edit-recipe') {
    closeModal();
    return recipeEditor(byId(id));
  }
  if (a === 'delete-recipe') {
    const r = byId(id);
    openModal(
      '删除这道菜？',
      `<p>「${escape(r.name)}」将从菜谱和未确认的菜单中移除。已确认的菜单与采购清单会保留。</p><div class="form-actions">${button('保留这道菜', 'recipe', '', id)}${button('确认删除', 'delete-confirm', 'danger', id)}</div>`,
    );
    return;
  }
  if (a === 'delete-confirm') {
    await api(`/recipes/${id}`, 'DELETE', {});
    closeModal();
    await refresh();
    toast('已从菜谱中移除');
    return;
  }
  if (a === 'new-meal') return mealEditor();
  if (a === 'waiting') return toast('等掌勺的人发起一餐，就可以来点菜啦');
  if (a === 'filter') {
    category = id;
    render();
    return;
  }
  if (a === 'add-ingredient') {
    $('#ingredients-editor').insertAdjacentHTML('beforeend', ingredientRow());
    return;
  }
  if (a === 'remove-ingredient') {
    const rows = $$('.ingredient-edit');
    if (rows.length <= 1) return toast('至少保留一种食材');
    el.closest('.ingredient-edit').remove();
    return;
  }
  if (a === 'toggle-order') {
    const m = state.meals.find((m) => m.id === el.dataset.meal),
      d = draft(m);
    d.recipeIds = d.recipeIds.includes(id)
      ? d.recipeIds.filter((i) => i !== id)
      : [...d.recipeIds, id];
    d.dirty = true;
    render();
    return;
  }
  if (a === 'confirm-meal') return confirmEditor(state.meals.find((m) => m.id === id));
  if (a === 'reopen') {
    openModal(
      '重新调整菜单？',
      `<p>点菜记录会保留，采购勾选会重置。调整完后，需要重新确认菜单。</p><div class="form-actions">${button('先不调整', 'close')}${button('重新开放点菜', 'reopen-confirm', 'primary', id)}</div>`,
    );
    return;
  }
  if (a === 'reopen-confirm') {
    await api(`/meals/${id}/reopen`, 'POST', {});
    closeModal();
    drafts.delete(id);
    location.hash = `meals/${id}`;
    await refresh();
    toast('可以重新选菜了');
    return;
  }
  if (a === 'complete') {
    await api(`/meals/${id}/complete`, 'POST', {});
    await refresh();
    toast('这一餐完成了，好好吃饭 ♡');
    return;
  }
  if (a === 'check-shopping') {
    const meal = state.meals.find((m) => m.id === el.dataset.meal),
      item = meal.shopping.find((i) => i.key === id);
    await api(`/meals/${meal.id}/shopping`, 'PUT', {
      key: id,
      status: item.status === 'need' ? 'bought' : 'need',
    });
    await refresh();
    return;
  }
  if (a === 'copy-shopping') {
    const m = state.meals.find((m) => m.id === id);
    return clipboard(
      `${m.title} · ${m.date}\n\n${m.shopping.map((i) => `${i.status === 'need' ? '□' : i.status === 'have' ? '[家里有]' : '[已买]'} ${i.name} ${i.quantity === null ? '适量' : `${i.quantity} ${i.unit}`}`).join('\n')}`,
    );
  }
  if (a === 'print') return window.print();
  if (a === 'share') return share(id);
  if (a === 'copy-link') return clipboard($('#share-url').value);
  if (a === 'logout') {
    await api('/logout', 'POST', {});
    state = null;
    drafts.clear();
    session = { setup: false, user: null };
    renderAuth();
    return;
  }
}
document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  e.preventDefault();
  if (el.disabled) return;
  el.disabled = true;
  try {
    await handleAction(el);
  } catch (err) {
    toast(err.message);
  } finally {
    el.disabled = false;
  }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'recipe-search') {
    query = e.target.value;
    $('#recipe-grid').innerHTML = recipeCards();
  }
  if (e.target.id === 'order-note') {
    const m = currentMeal();
    const d = draft(m);
    d.note = e.target.value;
    d.dirty = true;
  }
});
document.addEventListener('change', async (e) => {
  if (e.target.id === 'recipe-image') await upload(e.target.files[0]);
  if (e.target.dataset.shopping) {
    try {
      await api(`/meals/${e.target.dataset.meal}/shopping`, 'PUT', {
        key: e.target.dataset.shopping,
        status: e.target.value,
      });
      await refresh();
    } catch (err) {
      toast(err.message);
    }
  }
});
document.addEventListener('submit', async (e) => {
  const form = e.target;
  e.preventDefault();
  if (loading) return;
  const submit = $('[type=submit]', form),
    error = $('.form-error', form);
  if (error) error.textContent = '';
  if (submit) submit.disabled = true;
  loading = true;
  try {
    const f = new FormData(form);
    if (form.id === 'auth-form') {
      if (form.dataset.mode === 'setup') {
        await api('/setup', 'POST', {
          chef: {
            username: f.get('chefUsername'),
            nickname: f.get('chefNickname'),
            password: f.get('chefPassword'),
          },
          partner: {
            username: f.get('partnerUsername'),
            nickname: f.get('partnerNickname'),
            password: f.get('partnerPassword'),
          },
          samples: f.has('samples'),
        });
      } else
        await api('/login', 'POST', { username: f.get('username'), password: f.get('password') });
      await refresh();
      toast('欢迎回到我们的小厨房');
    } else if (form.id === 'recipe-form') {
      if (uploadBusy) throw new Error('照片还在上传，请稍等一下');
      const ingredients = $$('.ingredient-edit', form).map((row) => ({
        name: $('[name=ingredientName]', row).value.trim(),
        quantity:
          $('[name=ingredientQuantity]', row).value === ''
            ? null
            : Number($('[name=ingredientQuantity]', row).value),
        unit: $('[name=ingredientUnit]', row).value,
      }));
      const data = {
        name: f.get('name'),
        category: f.get('category'),
        description: f.get('description'),
        servings: Number(f.get('servings')),
        minutes: Number(f.get('minutes')),
        steps: f
          .get('steps')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        notes: f.get('notes'),
        image: uploadedImage,
        art: form.dataset.art,
        ingredients,
      };
      await api(
        `/recipes${form.dataset.id ? `/${form.dataset.id}` : ''}`,
        form.dataset.id ? 'PUT' : 'POST',
        data,
      );
      closeModal();
      query = '';
      category = '全部菜品';
      await refresh();
      toast('又记下了一道好菜');
    } else if (form.id === 'meal-form') {
      const ids = f.getAll('recipe');
      if (!ids.length) throw new Error('请至少选择一道可以点的菜');
      const { meal } = await api('/meals', 'POST', {
        title: f.get('title'),
        date: f.get('date'),
        people: Number(f.get('people')),
        note: f.get('note'),
        recipeIds: ids,
      });
      closeModal();
      selectedMeal = meal.id;
      await refresh(false);
      location.hash = `meals/${meal.id}`;
      render();
      toast('这一餐安排好了，邀请对方来点菜吧');
    } else if (form.id === 'order-form') {
      const d = draft(state.meals.find((m) => m.id === form.dataset.id));
      await api(`/meals/${form.dataset.id}/order`, 'PUT', {
        recipeIds: d.recipeIds,
        note: f.get('note'),
      });
      drafts.delete(form.dataset.id);
      await refresh();
      toast('点菜已送到小厨房');
    } else if (form.id === 'confirm-form') {
      const plan = f
        .getAll('recipe')
        .map((id) => ({
          recipeId: id,
          multiplier: Number($(`[data-quantity="${CSS.escape(id)}"]`, form).value),
        }));
      if (!plan.length) throw new Error('请至少确认一道菜');
      await api(`/meals/${form.dataset.id}/confirm`, 'POST', { plan });
      const id = form.dataset.id;
      closeModal();
      await refresh(false);
      location.hash = `shopping/${id}`;
      render();
      toast('菜单确认好了，采购清单已准备好');
    }
  } catch (err) {
    if (error && error.isConnected) {
      error.textContent = err.message;
      error.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else toast(err.message);
  } finally {
    loading = false;
    if (submit) submit.disabled = false;
  }
});
window.addEventListener('hashchange', () => {
  selectedMeal = route().id || selectedMeal;
  if (state) {
    render();
    window.scrollTo({ top: 0 });
  }
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && state) poll();
});
async function poll() {
  if (
    !state ||
    loading ||
    $('#modal').open ||
    document.hidden ||
    document.activeElement?.matches('input,textarea,select')
  )
    return;
  try {
    await refresh();
  } catch {
    syncError = true;
    if (state) render();
  }
}
setInterval(poll, 10000);
try {
  session = await api('/session');
  if (session.user) await refresh();
  else renderAuth();
} catch {
  $('#app').innerHTML =
    '<div class="boot">暂时无法连接本地服务，请检查服务是否正在运行，再刷新页面。</div>';
}
