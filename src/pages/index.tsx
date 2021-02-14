/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { graphql } from "gatsby"
import { SEO } from "../components/seo"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { ContentWrapper } from "../components/content-wrapper"
import { Bio }  from "../components/bio"
import { Post } from "../components/post"
import { Links } from "../components/links"
import { ScrollContainer } from "../components/scroll-container"
import { motion } from "framer-motion"
import { animationProps } from "../style/animations"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMdx.edges

  return (
    <ScrollContainer scrollKey={'index-page-scroll'} css={css`z-index:1;`}>
      <ContentWrapper>

        <Header
          size="hero"
          css={css`
            margin: 4rem 0;
          `}
        />

        <SEO title="Portfolio" />

        <motion.div
          key={`mini-header`}
          {...animationProps}
          css={css`
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap-reverse;
            align-items: baseline;
          `}
        >
          <h2 className={"mini-header"}>Portfolio</h2>
          <Links />
        </motion.div>

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

      </ContentWrapper>
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
