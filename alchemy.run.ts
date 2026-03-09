import alchemy from "alchemy";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";
import { Astro, D1Database, KVNamespace, R2Bucket } from "alchemy/cloudflare";

const app = await alchemy("saas-starter", {
  stateStore: process.env.ALCHEMY_STATE_TOKEN
    ? (scope) => new CloudflareStateStore(scope)
    : undefined,
});

const db = await D1Database("db", {
  name: "saas-starter-db",
  migrationsDir: "./drizzle/migrations",
  migrationsTable: "drizzle_migrations",
});

const bucket = await R2Bucket("bucket", {
  name: "saas-starter-bucket",
});

const cache = await KVNamespace("cache", {
  title: "saas-starter-cache",
});

const session = await KVNamespace("session", {
  title: "saas-starter-session",
});

export const worker = await Astro("website", {
  bindings: {
    DB: db,
    BUCKET: bucket,
    CACHE: cache,
    SESSION: session,
    BETTER_AUTH_SECRET: alchemy.secret(
      process.env.BETTER_AUTH_SECRET,
      "BETTER_AUTH_SECRET",
    ),
    ...(process.env.BETTER_AUTH_URL
      ? { BETTER_AUTH_URL: process.env.BETTER_AUTH_URL }
      : {}),
    ...(process.env.TRUSTED_ORIGINS
      ? { TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS }
      : {}),
  },
  compatibilityDate: "2026-03-09",
  compatibilityFlags: ["nodejs_als"],
  dev: {
    command: "astro dev --host 127.0.0.1 --port 4321",
  },
  observability: {
    enabled: true,
  },
  url: true,
});

console.log({
  url: worker.url,
});

if (process.env.PULL_REQUEST) {
  const previewUrl = worker.url;

  await GitHubComment("pr-preview-comment", {
    owner: process.env.GITHUB_REPOSITORY_OWNER || "your-username",
    repository: process.env.GITHUB_REPOSITORY_NAME || "saas-starter",
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `
## 🚀 Preview Deployed

Your preview is ready!

**Preview URL:** ${previewUrl}

This preview was built from commit ${process.env.GITHUB_SHA}

---
<sub>🤖 This comment will be updated automatically when you push new commits to this PR.</sub>`,
  });
}

await app.finalize();
