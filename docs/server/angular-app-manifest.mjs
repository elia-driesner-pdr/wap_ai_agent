
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
    'index.csr.html': {size: 1181, hash: '9d48b97c0141c0acce8fee74ebf6a0951d1236113dc9ab62d1d62745e4995108', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1694, hash: '868c64d96896bef9d9d71e333e95b58b1ce20dd0712ad49d95c729b380d7a0fa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 9153, hash: 'dc79c1a506802920561904faf83bcb3ac3f793c84b2bbf05c6bafe5071c7fb35', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
