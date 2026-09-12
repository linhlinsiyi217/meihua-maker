/* ============================================================
 * 美化小叽 Service Worker · v1.1
 * 策略:应用壳离线优先 / 页面网络优先断网回退 / 跨域(AI API)直通
 * AI 对话、表情图床上传等 POST/非 GET 请求一律不拦截
 * ============================================================ */
const CACHE = 'meihua-v1.1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  'assets/icon-192.png',
  'assets/icon-512.png'
];
/* 用户提供的原图启动图(图床),no-cors 预热缓存;失败静默,不影响安装 */
const SPLASH_IMAGE = 'https://img2.tofaka.com/autoupload/fr/Zy9nZr8qknZ0w4NQ-30sTrs9etjV1KKV501BnyUAd0Oyl5f0KlZfm6UsKj-HyTuv/20260912/6YjW/1440X1440/%E6%97%A0%E6%A0%87%E9%A2%9885_20260909171017.png/webp';
/* 仅此域名允许网络优先+离线兜底,其余跨域(AI API)全部直通 */
const IMG_HOSTS = ['tofaka.com'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled([
      cache.addAll(SHELL),
      cache.add(new Request(SPLASH_IMAGE, { mode: 'no-cors' }))
    ]);
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  /* 非 GET(AI 对话 POST、预检 OPTIONS 等)完全直通,不进缓存 */
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* 跨域请求:默认完全直通;仅图床做"网络优先,断网回缓存" */
  if (url.origin !== location.origin) {
    if (IMG_HOSTS.some(h => url.hostname === h || url.hostname.endsWith('.' + h))) {
      e.respondWith(fetch(req).catch(() => caches.match(req)));
    }
    return;
  }

  /* 同源导航请求:网络优先(保证更新即时),失败回退缓存壳 */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
        return res;
      } catch (_) {
        const cached = await caches.match('./index.html');
        return cached || new Response('离线状态且无缓存', { status: 503 });
      }
    })());
    return;
  }

  /* 同源静态资源:缓存优先,缺失再走网络 */
  e.respondWith((async () => {
    const cached = await caches.match(req);
    return cached || fetch(req);
  })());
});
