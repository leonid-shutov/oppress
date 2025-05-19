'use strict';

const { NotFoundError, AlreadyExistsError, ConstraintViolationError } = require('../errors.js');
const { ValidationError } = require('./request-validation.js');

const getStatus = (error) => {
  if (error instanceof ValidationError) return 400;
  if (error instanceof NotFoundError) return 404;
  if (error instanceof AlreadyExistsError) return 409;
  if (error instanceof ConstraintViolationError) return 422;
  return 500;
};

const handleError = (error, reply) => {
  const status = getStatus(error);
  const message = error instanceof ValidationError ? error.errors : error.message;
  return reply.status(status).send({ message });
};

module.exports = { handleError };
