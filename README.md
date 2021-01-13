# bradford-digital
A portfolio blog site run on Gatsby and [hosted by netlify](https://goofy-kirch-17c5e4.netlify.app/).


# Links
- [Gatsby](https://www.gatsbyjs.org/)
- [Gatsby on GH Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [Netlify Large Media](https://docs.netlify.com/large-media/overview/)
- [React Flip Animations](https://github.com/aholachek/react-flip-toolkit)

---


## TODO
- Page transitions with Framer motion 
  - Get up an running
    - https://www.gatsbyjs.com/docs/routing/ - Gastby uses Reach Router https://reach.tech/router/
    - How to animate pages using a common wrapper component on all pages with `gatsby-plugin-layout` https://www.digitalocean.com/community/tutorials/how-to-animate-page-transitions-on-a-static-gatsbyjs-site
    - How to preform cross-route transitions with Framer-Motion https://dev.to/darthknoppix/page-transitions-in-next-js-with-framer-motion-1e4i
    - https://www.framer.com/api/motion/animate-shared-layout/
  - **Scroll Restoration**
    - try multiple scroll-boxes inside a single rendered component? 
      - so the page itself doesn't scroll and share scroll across pages? - https://www.gatsbyjs.com/docs/scroll-restoration/
      - put this in the layout component? - using `gatsby-plugin-layout`
    - reconstruct scroll restoration
      - on forward, shared-animate to post
      - on back, if at top shared-animate back to scroll positioned index
        - else pusedo-shared-animate back to scroll positioned index
  - fade everything else

- remove emotion, use less. It will render more consistently with global css?
- content
  - current
    - caffeine machine process book
    - remove smoothscroll
    - non-outlined image
    - better bio - add to social media
  - future
    - mobius design system xd file
    - blog vs archives vs case study
    - logos page
    - add explainer to each post
    - blog about netlify lfs with gatsby
- pagination
- add resume? - via [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/shared/references/v2/profile/full-profile?context=linkedin/consumer/context)?
- gifs don't retain after being passed through the api
- images with lfs
  - gifs?
  - videos are absent after netlify build...
  - make a `gatsby-plugin-netlify-lfs` plugin
    - how do plugins work? https://www.gatsbyjs.com/docs/creating-plugins/
  - fork the [`gatsby-remark-images` plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images) and make it use Netlify Image Transform API
    - https://www.gatsbyjs.com/plugins/gatsby-remark-images/
  - use [sharp](https://github.com/lovell/sharp) to generate the base64 preview and svg outline and save it in the `media-dimensions.json` file
  - fork this into its own example project
    - at least put up a gist




## DONE
- content
  - caffeine machine site 
  - avymap link and site

- deploy 
  - change domain
  - ga analytics
  - deactivate wordpress site
  - setup email
- get to reasonable parity
  - hide sensitive pages
  - remove unused 'pages'
  - make simple mockups
    - style and layout
    - logo & favicon
- setup Netlify
- use Git LFS for media - setup with netlify
- images with lfs
  - videos are absent after netlify build...
  - gifs don't retain after being passed through the api
  - netlify gatsby build doesn't have access to image data: https://github.com/gatsbyjs/gatsby/issues/12438#issuecomment-474113335
  - write a replacement for `gatsby-plugin-sharp` and `gatsby-transformer-sharp` that uses netlify [Netlify Large Media Image Transforms](https://docs.netlify.com/large-media/transform-images/#request-transformations)
  - preprocess all image files into a `media-dimensions.json` object with height width and aspect ratio
    - look in `gatsby-config.js` for plugins `gatsby-source-filesystem` options.path and builds source folders based on that
    - commit the `media-dimensions.json` config file and netlify gatsby build looks at it during build time to generate request transforms responsive images
  - uses native `gatsby-image`/`<GatsbyImage/>` component
    - https://www.gatsbyjs.com/docs/images-and-files/
    - https://www.gatsbyjs.com/plugins/gatsby-image/
    - https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/
    - https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/
- delete gh-pages branch
  - delete netlify cms app and git repo
- install netlify stuff - not 100% sure what this does but oh well
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/?=netlify
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cache/?=netlify
- use mdx - could be the fastest right now...
  - https://mdxjs.com/
  - https://www.gatsbyjs.com/docs/mdx/
  - convert from remark to mdx - https://www.gatsbyjs.com/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/
  - replace all images in markdown - https://github.com/gatsbyjs/gatsby/issues/21934#issuecomment-596668111
    - images in mdx https://stackoverflow.com/q/60696636/5648839
      ```graphql
      query MyQuery {
        allFile(filter: {ext: {regex: "/(jpg|png|jpg|svg)/i"}}) {
          edges {
            node {
              publicURL
              base
            }
          }
        }
      }
      ```