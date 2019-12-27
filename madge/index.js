const { join, isEmpty } = require('rambda');
const get = require('lodash.get');
const buildConfig = require('./config');
const constructOrphanTree = require('./customCharts/orphanTree');
const getExtensionFilteredTree = require('./customCharts/filteredExtensions');
const getDepthTree = require('./customCharts/depthChart');
const createGraph = require('./utils/graphing');
const { parseEntryPoint } = require('../utils/path');
const { info } = require('../utils/logging');
const {
  getOrphanTree,
  getDependencyTree
} = require('./utils/trees');


const mapDependencies = async (target, diagramLocation, options) => {
  const { entryPoint, entryFile, sourceDirectory } = parseEntryPoint(target);
  const mappingOptions = buildConfig(options);
  const madgeOptions = get(mappingOptions, 'madge');

  const orphanTree = await getOrphanTree(sourceDirectory, madgeOptions)
    .then(constructOrphanTree);

  // Create orphans graph in the file
  if (isEmpty(orphanTree)) {
    info('___________________________________________________________________________');
    info('Orphan tree is empty. Skipping Madge generation of diagram.');
  }
  else {
    createGraph(orphanTree, madgeOptions, diagramLocation, 'orphans');
  }


  const dependencyTree = await getDependencyTree(entryPoint, madgeOptions);

  //  Graph the full tree out
  createGraph(dependencyTree, madgeOptions, diagramLocation, 'fullTree');

  //  Graph the tree depth
  const treeDepth = get(mappingOptions, 'levelDepth');
  const depthTree = getDepthTree(dependencyTree, entryFile, treeDepth);

  if (isEmpty(depthTree)) {
    info('___________________________________________________________________________');
    info('Depth tree is empty. Skipping Madge generation of diagram.');
  }
  else {
    createGraph(depthTree, madgeOptions, diagramLocation, `depthlevel-${treeDepth}`);
  }

  // Extension Only Tree - JSX
  const filteredExtensions = get(mappingOptions, 'filteredExtensions');
  const filteredTree = getExtensionFilteredTree(dependencyTree, filteredExtensions);
  if (isEmpty(filteredTree)) {
    info('___________________________________________________________________________');
    info('Extension tree is empty. Skipping Madge generation of diagram.');
  }
  else {
    const filteredText = join('+', filteredExtensions);
    createGraph(filteredTree, madgeOptions, diagramLocation, `filtered-${filteredText}`);
  }
};

module.exports = mapDependencies;
