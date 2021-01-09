import React from "react"
import { css } from "@emotion/core"

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const Template: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} css={css``}>
      {children}
    </div>
  )
}

// COPY AND PASTE THIS BOILERPLATE ELEMENT //
