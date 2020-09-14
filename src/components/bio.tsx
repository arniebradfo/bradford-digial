/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

import { GatsbyNetlifyLfsFixed } from "../../scripts/gatsby-image-netlify-lfs"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        publicURL
        base
      # childImageSharp {
      #     fixed(width: 50, height: 50) {
      #       ...GatsbyImageSharpFixed
      #     }
      #   }
      # }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)



  const { author, social } = data.site.siteMetadata
  return (
    <div>
      <p>
        <strong>{author.name}</strong> is a UX designer currently working at <a href="https://www.pnnl.gov/">PNNL</a> in the <a href="https://www.pnnl.gov/visual-analytics-0" >Visual Analytics Group</a>.
      </p>
    </div>
  )
}

export default Bio
