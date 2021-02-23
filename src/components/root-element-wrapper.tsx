/* @jsx jsx */
import { css, Global, jsx } from "@emotion/react"
import React from "react"
import { GlobalProvider } from "../hooks/global-context"
import { imageCss } from "../style/images"
import { rootCss } from "../style/style"
import { AnimationWrapper } from "./animation-wrapper"

interface Props extends React.ComponentProps<'div'> {
    element: JSX.Element,
}

export const RootElementWrapper: React.FunctionComponent<Props> = ({
    children,
    element,
    ...props
}) => {
    children = children || element;
    return (
        <GlobalProvider>
            <AnimationWrapper>
                <Global styles={[rootCss, imageCss]} />
                {children}
            </AnimationWrapper>
        </GlobalProvider>
    )
}

export default RootElementWrapper
