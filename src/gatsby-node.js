import crypto from 'crypto'
import { generateBaseUrl, fetchJobs } from './helpers'

export async function sourceNodes ({ boundActionCreators }, { companyName }) {
	const { createNode } = boundActionCreators
	const jobs = await fetchJobs(companyName)

	jobs.forEach(job => {
		const jsonString = JSON.stringify(job)
		const gatsbyNode = {
			...job,
			parent: '__SOURCE__',
      children: [],
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
