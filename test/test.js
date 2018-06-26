"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _gatsbyNode = require("../gatsby-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const TEST_COMPANY = 'dromae';
const TEST_COMPANY_THAT_DOESNT_EXIST = 'REIMERTZ_YOLO_COMPANY_1337';
(0, _ava.default)(`generateBaseUrl(${TEST_COMPANY}) should output https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`, t => {
  t.is((0, _gatsbyNode.generateBaseUrl)(TEST_COMPANY), `https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`);
});
(0, _ava.default)(`getJobs(${TEST_COMPANY}) should return .. jobs :)`,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (t) {
    const jobs = yield (0, _gatsbyNode.getJobs)(TEST_COMPANY);
    t.snapshot(jobs);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
(0, _ava.default)('getJobs() should return an error',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (t) {
    const error = yield t.throws((0, _gatsbyNode.getJobs)());
    t.is(error.message, 'You need to define companyName in gatsby-config.js.');
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
(0, _ava.default)(`getJobs(${TEST_COMPANY_THAT_DOESNT_EXIST}) should return an error`,
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (t) {
    const error = yield t.throws((0, _gatsbyNode.getJobs)(TEST_COMPANY_THAT_DOESNT_EXIST));
    t.is(error.message, `Couldn't fetch jobs for ${TEST_COMPANY_THAT_DOESNT_EXIST}. You sure ${(0, _gatsbyNode.generateBaseUrl)(TEST_COMPANY_THAT_DOESNT_EXIST)} exists?`);
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());