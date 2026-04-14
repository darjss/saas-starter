import { defineMiddleware } from "astro:middleware";
import { getAuth } from "@/server/lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const session = await getAuth().api.getSession({
    headers: context.request.headers,
  });

  context.locals.session = session?.session ?? null;
  context.locals.user = session?.user ?? null;

  return next();
});
