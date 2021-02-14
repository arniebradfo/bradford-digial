/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { PageProps, graphql } from "gatsby"
import { SEO } from "../components/seo"
import GatsbyImage from "gatsby-image"
import { GatsbyNetlifyLfsFixed, GatsbyNetlifyLfsFluid } from "../../scripts/gatsby-image-netlify-lfs"
import { Header } from "../components/header"

type DataProps = {
  testImg: {
    publicURL: string
    childImageSharp: any
    base: string
  }
}

const ImageTests: React.FC<PageProps<DataProps>> = ({ data, path, location }) => (
  <div>
    <Header />
    <SEO title="Netlify Image Test" />

    <GatsbyImage fixed={GatsbyNetlifyLfsFixed({ src: data.testImg.publicURL, fileName: data.testImg.base, width: 100, height: 100 })} backgroundColor />
    <GatsbyImage fixed={GatsbyNetlifyLfsFixed({ src: data.testImg.publicURL, fileName: data.testImg.base, width: 100 })} backgroundColor />
    <GatsbyImage fixed={GatsbyNetlifyLfsFixed({ src: data.testImg.publicURL, fileName: data.testImg.base, height: 100 })} backgroundColor />
    <GatsbyImage fixed={GatsbyNetlifyLfsFixed({ src: data.testImg.publicURL, fileName: data.testImg.base, })} backgroundColor />
    {/* <GatsbyImage fixed={data.testImg.childImageSharp.fixed} backgroundColor /> */}

    <GatsbyImage fluid={GatsbyNetlifyLfsFluid({ src: data.testImg.publicURL, fileName: data.testImg.base, maxWidth: 630 })} backgroundColor />
    <GatsbyImage
      fluid={GatsbyNetlifyLfsFluid({
        src: data.testImg.publicURL,
        fileName: data.testImg.base,
        maxWidth: 630,
        srcSetBreakpoints: [100, 200, 300, 400, 500, 630, 1260],
        sizes: "(max-width: 864px) calc(100vw - 64px), 864px"
      })}
      backgroundColor />
    <GatsbyImage fluid={GatsbyNetlifyLfsFluid({ src: data.testImg.publicURL, fileName: data.testImg.base, maxHeight: 630 })} backgroundColor />
    <GatsbyImage fluid={GatsbyNetlifyLfsFluid({ src: data.testImg.publicURL, fileName: data.testImg.base, maxWidth: 400, maxHeight: 600 })} backgroundColor />
    {/* <GatsbyImage fluid={data.testImg.childImageSharp.fluid} backgroundColor /> */}
  </div>
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
      #   fluid(maxWidth: 400, maxHeight: 600) {
      #     ...GatsbyImageSharpFluid
      #   }
      # }
    }
  }
`
