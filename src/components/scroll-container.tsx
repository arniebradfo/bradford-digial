import React from "react"
import { css } from "@emotion/core"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const ScrollContainer: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
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
    >
      {children}
    </div>
  )
}
