/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description?: string,
  lang?: string,
  meta?: string,
  title?: string,
}

export const SEO: React.FunctionComponent<Props> = ({
  description,
  lang,
  meta,
  title
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            # socials { }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  // Helmet Doesn't work with Typescript? // https://github.com/nfl/react-helmet/issues/578
  // we'll just circumvent they typing for(now|ever)
  const HelmetAlias = Helmet as unknown as React.FunctionComponent<any>

  return (
    <HelmetAlias
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    // meta={[
    //   {
    //     name: `description`,
    //     content: metaDescription,
    //   },
    //   {
    //     property: `og:title`,
    //     content: title,
    //   },
    //   {
    //     property: `og:description`,
    //     content: metaDescription,
    //   },
    //   {
    //     property: `og:type`,
    //     content: `website`,
    //   },
    //   {
    //     name: `twitter:card`,
    //     content: `summary`,
    //   },
    //   {
    //     name: `twitter:creator`,
    //     content: site.siteMetadata.socials.twitter,
    //   },
    //   {
    //     name: `twitter:title`,
    //     content: title,
    //   },
    //   {
    //     name: `twitter:description`,
    //     content: metaDescription,
    //   },
    // ].concat(meta)}
    />
  )
}
