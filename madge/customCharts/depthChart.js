const {
  toPairs,
  flatten,
  concat,
  pick,
  pipe
} = require('rambda');

const convertToArrayAndFlatten = pipe(
  toPairs,
  flatten
);

const evaluateLevelEntries = (tree) => (entries) => {
  const pickEntryValues = pick(entries, tree);
  return convertToArrayAndFlatten(pickEntryValues);
};

const getDepthTree = (tree, entryPoint, depth = 1) => {
  let list = [];
  // this should return the initial entry point and its dependencies, if only one level deep
  const firstLevel = pick(entryPoint, tree);

  if (depth === 1) {
    return firstLevel;
  }

  // we only need to convert the first level values to pairs and flatten to get our second level
  list = convertToArrayAndFlatten(firstLevel);

  if (depth === 2) {
    return pick(list, tree);
  }

  // if it has not exited by now, we have more iterations that we need to run through
  const remainingDepth = depth - 2;

  // This array is a timer for our remaining iterations
  const depthArray = Array(remainingDepth).fill(null);


  const evaluateLevel = evaluateLevelEntries(tree);

  depthArray.forEach(() => {
    const evaluatedLevel = evaluateLevel(list);
    list = concat(evaluatedLevel)(list);
  });

  return pick(list, tree);
};


module.exports = getDepthTree;
