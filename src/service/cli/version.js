'use strict';

const {version} = require(`../../../package.json`);

const printVersion = () => {
  console.log(version);
};

module.exports = {
  name: `--version`,
  run() {
    printVersion();
  }
};
