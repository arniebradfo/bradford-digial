// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GatsbyImage from "gatsby-image"

import { FixedObjectNetlify, FluidObjectNetlify } from "../../scripts/gatsby-image-netlify"

type DataProps = {
  testImg: {
    publicURL: string
    childImageSharp: any
    base: string
  }
}

const ImageTests: React.FC<PageProps<DataProps>> = ({ data, path, location }) => (
  <Layout title="Netlify LFS Large Media Resize Tests" location={location}>
    <SEO title="Netlify Image Test" />

    <GatsbyImage fixed={FixedObjectNetlify(data.testImg.publicURL, { width: 100, height: 100, fileName: data.testImg.base })} backgroundColor />
    <GatsbyImage fixed={FixedObjectNetlify(data.testImg.publicURL, { width: 100, fileName: data.testImg.base })} backgroundColor />
    <GatsbyImage fixed={FixedObjectNetlify(data.testImg.publicURL, { height: 100, fileName: data.testImg.base })} backgroundColor />
    <GatsbyImage fixed={FixedObjectNetlify(data.testImg.publicURL, { fileName: data.testImg.base })} backgroundColor />
    {/* <GatsbyImage fixed={data.testImg.childImageSharp.fixed} backgroundColor /> */}

    <GatsbyImage fluid={FluidObjectNetlify(data.testImg.publicURL, { maxWidth: 630, fileName: data.testImg.base })} backgroundColor />
    <GatsbyImage
      fluid={FluidObjectNetlify(data.testImg.publicURL, {
        maxWidth: 630,
        fileName: data.testImg.base,
        srcSetBreakpoints: [100, 200, 300, 400, 500, 630],
        sizes: "(max-width: 672px) calc(100vw - 21), 672px"
      })}
      backgroundColor />
    {/* <GatsbyImage fluid={data.testImg.childImageSharp.fluid} backgroundColor /> */}
  </Layout>
)

export default ImageTests

export const query = graphql`
  {
    testImg: file(absolutePath: { regex: "/James-Bradford-Travel-Photo-Japan-8.jpg/" }) {
      publicURL
      base
      # childImageSharp {
      #   fixed(height: 50) {
      #     ...GatsbyImageSharpFixed
      #   }
      #   fluid(maxWidth: 630, srcSetBreakpoints:[300, 1000]) {
      #     ...GatsbyImageSharpFluid
      #   }
      # }
    }
  }
`
