import React from "react"
import { css } from "@emotion/core"
import Logo from '../../content/assets/logo/hexagon.inline.svg';
import { graphql, Link, useStaticQuery } from "gatsby"
import '../style/style.less'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: 'hero' | 'small',
}

export const Header: React.FunctionComponent<Props> = ({ size = 'small', ...props }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          description
          # author {
          #   name
          #   summary
          # }
        }
      }
    }
  `)

  const { title, description: subtitle } = data.site.siteMetadata

  switch (size) {
    case 'hero':
      return (<HeaderHero {...props} {...{ title, subtitle }} />)
    case 'small':
      return (<HeaderSmall {...props} {...{ title, subtitle }} />)
  }
}

interface PropsMore extends Props {
  title: string,
  subtitle: string,
}

const HeaderHero: React.FunctionComponent<PropsMore> = ({ title, subtitle, ...props }) => {
  return (
    <header
      {...props}
      css={css`
          display: flex;   
          align-items: center;
        `}
    >

      <Logo css={css`
        width: 75px;
        margin-left: -30px;
      `} />

      <h1 css={css`
        margin: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1em;
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

    </header>
  )
}


const HeaderSmall: React.FunctionComponent<PropsMore> = ({ title, subtitle, size, ...props }) => {
  return (
    <header
      {...props}
      css={css`
          display: flex;   
          align-items: center;
        `}
    >

      <Logo css={css`
          width: 30px;
          .hexagon{opacity:0;}
          margin-right: 1rem;
        `} />

      <Link to={`/`} >
        {title}
      </Link>

    </header>
  )
}
