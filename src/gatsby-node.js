import crypto from 'crypto'
import axios from 'axios'

export const generateBaseUrl = (companyName) =>  `https://hire.withgoogle.com/v2/api/t/${companyName}/public/jobs`

export async function getJobs(companyName) {
  if (!companyName) throw new Error('You need to define companyName in gatsby-config.js.')
  
  try {
    const URL = generateBaseUrl(companyName)
    const { data, status } = await axios.get(URL, { maxRedirects: 0 })

    return data
      
  } catch (e) {
    throw new Error(`Couldn't fetch jobs for ${companyName}. You sure ${generateBaseUrl(companyName)} exists?`) 
  }
}

export async function sourceNodes ({ boundActionCreators }, { companyName }) {
	const { createNode } = boundActionCreators
	const jobs = await getJobs(companyName)

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
