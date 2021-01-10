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
import { Links } from "../components/links"
import { ScrollContainer } from "../components/scroll-container"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
    // const scrollRestoration = useScrollRestoration(`index-scroll-container`)


  return (
    <ScrollContainer>
      <Header
        size="hero"
        css={css`
          margin: 4rem 0;
        `}
      />

      <SEO title="Portfolio" />

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap-reverse;
          align-items: baseline;
        `}
      >
        <h2 className={"mini-header"}>Portfolio</h2>
        <Links />
      </div>

      {posts.map(({ node }) => {
        return (
          <Post
            key={node.fields.slug}
            css={css`
              margin: 2rem 0 5rem;
            `}
            node={node}
          />
        )
      })}

      <hr />

      {/* <a href={'#'} children={'Top'} /> */}
      <Bio />

      <hr />

      <Footer />
    </ScrollContainer>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
