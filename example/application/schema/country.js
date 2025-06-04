(() => {
  const entity = { id: 'string', code: { type: 'string', length: { min: 2, max: 2 } }, name: 'string' };
  const create = common.pick(entity, 'code', 'name');
  return { entity, create };
})();
