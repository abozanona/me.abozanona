---
title: Solving mobile video issues with `playsinline`
date: 2025-01-7 23:23:23
categories: technical
---

While working on a project that involved building a massive video library, I ran into an interesting issue on mobile devices. On certain pages, we had **short video previews** that auto-played as soon as the user navigated to the page. While it worked perfectly on desktop browsers, mobile browsers kept forcing the videos into fullscreen mode as soon as they started playing.

<!--more-->

This wasn’t the experience we wanted. The goal was to keep the videos inline — playing directly on the page without taking over the entire screen. Another related issue, when users clicked on a video on mobile, it would also jump into fullscreen mode, disrupting the browsing flow.

After some research, I found the culprit: **the missing `playsinline` attribute**.

The `playsinline` attribute is a simple yet powerful property for HTML `<video>` elements. By default, mobile browsers often play videos in fullscreen mode to provide a better viewing experience on small screens. However, there are many cases — like my project — where you don’t want that behavior.

Adding the `playsinline` attribute tells the browser to play the video **directly within the page** (inline) instead of switching to fullscreen. Here’s what it looks like:

```html
<video src="example.mp4" controls playsinline></video>
```

With `playsinline` in place, the video stays embedded within the page, allowing users to watch it without breaking their browsing flow.

By adding this small but impactful attribute, I was able to resolve the fullscreen playback issue on mobile and create a smoother experience for our video library users.
