"use client";

import { useEffect, useMemo, useState } from "react";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function TermsClient({ sections, updatedAt }) {
  const [open, setOpen] = useState(() => new Set(sections.slice(0, 2).map(s => s.id))); // abre 2 primeras
  const [active, setActive] = useState(sections[0]?.id);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  // Intersection Observer para revelar secciones y marcar activa
  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-reveal]");
    const sectEls = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-in-up");
            e.target.classList.remove("opacity-0", "translate-y-3");
            // solo animar una vez
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealObs.observe(el));

    const activeObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sectEls.forEach((el) => activeObs.observe(el));

    return () => {
      revealObs.disconnect();
      activeObs.disconnect();
    };
  }, [ids]);

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Hero con blobs animados */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute -top-16 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-fuchsia-400 to-rose-400 blur-3xl opacity-25 animate-blob"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-10 -right-16 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-300 to-pink-400 blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-gradient-to-tr from-sky-300 to-indigo-400 blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-16 pb-10">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-semibold">Términos de Servicio</h1>
            <p className="mt-2 text-gray-600">
              Última actualización:{" "}
              {new Date(updatedAt).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Chips de navegación */}
            <div className="mt-5 flex flex-wrap gap-2">
              {sections.slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToId(s.id)}
                  className={classNames(
                    "px-3 py-1.5 text-sm rounded-full border cursor-pointer",
                    active === s.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  {s.title.replace(/^\d+\.\s*/, "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenido en acordeones con reveal */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="space-y-3">
          {sections.map((s) => {
            const isOpen = open.has(s.id);
            return (
              <article
                key={s.id}
                id={s.id}
                data-reveal
                className="border border-gray-200 rounded-lg bg-white p-5 opacity-0 translate-y-3"
              >
                <header className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`panel-${s.id}`}
                    onClick={() => toggle(s.id)}
                    className="shrink-0 inline-flex items-center justify-center w-9 h-9 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    title={isOpen ? "Contraer" : "Expandir"}
                  >
                    <span className="text-xl leading-none">{isOpen ? "−" : "+"}</span>
                  </button>
                </header>

                <div
                  id={`panel-${s.id}`}
                  className={classNames(
                    "prose prose-neutral max-w-none transition-all duration-300",
                    isOpen
                      ? "opacity-100 translate-y-0 mt-3"
                      : "opacity-0 -translate-y-1 mt-0 h-0 overflow-hidden"
                  )}
                  dangerouslySetInnerHTML={{ __html: s.html }}
                />

                {/* Acciones secundarias por sección */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => scrollToId("contacto")}
                    className="text-sm underline text-gray-600 hover:text-gray-900 cursor-pointer"
                    title="Contactarnos"
                  >
                    ¿Dudas? Contáctanos
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bloque final */}
        <div
          data-reveal
          className="mt-10 rounded-lg bg-gray-100 p-6 opacity-0 translate-y-3"
        >
          <h3 className="text-xl font-semibold mb-2">Resumen rápido</h3>
          <ul className="text-gray-700 list-disc pl-5 space-y-1">
            <li>Realiza compras de forma segura con los métodos disponibles.</li>
            <li>Los envíos son a nivel nacional; los plazos son estimados.</li>
            <li>Devoluciones sujetas a condiciones de higiene y plazos.</li>
            <li>Protegemos tu información y atendemos tus derechos ARCO.</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <a
              href="/faq"
              className="inline-block border border-gray-300 px-4 py-2 font-semibold"
            >
              Ver Preguntas Frecuentes
            </a>
            <a
              href="/contact"
              className="inline-block bg-black text-white px-4 py-2 font-semibold"
            >
              Ir a Contacto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}