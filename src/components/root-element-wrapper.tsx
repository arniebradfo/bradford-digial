/* @jsx jsx */
import { css, Global, jsx } from "@emotion/react"
import React from "react"
import { PopPushProvider } from "../hooks/usePopPush"
import { imageCss } from "../style/images"
import { rootCss } from "../style/style"
import { AnimationWrapper } from "./animation-wrapper"

interface Props extends React.ComponentProps<'div'> {
    element: JSX.Element,
    isSSR?: boolean,
}

export const RootElementWrapper: React.FunctionComponent<Props> = ({
    element,
    isSSR = false,
    ...props
}) => {
    // if isSSR set a global state?
    return (
        <PopPushProvider>
            <AnimationWrapper>
                <Global styles={[rootCss, imageCss]} />
                {element}
            </AnimationWrapper>
        </PopPushProvider>
    )
}
