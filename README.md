# gatsby-source-hire-with-google
> Loads job openings from hire.withgoogle.com/public/jobs/{companyName} into Gatsby.js. Based on [gatsby-source-greenhouse](https://github.com/diegolamanno/gatsby-source-greenhouse).

## Installation

```bash
npm install gatsby-source-hire-with-google
```
or
```bash
yarn add gatsby-source-hire-with-google
```

## Usage

To use this source you need to supply the company name used in `hire.withgoogle.com/public/jobs/{companyName}`. 

Next, edit `gatsby-config.js` to use the plugin:
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

## Querying

You can query the nodes created by the plugin as follows:
```graphql
{
    allHireWithGoogleJob {
        edges {
            node {
                ...
            }
        }
    }
}
```
