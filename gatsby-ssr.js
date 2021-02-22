import 'prismjs/themes/prism.css'
import 'sanitize.css'

import React from 'react'
import { RootElementWrapper } from './src/components/root-element-wrapper'

export const wrapRootElement = ({ element }) => {
    return (<RootElementWrapper element={element} isSSR/>)
}