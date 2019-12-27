const madge = require('madge');
const { determineImageLocation } = require('../../utils/path');

const createGraph = (tree, config, userFolderPath, fileName) => {
  const imageLocation = determineImageLocation(userFolderPath, fileName);

  madge(tree, config)
    .then((res) => res.image(`${imageLocation}.png`));
};

module.exports = createGraph;
