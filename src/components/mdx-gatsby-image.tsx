/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import GatsbyImage, { FluidObject, GatsbyImageFixedProps, GatsbyImageFluidProps, GatsbyImageProps } from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyNetlifyLfsFixed, GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"

type MdxGatsbyImageFluidProps = GatsbyImageFluidProps & {
  fluidName?: string | number
}
type MdxGatsbyImageFixedProps = GatsbyImageFixedProps & {
  fixedName?: string | number
}
type MdxGatsbyImageProps = MdxGatsbyImageFixedProps & MdxGatsbyImageFluidProps // & {
//   height?: number
//   width?: number
// }

// regex replaced: [gallery maxwidth=1200 ids="102,101" class="alignnone" /]
const MdxGatsbyImage: React.FC<MdxGatsbyImageProps> = ({
  fluidName,
  fixedName,
  // height,
  // width,
  ...props
}) => {

  // this component fetches all images from graph ql and then finds the one it needs from the set,
  const { allImages } = useStaticQuery(graphql`
    query {
      allImages: allFile(
        filter: {ext: {regex: "/(jpeg|jpg|png|svg|gif)/i"}}
      ) {
        edges {
          node {
            publicURL
            base
          }
        }
      }
    }
  `);

  props.backgroundColor = props.backgroundColor || true;

  let imageName = fluidName || fixedName;

  // TODO: test the performance of this...
  const image = allImages.edges.find(edge => imageName == edge.node.base)

  if (image == null) {
    console.warn(`MdxGatsbyImage couldn't find the image named: '${imageName}'`)
    return (<img />)
  }

  if (fluidName != null) {
    props.fluid = GatsbyNetlifyLfsFluid({ src: image.node.publicURL, fileName: image.node.base, maxWidth: Constants.maxWidth })
  } else if (fixedName != null) {
    props.fixed = GatsbyNetlifyLfsFixed({ src: image.node.publicURL, fileName: image.node.base })
  } else {
    console.warn('MdxGatsbyImage requires a fluidName or fixedName')
    return null
  }

  return (
    <GatsbyImage
      {...props}
      css={css`margin: 0.5rem 0;`}
    />
  )
}

export default MdxGatsbyImage