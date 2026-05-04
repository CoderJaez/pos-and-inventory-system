import { getDailySummary } from "@/lib/server/reports/summary";

type PaymentRow = { method: string; total: string | number };
type TopItemRow = { productId: string; quantitySold: string | number; product?: { name?: string } };
type LowStockRow = { id: string; name: string; stockQuantity: string | number };

export default async function ReportsPage() {
  const date = new Date().toISOString().slice(0, 10);
  const report = await getDailySummary(date);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Daily Reports ({report.date})</h1>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-zinc-500">Sales Count</p><p className="text-2xl font-bold">{report.salesCount}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-zinc-500">Total Sales</p><p className="text-2xl font-bold">₱{report.totalSales.toFixed(2)}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-zinc-500">Low Stock</p><p className="text-2xl font-bold">{report.lowStockCount}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-xs text-zinc-500">Est. Profit</p><p className="text-2xl font-bold">₱{report.estimatedProfit.toFixed(2)}</p></div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Payment Breakdown</h2>
        <ul className="space-y-1 text-sm">
          {(report.paymentBreakdown as PaymentRow[]).map((p) => <li key={p.method}>{p.method.toUpperCase()}: ₱{Number(p.total).toFixed(2)}</li>)}
          {report.paymentBreakdown.length === 0 && <li>No payment records for this date.</li>}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Top Selling Items</h2>
        <ul className="space-y-1 text-sm">
          {(report.topItems as TopItemRow[]).map((item) => <li key={item.productId}>{item.product?.name ?? "Unknown"} — Qty {Number(item.quantitySold).toFixed(3)}</li>)}
          {report.topItems.length === 0 && <li>No sales yet.</li>}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Low Stock Items</h2>
        <ul className="space-y-1 text-sm">
          {(report.lowStockItems as LowStockRow[]).map((item) => <li key={item.id}>{item.name} — {Number(item.stockQuantity).toFixed(3)} left</li>)}
          {report.lowStockItems.length === 0 && <li>No low stock items.</li>}
        </ul>
      </section>
    </main>
  );
}
