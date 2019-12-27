const get = require('lodash.get');
const { type } = require('rambda');
const { warn } = require('../utils/logging');

const isValidInteger = (value) => type(value) === 'Number' && Number.isInteger(value);

const showInvalidFlagInput = (cliInput) => {
  warn('WARNING - You provided an invalid flag');
  return cliInput.showHelp();
};

const checkInputs = (cliInput) => {
  const userInput = get(cliInput, 'input', []);

  // Check for extraneous arguments
  if (userInput.length !== 1) {
    warn('WARNING - You provided the wrong number of arguments. Please provide just one.');
    cliInput.showHelp();
  }

  const userFlags = get(cliInput, 'flags');

  // check depth level user flag for valid number input
  const depthFlags = get(userFlags, 'depth');
  const depthFlagValidationError = !isValidInteger(depthFlags);
  if (depthFlagValidationError) {
    showInvalidFlagInput(cliInput);
  }

  // check font size user flag for valid number input
  const fontFlags = get(userFlags, 'font');
  const fontFlagValidationError = !isValidInteger(fontFlags);
  if (fontFlagValidationError) {
    showInvalidFlagInput(cliInput);
  }
};

module.exports = checkInputs;
