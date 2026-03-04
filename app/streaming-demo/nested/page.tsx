import Link from "next/link";
import { Suspense } from "react";

async function fetchWithDelay(delay: number, label: string) {
  const res = await fetch(`https://httpbin.org/delay/${delay}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return { ...data, label, delay };
}

async function ParentComponent() {
  const data = await fetchWithDelay(1, "Parent");

  return (
    <div className="rounded-lg border-2 border-purple-500 p-4">
      <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
        Parent (loaded after {data.delay}s)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Suspense fallback={<NestedSkeleton label="Child A" />}>
          <ChildComponent delay={2} name="Child A" color="blue" />
        </Suspense>

        <Suspense fallback={<NestedSkeleton label="Child B" />}>
          <ChildComponent delay={3} name="Child B" color="green" />
        </Suspense>
      </div>
    </div>
  );
}

async function ChildComponent({
  delay,
  name,
  color,
}: {
  delay: number;
  name: string;
  color: string;
}) {
  const data = await fetchWithDelay(delay, name);
  const colorClasses = {
    blue: "border-blue-500 text-blue-600 dark:text-blue-400",
    green: "border-green-500 text-green-600 dark:text-green-400",
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm opacity-80">Loaded after {data.delay}s</p>
      <p className="text-xs opacity-60 mt-1">Origin: {data.origin}</p>
    </div>
  );
}

function NestedSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-lg border-2 border-zinc-300 dark:border-zinc-600 p-4 animate-pulse">
      <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
      <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
      <p className="text-xs text-zinc-400 mt-1">Loading {label}...</p>
    </div>
  );
}

function ParentSkeleton() {
  return (
    <div className="rounded-lg border-2 border-zinc-300 dark:border-zinc-600 p-4 animate-pulse">
      <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NestedSkeleton label="Child A" />
        <NestedSkeleton label="Child B" />
      </div>
    </div>
  );
}

async function IndependentComponent() {
  const data = await fetchWithDelay(2, "Independent");

  return (
    <div className="rounded-lg border-2 border-orange-500 p-4">
      <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
        Independent Component
      </h3>
      <p className="text-sm text-orange-600/80 dark:text-orange-400/80">
        Loaded after {data.delay}s (parallel with parent)
      </p>
    </div>
  );
}

export default function NestedStreamingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Nested Streaming Demo
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          This demo shows nested Suspense boundaries. The parent loads first,
          then its children stream in. The independent component loads in
          parallel with the parent.
        </p>

        <div className="space-y-4 mb-8">
          <Suspense fallback={<ParentSkeleton />}>
            <ParentComponent />
          </Suspense>

          <Suspense
            fallback={
              <div className="rounded-lg border-2 border-zinc-300 dark:border-zinc-600 p-4 animate-pulse">
                <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            }
          >
            <IndependentComponent />
          </Suspense>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
            Nested Streaming Behavior
          </h2>
          <ul className="text-zinc-600 dark:text-zinc-400 space-y-2 text-sm">
            <li>• Parent and Independent components start fetching in parallel</li>
            <li>• Parent appears at ~1s, Independent at ~2s</li>
            <li>• Child A and B start fetching after Parent renders</li>
            <li>• Child A appears at ~3s (1s parent + 2s child)</li>
            <li>• Child B appears at ~4s (1s parent + 3s child)</li>
            <li>• This demonstrates the streaming waterfall pattern</li>
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
            href="/streaming-demo"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Basic streaming demo
          </Link>
        </div>
      </div>
    </div>
  );
}
