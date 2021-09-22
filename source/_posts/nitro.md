---
title: Nitro
date: 2019-06-13 23:23:23
categories: project
---

# Android application

[Nitro](https://nitro.co.com/) is an android application for advertising. The application is for Nitro company for media and advertisement. The application is downloaded on tablets that are setupped in the city taxis. The app loads advertisements from a server and displays them to people in the taxi. Ads are only shown to users when they are in a specific range with the advertiser store. <!--more-->

The application also creates a hotspot that all people in the taxi can connect to. The hotspot allows users to server limited websites and applications.

The application was developed using native android SDK.

One of the challenging features that was built in this application was preventing users from interacting with the application and tablet in all possible ways. Here are some of the ways I did that.

 - Disabled interacting with hardware buttons.
 - Prevented the interaction with the screen.
 - Designed the application as a Launcher Application.
 - Removed lock screen.
 - Registered the application to the Accessibility Service to listen to and prevent all possible interactions with the device.
 - Ran a VPN on the tablet to limit web pages users can access.

# Admin panel

There's also an admin panel where admins can manage advertisers' subscriptions and control displayed ads.

I user NodeJs to build the REST API and Angular to build the admin panel.