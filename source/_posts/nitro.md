---
title: Nitro
date: 2019-06-13 23:23:23
categories: project
---

# Android application

[Nitro](https://nitro.co.com/) is an android application for advertising. The application is for Nitro company for media and advertisement. The application is downloaded on taplets that are setupped in the city taxis. The app loads advertises from a server and displayes them to people in the taxi. Ads are only shown to users when they are in a specific range with the advertiser store. <!--more-->

The aplication also creates a hotsopt that all people in the taxi can connect to. The hutspot allows users to server limited websites and applications.

The application was developed using native android SDK.

One of the challenging features that was built in this application was preventing users from interacting with the application and taplet in all possible ways. Here are some of the ways I did that.

 - Disabled interacting with hardware buttons.
 - Prevented the interaction with the screen.
 - Designed the application as a Launcher Application.
 - Removed lock screen.
 - Registered the application to the Accessibility Service to listen to and prevent all possible interactions with the device.
 - Ran a VPN on the taplet to limit web pages users can access.

# Admin panel

There's also an admin panel where admins can manage advertisers subscriptions and controll displayed ads.

I user NodeJs to build the REST API and Angular to build the admin panel.