/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { useScrollRestoration } from "gatsby"
import { useIsSSR } from "../hooks/usePopPush"

interface Props extends React.ComponentPropsWithRef<'div'> {
  scrollKey?: string
}

export const ScrollContainer: React.FunctionComponent<Props> = ({
  scrollKey,
  // children,
  ...props
}) => {
  // this conditional useScrollRestoration feels wrong. but gatsby gives me a srr error?
  const isSSR = useIsSSR()
  // const scrollRestoration = useScrollRestoration(scrollKey) 
  const scrollRestorationProps = scrollKey && !isSSR ? useScrollRestoration(scrollKey) : {}
  return (
    <div
      css={css`
        overflow-y: auto;
        height: 100%;
        width: 100%;
        grid-column: 1 / 2;
        grid-row: 1 / 2;  
      `}
      {...props}
      {...scrollRestorationProps}
    />
  )
}
