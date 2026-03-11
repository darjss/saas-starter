import { A } from "@solidjs/router";
import { For } from "solid-js";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppHomeProps = {
  userEmail: string;
  userName: string | null;
};

const quickActions = [
  {
    body: "Review your subscription state, checkout flow, and billing portal access.",
    href: "/billing",
    label: "Open billing",
  },
  {
    body: "Review account details and session controls inside the protected app area.",
    href: "/settings",
    label: "Open settings",
  },
] as const;

const productNotes = [
  {
    eyebrow: "Next surface",
    title: "Workspace modules can land here",
    body: "This shell is intentionally light. It gives the product a protected place to grow without inventing data models too early.",
  },
  {
    eyebrow: "Current boundary",
    title: "Auth and billing already work",
    body: "The first slice keeps Better Auth and Polar as the real sources of truth while the rest of the product fills in around them.",
  },
] as const;

export default function AppHome(props: AppHomeProps) {
  return (
    <div class="grid gap-6">
      <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="rounded-[2rem] border border-zinc-200 bg-white/92 p-6 shadow-[0_28px_75px_-42px_rgba(24,24,27,0.22)] sm:p-8">
          <div class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Welcome
          </div>
          <h2 class="mt-4 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-4xl">
            {props.userName ? `Good to see you, ${props.userName}.` : "Your app shell is live."}
          </h2>
          <p class="mt-4 max-w-[44rem] text-base leading-relaxed text-zinc-600">
            `/app` is now the signed-in home. Use it as the stable place for product surfaces,
            billing controls, and future workspace flows.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <For each={quickActions}>
              {(action, index) => (
                <A
                  class={cn(
                    buttonVariants({ variant: index() === 0 ? "default" : "outline" }),
                    "rounded-2xl px-4",
                  )}
                  href={action.href}
                >
                  {action.label}
                </A>
              )}
            </For>
          </div>
        </div>

        <div class="rounded-[2rem] border border-zinc-200 bg-[#f6f1e7] p-6 shadow-[0_24px_60px_-42px_rgba(24,24,27,0.22)] sm:p-8">
          <div class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Account summary
          </div>
          <div class="mt-6 grid gap-4 text-sm text-zinc-700">
            <div>
              <div class="text-xs uppercase tracking-[0.22em] text-zinc-500">Name</div>
              <div class="mt-2 text-lg font-medium text-zinc-950">
                {props.userName || "Not set"}
              </div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-[0.22em] text-zinc-500">Email</div>
              <div class="mt-2 text-lg font-medium text-zinc-950">{props.userEmail}</div>
            </div>
            <div>
              <div class="text-xs uppercase tracking-[0.22em] text-zinc-500">Signed-in area</div>
              <div class="mt-2 text-lg font-medium text-zinc-950">/app</div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <For each={quickActions}>
          {(action) => (
            <div class="rounded-[1.75rem] border border-zinc-200 bg-white/92 p-6 shadow-[0_22px_55px_-40px_rgba(24,24,27,0.22)]">
              <div class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Getting started
              </div>
              <h3 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
                {action.label}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-zinc-600">{action.body}</p>
              <A class="mt-5 inline-flex text-sm font-medium text-zinc-950 underline-offset-4 hover:underline" href={action.href}>
                Go to {action.label.toLowerCase()}
              </A>
            </div>
          )}
        </For>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <For each={productNotes}>
          {(note) => (
            <div class="rounded-[1.75rem] border border-zinc-200 bg-white/92 p-6 shadow-[0_22px_55px_-40px_rgba(24,24,27,0.22)]">
              <div class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {note.eyebrow}
              </div>
              <h3 class="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">
                {note.title}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-zinc-600">{note.body}</p>
            </div>
          )}
        </For>
      </section>
    </div>
  );
}
