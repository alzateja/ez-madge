const fromEntries = require('fromentries');
const { map } = require('rambda');

const constructOrphanEntries = (orphan) => [orphan, []];

const constructOrphanTree = (orphans) => {
  const orphanTreeNodes = map(constructOrphanEntries, orphans);
  return fromEntries(orphanTreeNodes);
};

module.exports = constructOrphanTree;
