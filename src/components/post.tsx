import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  node: any
}

export const Post: React.FunctionComponent<Props> = ({ node, ...props }) => {
  const title = node.frontmatter.title || node.fields.slug

  return (
    <article
      {...props}
    >
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
        <h3
          css={css`
            margin:2rem 0 0 0;
            font-size: 2rem;
            line-height: initial;
          `}
        >
          {title}
        </h3>
        <time
          css={css`
            font-size: 0.8rem;
            font-family: var(--font-family-mono);
          `}
          dateTime={node.frontmatter.dateTime}>
          {node.frontmatter.dateHuman}
        </time>
      </header>
      <section>
        <p
          css={css`line-height: 1.5em;`}
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.description,
          }}
        />
        <strong>
          <Link
            to={node.fields.slug}
          >
            Read More {/* → */}
          </Link>
        </strong>
      </section>
    </article>
  )
}