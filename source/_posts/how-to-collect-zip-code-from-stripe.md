---
title: How to collect Users' addresses in Stripe
date: 2025-02-19 23:23:23
categories: technical
---

If you're working with Stripe and realize that the account didn't collect old users' billing addresses, you might need a way to retrieve them. This can be important for legal or compliance reasons.

<!--more-->

Luckily, Stripe does collect some payment-related information, including the IP address from where a payment was made. While Stripe doesn’t show this IP address directly, there is a way to retrieve it.

## Getting the User's IP Address from Stripe

1. **Subscribe to Stripe's Fraud Teams** – You can sign up for a one-month free trial of [Stripe Radar for Fraud Teams](https://stripe.com/en-de/radar/fraud-teams). This will give you access to additional fraud detection details, including user IP addresses.

2. **Find the IP Address** – After subscribing:
   - Go to the [Transactions](https://dashboard.stripe.com/payments) page.
   - Filter records by the user's email address.
   - Click on any payment for that user.
   - Click **Show all insights** to open a popup.
   - In the **Checkout details** section, you'll find the user's IP address.

## Automating the Process with Stripe API

Manually collecting users' zip codes one by one would take forever. Fortunately, we can automate this using Stripe's API.

**Step 1: Get Subscription Users**
Use the `/v1/subscriptions` endpoint to fetch all subscribers:

```bash
GET /v1/subscriptions
```

**Step 2: Get Payment Intent IDs**
For each user, retrieve their payment intent IDs using:

```bash
GET /v1/payment_intents
```

**Step 3: Fetch IP Address from Payment Intent**
Once you have the `paymentIntentID`, call this API endpoint to get IP address details:

```bash
GET /v1/payment_intents/${paymentIntentID}?expand%5B%5D=source&expand%5B%5D=customer&expand%5B%5D=payment_method&include_only%5B%5D=payment_method.billing_details.address%2Cpayment_method.card.country
```

This will return:
- The user's **IP address**
- The **country code**

## Using IP Geolocation to Get Address Details
With the IP address, we can determine the user's approximate zip code and country.

One option is to use [ip-api.com](https://ip-api.com), which provides geolocation data based on an IP address. Simply send a request like this:

```bash
GET http://ip-api.com/json/{IP_ADDRESS}
```

The response will include details like:
- Country
- Region
- City
- Zip code

## Final Thoughts
If your Stripe account isn't collecting users' billing addresses and you want to collect them, this method allows you to retrieve them using payment IPs and geolocation services. While it requires subscribing to Fraud Teams for a short period, it provides a useful workaround to collect addresses for users.