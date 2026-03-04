export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
        <div className="h-5 w-96 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg p-6 bg-zinc-200 dark:bg-zinc-700 animate-pulse h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
