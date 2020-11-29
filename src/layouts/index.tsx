import React from "react"
import { AnimateSharedLayout } from "framer-motion"

const Layout = ({ children, location }) => (
  <AnimateSharedLayout>{children}</AnimateSharedLayout>
)
export default Layout
