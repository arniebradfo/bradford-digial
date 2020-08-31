---
title: "Transitions: WordPress Portfolio Theme"
date: "2019-01-08"
---

I built a wordpress theme to showcase my portfolio. It features a simple, content-first design with smooth page load and unload animations. Everything ‘transitions’ from one state/page to another. You can view the theme’s repo on [github](https://github.com/arniebradfo/Transitions). I plan to get the theme running well enough to be hosted on the WordPress.com theme repo.

## The Goal: A Progressive Web App Theme.

The original goal was to build the frontend in Angular and pull from the Wordpress REST API. This way I could the [FLIP animation technique](https://aerotwist.com/blog/flip-your-animations/) to smoothly ‘transition’ between any two pages like in this animation:

![](https://bradford.digital/bradford-digital/wp-content/uploads/Transitions-Theme-Animation.gif)

I even built a functioning [WordPress-Angular boilerplate theme](https://github.com/arniebradfo/ng-wp-theme), but now I think it might be wiser to use React. WordPress’s Gutenberg Editor is written in React, and I don’t think it will be long before WordPress officially supports React-based themes as well.