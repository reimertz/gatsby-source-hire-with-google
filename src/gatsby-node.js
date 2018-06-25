import crypto from 'crypto'
import axios from 'axios'
import cheerio from 'cheerio'

const jobSelector = 'a.bb-public-jobs-list__job-item-title.ptor-jobs-list__item-job-title'
const BASE_URL = 'https://hire.withgoogle.com/public/jobs/';

const jobTitleSelector = '.bb-jobs-posting__job-title.ptor-job-view-title'
const jobDepartmentSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-department'
const jobLocationSelector = '.bb-jobs-posting__job-details-item.ptor-job-view-location'
const jobContentSelector = '.bb-rich-text-editor__content.ptor-job-view-description'

async function getJob(jobUrl) { 
  const response = await axios.get(jobUrl)
  const $ = cheerio.load(response.data);

  return {
  	id: jobUrl,
    url: jobUrl,
    title: $(jobTitleSelector).text(),
    department: $(jobDepartmentSelector).text(),
    location: $(jobLocationSelector).text(),
    content: $(jobContentSelector).html()
  }
}

async function getJobs(companyName) {
  const response = await axios.get(`${BASE_URL}${companyName}`)
  const $ = cheerio.load(response.data)
  const jobLinks = $(jobSelector).map( (i, elm) => {
    return $(elm).attr('href')
  }).get()

  return await Promise.all(jobLinks.map(l => getJob(l)))
}

exports.sourceNodes = async ({ boundActionCreators }, { companyName }) => {
	const { createNode } = boundActionCreators
	const jobs = await getJobs(companyName)

	jobs.forEach(job => {
		const jsonString = JSON.stringify(job)
		const gatsbyNode = {
			...job,
			parent: '__SOURCE__',
			internal: {
				type: 'hireWithGoogleJob',
				content: jsonString,
				contentDigest: crypto
					.createHash('md5')
					.update(jsonString)
					.digest('hex'),
			},
		}
		createNode(gatsbyNode)
	})
}
