import { Elysia } from "elysia";
import { getRuntimeEnv } from "@/server/lib/runtime";

export const cfBindings = new Elysia({ name: "@[cf-bindings]" }).decorate(
  "cf",
  {
    get env() {
      return getRuntimeEnv();
    },
    get bindings() {
      const env = getRuntimeEnv();

      return {
        DB: env.DB,
        BUCKET: env.BUCKET,
        CACHE: env.CACHE,
        BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
        BETTER_AUTH_URL: env.BETTER_AUTH_URL,
        TRUSTED_ORIGINS: env.TRUSTED_ORIGINS,
      };
    },
  },
);
