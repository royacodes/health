import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-fg-muted">
        <span className="text-4xl font-bold">404</span>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-fg">Page Not Found</h1>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-fg-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-on-primary shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.97]"
      >
        Back to Home
      </Link>
    </main>
  );
}
