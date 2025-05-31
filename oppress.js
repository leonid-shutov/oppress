'use strict';

const { loadApplication } = require('@leonid-shutov/loader');

const { Server } = require('./lib/server/server.js');

(async () => {
  const sandbox = await loadApplication({ console });
  const apis = Object.values(sandbox.api);
  const server = new Server(apis);
  server.start();
})();
