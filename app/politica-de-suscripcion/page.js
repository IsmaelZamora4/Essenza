"use client";

import { useEffect } from "react";

const UPDATED_AT = "2025-08-29";
const EMPRESA = {
  razonSocial: "ESSENZA S.A.C.",
  ruc: "20601234567",
  domicilio: "Av. Fragancias 123, Miraflores, Lima, Perú",
  correoAtencion: "atencion@essenza.pe",
};

const sections = [
  { id: "proposito", title: "1) Propósito y alcance" },
  { id: "base", title: "2) Base legal y consentimiento" },
  { id: "inscripcion", title: "3) Proceso de suscripción (opt‑in)" },
  { id: "datos", title: "4) Datos que tratamos" },
  { id: "uso", title: "5) Finalidades del tratamiento" },
  { id: "frecuencia", title: "6) Frecuencia y contenido" },
  { id: "proveedores", title: "7) Proveedores y transferencias" },
  { id: "gestion", title: "8) Gestión de preferencias y baja" },
  { id: "derechos", title: "9) Derechos del titular (ARCO)" },
  { id: "seguridad", title: "10) Seguridad de la información" },
  { id: "menores", title: "11) Menores de edad" },
  { id: "cambios", title: "12) Vigencia y cambios" },
  { id: "contacto", title: "13) Contacto" },
];

export default function PoliticaSuscripcionNewsletterPage() {
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

  const openNewsletterPreferences = () => {
    // Hook para abrir el panel de preferencias del proveedor que uses (MailerLite, Mailchimp, etc.)
    if (typeof window !== "undefined") {
      const w = window;
      // Preferencia propia (define window.__openNewsletterPrefs en tu layout si usas un proveedor)
      if (typeof w.__openNewsletterPrefs === "function") {
        w.__openNewsletterPrefs();
        return;
      }
      // MailerLite (ejemplo: ventana embebida)
      if (w.ml && typeof w.ml.open === "function") {
        w.ml.open("preferences");
        return;
      }
      // Mailchimp (si expones un enlace de profile/update)
      if (w.__MAILCHIMP_PREFS_URL) {
        window.open(w.__MAILCHIMP_PREFS_URL, "_blank", "noopener,noreferrer");
        return;
      }
      // Fallback: abre correo para solicitar cambios
      window.location.href = `mailto:${EMPRESA.correoAtencion}?subject=Gestionar%20preferencias%20de%20newsletter`;
    }
  };

  const unsubscribe = () => {
    if (typeof window !== "undefined") {
      const w = window;
      // Enlaces comunes de baja si el proveedor los expone globalmente
      if (w.__NEWSLETTER_UNSUBSCRIBE_URL) {
        window.open(w.__NEWSLETTER_UNSUBSCRIBE_URL, "_blank", "noopener,noreferrer");
        return;
      }
      // Fallback mailto
      window.location.href = `mailto:${EMPRESA.correoAtencion}?subject=Dar%20de%20baja%20suscripci%C3%B3n%20newsletter`;
    }
  };

  return (
    <main className="bg-slate-50">
      {/* Hero con degradado y acento dorado sutil */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(900px_420px_at_15%_15%,rgba(200,182,133,0.22),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 relative">
          <p className="text-sm/6 text-slate-200">Legal</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Política de Suscripción al Newsletter</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            Esta política explica cómo gestionamos tu suscripción al boletín de Essenza, qué datos utilizamos y cómo puedes
            controlar tus preferencias en cualquier momento.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={openNewsletterPreferences}
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20"
            >
              Gestionar preferencias
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={unsubscribe}
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20"
            >
              Darme de baja
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-300">Última actualización: {UPDATED_AT}</p>
        </div>
      </section>

      {/* Contenido con índice lateral */}
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
                  {renderContent(s.id)}
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
                <p className="text-xs text-slate-500">Otras políticas</p>
                <div className="mt-1 space-y-1">
                  <a href="/politica-de-privacidad" className="block text-sm font-medium text-slate-900 underline hover:no-underline">
                    Política de Privacidad
                  </a>
                  <a href="/politica-de-cookies" className="block text-sm font-medium text-slate-900 underline hover:no-underline">
                    Política de Cookies
                  </a>
                </div>
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

function renderContent(id) {
  switch (id) {
    case "proposito":
      return (
        <>
          <p>
            Esta política regula la suscripción, uso y cancelación del boletín informativo (“newsletter”) de{" "}
            <span className="font-medium text-slate-900">{EMPRESA.razonSocial}</span>. Aplica a todos los formularios, páginas y
            canales donde ofrezcamos la suscripción.
          </p>
        </>
      );
    case "base":
      return (
        <>
          <p>
            La base legal para enviarte comunicaciones es tu{" "}
            <span className="font-medium text-slate-900">consentimiento</span>, otorgado al marcar la casilla o completar el proceso de
            suscripción. Puedes retirarlo en cualquier momento sin afectar la licitud del tratamiento previo.
          </p>
          <p>
            El tratamiento se realiza conforme a la Ley N.º 29733 (Perú) y su reglamento, y a nuestra{" "}
            <a className="underline" href="/politica-de-privacidad">Política de Privacidad</a>.
          </p>
        </>
      );
    case "inscripcion":
      return (
        <>
          <p>Podemos usar una o ambas modalidades:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-slate-900">Single opt‑in:</span> te añadimos tras enviar el formulario.
            </li>
            <li>
              <span className="font-medium text-slate-900">Double opt‑in:</span> te enviamos un correo para confirmar tu dirección y
              completar la suscripción.
            </li>
          </ul>
          <p>
            Debes proporcionar un correo válido y, opcionalmente, preferencias (categorías, frecuencia, ubicación) para personalizar el
            contenido.
          </p>
        </>
      );
    case "datos":
      return (
        <>
          <p>Podemos tratar:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correo electrónico y nombre (si lo proporcionas).</li>
            <li>Preferencias de contenido, idioma o ciudad (si se solicitan).</li>
            <li>Métricas de interacción del email (aperturas, clics, bajas) en forma individual o agregada.</li>
            <li>Identificadores técnicos necesarios para el envío (por ejemplo, ID de suscriptor del proveedor).</li>
          </ul>
        </>
      );
    case "uso":
      return (
        <>
          <p>Usamos tus datos para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enviar novedades de productos, lanzamientos y promociones.</li>
            <li>Compartir contenido editorial (tendencias, guías, experiencias).</li>
            <li>Mejorar y segmentar las comunicaciones según tu interacción y preferencias.</li>
          </ul>
        </>
      );
    case "frecuencia":
      return (
        <>
          <p>
            La frecuencia típica es{" "}
            <span className="font-medium text-slate-900">semanal</span>{" "}
            (puede variar en campañas puntuales). El contenido incluirá información de Essenza, beneficios, y recomendaciones.
          </p>
          <p className="text-xs text-slate-500">
            Nota: Si definimos nuevas categorías/frecuencias, lo indicaremos en el formulario o en el panel de preferencias.
          </p>
        </>
      );
    case "proveedores":
      return (
        <>
          <p>
            Para gestionar envíos y métricas empleamos proveedores especializados que actúan como{" "}
            <span className="font-medium text-slate-900">encargados de tratamiento</span> (por ejemplo, plataformas de email marketing).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesan datos bajo nuestras instrucciones y con medidas de seguridad adecuadas.</li>
            <li>Pueden realizar transferencias internacionales con garantías apropiadas.</li>
          </ul>
          <p>
            Los detalles sobre encargados y transferencias se encuentran en nuestra{" "}
            <a className="underline" href="/politica-de-privacidad">Política de Privacidad</a>.
          </p>
        </>
      );
    case "gestion":
      return (
        <>
          <p>Puedes gestionar tu suscripción en cualquier momento:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-slate-900">Actualizar preferencias</span> (categorías, frecuencia).
            </li>
            <li>
              <span className="font-medium text-slate-900">Darte de baja</span> con el enlace “Unsubscribe / Cancelar suscripción” al final de cada correo.
            </li>
            <li>
              También puedes escribirnos a{" "}
              <a className="underline" href={`mailto:${EMPRESA.correoAtencion}`}>{EMPRESA.correoAtencion}</a>.
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => {
                if (typeof window !== "undefined" && typeof window.__openNewsletterPrefs === "function") {
                  window.__openNewsletterPrefs();
                } else {
                  alert("Pronto podrás abrir el panel de preferencias desde aquí.");
                }
              }}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
            >
              Abrir preferencias
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.__NEWSLETTER_UNSUBSCRIBE_URL) {
                  window.open(window.__NEWSLETTER_UNSUBSCRIBE_URL, "_blank", "noopener,noreferrer");
                } else {
                  window.location.href = `mailto:${EMPRESA.correoAtencion}?subject=Dar%20de%20baja%20suscripci%C3%B3n%20newsletter`;
                }
              }}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              Baja inmediata
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </>
      );
    case "derechos":
      return (
        <>
          <p>
            Puedes ejercer tus derechos de{" "}
            <span className="font-medium text-slate-900">acceso, rectificación, cancelación y oposición (ARCO)</span>, así como
            revocar tu consentimiento.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Escríbenos a <a className="underline" href={`mailto:${EMPRESA.correoAtencion}`}>{EMPRESA.correoAtencion}</a>.</li>
            <li>Adjunta copia de tu documento para validar tu identidad.</li>
            <li>Atenderemos tu solicitud dentro de los plazos legales.</li>
          </ul>
        </>
      );
    case "seguridad":
      return (
        <>
          <p>
            Aplicamos medidas razonables de seguridad y exigimos a nuestros proveedores estándares equivalentes. No obstante, ningún
            sistema es 100% infalible.
          </p>
        </>
      );
    case "menores":
      return (
        <>
          <p>
            La suscripción está dirigida a mayores de edad. Si eres menor, solicita autorización de tu madre, padre o representante.
            Si detectas un registro sin autorización, contáctanos para eliminar los datos.
          </p>
        </>
      );
    case "cambios":
      return (
        <>
          <p>
            Podremos actualizar esta política para reflejar cambios normativos, de servicio o de proveedores. Publicaremos la versión
            vigente indicando su fecha de actualización: <span className="font-medium text-slate-900">{UPDATED_AT}</span>.
          </p>
        </>
      );
    case "contacto":
      return (
        <>
          <p>Para dudas sobre esta política o tu suscripción:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correo: <a className="underline" href={`mailto:${EMPRESA.correoAtencion}`}>{EMPRESA.correoAtencion}</a></li>
            <li>Razón social: {EMPRESA.razonSocial} — RUC {EMPRESA.ruc}</li>
            <li>Domicilio: {EMPRESA.domicilio}</li>
          </ul>
          <p className="text-xs text-slate-500">
            Este documento es informativo y no constituye asesoría legal. Adáptalo con tu equipo legal si es necesario.
          </p>
        </>
      );
    default:
      return null;
  }
}