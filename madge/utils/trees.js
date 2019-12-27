const madge = require('madge');

const getOrphanTree = (sourceDirectory, madgeOptions) => madge(sourceDirectory, madgeOptions)
  .then((res) => res.orphans());

const getDependencyTree = (sourceDirectory, madgeOptions) => madge(sourceDirectory, madgeOptions)
  .then((res) => res.obj());


module.exports = {
  getOrphanTree,
  getDependencyTree
};
