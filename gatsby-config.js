module.exports = {
  pathPrefix: "/bradford-digital",

  flags: {
    DEV_SSR: false, // https://stackoverflow.com/a/65980746/5648839
  },

  siteMetadata: {
    title: `bradford.digital`,
    description: `UX Design & Frontend Development`,
    author: {
      name: `James Bradford`,
      summary: `James Bradford is a UX Designer working in the Visual Analytics Group at Pacific Northwest National Laboratory.`,
      contacts: ['james', 'bradford', 'digital'] // ${contact[0]}@${contact[1]}.${contact[2]} // mis-formatted to avoid crawlers
    },
    siteUrl: `https://arniebradfo.github.io/bradford-digital/`,
    socials: [
      {
        text: `LinkedIn`,
        link: `https://www.linkedin.com/in/arniebradfo/`,
      },
      {
        text: `CodePen`,
        link: `https://codepen.io/arniebradfo/`,
      },
      {
        text: `Github`,
        link: `https://github.com/arniebradfo`,
      },
    ],
  },

  plugins: [

    // FILESYSTEM RESOURCES //
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/lfs-media`,
        name: `lfs-media`,
      },
    },
    // { // ignore-media is ignored by git lfs in .lfsconfig
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/ignore-media`,
    //     name: `ignore-media`,
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        }
      }
    },

    // Wrap the root element // ./src/layouts/index.tsx
    `gatsby-plugin-layout`,

    { // MDX combines MarkDown with JSX //
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: { maxWidth: 590, },
          // },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              ignoreFileExtensions: [],
              // `ignoreFileExtensions` defaults to [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
              // as we assume you'll use gatsby-remark-images to handle images
              // ...but we cant use gatsby image processing with netlify lfs
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },

    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },

    // // GATSBY DEFAULT IMAGE PROCESSING //
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,

    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,

    // This (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/logo/logo-512.png`,
      },
    },

    // Netlify stuff? caching seems to break things?
    // `gatsby-plugin-netlify-cache`,
    // `gatsby-plugin-netlify`,
  ],
}
