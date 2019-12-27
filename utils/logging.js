const chalk = require('chalk');

const { log } = console;

const error = (message) => log(chalk.red(message));
const warn = (message) => log(chalk.yellow(message));
const success = (message) => log(chalk.green(message));
const info = (message) => log(chalk.magenta(message));

module.exports = {
  log,
  error,
  warn,
  success,
  info
};
