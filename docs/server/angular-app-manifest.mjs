
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
    'index.csr.html': {size: 1181, hash: 'e8e209aac8cd31bc8b54865c4d393eca7a92ae3b3a3b0e44eac31a3641e38949', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1694, hash: 'db14e6e9449b5c80c9f8d7f1f19b903f5ab1bf513f0b5d01fff6e0b422d461fe', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8990, hash: 'c44c1645ccd480148d30d785020136d6d7e5b8ced76878ac17b806402ef8f7e0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
