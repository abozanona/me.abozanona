---
title: Github pull requests
date: 2021-09-01 23:23:23
categories: projects
---

When I work on developing a new project, I always look for open source libraries and projects on Github to save me from reinventing the wheel. But in some cases, the code has issues or doesn't fulfill my project requirements, and that's when I modify the original code and create pull requests with my changes. <!--more--> Here are some of the pull requests I've created on Github in the past years.

## Flutter Cupertino Date Picker. <a href="https://github.com/imshashank/flutter-cupertino-date-picker/pull/2"><i class="fab fa-github"></i></a>

Flutter Cupertino Date Picker is a package that adds a nice Cupertino date picker to your Flutter application.

I used this library in one of my freelancing projects to display a nice datepicker to the users.

In my pull request, I fixed a typo in an Arabic word, and I fixed one line of code that was deprecated in the flutter version I was using in my project.

## Chrome Response Override. <a href="https://github.com/Pasupathi-Rajamanickam/chrome-response-override/pull/9"><i class="fab fa-github"></i></a>

Chrome Response Override is a Chrome devtools extension to modify response on the fly. I recommend using this extension for 'debugging' a webpage response. This extension is a better option than downloading binaries for applications in order to be able to intercept and modify responses.

I saw a website that takes the user input and sends it to a service running on its server to serve the user request. The website encrypts the data on the browser and sends the encrypted data to the server. I guess that website was doing that to make it hard for developers to use their service by calling the service endpoint immediately.

It was a challenge for me to find out the code that is responsible for encrypting the request body before sending it to the server. With the help of [Chrome Response Override](https://github.com/Pasupathi-Rajamanickam/chrome-response-override) extension, I was able to eliminate all files that has nothing to do with the encryption, and I was able to analyze a bundled script content and extract the part of code that encrypts the data 😄.

The extension was developed originally for replacing words in the response. I've made some modifications in the extension to add the support for replacing the whole code of a response. I've also added [CodeMirror](https://codemirror.net/) code editor to make it easy to modify the code from Chrome devtools.

## Story View. <a href="https://github.com/blackmann/story_view"><i class="fab fa-github"></i></a>

Story View is a flutter widget to display stories just like Whatsapp and Instagram. I used this package in one of my projects where I needed to develop a story in users profiles. I'm very grateful for [Degreat](https://github.com/blackmann) for this awesome package that he has developed.

The Story View package has an issue in supporting RTL. The story's progress bars on the top doesn't go from RTL. The gestures don't change on RTL layout also. And gestures stop working when there's a layout on top of it.

I also needed to add more functionalities to the story widget, including adding custom gestures like double click for like, and fix an issue where some of the content should be out of the mobile [SafeArea](https://api.flutter.dev/flutter/widgets/SafeArea-class.html).

I've made some modifications to the library to produce this new story view.

![](/images/projects/github-pull-requests/story-view-1.png)

![](/images/projects/github-pull-requests/story-view-2.png)

![](/images/projects/github-pull-requests/story-view-3.png)

![](/images/projects/github-pull-requests/story-view-4.png)

![](/images/projects/github-pull-requests/story-view-5.png)

## Admob Flutter. <a href="https://github.com/kmcgill88/admob_flutter/pull/150"><i class="fab fa-github"></i></a>

I used this Admob Flutter package in one of my applications to show Admob ads on my application.

The package has an issue when compiling the IOS application, so I fixed the issue and created a pull request with my fix.

## Interactive Webview. <a href="https://github.com/abozanona/interactive_webview"><i class="fab fa-github"></i></a>

The Interactive Webview plugin allows Flutter to communicate with a native WebView. I had some issues running the package with my project, so I forked the repo, fix the issues of missing swift version and error in libraries import, and added the library from my `pubspec.yaml` file.

```yaml
dependencies:
  interactive_webview:
    git:
      url: git://github.com/abozanona/interactive_webview.git
      ref: master
```

## Nativescript ZXing. <a href="https://github.com/abozanona/nativescript-zxing"><i class="fab fa-github"></i></a>

I needed to use both [nativescript-zxing](https://market.nativescript.org/plugins/nativescript-zxing/) and [nativescript-barcodescanner](https://market.nativescript.org/plugins/nativescript-barcodescanner/) in one of my NativeScript projects, and that caused a conflict between the two libraries. That's why I had to modify the NativeScript ZXing repo code and resolve the code issue that causes the conflict between the two libraries.

In my package.json file, I imported nativescript-zxing from my Github repo instead of importing it from npm.