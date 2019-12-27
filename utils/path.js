const fileExists = require('file-exists');
const {
  isNil,
  split,
  dropLast,
  join,
  isEmpty,
  last
} = require('rambda');

const determineDefaultSaveDirectory = (targetFile) => {
  const splitFilePath = split('/', targetFile);
  const dropFileFromPath = dropLast(1, splitFilePath);
  const targetDirectory = isEmpty(dropFileFromPath) ? '.' : join('/', dropFileFromPath);
  return `${targetDirectory}/madgeDiagrams/`;
};

const determineDiagramSaveDirectory = (userOutputDirectory, targetFile) => (
  isNil(userOutputDirectory)
    ? determineDefaultSaveDirectory(targetFile)
    : userOutputDirectory
);


const checkIfTargetFileExists = async (targetFile) => {
  if (isNil(targetFile)) {
    return false;
  }
  return fileExists(targetFile)
    .then((exists) => exists);
};

const determineFilePath = (userFolderPath) => (userFolderPath || `${__dirname}/madgeDiagrams`);

const determineImageLocation = (
  userFolderPath = '',
  diagramName = 'madgeDiagram'
) => {
  const filepath = determineFilePath(userFolderPath);

  return `${filepath}/${diagramName}`;
};

const parseEntryPoint = (entryPoint) => {
  const splitFilePath = split('/', entryPoint);
  const entryFile = last(splitFilePath);
  const sourceDirectoryParts = dropLast(1, splitFilePath);
  const sourceDirectory = isEmpty(sourceDirectoryParts) ? '.' : join('/', sourceDirectoryParts);

  return {
    entryPoint,
    entryFile,
    sourceDirectory
  };
};

module.exports = {
  checkIfTargetFileExists,
  determineDiagramSaveDirectory,
  determineImageLocation,
  parseEntryPoint
};
