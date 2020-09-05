# bradford-digital
A portfolio blog site run on Gatsby and hosted by gh pages.


# Links
- [Gatsby](https://www.gatsbyjs.org/)
- [Gatsby on GH Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)
- [React Flip Animations](https://github.com/aholachek/react-flip-toolkit)

---

## TODO
- images with lfs
  - https://github.com/gatsbyjs/gatsby/issues/12438#issuecomment-474113335
  - write a custom `<Image/>` component that uses [Netlify Large Media Image Transforms](https://docs.netlify.com/large-media/transform-images/#request-transformations)
    - https://www.gatsbyjs.com/docs/images-and-files/
    - maybe that component still used the native `gatsby-image`?
      - https://www.gatsbyjs.com/plugins/gatsby-image/
      - https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/
      - https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/
    - how do plugins work? https://www.gatsbyjs.com/docs/creating-plugins/
  - fork the [`gatsby-remark-images` plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images) and make it use Netlify Image Transform API
    - https://www.gatsbyjs.com/plugins/gatsby-remark-images/
  - preprocess all image files into an height & width object so we can get the size of things
    - maybe even use the css gradients or svg outlines other preprocess stuff.
    - commit that config.js or json file and run on it during gatsby build
    - could feed it directly to `<GatsbyImage/>`
- use mdx
  - https://mdxjs.com/
  - https://www.gatsbyjs.com/docs/mdx/
- page transitions with POSE and reach router
  - https://popmotion.io/pose/learn/route-transitions-reach-router/
  - https://www.gatsbyjs.com/docs/routing/
  - https://reach.tech/router/
- delete gh-pages branch
- delete netlify cms app and git repo
- install netlify stuff
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/?=netlify
  - https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cache/?=netlify

## DONE
- setup Netlify
- use Git LFS for media - setup with netlify