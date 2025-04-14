
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
    'index.csr.html': {size: 1181, hash: 'b002ab7145f2c1225e559a91797f173441ee9d16d5e56f61b746340a6c1344a2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1694, hash: '6c50613d93c04d7e546174f05b52be9c21e97eb8049f091380cadda0e365490a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 9124, hash: '902e5b11ac176fea4095be27c1488a4fb04b4d585fd2dc7316233aa2865f76d7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
