import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "../../../content/products";
import ProductActions from "../ProductActions";
import ProductGallery from "../ProductGallery";
import ProductAccords from "../ProductAccords";
import Breadcrumbs from "../Breadcrumbs";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.brand} – ${product.name}`,
    description: product.shortPhrase || product.description || "",
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const {
    slug,
    category,
    brand,
    name,
    shortPhrase,
    price,
    volume,
    origin,
    stock,
    images = [],
    pyramid = { top: [], heart: [], base: [] },
    accords = [],
    description,
  } = product;

  const categoryMap = {
    nicho: { label: "Perfumes Nicho", href: "/perfumes-nicho" },
    arabes: { label: "Perfumes Árabes", href: "/perfumes-arabes" },
    tratamientos: { label: "Tratamientos", href: "/tratamientos" },
  };
  const catKey = typeof category === "string" ? category.toLowerCase() : "";
  const catCrumb = categoryMap[catKey];

  const crumbs = [
    { label: "Inicio", href: "/" },
    catCrumb,
    { label: `${brand} ${name}`, href: `/products/${slug}` },
  ].filter(Boolean);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumbs items={crumbs} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ProductGallery images={images} alt={`${brand} ${name}`} />

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{brand} – {name}</h1>
          {shortPhrase && <p className="mt-2 text-slate-700">{shortPhrase}</p>}

          <div className="mt-4 flex items-center gap-2">
            <span className={`inline-flex items-center rounded px-2 py-1 text-sm ${
              stock > 8 ? "bg-emerald-600/10 text-emerald-700" : stock > 0 ? "bg-amber-500/10 text-amber-700" : "bg-rose-500/10 text-rose-700"
            }`}>
              {stock > 8 ? "En stock" : stock > 0 ? "Pocas unidades" : "Agotado"}
            </span>
            {volume && <span className="text-sm text-slate-500">• {volume}</span>}
            {origin && <span className="text-sm text-slate-500">• {origin}</span>}
          </div>

          {price > 0 && (
            <div className="mt-4 text-2xl font-semibold text-slate-900">S/ {price.toLocaleString("es-PE")}</div>
          )}

          {description && <p className="mt-4 text-slate-700">{description}</p>}

          <ProductActions stock={stock} />

          <ProductAccords accords={accords} />

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Pirámide olfativa</h2>
            <details className="group border-t border-slate-200 py-3" open>
              <summary className="cursor-pointer text-slate-800 group-open:text-slate-900 font-medium">Notas de salida</summary>
              <p className="mt-1 text-slate-700">{pyramid.top?.length ? pyramid.top.join(", ") : "—"}</p>
            </details>
            <details className="group border-t border-slate-200 py-3">
              <summary className="cursor-pointer text-slate-800 group-open:text-slate-900 font-medium">Notas de corazón</summary>
              <p className="mt-1 text-slate-700">{pyramid.heart?.length ? pyramid.heart.join(", ") : "—"}</p>
            </details>
            <details className="group border-t border-slate-200 py-3 border-b">
              <summary className="cursor-pointer text-slate-800 group-open:text-slate-900 font-medium">Notas de fondo</summary>
              <p className="mt-1 text-slate-700">{pyramid.base?.length ? pyramid.base.join(", ") : "—"}</p>
            </details>
          </section>
        </div>
      </div>
    </main>
  );
}