import React from "react"
import { css } from "@emotion/core"

import Logo from '../../content/assets/logo/hexagon.inline.svg';
import { Link } from "gatsby"
import '../style/style.less'

const Layout = ({ location, title, subtitle = '', children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <div>
      <header css={css`
          display:flex;   
          align-items: center;
        `}>

        <Logo css={css`
          width: 75px;
          .hexagon{
            opacity: 0.1;
          }
        `} />

        {(location.pathname === rootPath) ? (
          <h1 css={css`margin:1rem;`}>{title}</h1>
        ) : (
            <Link to={`/`} >{title}</Link>
          )}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
