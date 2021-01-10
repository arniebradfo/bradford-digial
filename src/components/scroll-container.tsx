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
        margin: 0 auto;
        /* @padding: 32px; */
        max-width: 864px;
        padding: 32px;
      `}
      {...(scrollKey ? scrollRestoration : {})}
    >
      {children}
    </div>
  )
}
