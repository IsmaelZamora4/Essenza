"use client";

import { useMemo, useState } from "react";

function normalize(text) {
  return (text || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export default function StoresClient({ stores: allStores }) {
  const [city, setCity] = useState("Todas");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const cities = useMemo(() => {
    const set = new Set(allStores.map((s) => s.city).filter(Boolean));
    return ["Todas", ...Array.from(set).sort()];
  }, [allStores]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return allStores.filter((s) => {
      const byCity = city === "Todas" || s.city === city;
      const haystack = normalize(
        [s.name, s.city, s.district, s.address, s.type].join(" ")
      );
      const byQuery = q.length === 0 || haystack.includes(q);
      return byCity && byQuery;
    });
  }, [allStores, city, query]);

  const copyAddress = async (store) => {
    try {
      await navigator.clipboard.writeText(`${store.name} - ${store.address}`);
      setCopiedId(store.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      window.prompt("Copia la dirección:", `${store.name} - ${store.address}`);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Puntos de Venta</h1>
        <p className="mt-2 text-gray-600">
          Encuentra nuestras tiendas y obtén indicaciones para visitarnos.
        </p>
      </header>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="flex gap-3">
          <select
            aria-label="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o dirección"
              className="border border-gray-300 bg-white px-3 py-2 pr-8 text-sm w-64"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Listado */}
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((s) => (
          <article
            key={s.id}
            className="border border-gray-200 rounded-lg bg-white p-5 flex flex-col"
          >
            <div className="text-xs text-gray-500 mb-1">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">
                {s.type || "Tienda"}
              </span>
              {s.city && (
                <span className="ml-2">
                  {s.city}
                  {s.district ? ` • ${s.district}` : ""}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold">{s.name}</h2>

            {s.address && <p className="mt-1 text-gray-700">{s.address}</p>}

            {s.hours && (
              <p className="mt-1 text-gray-600 text-sm">Horario: {s.hours}</p>
            )}

            {s.notes && <p className="mt-2 text-gray-600 text-sm">{s.notes}</p>}

            {/* Acciones */}
            <div className="mt-4 flex flex-wrap gap-2">
              {s.mapUrl && (
                <a
                  href={s.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-3 py-2 text-sm font-semibold"
                >
                  Cómo llegar
                </a>
              )}

              {s.phone && (
                <a
                  href={`tel:${s.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center border border-gray-300 px-3 py-2 text-sm"
                >
                  Llamar
                </a>
              )}

              {s.whatsapp && (
                <a
                  href={s.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-gray-300 px-3 py-2 text-sm"
                >
                  WhatsApp
                </a>
              )}

              {/* Mostrar "Copiar dirección" solo para tiendas físicas */}
              {s.type !== "Online" && s.address && (
                <button
                  onClick={() => copyAddress(s)}
                  className="inline-flex items-center border border-gray-300 px-3 py-2 text-sm"
                >
                  {copiedId === s.id ? "Copiado ✓" : "Copiar dirección"}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* CTA final */}
      <div className="mt-10 rounded-md bg-gray-100 p-6">
        <h3 className="text-xl font-semibold mb-2">
          ¿No encuentras un punto cercano?
        </h3>
        <p className="text-gray-700 mb-4">
          Escríbenos y te ayudamos a encontrar la mejor opción. También puedes
          comprar online con envío a todo el Perú.
        </p>
        <div className="flex gap-2">
          <a
            href="/contact"
            className="inline-block bg-black text-white px-5 py-3 font-semibold"
          >
            Contacto
          </a>
          <a
            href="/blog"
            className="inline-block border border-gray-300 px-5 py-3 font-semibold"
          >
            Ver Blog
          </a>
        </div>
      </div>
    </section>
  );
}