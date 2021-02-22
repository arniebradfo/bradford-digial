/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"

interface Props extends React.ComponentProps<'div'> { }

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
