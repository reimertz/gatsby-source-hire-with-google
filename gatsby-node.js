'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let getJob = (() => {
		var _ref = _asyncToGenerator(function* (jobUrl) {
				const response = yield _axios2.default.get(jobUrl);
				const $ = _cheerio2.default.load(response.data);

				return {
						id: jobUrl,
						url: jobUrl,
						title: $(jobTitleSelector).text(),
						department: $(jobDepartmentSelector).text(),
						location: $(jobLocationSelector).text(),
						content: $(jobContentSelector).html()
				};
		});

		return function getJob(_x) {
				return _ref.apply(this, arguments);
		};
})();

let getJobs = (() => {
		var _ref2 = _asyncToGenerator(function* (companyName) {
				const response = yield _axios2.default.get(`${BASE_URL}${companyName}`);
				const $ = _cheerio2.default.load(response.data);
				const jobLinks = $(jobSelector).map(function (i, elm) {
						return $(elm).attr('href');
				}).get();

				return yield Promise.all(jobLinks.map(function (l) {
						return getJob(l);
				}));
		});

		return function getJobs(_x2) {
				return _ref2.apply(this, arguments);
		};
})();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const jobSelector = 'a.bb-public-jobs-list__job-item-title.ptor-jobs-list__item-job-title';
const BASE_URL = 'https://hire.withgoogle.com/public/jobs/';

const jobTitleSelector = '.bb-jobs-posting__job-title.ptor-job-view-title';
const jobDepartmentSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-department';
const jobLocationSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-location';
const jobContentSelector = '.bb-rich-text-editor__content.ptor-job-view-description';

exports.sourceNodes = (() => {
		var _ref3 = _asyncToGenerator(function* ({ boundActionCreators }, { companyName }) {
				const createNode = boundActionCreators.createNode;

				const jobs = yield getJobs(companyName);

				jobs.forEach(function (job) {
						const jsonString = JSON.stringify(job);
						const gatsbyNode = _extends({}, job, {
								parent: '__SOURCE__',
								children: [],
								internal: {
										type: 'hireWithGoogleJob',
										content: jsonString,
										contentDigest: _crypto2.default.createHash('md5').update(jsonString).digest('hex')
								}
						});
						createNode(gatsbyNode);
				});
		});

		return function (_x3, _x4) {
				return _ref3.apply(this, arguments);
		};
})();