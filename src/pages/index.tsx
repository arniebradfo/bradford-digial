import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {/* <Link to="/using-typescript">using typescript</Link> */}
      {/* <Link to="/image-tests">image tests</Link> */}
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} style={{ margin: '5rem 0' }}>
            <header>
              {node.frontmatter.featuredImage &&
                <Link to={node.fields.slug}>
                  <GatsbyImage fluid={GatsbyNetlifyLfsFluid({
                    src: node.frontmatter.featuredImage.publicURL,
                    fileName: node.frontmatter.featuredImage.base,
                    maxWidth: Constants.maxWidth,
                    // maxHeight: 300,
                    sizes: Constants.sizes
                    // width: 100
                  })}
                    backgroundColor
                  />
                </Link>
              }
              <h2 style={{ marginBottom: 0, marginTop: '1em' }}>
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.excerpt || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout >
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            excerpt
            featuredImage {
              publicURL
              base
            }
          }
        }
      }
    }
  }
`
