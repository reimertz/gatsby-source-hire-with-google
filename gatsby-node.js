"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = sourceNodes;

var _crypto = _interopRequireDefault(require("crypto"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function sourceNodes(_x, _x2) {
  return _sourceNodes.apply(this, arguments);
}

function _sourceNodes() {
  _sourceNodes = _asyncToGenerator(function* ({
    boundActionCreators
  }, {
    companyName
  }) {
    const createNode = boundActionCreators.createNode;
    const jobs = yield (0, _helpers.fetchJobs)(companyName);
    jobs.forEach(job => {
      const jsonString = JSON.stringify(job);

      const gatsbyNode = _objectSpread({}, job, {
        parent: '__SOURCE__',
        children: [],
        internal: {
          type: 'hireWithGoogleJob',
          content: jsonString,
          contentDigest: _crypto.default.createHash('md5').update(jsonString).digest('hex')
        }
      });

      createNode(gatsbyNode);
    });
  });
  return _sourceNodes.apply(this, arguments);
}