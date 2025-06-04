({
  '/countries': {
    post: {
      body: schema.country.create,
      handler: ({ body }) => service.country.create(body),
      status: 201,
      response: null,
    },
  },
  '/countries/:code': {
    get: {
      handler: ({ path }) => service.country.getByCode(path.code),
    },
  },
});
