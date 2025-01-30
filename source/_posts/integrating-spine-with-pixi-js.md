---
title: Rendering Spine animation with PIXI.JS
date: 2024-03-18 23:23:23
categories: technical
---

Spine 2D, a powerful tool for creating captivating animations, offers immense potential for web-based projects. However, integrating Spine animations seamlessly into web applications isn't always straightforward, as I discovered during my journey with [Petmety](https://github.com/abozanona/petmety), an exciting Chrome extension project aimed at bringing virtual pets to screens everywhere.

<!--more-->

During the development of Petmety, I encountered a perplexing issue while attempting to render Spine animations using the default [JavaScript web player](https://en.esotericsoftware.com/spine-player) provided by Spine. Instead of fluid movements, certain animations, like a character jump, exhibited unexpected behavior. Rather than smoothly moving up and down, the sprite would distort, scaling down before performing the action and then returning to its original size.

![](https://cdn.jsdelivr.net/gh/abozanona/me.abozanona/images/projects/integrating-spine-with-pixi-js/petmety-before.gif)

I delved into potential solutions, turning to Spine's documentation for guidance. There, I discovered references to external libraries that promised to address rendering issues. My research led me to explore various JavaScript libraries compatible with Spine animations. Among them, [PIXI.js](https://pixijs.com/) emerged as the standout choice. Renowned for its versatility and active development community, PIXI.js seemed tailor-made for the task.

However, my journey was far from over. PIXI.js presented its own set of challenges, particularly concerning its multitude of versions and broken [online examples](https://pixijs.io/examples-v7/#/plugin-spine/spineboy-pro). With significant disparities between versions 6, 7, and 8, finding relevant and functional examples proved arduous. Despite the official documentation's wealth of resources, many examples failed to execute properly, complicating my efforts to implement Spine animations seamlessly.

I started searching documentation and GitHub issues for insights. After numerous rounds of trial and error, I managed to run the Spineboy demo locally using PIXI.js libraries from their content delivery network (CDN). While this marked a significant milestone, it fell short of my ultimate goal due to the project's specific requirements.

As I aimed to integrate Spine animations into a Chrome extension using Manifest V3, I encountered additional hurdles. Navigating npm package dependencies and ensuring compatibility with an "eval-safe" environment posed new challenges. Fortunately, PIXI.js offered a lifeline with its [unsafe-eval](https://www.npmjs.com/package/@pixi/unsafe-eval) package, enabling functionality within such constrained environments.

After meticulously integrating packages, code, and assets while adhering to Manifest [V3's security constraints](https://developer.chrome.com/docs/extensions/develop/migrate/improve-security), victory was finally within reach. However, one last obstacle remained: animations refusing to render; no exception was showing in the console anymore, but also still nothing is rendered on the screen.

Through diligent research, I uncovered the solution—a crucial adjustment to the project's TypeScript configuration, compiling using ES6 modules. This is how the animation looks like after the fix.

![](https://cdn.jsdelivr.net/gh/abozanona/me.abozanona/images/projects/integrating-spine-with-pixi-js/petmety-after.gif)

In my endeavor to render Spine 2D animations within web environments, the development journey with Petmety has been characterized by a series of formidable challenges and notable achievements. From confronting perplexing rendering anomalies to navigating intricate disparities among PIXI.js versions and adhering to stringent manifest specifications, each hurdle has served as a crucible for personal and professional growth.

For those curious to explore the culmination of my efforts, I cordially invite you to delve into the Petmety project repository. Therein lies a firsthand depiction of the seamless integration of Spine animations into a Chrome extension.

For those intrigued by the technical intricacies of the solution implemented, I encourage you to follow this link to delve into the code detailing the fix I orchestrated: [Petmety GitHub Commit](https://github.com/abozanona/petmety/commit/748246c15145f6d6a8456c07806943de43d7673b). There, you'll find a comprehensive breakdown of the adjustments made to rectify the rendering issues encountered, providing valuable insights into the process of integrating Spine 2D animations into web environments with finesse and precision.