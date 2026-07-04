export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
        <p className="text-sm font-medium text-fg-muted">Loading...</p>
      </div>
    </main>
  );
}
