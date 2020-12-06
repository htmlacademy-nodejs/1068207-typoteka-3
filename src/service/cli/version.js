'use strict';

const {getLogger} = require(`../utils/logger`);
const {version} = require(`../../../package.json`);

const logger = getLogger({name: `api`});

const printVersion = () => {
  logger.info(version);
};

module.exports = {
  name: `--version`,
  run() {
    printVersion();
  }
};
