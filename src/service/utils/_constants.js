'use strict';

const DATE_OBJECT = new Date();

module.exports.DEFAULT_COMMAND = `--help`;

module.exports.USER_ARGV_INDEX = 2;

module.exports.ExitCode = {
  error: 1,
  success: 0,
};

module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

module.exports.API_PREFIX = `/api`;

module.exports.MAX_ID_LENGTH = 6;

module.exports.PictureRestrict = {
  MIN: 1,
  MAX: 16
};

module.exports.DEFAULT_COUNT = 1;
module.exports.DATE_OBJECT = new Date();
module.exports.CURRENT_MONTH = DATE_OBJECT.getMonth();
module.exports.CURRENT_YEAR = DATE_OBJECT.getFullYear();
module.exports.DATES_PERIOD = 2;
module.exports.MAX_PUBLICATIONS_COUNT = 1000;
module.exports.MAX_ANNOUNCE_SENTENCES_COUNT = 5;

module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

