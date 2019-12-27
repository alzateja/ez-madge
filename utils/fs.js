const fs = require('fs');
const {
  warn,
  error,
  success
} = require('./logging');


const makeSaveDirectory = (diagramSaveDirectory) => fs.mkdir(diagramSaveDirectory,
  { recursive: true },
  ((err) => {
    if (err) {
      error('ERROR creating a directory to output images. Please check the path');
    }
  }));


const evaluateSaveDirectory = async (diagramSaveDirectory) => fs.access(
  diagramSaveDirectory,
  fs.constants.F_OK,
  (err) => {
    if (err) {
      warn('Folder not found. Creating a directory');
      makeSaveDirectory(diagramSaveDirectory);
      success('Output directory successfully created!');
    }
    else {
      success('YAY. Output directory successfully found');
    }

    return success('Creating diagrams');
  }


);


module.exports = { evaluateSaveDirectory };
