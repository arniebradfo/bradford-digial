import React, { useEffect, useState } from "react"
import { LinkHistory } from "../components/link-history"
import Bio from "../components/bio"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GatsbyImage from "gatsby-image"
import {
  GatsbyNetlifyLfsFixed,
  GatsbyNetlifyLfsFluid,
} from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Post } from "../components/post"
import { css } from "@emotion/react"
import { motion } from "framer-motion"
import { ScrollContainer } from "../components/scroll-container"
import { ContentWrapper } from "../components/content-wrapper"
import { animationProps } from "../style/animations"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  // const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  
  const isFromHome = location.state.from === 'home-list';
  const [isSharedLayout, setIsSharedLayout] = useState(isFromHome);
  useEffect(() => {
    setIsSharedLayout(isFromHome)
    console.log('isSharedLayout: ', isSharedLayout);
  }, [location])
  const removeSharedLayout = () => {
    setIsSharedLayout(false)
    // console.log('isSharedLayout: ', isSharedLayout);
  }
  console.log('isSharedLayout: ', isSharedLayout);


  return (
    <ScrollContainer scrollKey={post.frontmatter.title}>
      <ContentWrapper>

        <Header />

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.description}
        />

        <article>
          <header
            css={css`
              margin: 4rem 0;
            `}
          >
            <motion.div
              css={css`
                margin-bottom: 2em;
              `}
              key={`title-${post.frontmatter.title}`}
              {...animationProps}
            >
              <h1
                // layoutId={post.frontmatter.title}
                css={css`
                  margin-bottom: 0.25em;
                  font-size: 2rem;
                `}
              >
                {post.frontmatter.title}
              </h1>
              <time dateTime={post.frontmatter.dateTime}>
                {post.frontmatter.dateHuman}
              </time>
            </motion.div>

            {/* {post.frontmatter.description &&
              <p>{post.frontmatter.description}</p>
            } */}

            {/* {(post.frontmatter.tags?.length > 0) && ( // adding taxa: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
              <p>
                {post.frontmatter.tags.map((tag, i) => <a key={i}><small>{tag}</small></a>)}
              </p>
            )} */}

            {post.frontmatter.featuredImage && (
              <motion.div
                layoutId={isSharedLayout ? post.frontmatter.title : 'undefined'}
                {...(!isSharedLayout ? animationProps : {})}
                onLayoutAnimationComplete={removeSharedLayout}
                css={css`
                  margin: 0 -${Constants.padding / 2}px;
                `}
              >
                <GatsbyImage
                  fluid={GatsbyNetlifyLfsFluid({
                    src: post.frontmatter.featuredImage.publicURL,
                    fileName: post.frontmatter.featuredImage.base,
                    maxWidth: Constants.maxWidth,
                    sizes: Constants.sizes
                    // width: 100
                  })}
                  backgroundColor
                />
              </motion.div>
            )}
          </header>

          <motion.hr key={`header-hr-${post.frontmatter.title}`} {...animationProps} />

          <motion.section key={`content-${post.frontmatter.title}`} {...animationProps} >
            <MDXRenderer>{post.body}</MDXRenderer>
          </motion.section>

          <motion.hr
            key={`content-hr-${post.frontmatter.title}`}
            {...animationProps} 
            css={css`
              margin-top: 10rem;
            `}
          />

          <motion.footer key={`bio-${post.frontmatter.title}`} {...animationProps} >
            <Bio />
          </motion.footer>
        </article>

        <motion.hr
          key={`footer-hr-${post.frontmatter.title}`}
          {...animationProps}
          css={css`
            margin-bottom: 1rem;
          `}
        />

        <motion.nav key={`nav-${post.frontmatter.title}`} {...animationProps} >
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              list-style: none;
              padding: 0;
            `}
          >
            <LinkHistory to={`/`} from={'bottom-nav'}>{"All Posts"}</LinkHistory>
            <LinkHistory to={`#`} from={'bottom-nav'}>{"Top ↑"}</LinkHistory>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              list-style: none;
              padding: 0;
              margin: 3rem 0;
              @media (max-width: 700px) {
                flex-wrap: wrap;
              }
            `}
          >
            {next && (
              <Post
                node={next}
                ctaText={"← Newer"}
                isShort
                css={css`
                  margin-right: 1rem;
                `}
              />
            )}
            {previous && (
              <Post
                node={previous}
                ctaText={"Older →"}
                isShort
                // css={css`flex: 1 1 50%;`}
              />
            )}
          </div>
        </motion.nav>

        <Footer />

      </ContentWrapper>
    </ScrollContainer>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      # description(pruneLength: 160)
      body
      frontmatter {
        dateTime: date
        dateHuman: date(formatString: "MM / DD / YYYY")
        title
        description
        featuredImage {
          publicURL
          base
        }
      }
    }
  }
`
