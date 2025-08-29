"use client";

import { useEffect } from "react";

const UPDATED_AT = "2025-08-29";

const sections = [
  { id: "que-son", title: "1) ¿Qué son las cookies?" },
  { id: "tipos", title: "2) Tipos de cookies que usamos" },
  { id: "lista", title: "3) Cookies que podrían instalarse" },
  { id: "gestionar", title: "4) ¿Cómo gestionar tus preferencias?" },
  { id: "navegador", title: "5) Configuración en tu navegador" },
  { id: "vigencia", title: "6) Vigencia y cambios" },
  { id: "contacto", title: "7) Contacto" },
];

export default function PoliticaCookiesPage() {
  useEffect(() => {
    // Efecto reveal al hacer scroll
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openCookieSettings = () => {
    // Hook para integrarse con tu gestor de cookies (CookieYes, OneTrust, etc.)
    // Intenta llamar a cualquier API global común; si no existe, dispara un evento.
    if (typeof window !== "undefined") {
      const w = window;
      // CookieYes
      if (typeof w.cy !== "undefined" && typeof w.cy.showSettings === "function") {
        w.cy.showSettings();
        return;
      }
      // OneTrust
      if (typeof w.Optanon === "object" && typeof w.Optanon.ToggleInfoDisplay === "function") {
        w.Optanon.ToggleInfoDisplay();
        return;
      }
      // Cookiebot
      if (typeof w.Cookiebot === "object" && typeof w.Cookiebot.renew === "function") {
        w.Cookiebot.renew();
        return;
      }
      // Hook propio
      if (typeof w.__openCookieSettings === "function") {
        w.__openCookieSettings();
        return;
      }
      // Fallback
      alert("Abriremos el panel de cookies cuando esté disponible.");
    }
  };

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(800px_400px_at_90%_10%,rgba(200,182,133,0.25),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 relative">
          <p className="text-sm/6 text-slate-200">Legal</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Política de Cookies</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            Usamos cookies y tecnologías similares para mejorar tu experiencia, medir el rendimiento y ofrecer contenidos relevantes.
            Aquí te explicamos cómo funcionan y cómo puedes gestionarlas.
          </p>
          <div className="mt-5">
            <button
              onClick={openCookieSettings}
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20"
            >
              Gestionar preferencias de cookies
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-300">Última actualización: {UPDATED_AT}</p>
        </div>
      </section>

      {/* Contenido + Índice */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
          {/* Contenido */}
          <div className="space-y-6">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="reveal scroll-mt-28 bg-white border border-slate-200 rounded-lg p-5 md:p-6 shadow-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h2 className="text-lg md:text-xl font-semibold text-slate-900">{s.title}</h2>
                <div className="mt-3 text-slate-700 space-y-3">
                  {renderContent(s.id, openCookieSettings)}
                </div>
              </section>
            ))}
          </div>

          {/* Índice lateral */}
          <aside className="hidden md:block">
            <div className="sticky top-28">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Contenido</p>
                <nav className="mt-3 space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">¿Privacidad?</p>
                <a href="/politica-de-privacidad" className="mt-1 inline-block text-sm font-medium text-slate-900 underline hover:no-underline">
                  Ver Política de Privacidad
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Estilos para reveal y desplazamiento suave */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .reveal {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 600ms ease, transform 600ms ease, box-shadow 300ms ease;
        }
        .reveal.in-view {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .reveal { transition: none; }
        }
      `}</style>
    </main>
  );
}

function renderContent(id, openCookieSettings) {
  switch (id) {
    case "que-son":
      return (
        <>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten reconocer tu
            navegador, recordar preferencias y analizar el uso del sitio. Tecnologías similares incluyen píxeles, local storage y SDKs.
          </p>
        </>
      );
    case "tipos":
      return (
        <>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-slate-900">Estrictamente necesarias:</span> habilitan funciones básicas del sitio y no
              pueden desactivarse.
            </li>
            <li>
              <span className="font-medium text-slate-900">De preferencias:</span> recuerdan tus opciones (idioma, carrito, etc.).
            </li>
            <li>
              <span className="font-medium text-slate-900">Analíticas:</span> nos ayudan a medir visitas y rendimiento de forma agregada.
            </li>
            <li>
              <span className="font-medium text-slate-900">De publicidad:</span> muestran anuncios relevantes y limitan repetición.
            </li>
          </ul>
        </>
      );
    case "lista":
      return (
        <>
          <p>Las cookies específicas pueden variar. A modo referencial, podrías encontrar:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">Nombre</th>
                  <th className="py-2 pr-4">Proveedor</th>
                  <th className="py-2 pr-4">Finalidad</th>
                  <th className="py-2">Vigencia</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium text-slate-900">_ga</td>
                  <td className="py-2 pr-4">Google</td>
                  <td className="py-2 pr-4">Analítica agregada (Google Analytics)</td>
                  <td className="py-2">2 años</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium text-slate-900">_gid</td>
                  <td className="py-2 pr-4">Google</td>
                  <td className="py-2 pr-4">Distinguir usuarios (Analytics)</td>
                  <td className="py-2">24 horas</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium text-slate-900">_fbp</td>
                  <td className="py-2 pr-4">Meta</td>
                  <td className="py-2 pr-4">Medición/remarketing en Meta</td>
                  <td className="py-2">3 meses</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium text-slate-900">session_id</td>
                  <td className="py-2 pr-4">Propia</td>
                  <td className="py-2 pr-4">Mantener sesión/uso básico del sitio</td>
                  <td className="py-2">Sesión</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Nota: La lista es referencial. Si integras un gestor de cookies, éste generará un inventario exacto.
          </p>
        </>
      );
    case "gestionar":
      return (
        <>
          <p>Puedes gestionar tu consentimiento por categorías en cualquier momento.</p>
          <button
            onClick={openCookieSettings}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
          >
            Abrir panel de preferencias
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-xs text-slate-500">Si el botón no funciona, integra tu gestor de cookies y/o define window.__openCookieSettings.</p>
        </>
      );
    case "navegador":
      return (
        <>
          <p>
            También puedes desactivar o eliminar cookies desde tu navegador. Consulta:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><a className="underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Chrome</a></li>
            <li><a className="underline" href="https://support.mozilla.org/es/kb/Eliminar%20cookies" target="_blank" rel="noreferrer">Firefox</a></li>
            <li><a className="underline" href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
            <li><a className="underline" href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer">Edge</a></li>
          </ul>
          <p className="text-xs text-slate-500">Ten en cuenta que bloquear cookies esenciales puede afectar el funcionamiento del sitio.</p>
        </>
      );
    case "vigencia":
      return (
        <>
          <p>
            Revisamos periódicamente esta política para reflejar cambios tecnológicos o normativos. Publicaremos la versión vigente con su fecha de actualización.
          </p>
        </>
      );
    case "contacto":
      return (
        <>
          <p>Si tienes consultas sobre cookies:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correo: <a className="underline" href="mailto:atencion@essenza.pe">atencion@essenza.pe</a></li>
            <li>Domicilio: Av. Fragancias 123, Miraflores, Lima, Perú</li>
          </ul>
        </>
      );
    default:
      return null;
  }
}