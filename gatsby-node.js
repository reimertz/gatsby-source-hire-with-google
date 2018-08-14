"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobs = getJobs;
exports.sourceNodes = sourceNodes;
exports.generateBaseUrl = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const generateBaseUrl = companyName => `https://hire.withgoogle.com/v2/api/t/${companyName}/public/jobs`;

exports.generateBaseUrl = generateBaseUrl;

function getJobs(_x) {
  return _getJobs.apply(this, arguments);
}

function _getJobs() {
  _getJobs = _asyncToGenerator(function* (companyName) {
    if (!companyName) throw new Error('You need to define companyName in gatsby-config.js.');

    try {
      const URL = generateBaseUrl(companyName);

      const _ref = yield _axios.default.get(URL, {
        maxRedirects: 0,
        validateStatus: status => status >= 200 && status < 300 || status === 404
      }),
            data = _ref.data,
            status = _ref.status;

      if (status === 404) {
        return [];
      } else return data.map(j => {
        return _objectSpread({
          id: j.identifier.value
        }, j);
      });
    } catch (e) {
      throw new Error(`Couldn't fetch jobs for ${companyName}. You sure ${generateBaseUrl(companyName)} exists?`);
    }
  });
  return _getJobs.apply(this, arguments);
}

function sourceNodes(_x2, _x3) {
  return _sourceNodes.apply(this, arguments);
}

function _sourceNodes() {
  _sourceNodes = _asyncToGenerator(function* ({
    boundActionCreators
  }, {
    companyName
  }) {
    const createNode = boundActionCreators.createNode;
    const jobs = yield getJobs(companyName);
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