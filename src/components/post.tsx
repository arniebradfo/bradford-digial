import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"
import { motion } from "framer-motion"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  node: any
  ctaText?: string
}

export const Post: React.FunctionComponent<Props> = ({
  node,
  ctaText = "Read more",
  ...props
}) => {
  const title = node.frontmatter.title || node.fields.slug

  return (
    <article {...props}>
      <header>
        {node.frontmatter.featuredImage && (
          <motion.div layoutId={title}>
            <Link to={node.fields.slug}>
              <GatsbyImage
                fluid={GatsbyNetlifyLfsFluid({
                  src: node.frontmatter.featuredImage.publicURL,
                  fileName: node.frontmatter.featuredImage.base,
                  maxWidth: Constants.maxWidth,
                  sizes: Constants.sizes,
                  // maxHeight: 300,
                  // width: 100
                })}
                backgroundColor
              />
            </Link>
          </motion.div>
        )}
        <h3
          css={css`
            margin: 2rem 0 0.25rem 0;
            font-size: 2rem;
          `}
        >
          {title}
        </h3>
        <time dateTime={node.frontmatter.dateTime}>
          {node.frontmatter.dateHuman}
        </time>
      </header>
      <section>
        <p
          css={css`
            line-height: 1.5em;
          `}
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.description,
          }}
        />
        <strong>
          <Link to={node.fields.slug} children={ctaText} />
        </strong>
      </section>
    </article>
  )
}
