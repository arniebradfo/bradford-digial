/* @jsx jsx */
import { css, jsx } from "@emotion/react"
import React from "react"
import { Link, GatsbyLinkProps } from "gatsby"
import { useLocation, WindowLocation } from "@reach/router"

// https://stackoverflow.com/a/54950614/5648839

// export interface HistoryLinkState {
//     prevLocation: WindowLocation<unknown>,
// }

interface ExtraProps {
    from?: string,
}

export const LinkHistory: React.FunctionComponent<GatsbyLinkProps<any> & ExtraProps & any> = ({
    from,
    state,
    ...props
}) => {
    const location = useLocation()
    return (
        <Link {...props} state={{ prevLocation: location, from, ...state }}/>
    )
}
