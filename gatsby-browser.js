import 'prismjs/themes/prism.css'
import 'sanitize.css'

import React from 'react'
import { AnimationWrapper } from './src/components/animation-wrapper'
import { Global } from '@emotion/react'
import { rootCss } from './src/style/style'
import { imageCss } from './src/style/images'

export const wrapRootElement = ({ element }) => {
    return (
        <AnimationWrapper>
            <Global styles={[rootCss,imageCss]}/>
            {element}
        </AnimationWrapper>
    )
}