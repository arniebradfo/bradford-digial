/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFixed } from "../../scripts/gatsby-image-netlify-lfs"

const Test = ({ name, children }) => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
  //       publicURL
  //       base
  //     # childImageSharp {
  //     #     fixed(width: 50, height: 50) {
  //     #       ...GatsbyImageSharpFixed
  //     #     }
  //     #   }
  //     # }
  //     }
  //     site {
  //       siteMetadata {
  //         author {
  //           name
  //           summary
  //         }
  //         social {
  //           twitter
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax( 1px, 1fr))',
      gridGap: 12
    }}>
      {children}
    </div>
  )
}

export default Test
