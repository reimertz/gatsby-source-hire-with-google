import test from 'ava';

import { generateBaseUrl, getJobs, sourceNodes } from '../gatsby-node'

const TEST_COMPANY = 'dromae'
const TEST_COMPANY_THAT_DOESNT_EXIST = 'REIMERTZ_YOLO_COMPANY_1337'

test(`generateBaseUrl(${TEST_COMPANY}) should output https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`, t => {
  t.is(generateBaseUrl(TEST_COMPANY), `https://hire.withgoogle.com/v2/api/t/${TEST_COMPANY}/public/jobs`);
})

test(`getJobs(${TEST_COMPANY}) should return .. jobs :)`, async t => {
  const jobs = await getJobs(TEST_COMPANY)

  t.snapshot(jobs);
});

test('getJobs() should return an error', async t => {
  const error = await t.throws(getJobs())

  t.is(error.message, 'You need to define companyName in gatsby-config.js.');
});

test(`getJobs(${TEST_COMPANY_THAT_DOESNT_EXIST}) should return an error`, async t => {
  const error = await t.throws(getJobs(TEST_COMPANY_THAT_DOESNT_EXIST))

  t.is(error.message, `Couldn't fetch jobs for ${TEST_COMPANY_THAT_DOESNT_EXIST}. You sure ${generateBaseUrl(TEST_COMPANY_THAT_DOESNT_EXIST)} exists?`);
});