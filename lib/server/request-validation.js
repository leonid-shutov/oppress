'use strict';

const { Schema } = require('metaschema');

class ValidationError extends AggregateError {}

const validateRequest = (schema = {}, { query, body }) => {
  const validationErrors = [];
  if (schema.query !== undefined) {
    const { errors } = Schema.from(schema.query).check(query);
    validationErrors.push(...errors);
  }
  if (schema.body !== undefined) {
    const { errors } = Schema.from(schema.body).check(body);
    validationErrors.push(...errors);
  }
  if (validationErrors.length > 0) throw new ValidationError(validationErrors);
};

module.exports = { ValidationError, validateRequest };
