const path = require("path");
const rootPath = path.join(__dirname, '../..');
const staticPath = path.join(rootPath, 'static');
const viewsPath = path.join(rootPath, 'src/views');

module.exports = { rootPath, staticPath, viewsPath };
