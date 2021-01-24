import React from "react"
import { css } from "@emotion/react"
import { useScrollRestoration } from "gatsby"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
    scrollKey?:string
  }

export const ScrollContainer: React.FunctionComponent<Props> = ({
  scrollKey,
  children,
  ...props
}) => {
  const scrollRestoration = useScrollRestoration(scrollKey)

  return (
    <div
      {...props}
      css={css`
        overflow-y: auto;
        height: 100%;
        width: 100%;
        grid-column: 1 / 2;
        grid-row: 1 / 2;  
      `}
      {...(scrollKey ? scrollRestoration : {})}
    >
      {children}
    </div>
  )
}
