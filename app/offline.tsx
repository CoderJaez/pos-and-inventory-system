export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold">Offline Mode</h1>
        <p className="mt-2 text-sm text-zinc-600">
          You are currently offline. You can continue encoding sales and inventory, then sync once internet returns.
        </p>
      </div>
    </main>
  );
}
