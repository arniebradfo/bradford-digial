import React from "react"
import { AnimateSharedLayout } from "framer-motion"
import { css } from "@emotion/core"

const Layout = ({ children, location }) => (
  <AnimateSharedLayout
    // css={css` // this component doesn't render an element
    //   overflow: hidden;
    //   height: 100%;
    //   outline: 1px solid red !important;
    // `}
    type="crossfade"
  >
    {children}
  </AnimateSharedLayout>
)
export default Layout
