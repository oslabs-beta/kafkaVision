//import regeneratorRuntime from 'regenerator-runtime';
const regeneratorRuntime = require('regenerator-runtime');

module.exports = async (globalConfig) => {
  global.testServer.close();
};