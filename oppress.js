'use strict';

const { loadRestApplication } = require('@leonid-shutov/loader');
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

class Server {
  constructor(router) {
    for (const [path, methods] of Object.entries(router)) {
      for (const [method, handler] of Object.entries(methods)) {
        fastify[method](`/api${path}`, async (request, reply) => {
          const { params, query, body, headers } = request;
          const { status, body: responseBody } = await handler({ path: params, query, body, headers });
          return reply.status(status).send(responseBody);
        });
      }
    }
  }

  async start(port = 3000) {
    await fastify.register(cors, {
      origin: (origin, cb) => {
        cb(null, true);
        return;
      },
    });
    await fastify.listen({ port, host: '0.0.0.0' });
  }
}

(async () => {
  console.time('Loading');
  const router = await loadRestApplication({ console, process });
  console.timeEnd('Loading');
  const server = new Server(router);
  server.start();
})();
