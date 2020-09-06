// If you don't want to use TypeScript you can delete this file!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GatsbyImage from "gatsby-image"

import { FixedObjectNetlify, FluidObjectNetlify } from "../components/gatsby-image-netlify"

type DataProps = {
  testImg: {
    publicURL: string
    name: string
    childImageSharp: any
    size: number
  }
}

const ImageTests: React.FC<PageProps<DataProps>> = ({ data, path, location }) => {
  console.log(data.testImg);

  return (
    <Layout title="Netlify LFS Large Media Resize Tests" location={location}>
      <SEO title="Netlify Image Test" />

      <GatsbyImage fixed={FixedObjectNetlify(data.testImg.publicURL, { width: 50, height: 50, fileSize: data.testImg.size })} backgroundColor />
      {/* <GatsbyImage fixed={data.testImg.childImageSharp.fixed} backgroundColor /> */}

      <GatsbyImage fluid={FluidObjectNetlify(data.testImg.publicURL, { maxWidth: 400, fileSize: data.testImg.size })} backgroundColor />
      {/* <GatsbyImage fluid={data.testImg.childImageSharp.fluid} backgroundColor /> */}
    </Layout>
  )
}

export default ImageTests

export const query = graphql`
  {
    testImg: file(absolutePath: { regex: "/James-Bradford-Travel-Photo-Japan-8.jpg/" }) {
      # publicURL
      # name
      # size

      publicURL
      id
      absolutePath
      relativePath
      relativeDirectory
      sourceInstanceName

      root
      dir
      base
      ext
      extension
      name

      blksize
      blocks
      dev
      size

      # childImageSharp {
      #   fixed(width: 50, height: 50) {
      #     ...GatsbyImageSharpFixed
      #   }
      #   fluid(maxWidth: 630, srcSetBreakpoints:[300]) {
      #     ...GatsbyImageSharpFluid
      #   }
      # }
    }
  }
`
