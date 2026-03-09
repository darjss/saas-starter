import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/server/db";
import { getRuntimeEnv } from "@/server/lib/runtime";
import * as schema from "@/server/db/schema";

function getTrustedOrigins() {
  const env = getRuntimeEnv();

  return Array.from(
    new Set(
      [env.BETTER_AUTH_URL, env.TRUSTED_ORIGINS]
        .filter((value): value is string => Boolean(value))
        .flatMap((value) =>
          value
            .split(",")
            .map((origin) => origin.trim())
            .filter(Boolean),
        ),
    ),
  );
}

export function getAuth() {
  const env = getRuntimeEnv();

  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    ...(env.BETTER_AUTH_URL ? { baseURL: env.BETTER_AUTH_URL } : {}),
    basePath: "/auth",
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    trustedOrigins: getTrustedOrigins(),
  });
}
