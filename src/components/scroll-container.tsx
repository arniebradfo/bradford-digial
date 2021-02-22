/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { useScrollRestoration } from "gatsby"

interface Props extends React.ComponentPropsWithRef<'div'> {
  scrollKey?: string
}

export const ScrollContainer: React.FunctionComponent<Props> = ({
  scrollKey,
  // children,
  ...props
}) => {
  const scrollRestoration = useScrollRestoration(scrollKey)
  const scrollRestorationProps = scrollKey ? scrollRestoration : {}
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
