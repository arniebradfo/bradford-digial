/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { LinkHistory } from "../components/link-history"
import SEO from "../components/seo"
import { Header } from "../components/header"

const NotFoundPage = ({ data, location }) => {
  return (
    <div>
      <Header />
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <LinkHistory to='./' from={'404'}>Home</LinkHistory>
    </div>
  )
}

export default NotFoundPage
