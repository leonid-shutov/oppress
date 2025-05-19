'use strict';

const vm = require('node:vm');
const fsp = require('node:fs').promises;
const path = require('node:path');

const errors = require('./lib/errors.js');
const { loadDir } = require('./lib/loader.js');
const { Server } = require('./lib/server/server.js');

const PATH = process.cwd();

const readLayers = () =>
  fsp.readFile('.layers', 'utf8').then((data) => data.split(/[\r\n\s]+/).filter((s) => s.length !== 0));

(async () => {
  const sandbox = { console, ...errors };
  const context = vm.createContext(sandbox);
  const load = loadDir.bind(undefined, context, context);
  const applicationPath = path.join(PATH, 'application');
  for (const layer of await readLayers()) await load(path.join(applicationPath, layer));
  const apis = Object.values(sandbox.api);
  const server = new Server(apis);
  server.start();
})();
