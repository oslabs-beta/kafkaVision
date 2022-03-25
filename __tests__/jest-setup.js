import regeneratorRuntime from "regenerator-runtime";
import server from '../dist/server.js';

export default () => { global.testServer = server;};