import Link from "next/link";
import { Suspense } from "react";

async function DelayedCard({
  delay,
  title,
  color,
}: {
  delay: number;
  title: string;
  color: string;
}) {
  const res = await fetch(`https://httpbin.org/delay/${delay}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className={`rounded-lg p-6 ${color}`}>
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-white/80 text-sm">
        Delay: {delay}s
      </p>
      <p className="text-white/60 text-xs mt-2">
        Origin: {data.origin}
      </p>
    </div>
  );
}

function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-lg p-6 bg-zinc-200 dark:bg-zinc-700 animate-pulse">
      <div className="h-6 w-32 bg-zinc-300 dark:bg-zinc-600 rounded mb-2" />
      <div className="h-4 w-48 bg-zinc-300 dark:bg-zinc-600 rounded mb-1" />
      <div className="h-4 w-40 bg-zinc-300 dark:bg-zinc-600 rounded" />
      <p className="text-zinc-400 text-xs mt-2">Loading {label}...</p>
    </div>
  );
}

export default function StreamingDemoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Streaming SSR Demo
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Each card below fetches data with a different delay. Watch how they
          stream in progressively as their data becomes available, rather than
          waiting for all requests to complete.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Suspense fallback={<LoadingSkeleton label="2s component" />}>
            <DelayedCard delay={2} title="Fast Component" color="bg-green-600" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton label="4s component" />}>
            <DelayedCard delay={4} title="Medium Component" color="bg-blue-600" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton label="6s component" />}>
            <DelayedCard delay={6} title="Slow Component" color="bg-orange-600" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton label="8s component" />}>
            <DelayedCard delay={8} title="Slowest Component" color="bg-red-600" />
          </Suspense>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
            How Streaming Works
          </h2>
          <ul className="text-zinc-600 dark:text-zinc-400 space-y-2 text-sm">
            <li>
              • The page shell renders immediately with loading skeletons
            </li>
            <li>
              • Each Suspense boundary streams its content independently
            </li>
            <li>
              • Components appear as their data fetches complete (2s, 4s, 6s, 8s)
            </li>
            <li>
              • Total page load time equals the slowest component, not the sum
            </li>
          </ul>
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <Link
            href="/"
            className="text-zinc-500 dark:text-zinc-400 hover:underline"
          >
            &larr; Home
          </Link>
          <Link
            href="/streaming-demo/nested"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Nested streaming demo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
