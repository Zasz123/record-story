const path = require('path');

module.exports = {
  pathPrefix: '/record-story',
  siteMetadata: {
    title: `Record story`,
    description: ``,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `article`,
        path: `${__dirname}/article`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        '@components': path.join(__dirname, 'src/components'),
        '@pages': path.join(__dirname, 'src/pages'),
        '@styles': path.join(__dirname, 'src/styles'),
        '@hooks': path.join(__dirname, 'src/hooks'),
        '@modules': path.join(__dirname, 'src/modules'),
        '@interfaces': path.join(__dirname, 'src/interfaces'),
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/components/layout/Layout.tsx'),
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-mdx`,
  ],
};
