'use strict';

const {DEFAULT_COMMAND, ExitCode, USER_ARGV_INDEX} = require(`./utils/_constants`);

const {Cli} = require(`./cli`);

const userParams = process.argv.slice(USER_ARGV_INDEX);

const [userCommand] = userParams;

if (userParams.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userParams.slice(1));
