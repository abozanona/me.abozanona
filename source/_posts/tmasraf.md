---
title: Tmasraf
date: 2018-12-07 23:23:23
categories: project
---

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-splash-screen.png)

Tmasraf is one of the projects I worked on as a freelancer. It's a cashback mobile app where customers get points from shopping. <!--more-->

In Tmasraf, I developed two mobile applications(one for customers and one for merchants), and a control panel for admins.

Tmasraf was developed using NodeJS\[Express\] and NativeScript.

> The first version of the mobile application was developed using Xamarin.Forms, but I switched to NativeScript to improve application performance.

## Tmasraf admin panel.

The admin panel gives admins access to website statistics and allows them to manage merchants' subscriptions.

## Tmasraf customers application.

Users can create a new account in Tmasraf customers application to access its features. Once users create an account they can start collecting points.

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-user-profile.png)

Every new user gets a unique QR code that can be used in earning points.

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-user-home.png)

Users can see a list of all subscribed stores in the application and explore their location and products.

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-user-menu.png)

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-user-stores.png)

Customers can earn a point from buying products from the subscribed stores by allowing the stores to scan their QR code from the merchant application. I implemented a secure method to transfer points between customers and merchants using QR code scanning.

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-user-points.png)

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-savings.png)

## Tmasraf merchants application.

Merchants application is used by stores to add points to customers. When a customer buys a product from a merchant, the merchant scans the customer's QR code and sends him cashback points that he can use in buying products in the future.

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-store-scan-code.png)

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me@1.0.7/images/projects/tmasraf/tmasraf-store-sell.png)
