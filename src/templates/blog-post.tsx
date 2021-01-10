import React from "react"
import { Link, graphql } from "gatsby"

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
import { css } from "@emotion/core"
import { motion } from "framer-motion"
import { ScrollContainer } from "../components/scroll-container"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  // const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <ScrollContainer>
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
          <div
            css={css`
              margin-bottom: 2em;
            `}
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
          </div>

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
              layoutId={post.frontmatter.title}
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

        <hr />

        <MDXRenderer>{post.body}</MDXRenderer>

        <hr
          css={css`
            margin-top: 10rem;
          `}
        />

        <footer>
          <Bio />
        </footer>
      </article>

      <hr
        css={css`
          margin-bottom: 1rem;
        `}
      />

      <nav>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            list-style: none;
            padding: 0;
          `}
        >
          <Link to={`/`}>{"All Posts"}</Link>
          <Link to={`#`}>{"Top ↑"}</Link>
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
              css={css`
                margin-right: 1rem;
              `}
            />
          )}
          {previous && (
            <Post
              node={previous}
              ctaText={"Older →"}
              // css={css`flex: 1 1 50%;`}
            />
          )}
        </div>
      </nav>

      <Footer />
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
