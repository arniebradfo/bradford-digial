import React from "react"
import { Link } from "gatsby"
import '../style/style.less'

const Layout = ({ location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // if (location.pathname === rootPath) {

  return (
    <div>
      <header>
        <h1>
          <Link to={`/`} >
            {title}
          </Link>
        </h1>
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
