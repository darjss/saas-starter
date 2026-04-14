import { count, eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { betterAuthPlugin } from "@/server/ctx/better-auth";
import { cfBindings } from "@/server/ctx/cf-bindings";
import { getDb } from "@/server/db";
import { session as sessionTable } from "@/server/db/schema";
import { getAuth } from "@/server/lib/auth";

export const app = new Elysia({
  // Astro endpoints call Elysia through app.handle(request), not as the
  // Worker entrypoint itself. Keep Elysia on the generic WinterTC path so
  // Cloudflare doesn't try to JIT-compile handlers during route module import.
  aot: false,
})
  .use(cfBindings)
  .use(betterAuthPlugin)
  .get("/", () => ({
    ok: true,
    service: "api",
  }))
  .get("/health", () => ({
    ok: true,
  }))
  .get("/debug/auth-db", async ({ request, status }) => {
    const authSession = await getAuth().api.getSession({
      headers: request.headers,
    });

    if (!authSession) {
      return status(401, {
        error: "Unauthorized",
        ok: false,
      });
    }

    const [result] = await getDb()
      .select({
        activeSessions: count(),
      })
      .from(sessionTable)
      .where(eq(sessionTable.userId, authSession.user.id));

    return {
      activeSessions: result?.activeSessions ?? 0,
      ok: true,
      userId: authSession.user.id,
    };
  });
