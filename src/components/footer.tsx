import React from "react"
import { css } from "@emotion/react"
import Logo from '../../content/assets/logo/hexagon.inline.svg';
import { Link } from "gatsby";
import { animationProps } from "../style/animations";
import { motion } from "framer-motion";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> { }

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
      <Link to={'/'} css={css`opacity: 1;`} state={{prevLocation: location}}>
        <Logo css={css`
          width: 30px;
          .hexagon{
            opacity: 0;
          }
        `} />
      </Link>
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