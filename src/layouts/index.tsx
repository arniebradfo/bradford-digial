import React from "react"
import { AnimateSharedLayout } from "framer-motion"
import { css } from "@emotion/react"
import { useParams, useLocation } from "@reach/router"
import { useScrollRestoration } from "gatsby"

const Layout = ({ children, location }) => {

  // console.log(useParams());
  // console.log(useLocation());
  console.log(location);
  
  
  return (
  <AnimateSharedLayout

    type="crossfade"
  >
    {children}
  </AnimateSharedLayout>
)}
export default Layout
