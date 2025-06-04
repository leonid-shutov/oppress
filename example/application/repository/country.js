({
  create: {
    method: ({ code, name }) =>
      db.pg.query(`INSERT INTO "public"."Country" (code, name) VALUES ($1, $2)`, [code, name]),
    expectedErrors: {
      23505: AlreadyExistsError.from('country'),
    },
  },
  getByCode: async (code) =>
    (await db.pg.query(`SELECT * FROM "public"."Country" WHERE code = $1`, [code])).rows[0] ?? null,
});
