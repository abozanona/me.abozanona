---
title: Implement Basic Authentication Using Cloudflare Workers
date: 2024-10-15 23:23:23
categories: project
---

When I started working on migrating data from the old website of a project I’m developing for a client to the new website, I felt the need to prevent external users from accessing the site and seeing the migrated data. Only internal users should have access during this phase.  

Typically, I implement Basic Authentication through nginx site configurations, which works well. However, I recalled reading that this could also be achieved with Cloudflare Workers—offering a simpler and more flexible solution. In this post, I’ll guide you through implementing Basic Authentication using Cloudflare Workers.  

<!--more-->

## What Is Basic Authentication and Why Use It?  

Basic Authentication is a simple way to secure access to web resources by requiring a username and password. It's particularly useful during internal testing or development phases when you want to restrict access to specific users without setting up a full-fledged authentication system.  

Some advantages include:  
- Quick Setup: Easy to configure without additional software or database dependencies.  
- Ideal for Testing: Ensures only internal testers can access the website or specific resources.  
- Lightweight: Minimal performance impact compared to more complex authentication mechanisms.  

## How to Integrate Basic Authentication with Cloudflare  

Turns out, it’s a straightforward process. Here's how:  

1. Navigate to Cloudflare Workers  
   In the Cloudflare dashboard, go to `Workers & Pages > Overview` from the left sidebar and create a new worker.  

2. Add the Code  
   Copy and paste the following code into your worker script, then deploy it:  

```javascript
const CREDENTIALS = {
  username: 'internal_tester',
  password: '$t7on8_p@@@w6',
};

// Main entry point
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const authorizationHeader = request.headers.get('authorization');

  if (!authorizationHeader) {
    return unauthorizedResponse('Missing authorization.');
  }

  const [providedUsername, providedPassword] = extractCredentials(authorizationHeader);

  if (!isValidUser(providedUsername, providedPassword)) {
    return unauthorizedResponse('Invalid username/password.');
  }

  return fetch(request);
}

// Extract username and password from the Authorization header
function extractCredentials(authorizationHeader) {
  const [type, encodedCredentials] = authorizationHeader.split(' ');

  if (type !== 'Basic' || !encodedCredentials) {
    return ['', ''];
  }

  const decodedCredentials = atob(encodedCredentials);
  return decodedCredentials.split(':');
}

// Check if the provided username and password are valid
function isValidUser(username, password) {
  return username === CREDENTIALS.username && password === CREDENTIALS.password;
}

// Generate a 401 Unauthorized response
function unauthorizedResponse(message) {
  const response = new Response(message, { status: 401 });
  response.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"');
  return response;
}
```

## Explanation of the Code  

- Static Credentials: The `CREDENTIALS` object contains the username and password. This can be adjusted as needed.  
- Request Handling:  
  - Checks for the `Authorization` header in the incoming request.  
  - If the header is missing or credentials are invalid, it responds with a `401 Unauthorized` status.  
  - If valid, it fetches and serves the original request.  
- Response Headers: The `WWW-Authenticate` header prompts the browser to display a login dialog when authentication is required.  

## Deployment  

After deploying the worker, you can attach it to your domain or specific route where Basic Authentication is needed. Now, only users with the correct credentials will have access to the secured pages.  

## Conclusion  

With just a few lines of JavaScript and Cloudflare Workers, you can implement a lightweight and effective Basic Authentication mechanism. This is ideal for securing your site during development or testing phases without complicating the process.  

And voilà! Your Basic Authentication is ready for internal testers to use.