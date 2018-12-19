"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJobs = fetchJobs;
exports.generateBaseUrl = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const generateBaseUrl = companyName => `https://hire.withgoogle.com/v2/api/t/${companyName}/public/jobs`;

exports.generateBaseUrl = generateBaseUrl;

function fetchJobs(_x) {
  return _fetchJobs.apply(this, arguments);
}

function _fetchJobs() {
  _fetchJobs = _asyncToGenerator(function* (companyName) {
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
  return _fetchJobs.apply(this, arguments);
}