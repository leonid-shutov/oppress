'use strict';

const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { handleError } = require('./error-handling');
const { validateRequest } = require('./request-validation');

const loadApi = (definition) => {
  const schema = { query: definition.query, body: definition.body };
  return async ({ query, body, ...rest }) => {
    validateRequest(schema, { query, body });
    const response = await definition.handler({ query, body, ...rest });
    if (typeof definition.response === 'function') return definition.response(response);
    if (definition.response === undefined) return response;
    return definition.response;
  };
};

class Server {
  constructor(apis) {
    for (const api of apis) {
      for (const [path, methods] of Object.entries(api)) {
        for (const [method, definition] of Object.entries(methods)) {
          const handler = loadApi(definition);
          fastify[method](`/api${path}`, async (request, reply) => {
            const { params, query, body, headers } = request;
            try {
              return await handler({ params, query, body, headers });
            } catch (error) {
              handleError(error, reply);
            }
          });
        }
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
