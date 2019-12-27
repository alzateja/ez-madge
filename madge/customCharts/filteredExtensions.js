const fromEntries = require('fromentries');
const {
  reduce,
  filter,
  includes,
  isEmpty
} = require('rambda');
const getFileNameExtension = require('../../utils/fileName');

const getFileKeys = (tree) => Object.entries(tree);

const getParentNode = (nodeEntry) => nodeEntry[0];

const getDependencyNode = (nodeEntry) => nodeEntry[1];

const checkFileNameExtensions = (allowedFileTypes, fileName) => includes(
  allowedFileTypes,
  getFileNameExtension(fileName)
);

const getExtensionFilteredTree = (rawTree, allowedFileTypes) => {
  // Define reducer function
  const filterFileBasedOnFileExtension = (accumulator, node) => {
    const parentNode = getParentNode(node);

    if (checkFileNameExtensions(allowedFileTypes, parentNode)) {
      const dependentNode = getDependencyNode(node);
      let filteredDependencies = [];

      const dependencyIsNotEmpty = !isEmpty(dependentNode);

      if (dependencyIsNotEmpty) {
        filteredDependencies = filter(
          (fileName) => checkFileNameExtensions(allowedFileTypes, fileName),
          dependentNode
        );
      }

      accumulator.push([parentNode, filteredDependencies]);
    }
    return accumulator;
  };

  const fileKeys = getFileKeys(rawTree);
  const filteredTree = reduce(filterFileBasedOnFileExtension, [], fileKeys);
  return fromEntries(filteredTree);
};

module.exports = getExtensionFilteredTree;
