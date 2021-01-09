import React from "react"
import { AnimateSharedLayout } from "framer-motion"
import { css } from "@emotion/core"

const Layout = ({ children, location }) => (
  <AnimateSharedLayout
    // css={css`
    //   overflow: hidden;
    //   height: 100%;
    //   outline: 1px solid red !important;
    // `}
  >
    {children}
  </AnimateSharedLayout>
)
export default Layout
