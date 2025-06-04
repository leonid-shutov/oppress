() => {
  db.pg = new npm.pg.Pool(config.db);
};
