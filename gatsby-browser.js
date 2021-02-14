import "prismjs/themes/prism.css"

import React from "react"
import Layout from './src/layouts'

// const React = require("react")
// const Layout = require("./src/layouts")

export const wrapRootElement = ({ element }) => {
    return (
        <Layout>{element}</Layout>
    )
}