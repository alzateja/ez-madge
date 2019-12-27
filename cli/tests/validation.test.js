const checkInputs = require('../validation');
const { warn } = require('../../utils/logging');

jest.mock('../../utils/logging', () => ({
  warn: jest.fn()
}));

describe('checkInputs function', () => {
  let cliInput;

  beforeEach(() => {
    cliInput = {
      input: [],
      flags: {},
      showHelp: jest.fn()
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('check user arguments', () => {
    test('If passed no input, it should call the showHelp method', () => {
      checkInputs(cliInput);
      expect(cliInput.showHelp).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    test('If passed multiple inputs, it should call the showHelp method and warn the user', () => {
      cliInput.input = ['index.js', 'secondArg'];
      checkInputs(cliInput);
      expect(cliInput.showHelp).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledTimes(1);
    });

    test('If passed exactly one input, it should not call the showHelp method or warn the user', () => {
      cliInput.input = ['index.js'];
      checkInputs(cliInput);
      expect(cliInput.showHelp).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('check user arguments', () => {
    beforeEach(() => {
      cliInput.input = ['index.js'];
    });

    describe('check user depth flags', () => {
      test('If passed a depth flag that is not a number, it should not call the showHelp method or warn the user', () => {
        cliInput.flags = { depth: '234' };
        checkInputs(cliInput);
        expect(cliInput.showHelp).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledTimes(1);
      });

      test('If passed a depth flag that is a number, it should not call the showHelp method or warn the user', () => {
        cliInput.flags = { depth: 123 };
        cliInput.input = ['index.js'];
        checkInputs(cliInput);
        expect(cliInput.showHelp).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
      });
    });

    describe('check user font flags', () => {
      test('If passed a font flag that is not a number, it should not call the showHelp method or warn the user', () => {
        cliInput.flags = { font: '234' };
        checkInputs(cliInput);
        expect(cliInput.showHelp).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledTimes(1);
      });

      test('If passed a font flag that is a number, it should not call the showHelp method or warn the user', () => {
        cliInput.flags = { font: 123 };
        cliInput.input = ['index.js'];
        checkInputs(cliInput);
        expect(cliInput.showHelp).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
      });
    });
  });
});
