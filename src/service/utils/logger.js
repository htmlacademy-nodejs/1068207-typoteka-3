'use strict';

require(`dotenv`).config();

const pino = require(`pino`);
const isDevelopment = process.env.NODE_ENV === `development`;
const defaultLogLevel = isDevelopment ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevelopment
}, isDevelopment ? process.stdout : pino.destination(`./logs/api`));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
