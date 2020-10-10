import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { css } from "@emotion/core"
import Bio from "../components/bio"
import { Post } from "../components/post"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <div>
      <Header size='hero' css={css`margin:4rem 0;`} />
      <SEO title="Portfolio" />

      {posts.map(({ node }) => {
        return (
          <Post key={node.fields.slug} css={css`margin:5rem 0;`} node={node} />
        )
      })}
      <a href={'#'} children={'Top'} />
      <Bio />
      <Footer />
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          # description
          fields {
            slug
          }
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
    }
  }
`
