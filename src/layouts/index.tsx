import React from "react"
import { AnimateSharedLayout } from "framer-motion"
import { css } from "@emotion/react"

const Layout = ({ children, location }) => {

  // console.log(location, location.state.prevLocation);
  const from = location.state.from
  console.log('from:', from);

  return (
  <AnimateSharedLayout type="crossfade" >
    {children}
  </AnimateSharedLayout>
)}
export default Layout
