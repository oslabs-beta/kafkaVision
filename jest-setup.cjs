const regeneratorRuntime = require('regenerator-runtime');
const server = 'http://localhost:3333';

module.exports = () => {
  global.testServer = server;
};