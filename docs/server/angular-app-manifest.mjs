
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
    'index.csr.html': {size: 1181, hash: 'ec588fda4537d17a17235ce1d8f3f8bcf1b4dc5d2d5519b452f4eb5c6be425dd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1694, hash: '2b51505c0236ade8ae8f12bab222f70ef689ce80cc42345cdb624b94dcf6d24f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 9153, hash: '55a4e5e5e6f17c5fd355e4d4951eab0c4f9fdd83b0c1857d3481bb912c9a38ff', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
