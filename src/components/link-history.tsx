/* @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/react"
import { Link, GatsbyLinkProps } from "gatsby"
import { useLocation, WindowLocation } from "@reach/router"

// https://stackoverflow.com/a/54950614/5648839

export interface HistoryLinkState {
    prevLocation: WindowLocation<unknown>,
}

export const LinkHistory: React.FunctionComponent<GatsbyLinkProps<HistoryLinkState> & any> = ({
    ...props
}) => {
    const location = useLocation()
    return (
        <Link {...props} state={{ prevLocation: location }}/>
    )
}
