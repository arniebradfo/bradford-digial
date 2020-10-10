import React from "react"
import { css } from "@emotion/core"
import Logo from '../../content/assets/logo/hexagon.inline.svg';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> { }

export const Footer: React.FunctionComponent<Props> = ({ ...props }) => {
  return (
    <footer
      {...props}
    >
      <Logo css={css`
        width: 30px;
        .hexagon{
          opacity: 0;
        }
      `} />
      <p>bradford.digital v4.0  ©{new Date().getFullYear()}</p>
      <p>
        Built with <a href="#">Gatsby</a>.
        Hosted on <a href="#">Netflify</a>.
        Code on <a href="#">GitHub</a>.
      </p >
    </footer>
  )
}