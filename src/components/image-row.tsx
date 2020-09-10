import React from "react"
import GatsbyImage, { FluidObject } from "gatsby-image"
import WpIndexImageMapping from './image-row-mapping.json'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"

type ImageRowProps = {
    fluidImageObjects?: FluidObject[]
    ids: number[]
    maxwidth
}
// [gallery maxwidth=1200 ids="102,101" class="alignnone" /]


const ImageRow: React.FC<ImageRowProps> = ({ fluidImageObjects, ids: fluidImageIndicesFromWp, maxwidth: maxWidth }) => {
    const { allImages } = useStaticQuery(graphql`
      query AllImages {
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

    // console.log(allImages);

    const fluidImageNames = fluidImageIndicesFromWp.map(fluidImageIndexFromWp => WpIndexImageMapping[fluidImageIndexFromWp])

    // console.log(fluidImageNames);

    const images = allImages.edges.filter(edge => {
        for (let i = 0; i < fluidImageNames.length; i++) {
            const fluidImageName = fluidImageNames[i];
            if (fluidImageName == edge.node.base) return true
        }
    });

    fluidImageObjects = images.map(image => GatsbyNetlifyLfsFluid({ src: image.node.publicURL, fileName: image.node.base }))
    // console.log(fluidImages);

    return (
        <div style={{ display: 'flex' }}>
            {fluidImageObjects.map((fluidImage, i) => (
                // do the GatsbyNetlifyLfsFluid in here... and edit the maxWidth somehow??
                <GatsbyImage
                    fluid={fluidImage}
                    style={{
                        flex: fluidImage.aspectRatio,
                        marginRight: i === fluidImageObjects.length - 1 ? '' : '1rem'
                    }}
                    key={i}
                />
            ))}
        </div>
    )
}

export default ImageRow