// 修改這裡指向你的 Railway 部署網址
const API_BASE = 'https://wule-line-manager-production.up.railway.app';

const CATEGORIES = {
  trial_class: { label: '體驗課', color: '#6c5ce7' },
  adult_class: { label: '成人課程', color: '#0984e3' },
  kids_boxing: { label: '兒童拳擊', color: '#00b894' },
  camp: { label: '寒暑假營隊', color: '#fd79a8' },
  senior_class: { label: '樂齡課程', color: '#00a8a8' },
  afterschool: { label: '課後才藝班', color: '#fdcb6e' },
  payment: { label: '付款問題', color: '#e17055' },
  leave: { label: '請假', color: '#81ecec' },
  refund: { label: '退費', color: '#d63031' },
  complaint: { label: '客訴', color: '#b2bec3' },
  renewal: { label: '續購', color: '#55efc4' },
  follow_up: { label: '未成交追蹤', color: '#a29bfe' },
  general_inquiry: { label: '一般詢問', color: '#74b9ff' },
  other: { label: '其他', color: '#dfe6e9' },
};

const STATUSES = {
  new: { label: '未處理', color: '#d63031' },
  reading: { label: '閱讀中', color: '#e17055' },
  replied: { label: '已回覆', color: '#00b894' },
  done: { label: '已結案', color: '#b2bec3' },
  follow_up: { label: '待追蹤', color: '#fdcb6e' },
};

function getToken() {
  return localStorage.getItem('admin_token') || '';
}

function setToken(t) {
  localStorage.setItem('admin_token', t);
}

async function api(method, path, body) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    window.location.href = 'login.html';
    return;
  }

  return res.json();
}

function checkAuth() {
  if (['localhost', '127.0.0.1'].includes(window.location.hostname)) return;
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}

function formatTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function categoryBadge(cat) {
  const c = CATEGORIES[cat] || CATEGORIES.other;
  return `<span class="badge" style="background:${c.color}20;color:${c.color};border:1px solid ${c.color}40">${c.label}</span>`;
}

function statusBadge(st) {
  const s = STATUSES[st] || STATUSES.new;
  return `<span class="badge" style="background:${s.color}20;color:${s.color};border:1px solid ${s.color}40">${s.label}</span>`;
}
