#!/usr/bin/env node

const get = require('lodash.get');
const meow = require('meow');
const checkInputs = require('./validation');
const mapDependencies = require('../madge');
const { evaluateSaveDirectory } = require('../utils/fs');
const {
  checkIfTargetFileExists,
  determineDiagramSaveDirectory
} = require('../utils/path');
const {
  error,
  success,
  info
} = require('../utils/logging');


const cli = meow(`
  Usage
    $ ez-madge <target>

  Options
    --depth, -d  Determine levels of depth
    --output, -o  Determine an output location
    --font, -f  Change fontSize
    --vertical, -v  Graph vertical tree

  Examples
  $ ez-madge myApp/src/index.js -d=4

`, {
  booleanDefault: undefined,
  flags: {
    depth: {
      type: 'number',
      default: 3,
      alias: 'd'
    },
    font: {
      type: 'number',
      default: 10,
      alias: 'f'
    },
    output: {
      type: 'string',
      alias: 'o'
    },
    vertical: {
      type: 'boolean',
      alias: 'v'
    }
  }
});

const evaluateCliArgs = async (cliInput) => {
  await checkInputs(cliInput);

  const targetFile = cliInput.input[0];

  const doesTargetFileExist = await checkIfTargetFileExists(targetFile);

  if (!doesTargetFileExist) {
    error('Error. You must enter a valid entry point to target!');
    info('Try targeting the entry point to your app');
    info('Ex - ez-madge ./myfile.js');
    return;
  }

  const userOutputDirectory = get(cliInput, 'flags.output');

  const diagramSaveDirectory = determineDiagramSaveDirectory(userOutputDirectory, targetFile);

  await evaluateSaveDirectory(diagramSaveDirectory);

  const options = {
    font: get(cliInput, 'flags.font', 10),
    depth: get(cliInput, 'flags.depth', 3),
    vertical: get(cliInput, 'flags.vertical', false)
  };

  await mapDependencies(targetFile, diagramSaveDirectory, options);

  info('___________________________________________________________________________');
  info('INFO - if you passed a vertical flag of true (and diagrams are not). Check your args.');
  info('Example: -v=true or -v');
};

evaluateCliArgs(cli).then(
  () => success('You should be all set!!!')
);
