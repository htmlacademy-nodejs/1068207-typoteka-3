'use strict';

const chalk = require(`chalk`);
const {version} = require(`../../../package.json`);

const printVersion = () => {
  console.log(chalk.blue(version));
};

module.exports = {
  name: `--version`,
  run() {
    printVersion();
  }
};
