import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Next.js Test Lab
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A sandbox environment for testing Next.js features and hosting capabilities.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Available Demos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/streaming-demo"
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
            >
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
                Streaming SSR
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Test HTML streaming with React Suspense boundaries and simulated API delays.
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-zinc-900 dark:text-white">
                View demo &rarr;
              </span>
            </Link>

            <Link
              href="/streaming-demo/nested"
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-zinc-700"
            >
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
                Nested Streaming
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Explore nested Suspense boundaries and waterfall loading patterns.
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-zinc-900 dark:text-white">
                View demo &rarr;
              </span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Built with Next.js 16 and React 19
          </p>
        </footer>
      </div>
    </div>
  );
}
