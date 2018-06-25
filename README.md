# gatsby-source-hire-with-google
> Loads job openings from hire.withgoogle.com/public/jobs/{companyName} into Gatsby.js source system.

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
        replaceDivs: false // true is default. Hire defaults to use <div> instead of <p> for paragrahs, so if you prefer this, set this to false.

      },
    },
  ]
}
```

## How to Query

```graphql
{
    allHireWithGoogleJob {
      edges {
        node {
          id
          url
          title
          department
          content
        }
      }
    }
}
```
