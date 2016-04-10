'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = require('assert');

var log = function log(value) {
  return console.log(JSON.stringify(value, null, '  '));
};

var testPass = function testPass(propType, value) {
  assert.equal(null, propType({ testProp: value }, 'testProp'));
};

var testFail = function testFail(propType, value) {
  assert.equal(true, propType({ testProp: value }, 'testProp') instanceof Error);
};

describe('PropTypes', function () {
  it('should successfully parse and return valid propTypes.', function () {
    var Message = function Message() {
      _classCallCheck(this, Message);
    };

    var propTypes = (0, _index2.default)(_react.PropTypes, {
      Message: Message
    })('{\n      number: Number\n      string: String!\n      boolean: Boolean\n      function: Function!\n      date: Date!\n      object: Object!\n      shape: {\n        nested: Number\n        array: [Number]\n        must: Boolean!\n      }!\n      array: [Number!]!\n      arrayOfObjects: [{\n        value: String\n      }!]\n      node: Node\n      element: Element!\n      message: Message!\n      any: Any!\n    }');

    assert.equal(propTypes.number, _react.PropTypes.number);

    assert.equal(propTypes.string, _react.PropTypes.string.isRequired);

    assert.equal(propTypes.boolean, _react.PropTypes.bool);

    assert.equal(propTypes.function, _react.PropTypes.func.isRequired);

    testPass(propTypes.date, new Date());
    testFail(propTypes.date, null);
    testFail(propTypes.date, Date);
    testFail(propTypes.date, 1);

    assert.equal(propTypes.object, _react.PropTypes.object.isRequired);

    testPass(propTypes.shape, {
      nested: 3,
      array: [1, 2],
      must: true
    });
    testPass(propTypes.shape, {
      nested: null,
      array: [null, 3],
      must: false
    });
    testPass(propTypes.shape, {
      nested: null,
      array: null,
      must: false
    });
    testFail(propTypes.shape, {
      nested: '3',
      array: null,
      must: false
    });
    testFail(propTypes.shape, {
      nested: 3,
      array: ['3'],
      must: false
    });
    testFail(propTypes.shape, null);

    testPass(propTypes.array, [3]);
    testPass(propTypes.array, []);
    testFail(propTypes.array, null);
    testFail(propTypes.array, [null]);
    testFail(propTypes.array, [3, '3']);

    testPass(propTypes.arrayOfObjects, [{ value: '' }]);
    testPass(propTypes.arrayOfObjects, [{ value: '', a: 3 }]);
    testPass(propTypes.arrayOfObjects, [{ value: null }]);
    testPass(propTypes.arrayOfObjects, [{}]);
    testPass(propTypes.arrayOfObjects, null);
    testFail(propTypes.arrayOfObjects, [null]);

    assert.equal(propTypes.node, _react.PropTypes.node);
    assert.equal(propTypes.element, _react.PropTypes.element.isRequired);

    testPass(propTypes.message, new Message());
    testFail(propTypes.message, null);
    testFail(propTypes.message, Message);
    testFail(propTypes.message, new Date());

    assert.equal(propTypes.any, _react.PropTypes.any.isRequired);
  });
});