"use strict";

var _crypto = _interopRequireDefault(require("crypto"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const jobSelector = 'a.bb-public-jobs-list__job-item-title.ptor-jobs-list__item-job-title';
const BASE_URL = 'https://hire.withgoogle.com/public/jobs/';
const jobTitleSelector = '.bb-jobs-posting__job-title.ptor-job-view-title';
const jobDepartmentSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-department';
const jobLocationSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-location';
const jobContentSelector = '.bb-rich-text-editor__content.ptor-job-view-description';

function getJob(_x, _x2) {
  return _getJob.apply(this, arguments);
}

function _getJob() {
  _getJob = _asyncToGenerator(function* (jobUrl, {
    replaceDivs
  }) {
    const response = yield _axios.default.get(jobUrl);

    const $ = _cheerio.default.load(response.data);

    const content = $(jobContentSelector).html();
    return {
      id: jobUrl.split('/').pop(),
      url: jobUrl,
      title: $(jobTitleSelector).text(),
      department: $(jobDepartmentSelector).text(),
      location: $(jobLocationSelector).text(),
      content: replaceDivs ? content.replace(/div>/g, 'p>') : content
    };
  });
  return _getJob.apply(this, arguments);
}

function getJobs(_x3) {
  return _getJobs.apply(this, arguments);
}

function _getJobs() {
  _getJobs = _asyncToGenerator(function* ({
    companyName,
    replaceDivs = true
  }) {
    const response = yield _axios.default.get(`${BASE_URL}${companyName}`);

    const $ = _cheerio.default.load(response.data);

    const jobLinks = $(jobSelector).map((i, elm) => {
      return $(elm).attr('href');
    }).get();
    return yield Promise.all(jobLinks.map(l => getJob(link, {
      replaceDivs
    })));
  });
  return _getJobs.apply(this, arguments);
}

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* ({
    boundActionCreators
  }, options) {
    const createNode = boundActionCreators.createNode;
    const jobs = yield getJobs(options);
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

  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();