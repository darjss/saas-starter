import type { APIRoute } from "astro";
import { app } from "@/server/app";
import { getAuth } from "@/server/lib/auth";

export const prerender = false;

function stripApiPrefix(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/^\/api(?=\/|$)/, "");

  url.pathname = pathname.length > 0 ? pathname : "/";

  return new Request(url, request);
}

export const ALL: APIRoute = async ({ request }) => {
  const apiRequest = stripApiPrefix(request);
  const pathname = new URL(apiRequest.url).pathname;

  if (pathname === "/auth" || pathname.startsWith("/auth/")) {
    return getAuth().handler(apiRequest);
  }

  return app.handle(apiRequest);
};
