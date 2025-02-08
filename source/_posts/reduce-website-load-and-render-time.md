---
title: Reduce website load and render time
date: 2024-11-23 23:23:23
categories: project
---

Since last August, I’ve been working on an exciting freelancing project to rebuild and optimize a long-running customer website. The original website had performance issues, with slow loading speeds affecting user experience. My goal was not just to rebuild but to significantly improve the speed and efficiency of the site. Here's how I approached it.

<!--more-->

## Starting Fresh with a Strong Foundation

The first step was selecting a reliable framework. I chose a Vue.js Vuetify theme to rebuild the website, offering a modern design and a solid structure. After completing the initial build, I shifted my focus to aggressive optimization to ensure top-notch performance.

## Code Refinement and Optimization

A key part of improving speed was streamlining the codebase:

1. Cleaning Up Components and Dependencies
   I identified and removed unused components and unnecessary dependencies from the code and `package.json`, ensuring a lean and efficient setup.

2. Strict Code Quality Rules
   Enforcing strict linting rules in `.eslintrc` helped catch and prevent issues like undefined or unimported components.

3. Bundle Analysis and Reduction
   Using my `"bundle-visualize"` command (`npx vite-bundle-visualizer`), I identified large, unused modules in the bundle. Removing them reduced the overall bundle size and optimized load times.

4. Minification of CSS and JS
   Enabling CSS and JavaScript minification in the build process further reduced file sizes, cutting down the data sent to users.

## Addressing CSS Bottlenecks

One major hurdle was the size of the bundled CSS file. During analysis, I found several opportunities for improvement:

- Optimizing Material Design Icons (MDI)
  By default, all MDI icons were included in the CSS file. Importing only the icons used in the project and loading them in SVG format significantly reduced the file size.

- Simplifying Component Usage
  I avoided Vuetify components with overly complex functionality and styles, instead opting for simpler custom components that better fit the project’s needs.

- Dynamic CSS Loading
  CSS files are now loaded dynamically for components only when they are rendered. This split approach ensures smaller, more manageable CSS files while improving rendering performance.

## Optimizing Images

Images often account for a large portion of page load times, so I implemented the following strategies:

- WebP Conversion and Compression
  Images uploaded by users are compressed and converted to WebP format in a separate thread, reducing their size without compromising quality.

- Lazy Loading
  For image-heavy pages, lazy loading ensures that images are loaded only when they appear on the screen, improving initial load times.

- Leveraging a CDN
  All images are served through a CDN, ensuring faster delivery to users regardless of their geographic location.

Additionally, when migrating all images from the old website to the new one, I compressed them and converted them to WebP. The customer was impressed by the enhanced user experience during testing.

## Server-Level Enhancements

To support the front-end improvements, I optimized the server setup:

- Gzip Compression
  Configuring gzip compression on the nginx server ensured that transferred files were compressed, speeding up delivery.

- Effective Caching
  Proper caching mechanisms for objects(redis), assets(cache time) and pages(zgip) minimized redundant data transfer and improved repeat visits' speed.

## Splitting Applications and Resources

The project involved three distinct applications, which initially shared a single JavaScript file. I split the Vue application into three separate modules, ensuring that each application loaded only the libraries and resources it needed. This significantly reduced unnecessary resource loading across the board.

## Impressive Results and Future Plans

Applying these strategies has drastically reduced the website's loading time compared to the old version. The final CSS and JavaScript bundles are much smaller, and the split CSS files have made a noticeable difference in performance.

However, the optimization journey doesn’t stop here. I plan to explore additional techniques to further improve loading speed in the future. This project has been a rewarding challenge, blending technical problem-solving with creative thinking. I’m excited to see how users respond to the improved experience when the site launches in February.  