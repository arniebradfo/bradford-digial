import React from "react"
import { css } from "@emotion/react"
import Logo from '../../content/assets/logo/hexagon.inline.svg';
import { graphql, Link, useStaticQuery } from "gatsby"
import '../style/style.less'
import Constants from "../constants";
import { animationProps } from "../style/animations";
import { motion } from "framer-motion";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: 'hero' | 'small',
}

export const Header: React.FunctionComponent<Props> = ({ size = 'small', ...props }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          # title
          description
          author {
            name
            # summary
          }
        }
      }
    }
  `)

  const { author, description: subtitle } = data.site.siteMetadata

  switch (size) {
    case 'hero':
      return (<HeaderHero {...props} {...{ title: author.name, subtitle }} />)
    case 'small':
      return (<HeaderSmall {...props} {...{ title: author.name, subtitle }} />)
  }
}

interface PropsMore extends Props {
  title: string,
  subtitle: string,
}

const HeaderHero: React.FunctionComponent<PropsMore> = ({ title, subtitle, ...props }) => {
  return (
    <motion.header
      {...props}
      css={css`
          display: flex;   
          align-items: center;
          flex-wrap:wrap;
        `}
      {...animationProps}
      key={'header-hero'}
    >

      <Logo css={css`
        width: 75px;
        margin-right: 1.5rem;
        margin-left: -10px;
        @media (min-width: ${Constants.maxWidth * 1.2}px) {
          margin-left: -30px;
        }
      `} />

      <h1 css={css`
        margin: 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
      `}>
        <span css={css`
          text-transform: lowercase;
          letter-spacing: 0.05ch;
        `}>
          {title}
        </span>
        <br />
        <span css={css`
          opacity: 0.6; 
          font-weight: normal;
          font-size: 1rem;
        `}>
          {subtitle}
        </span>
      </h1>

    </motion.header>
  )
}


const HeaderSmall: React.FunctionComponent<PropsMore> = ({ title, subtitle, size, ...props }) => {
  return (
    <motion.header
      {...props}
      css={css`
          display: flex;   
          align-items: center;
        `}
      {...animationProps}
      key={'header-small'}
    >

      <Link
        to={`/`}
        className={'subtle-link'}
        css={css`
          text-decoration: none; 
          opacity: 1;
          text-transform: lowercase;
        `}
      >
        <Logo css={css`
            width: 30px;
            .hexagon{opacity:0;}
            margin-right: 1rem;
          `} />
        <span >
          {title}
        </span>
      </Link>

    </motion.header>
  )
}
