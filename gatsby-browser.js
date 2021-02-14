import 'prismjs/themes/prism.css'
import 'sanitize.css'

import React from 'react'
import Layout from './src/layouts'
import { Global } from '@emotion/react'
import { rootCss } from './src/style/style'
import { imageCss } from './src/style/images'

export const wrapRootElement = ({ element }) => {
    return (
        <Layout>
            <Global styles={[rootCss,imageCss]}/>
            {element}
        </Layout>
    )
}