import Link from "next/link";

/**
 * Hero promocional con GIF de fondo para VALENTINO – Donna
 * Sin barras negras: usamos object-cover y movemos el encuadre con object-position.
 * Coloca el archivo en /public/valentino-donna.gif
 */
export default function PromoHero() {
  return (
    <section
      aria-labelledby="promo-valentino"
      className="relative w-full overflow-hidden bg-black h-72 md:h-[420px] lg:h-[520px]"
    >
      {/* Fondo GIF (img normal para preservar animación) */}
      <img
        src="/valentino-donna.gif"
        alt="VALENTINO Donna"
        className="
          absolute inset-0 h-full w-full object-cover
          object-[70%_center]   /* mobile: enfoca un poco a la derecha */
          sm:object-[65%_center]
          md:object-[60%_center]
          lg:object-[58%_center] /* desktop: foco ~60% para mostrar más botella */
        "
      />

      {/* Overlays para legibilidad */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 md:w-2/5 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Contenido */}
      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="max-w-xl">
          <p className="text-white/80 text-xs md:text-sm uppercase tracking-wider">
            VALENTINO – Donna
          </p>
          <h2 id="promo-valentino" className="mt-2 text-3xl md:text-5xl font-semibold text-white">
            Elegancia atemporal hecha aroma
          </h2>
          <p className="mt-2 text-white/85">
            Descubre la esencia icónica de VALENTINO.
          </p>

          <div className="mt-6">
            <Link
              href="/products/valentino-donna"
              className="inline-flex items-center rounded bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            >
              EXPLORA AHORA
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}