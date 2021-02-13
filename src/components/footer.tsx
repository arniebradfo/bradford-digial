/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import Logo from '../../content/assets/logo/hexagon.inline.svg';
import { LinkHistory } from "./link-history";
import { animationProps } from "../style/animations";
import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"footer"> { }

export const Footer: React.FunctionComponent<Props> = ({ ...props }) => {
  return (
    <motion.footer
      key={`site-footer`}
      {...animationProps} 
      css={css`
        margin: 8rem 0 0 0;
        font-family: var(--font-family-mono);
        font-size: 0.75rem;
        text-align: center;
      `}
      {...props}
    >
      <LinkHistory
        to={'/'}
        from={'footer-logo'}
        css={css`opacity: 1;`}
      >
        <Logo css={css`
          width: 30px;
          .hexagon{
            opacity: 0;
          }
        `} />
      </LinkHistory>
      <p>
        <span>
          bradford.digital v4.0  ©{new Date().getFullYear()}
        </span>
        <br />
        <span>
          Built with <a href="https://www.gatsbyjs.com/">Gatsby</a>.
          Hosted on <a href="https://www.netlify.com/">Netflify</a>.
          Code on <a href="https://github.com/arniebradfo/bradford-digital">GitHub</a>.
        </span>
      </p >
    </motion.footer>
  )
}