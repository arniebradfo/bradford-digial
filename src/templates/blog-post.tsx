import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFixed, GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        excerpt={post.frontmatter.excerpt || post.excerpt}
      />
      <article>
        <header style={{ marginBottom: 64, marginTop: 64 }}>

          <h1 style={{ margin: 0 }}>
            {post.frontmatter.title}
          </h1>
          <p><small>{post.frontmatter.date}</small></p>

          {post.frontmatter.excerpt &&
            <p>{post.frontmatter.excerpt}</p>
          }
          {/* {(post.frontmatter.tags?.length > 0) && ( // adding taxa: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
            <p>
              {post.frontmatter.tags.map((tag, i) => <a key={i}><small>{tag}</small></a>)}
            </p>
          )} */}
          {post.frontmatter.featuredImage &&
            <GatsbyImage fluid={GatsbyNetlifyLfsFluid({
              src: post.frontmatter.featuredImage.publicURL,
              fileName: post.frontmatter.featuredImage.base,
              maxWidth: Constants.maxWidth,
              // sizes: Constants.sizes
              // width: 100
            })}
              style={{ margin: `0 -${(Constants.padding / 2)}px` }}
            />
          }
        </header>
        <hr style={{ margin: '6rem 0' }} />

        <MDXRenderer>{post.body}</MDXRenderer>

        <hr style={{ margin: '6rem 0' }} />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        excerpt
        featuredImage {
          publicURL
          base
        }
      }
    }
  }
`
