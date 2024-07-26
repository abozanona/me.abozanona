---
title: How to load fonts inside shadow dom
date: 2024-07-20 23:23:23
categories: technical
---

While working on [Petmety](https://github.com/abozanona/petmety), I encountered a situation where I needed to load a custom font for text elements inside a Shadow DOM. I chose to encapsulate everything within a Shadow DOM to separate state, CSS, and logic. This task turned out to be somewhat tricky, so I decided to share my solution with you.

<!--more-->

## Why Use Shadow DOM?

Before diving into the technical steps, let's briefly discuss why you might want to use a Shadow DOM. The Shadow DOM is part of the Web Components standard, providing a way to create encapsulated DOM and CSS for web components. This encapsulation ensures that styles and scripts are scoped to the component, preventing conflicts with the rest of the page. This makes Shadow DOM perfect for developing modular and reusable components.


## Step 1: Add Your Fonts to the Manifest **

The first step is to ensure that your font files are accessible to your extension. This is done by specifying the fonts in the web_accessible_resources section of your manifest file. This configuration allows your extension to load these resources.

```json
"web_accessible_resources": [
    {
        "resources": ["assets/fonts/*", "style/shadow-dom-custom.css", ...],
        "matches": ["http://*/*", "https://*/*"]
    }
]
```

Here, we list the paths to the font files and any other resources, such the CSS file that we will load later in our shadow dom, that need to be accessible.


## Step 2: Define the @font-face Rule in Your Content Script

To load the font inside the Shadow DOM, you need to define the `@font-face` rule in a CSS file that is injected into the page. Use the special `__MSG_@@extension_id__` placeholder to dynamically insert the extension's ID, allowing access to the font file.

```css
@font-face {
  font-family: "MyCustomFont";
  src: url("chrome-extension://__MSG_@@extension_id__/assets/fonts/my-custom-font--regular.ttf") format("truetype");
  font-weight: 100;
}
```

This code tells the browser to load "MyCustomFont" from the specified path. The `chrome-extension://__MSG_@@extension_id__` URL format ensures that the correct path to the font file is used, regardless of the extension ID.


## Step 3: Add Font Rule in Shadow DOM CSS

Next, you need to apply the custom font within the Shadow DOM by adding the appropriate CSS rules inside `shadow-dom-custom.css`. This involves creating or modifying a CSS file that is specifically used within your Shadow DOM.


```css
* {
  font-family: "MyCustomFont", sans-serif;
}
```

This rule ensures that all elements within the Shadow DOM use the custom font, falling back to `sans-serif` if necessary.


## Step 4: Inject the CSS into the Shadow DOM

The final step is to programmatically inject the `shadow-dom-custom.css` file into your Shadow DOM. This ensures that the styles defined in the CSS file are applied within the Shadow DOM.

```javascript
var link = document.createElement("link");
link.id = "shadow-style";
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("/style/shadow-dom-custom.css");
link.media = "all";
container.shadowRoot.appendChild(link);
```

## Benefits of Using Custom Fonts in Shadow DOM
- **Encapsulation**: Using Shadow DOM encapsulates the custom font, preventing conflicts with other styles on the page.
- **Modularity**: Each component can have its own styles and fonts, making it easier to manage and maintain.
- **Consistency**: Ensures a consistent look and feel across different components and sections of your application.

By following these steps, I was able to load custom fonts inside a Shadow DOM, keeping my styles and logic neatly encapsulated.