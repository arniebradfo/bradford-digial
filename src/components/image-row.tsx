import React from "react"
import GatsbyImage, { FluidObject } from "gatsby-image"
import WpIndexImageMapping from './image-row-mapping.json'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import Constants from "../constants"

type ImageRowProps = {
  fluidImageObjects?: FluidObject[]
  ids?: number[]
  imageNames?: string[]
  maxwidth?: number
}
// [gallery maxwidth=1200 ids="102,101" class="alignnone" /]


const ImageRow: React.FC<ImageRowProps> = ({ fluidImageObjects, ids: fluidImageIndicesFromWp, maxwidth: maxWidth, imageNames }) => {

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

  // if (fluidImageObjects == null) { // Can't use this now?

  if (imageNames == null)
    imageNames = fluidImageIndicesFromWp.map(fluidImageIndexFromWp => WpIndexImageMapping[fluidImageIndexFromWp])

  // TODO: test the performance of this...
  const images = allImages.edges.filter(edge => {
    for (let i = 0; i < imageNames.length; i++) {
      const imageName = imageNames[i];
      if (imageName == edge.node.base) return true
    }
  });

  if (maxWidth == null) {
    maxWidth = images.length > 1 ? Math.round(Constants.maxWidth / (images.length - 0.5)) : Constants.maxWidth;
  }

  // sizes: "(max-width: 864px) calc(100vw - 64px), 864px"
  const sizes = `(max-width: ${(Constants.maxWidth + Constants.padding)}px) calc((100vw - ${Constants.padding}px)/${(images.length - 0.5)}), ${maxWidth}px`

  fluidImageObjects = images.map(image => GatsbyNetlifyLfsFluid({
    src: image.node.publicURL,
    fileName: image.node.base,
    maxWidth: maxWidth,
    sizes: sizes
  }))

  // }

  return (
    <div style={{ display: 'flex', margin: '0.5rem 0' }}>
      {fluidImageObjects.map((fluidImage, i) => (
        // do the GatsbyNetlifyLfsFluid in here... and edit the maxWidth somehow??
        <GatsbyImage
          fluid={fluidImage}
          style={{
            flex: fluidImage.aspectRatio,
            marginRight: i === fluidImageObjects.length - 1 ? 0 : 4
          }}
          key={i}
        />
      ))}
    </div>
  )
}

export default ImageRow