/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { css } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"

import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFixed } from "../../scripts/gatsby-image-netlify-lfs"
import { Links } from "./links"
import styled from "@emotion/styled"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div>
      <h5 className={'mini-header'}>About</h5>
      <p className={'subtle-link'}>
        <strong css={css`color:black;`}>{author.name}</strong>{' '}
        is a UX designer currently working{' '}
        in the <a href="https://www.pnnl.gov/visual-analytics-0" >Visual Analytics Group</a>{' '}
        at <a href="https://www.pnnl.gov/">Pacific Northwest National Laboratory</a>{' '}
        in Richland, WA.
      </p>
      <p>
        <Links />
      </p>
    </div>
  )
}

export default Bio
