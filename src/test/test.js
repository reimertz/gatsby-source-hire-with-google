import test from 'ava';
import { sourceNodes } from '../../gatsby-node'
import { generateBaseUrl, fetchJobs } from '../../helpers'

const TEST_COMPANY = 'dromae'
const TEST_COMPANY_THAT_DOESNT_EXIST = 'REIMERTZ_YOLO_COMPANY_1337'
const CONFIG = { companyName: TEST_COMPANY }
const GATSY_MOCK = {
  boundActionCreators: {
    createNode: (nodeData) => {}
  }
}

test(`generateBaseUrl(${TEST_COMPANY}) should output https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`, t => {
  t.is(generateBaseUrl(TEST_COMPANY), `https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`);
})

test(`fetchJobs(${TEST_COMPANY}) should return .. jobs :)`, async t => {
  const jobs = await fetchJobs(TEST_COMPANY)

  t.snapshot(jobs);
});

test('fetchJobs() should return an error', async t => {
  const error = await t.throws(fetchJobs())

  t.is(error.message, 'You need to define companyName in gatsby-config.js.');
});

test(`fetchJobs(${TEST_COMPANY_THAT_DOESNT_EXIST}) should return an error`, async t => {
  const error = await t.throws(fetchJobs(TEST_COMPANY_THAT_DOESNT_EXIST))

  t.is(error.message, `Couldn't fetch jobs for ${TEST_COMPANY_THAT_DOESNT_EXIST}. You sure ${generateBaseUrl(TEST_COMPANY_THAT_DOESNT_EXIST)} exists?`);
});



test(`sourceNodes(gatsyMock, {configName: '${TEST_COMPANY}'}) run without issues`, async t => {
  try {
    await sourceNodes(GATSY_MOCK, CONFIG)  
    t.pass('sourceNodes function passed. :)')
  } catch (e) {
    console.log(e)
    
  }
});

test(`sourceNodes(gatsyMock, {}) should fail`, async t => {
  try {
    await sourceNodes(GATSY_MOCK, {})  
    t.fail('sourceNodes with missing companyName did not fail')
    
  } catch (e) {
    t.is(e.message, 'You need to define companyName in gatsby-config.js.');
  }
});
