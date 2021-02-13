/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Links } from "./links"

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
