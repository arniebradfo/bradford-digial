import { css } from "@emotion/react";

export const rootCss = css`

:root {
  --font-family-sans: 
    -apple-system, 
    BlinkMacSystemFont, 
    avenir next, 
    avenir,
    helvetica neue, 
    helvetica, 
    Ubuntu, 
    roboto, 
    noto, 
    segoe ui, 
    arial, 
    sans-serif;
  --font-family-mono: 
    Menlo, 
    Consolas, 
    Monaco, 
    Liberation Mono, 
    Lucida Console,
    monospace;
}

html,
body,
#___gatsby,
#gatsby-focus-wrapper
{
  overflow: hidden;
  height: 100%;
  width: 100%;
}
#gatsby-focus-wrapper{
  display: grid;
  grid-template: 1fr / 1fr;
}

// html {
  // font-family: sans-serif;
  // scroll-behavior: smooth;
  // overflow: hidden;
// }

body {
  color: #555;
  font-family: sans-serif;
  font-family: var(--font-family-sans, sans-serif);
  letter-spacing: 0.05ch;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #111;
  margin-top: 3em;
  line-height: 1.2em;
}
.mini-header {
  font-size: 1rem;
}

blockquote {
  font-style: italic;
}

hr {
  border: 1px solid #ddd;
  border-width: 1px 0 0 0;
  margin: 3rem 0;
}

time {
  font-size: 0.8rem;
  font-family: var(--font-family-mono);
}

// links
a {
  opacity: 0.8;
  transition: 100ms linear;
  transition-property: opacity, color;
  &:hover {
    opacity: 1;
  }
  .subtle-link &,
  &.subtle-link {
    color: inherit;
    &:hover {
      color: black;
    }
  }
}

`;
