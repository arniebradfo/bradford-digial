import React from "react"
import GatsbyImage, { FluidObject, GatsbyImageProps } from "gatsby-image"
import WpIndexImageMapping from './image-row-mapping.json'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyNetlifyLfsFixed, GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"

interface GatsbyImageMdxProps extends GatsbyImageProps {
  fluidName?: string | number
  fixedName?: string | number
  height?: number
  width?: number
}
// [gallery maxwidth=1200 ids="102,101" class="alignnone" /]

const GatsbyImageMdx: React.FC<GatsbyImageMdxProps> = ({ fluidName, fixedName, height, width, ...props }) => {
  const { allImages } = useStaticQuery(graphql`
    query {
      allImages: allFile(filter: {ext: {regex: "/(jpeg|jpg|png|svg|gif)/i"}}) {
        edges {
          node {
            publicURL
            base
          }
        }
      }
    }
  `);

  let imageName = fluidName || fixedName;
  if (typeof imageName === "number")
    imageName = WpIndexImageMapping[imageName]

  // TODO: test the performance of this...
  const image = allImages.edges.find(edge => imageName == edge.node.base)

  if (image == null) {
    console.warn(`GatsbyImageMdx couldn't find the image named: '${imageName}'`)
    return (<img />)
  }

  if (fluidName != null) {
    props.fluid = GatsbyNetlifyLfsFluid({ src: image.node.publicURL, fileName: image.node.base })
  } else if (fixedName != null) {
    props.fixed = GatsbyNetlifyLfsFixed({ src: image.node.publicURL, fileName: image.node.base })
  } else {
    console.warn('GatsbyImageMdx requires a fluidName or fixedName')
    return (<></>)
  }

  return (
    <GatsbyImage {...props} />
  )
}

export default GatsbyImageMdx