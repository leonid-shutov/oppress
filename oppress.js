'use strict';

const { loadRestApplication } = require('@leonid-shutov/loader');

const { Server } = require('./lib/server/server.js');

(async () => {
  const router = await loadRestApplication({ console });
  const server = new Server(router);
  server.start();
})();
