import Link from "next/link";
import { OnlineStatus } from "@/components/common/online-status";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
      <header className="rounded-2xl bg-green-600 p-6 text-white">
        <div className="mb-3 flex justify-end"><OnlineStatus /></div>
        <h1 className="text-2xl font-bold sm:text-3xl">Sari-Sari Store POS</h1>
        <p className="mt-2 text-sm sm:text-base">Simple, fast, and offline-ready cash register and inventory system.</p>
      </header>
        <h1 className="text-2xl font-bold sm:text-3xl">Sari-Sari Store POS</h1>
        <p className="mt-2 text-sm sm:text-base">Simple, fast, and offline-ready cash register and inventory system.</p>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { href: "/pos", label: "Start Selling", desc: "Quick tap checkout" },
          { href: "/inventory", label: "Inventory", desc: "Track and update stock" },
          { href: "/reports", label: "Reports", desc: "Daily sales summary" },
          { href: "/settings", label: "Settings", desc: "Store and sync controls" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="rounded-xl border bg-white p-5 shadow-sm active:scale-[0.99]">
            <p className="text-lg font-semibold">{item.label}</p>
            <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
