

# gatsby-source-hire-with-google

Loads job openings from Hire With Google into Gatsby.js.

## Installation

```bash
# npm
npm install gatsby-source-hire-with-google

# yarn
yarn add gatsby-source-hire-with-google
```

## How to Use

First, find the company name used in your public jobs url:  `hire.withgoogle.com/public/jobs/{companyName}`. 

Next, add `companyName` in your `gatsby-config.js`:

```
{
    ...
    plugins: [
    ...
    {
      resolve: 'gatsby-source-hire-with-google',
      options: {
        companyName: '{COMPANY_NAME}',
      },
    },
  ]
}
```

## How to Query

Hire With Google uses the [JobPosting](https://schema.org/JobPosting) schema from [schema.org](https://schema.org).

You can read more about their API [here](https://storage.googleapis.com/support-kms-prod/NpRyCAyX1xwNwMAWuC3MhBe5Omq1TCxO7UFD).

```graphql
{
    allHireWithGoogleJob {
      edges {
        node {
          ... https://schema.org/JobPosting for schema
        }
      }
    }
}
```
