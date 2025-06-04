({
  create: {
    description: 'Creating country',
    method: repository.country.create,
    expectedErrors: {
      COUNTRY_ALREADY_EXISTS: PASS,
    },
  },
  getByCode: {
    description: 'Getting country by code',
    method: async (code) => {
      const country = await repository.country.getByCode(code);
      if (country === null) throw NotFoundError.from('country', { meta: { code } });
      return country;
    },
    expectedErrors: { COUNTRY_NOT_FOUND: PASS },
  },
});
