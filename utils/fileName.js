const { split } = require('rambda');

const getFileNameExtension = (fileName = '') => split('.', fileName)[1];

module.exports = getFileNameExtension;
