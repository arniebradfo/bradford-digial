# bradford-digital
A portfolio blog site run on Gatsby and hosted by gh pages.


# Links
- [Gatsby](https://www.gatsbyjs.org/)
- [Gatsby on GH Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [Netlify Large Media](https://docs.netlify.com/large-media/overview/)
- [React Flip Animations](https://github.com/aholachek/react-flip-toolkit)

---

## TODO
- use mdx - could be the fastest right now...
  - https://mdxjs.com/
  - https://www.gatsbyjs.com/docs/mdx/
  - replace all images in markdown
- page transitions with POSE and reach router
  - https://popmotion.io/pose/learn/route-transitions-reach-router/
  - https://www.gatsbyjs.com/docs/routing/
  - https://reach.tech/router/
- install netlify stuff
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/?=netlify
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cache/?=netlify
- get to reasonable parity
  - homepage
  - about page

## TODO - images with lfs
- images with lfs
  - make a `gatsby-plugin-netlify-lfs` plugin
    - how do plugins work? https://www.gatsbyjs.com/docs/creating-plugins/
  - fork the [`gatsby-remark-images` plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images) and make it use Netlify Image Transform API
    - https://www.gatsbyjs.com/plugins/gatsby-remark-images/
  - use [sharp](https://github.com/lovell/sharp) to generate the base64 preview and svg outline and save it in the `media-dimensions.json` file
  - fork this into its own project
    - at least put up a gist

## DONE
- setup Netlify
- use Git LFS for media - setup with netlify
- images with lfs
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