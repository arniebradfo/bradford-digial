import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import { Header } from "../components/header"

const NotFoundPage = ({ data, location }) => {
  return (
    <div>
      <Header />
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to='./'>Home</Link>
    </div>
  )
}

export default NotFoundPage
