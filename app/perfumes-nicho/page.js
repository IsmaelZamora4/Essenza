import Link from "next/link";
import Image from "next/image";
import { products } from "../../content/products";

export const metadata = { title: "Perfumes Nicho" };

export default function NichoPage() {
  const nicho = products.filter((p) => p.category === "nicho");
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Perfumes Nicho</h1>
      <p className="mt-2 text-slate-600">Explora nuestras fragancias nicho.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nicho.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group rounded border border-slate-200 overflow-hidden bg-white hover:bg-slate-50 transition-colors shadow-sm hover:shadow"
          >
            <div className="relative w-full h-64 bg-slate-100">
              <Image
                src={p.images?.[0] || "/banner.webp"}
                alt={`${p.brand} ${p.name}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-slate-500">{p.brand}</div>
              <div className="text-slate-900 font-medium">{p.name}</div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center rounded px-2 py-1 text-xs ${
                    (p.stock ?? 0) > 8
                      ? "bg-emerald-600/10 text-emerald-700"
                      : (p.stock ?? 0) > 0
                      ? "bg-amber-500/10 text-amber-700"
                      : "bg-rose-500/10 text-rose-700"
                  }`}
                >
                  {(p.stock ?? 0) > 8 ? "En stock" : (p.stock ?? 0) > 0 ? "Pocas unidades" : "Agotado"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}