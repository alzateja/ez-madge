const get = require('lodash.get');

const buildConfig = (options) => {
  const fontSize = get(options, 'font') ? `${options.font}px` : '10px';
  const includeNpm = get(options, 'npm', false);
  const fileExtensions = get(options, 'fileExtensions', ['js', 'jsx', 'graphql']);
  const excludeRegExp = get(options, 'exclude', ['.*.test.jsx?$', '.scss$']);
  const verticalChart = get(options, 'vertical', false) ? 'TB' : 'LR';
  const levelDepth = get(options, 'depth', 3);
  const filteredExtensions = get(options, 'filteredExtension', ['jsx']);

  return {
    levelDepth,
    filteredExtensions,
    madge: {
      fontSize,
      // option to include npm packages in the diagram
      includeNpm,
      fileExtensions,
      // exclude test and scss from the mappings
      excludeRegExp,
      graphVizOptions: {
        G: {
          rankdir: verticalChart
        }
      }
    }
  };
};

module.exports = buildConfig;
