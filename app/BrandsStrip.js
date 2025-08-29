export default function BrandsStrip() {
  const brands = [
    "HOUSE OF ZAFIR",
    "MAISON AL ZAHRA",
    "MAISON AL QAMAR",
    "DAR AL MALAKI",
    "DAR AL LAYL",
    "ELYSIAN",
    "DARA CARO",
    "NOCTIS",
    "VALENTINO",
    "BERGAMOT",
  ];

  return (
    <section aria-labelledby="brands-title" className="bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h2 id="brands-title" className="text-center text-lg font-semibold text-slate-900">
          Nuestras Marcas
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {brands.map((name) => (
            <span
              key={name}
              className="select-none text-slate-500/80 hover:text-slate-700 transition
                         block text-[clamp(0.9rem,2.2vw,1.35rem)] font-semibold
                         tracking-[0.18em] uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}