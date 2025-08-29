"use client";

import { useEffect } from "react";

const UPDATED_AT = "2025-08-29";

const sections = [
  { id: "responsable", title: "1) Responsable del tratamiento" },
  { id: "datos", title: "2) Datos personales que tratamos" },
  { id: "finalidades", title: "3) Finalidades y bases legales" },
  { id: "conservacion", title: "4) Plazos de conservación" },
  { id: "destinatarios", title: "5) Encargados y destinatarios" },
  { id: "transferencias", title: "6) Transferencias internacionales" },
  { id: "derechos", title: "7) Derechos ARCO y cómo ejercerlos" },
  { id: "seguridad", title: "8) Medidas de seguridad" },
  { id: "menores", title: "9) Menores de edad" },
  { id: "cambios", title: "10) Cambios en la política" },
  { id: "contacto", title: "11) Contacto" },
];

export default function PoliticaPrivacidadPage() {
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

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(800px_400px_at_10%_10%,rgba(200,182,133,0.25),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 relative">
          <p className="text-sm/6 text-slate-200">Legal</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Política de Privacidad</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            En Essenza respetamos tu privacidad. Esta política describe cómo recopilamos, utilizamos y protegemos tus datos personales,
            conforme a la Ley N.º 29733 (Perú) y su reglamento.
          </p>
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
                <p className="text-xs text-slate-500">¿Buscas cookies?</p>
                <a href="/politica-de-cookies" className="mt-1 inline-block text-sm font-medium text-slate-900 underline hover:no-underline">
                  Ver Política de Cookies
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

function renderContent(id) {
  switch (id) {
    case "responsable":
      return (
        <>
          <p>
            Responsable: <span className="font-medium text-slate-900">ESSENZA S.A.C.</span> (en adelante, “Essenza”).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>RUC: 20601234567</li>
            <li>Domicilio: Av. Fragancias 123, Miraflores, Lima, Perú</li>
            <li>Correo de contacto: <a className="underline" href="mailto:atencion@essenza.pe">atencion@essenza.pe</a></li>
          </ul>
          <p>Esta política aplica a nuestro sitio web y canales de atención señalados por Essenza.</p>
        </>
      );
    case "datos":
      return (
        <>
          <p>Tratamos datos que nos proporcionas y datos generados por el uso de nuestros servicios:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identificación y contacto: nombres, apellidos, documento, teléfono, correo, dirección.</li>
            <li>Datos transaccionales: pedidos, productos, importe, medios de pago tokenizados.</li>
            <li>Datos de navegación: IP, identificadores de dispositivo, páginas visitadas, cookies y tecnologías similares.</li>
            <li>Comunicaciones: consultas por formularios, chats o correo.</li>
          </ul>
          <p>Solo solicitamos datos adecuados, pertinentes y no excesivos para las finalidades descritas.</p>
        </>
      );
    case "finalidades":
      return (
        <>
          <p>Usamos tus datos para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestionar compras, entregas y atención postventa.</li>
            <li>Responder consultas y administrar el Libro de Reclamaciones.</li>
            <li>Seguridad del sitio, prevención de fraude y cumplimiento normativo.</li>
            <li>Marketing con tu consentimiento: newsletters, ofertas y segmentación básica.</li>
            <li>Mejorar la experiencia mediante analítica agregada y cookies (ver Política de Cookies).</li>
          </ul>
          <p className="mt-2">
            Base legal: ejecución de contrato, cumplimiento de obligaciones legales, interés legítimo y, cuando corresponda, tu consentimiento.
          </p>
        </>
      );
    case "conservacion":
      return (
        <>
          <p>Conservamos tus datos por los plazos necesarios:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Compras y facturación: según exigencias tributarias y comerciales.</li>
            <li>Libro de Reclamaciones: plazos legales de atención y archivo.</li>
            <li>Marketing: hasta que retires tu consentimiento o se cumpla la finalidad.</li>
            <li>Seguridad y logs: tiempos razonables para investigación y auditoría.</li>
          </ul>
        </>
      );
    case "destinatarios":
      return (
        <>
          <p>Podemos compartir datos con:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Proveedores que actúan como encargados (hosting, pagos, mensajería, soporte, analítica).</li>
            <li>Autoridades competentes cuando la ley lo requiera.</li>
            <li>Empresas del grupo, si existieran, para soporte interno y gestión.</li>
          </ul>
          <p>Los encargados se obligan contractualmente a tratar datos siguiendo nuestras instrucciones.</p>
        </>
      );
    case "transferencias":
      return (
        <>
          <p>
            Si usamos proveedores ubicados fuera del Perú, adoptaremos salvaguardas adecuadas para las transferencias
            internacionales, garantizando un nivel de protección equivalente.
          </p>
        </>
      );
    case "derechos":
      return (
        <>
          <p>Puedes ejercer tus derechos ARCO (acceso, rectificación, cancelación y oposición), así como revocar tu consentimiento.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Escríbenos a <a className="underline" href="mailto:atencion@essenza.pe">atencion@essenza.pe</a> con tu solicitud.</li>
            <li>Adjunta copia de tu documento de identidad para validar tu titularidad.</li>
            <li>Responderemos dentro de los plazos previstos por la normativa.</li>
          </ul>
        </>
      );
    case "seguridad":
      return (
        <>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger tus datos (cifrado en tránsito, controles de acceso,
            registros de auditoría y políticas internas). Ningún sistema es 100% seguro, pero trabajamos para minimizar riesgos.
          </p>
        </>
      );
    case "menores":
      return (
        <>
          <p>
            No tratamos datos de menores sin autorización de sus padres, madres o representantes. Si detectas un tratamiento no
            autorizado, contáctanos para eliminar los datos.
          </p>
        </>
      );
    case "cambios":
      return (
        <>
          <p>
            Podremos actualizar esta política para reflejar cambios normativos o mejoras del servicio. Publicaremos la versión vigente con su fecha de actualización.
          </p>
        </>
      );
    case "contacto":
      return (
        <>
          <p>Para consultas sobre privacidad:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correo: <a className="underline" href="mailto:atencion@essenza.pe">atencion@essenza.pe</a></li>
            <li>Domicilio: Av. Fragancias 123, Miraflores, Lima, Perú</li>
          </ul>
          <p className="text-xs text-slate-500">
            Este documento es informativo y no constituye asesoría legal. Para un texto a medida, consulta con tu equipo legal.
          </p>
        </>
      );
    default:
      return null;
  }
}