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
      <GatsbyImage
        // fixed={data.avatar.childImageSharp.fixed}
        fixed={GatsbyNetlifyLfsFixed({ src: data.avatar.publicURL, fileName: data.avatar.base, width: 50, height: 50 })}
        alt={author.name}
      // style={{
      //   marginBottom: 0,
      //   minWidth: 50,
      //   borderRadius: `100%`,
      // }}
      // imgStyle={{
      //   borderRadius: `50%`,
      // }}
      />
      {/* <img
        src={data.avatar.publicURL}
        alt={author.name}
        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
      /> */}
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        <br />
        <a href={`https://twitter.com/${social.twitter}`}>
          You should NOT follow him on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
