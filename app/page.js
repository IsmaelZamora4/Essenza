import Banner from "./banner/banner";
import PromoHero from "./PromoHero";
import BrandsStrip from "./BrandsStrip";
// DATA desde content (fuera de app)
import { products } from "../content/products";

/**
 * Home: Banner > Recomendados > PromoHero > BrandsStrip
 * Recomendados: 2 nicho (primero) + 2 árabes (después), en el orden indicado.
 */
export const metadata = {
  title: "Essenza",
};

const recommendedSlugs = [
  // Perfumes nicho
  "bergamot-niche",
  "dara-caro-sweet-obsession",
  // Perfumes árabes
  "sultan-al-zahab",
  "dahmir-al-sahra",
];

function formatPrice(n) {
  // Formato tipo S/ 1,439.00
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(n));
}

function ProductCard({ p }) {
  const href = `/products/${p.slug}`;
  const imgSrc = p.images?.[0] || "/placeholder.png";
  const isOut = p.stock <= 0;

  return (
    <div className="group">
      <a href={href} className="block overflow-hidden rounded-md bg-white">
        <div className="aspect-[3/4] w-full overflow-hidden bg-white">
          <img
            src={imgSrc}
            alt={`${p.brand} ${p.name}`}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </a>

      <div className="mt-3">
        <div className="text-[11px] tracking-[0.18em] text-slate-500">
          {p.brand}
        </div>
        <a href={href} className="block">
          <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:underline underline-offset-4">
            {p.name}
          </h3>
        </a>
        <div className="mt-1 text-slate-900">
          {isOut ? (
            <span className="inline-flex items-center rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
              Agotado
            </span>
          ) : (
            <span className="text-lg font-semibold">{formatPrice(p.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const recommended = products
    .filter((p) => recommendedSlugs.includes(p.slug) && p.stock > 0)
    .sort((a, b) => recommendedSlugs.indexOf(a.slug) - recommendedSlugs.indexOf(b.slug));

  return (
    <>
      {/* 1) Banner (solo en Home) */}
      <Banner />

      {/* 2) Nuestras Recomendaciones */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-900">
            Nuestras Recomendaciones
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-6 md:mt-10 md:grid-cols-4 md:gap-8">
            {recommended.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3) PromoHero (solo en Home) */}
      <PromoHero />

      {/* 4) Nuestras Marcas (solo en Home) */}
      <BrandsStrip />
    </>
  );
}