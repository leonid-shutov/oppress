'use strict';

const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

class Server {
  constructor(router) {
    for (const [path, methods] of Object.entries(router)) {
      for (const [method, handler] of Object.entries(methods)) {
        fastify[method](`/api${path}`, async (request, reply) => {
          const { params, query, body, headers } = request;
          try {
            return await handler({ path: params, query, body, headers });
          } catch (error) {
            handleError(error, reply);
          }
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
    await fastify.listen({ port });
  }
}

module.exports = { Server };
