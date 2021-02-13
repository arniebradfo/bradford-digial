/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { usePopPush } from "../hooks/usePopPush"


const Layout = ({ children, location }) => {

  // console.log(location, location.state.prevLocation);
  // const from = location?.state?.from
  // console.log('from:', from);
  // const popPush = usePopPush()
  // console.log(popPush);

  return (
    <AnimateSharedLayout
      type="crossfade"
    >
      {/* <AnimatePresence
        // exitBeforeEnter
      >   */}
        {children}
      {/* </AnimatePresence> */}
    </AnimateSharedLayout>
    
)}
export default Layout
