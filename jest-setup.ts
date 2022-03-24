import regeneratorRuntime from 'regenerator-runtime';
//const regeneratorRuntime = require('regenerator-runtime');
import * as server from './dist/server.js';

// module.exports = () => {
//   global.testServer = server;
// };

declare global {
  var testServer: any;
}

export default () => global.testServer = server;