"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-danger-subtle text-danger">
            <span className="text-4xl font-bold">!</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
          <p className="mb-8 max-w-sm text-sm text-gray-500">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.97]"
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
