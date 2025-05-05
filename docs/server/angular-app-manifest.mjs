
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/[repo-name]/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/[repo-name]"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1180, hash: 'aa8ef0f7029606899f41b749b0ba25d8d1f23282e24bfdf015959b38e87edcc6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1693, hash: '396839d168f76f3db8ad6a86960962abc66a3f67ffa28fd780b8a1e5aed0a708', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 8997, hash: '80d6efe0f2c2f3ddc91142280b83e1c123cbcad6bf7bbf46aa3c71e8b726bdd3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
