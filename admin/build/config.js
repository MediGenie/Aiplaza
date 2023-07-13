var path = require('path');

var root = path.join(__dirname);

var config = {
  rootDir: root,
  srcDir: path.join(root, '../src'),
  serveDir: path.join(root, '../.serve'),
  distDir: path.join(__dirname, '../../server/public/admin'),
  srcHtmlLayout: path.join(root, '../src/@core', 'index.html'),
  scssIncludes: [],
  title: 'AI Plaza 관리자 페이지',
  favicon: path.join(__dirname, './favicon.ico'),
  node_modules: path.join(root, '../node_modules'),
};

module.exports = config;
