//@ts-check
// This module is available to all ejs templates
const utils = require('./src/utils');
const { BASE_URL } = require('./env');

module.exports = {
  BASE_URL,
  utils,
  staticPath: `${BASE_URL}/static`,
};