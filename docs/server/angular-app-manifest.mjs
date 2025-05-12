
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/wap_ai_agent/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/wap_ai_agent"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1181, hash: '78b39ccfd7d147ad108f0becc58a02e75566279f2cc0c0f0f8b5e5c9ea3a5082', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1694, hash: '0bf05e9c82f84620fab2a97eee22703577fa12e831aaa437c653eb123cee7014', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 9310, hash: '5adce83f2c9bbdbd9a8e8764c792004f1f43d54e6f0717926481250aa4f2b50c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
