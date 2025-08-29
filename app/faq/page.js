"use client";
import { useState } from "react";

const faqs = [
  {
    q: "¿Qué tipo de productos de belleza ofrece su empresa en su Ecommerce?",
    a: "Ofrecemos una amplia gama de productos de belleza que incluyen cuidado facial, cuidado corporal, maquillaje, fragancias y más.",
  },
  {
    q: "¿Los productos en su Ecommerce son originales y auténticos?",
    a: "Sí, todos nuestros productos son 100% originales y provienen directamente de las marcas de belleza que distribuimos.",
  },
  {
    q: "¿Cómo puedo realizar una compra en su Ecommerce?",
    a: "Es muy sencillo. Solo tienes que seleccionar los productos que desees, añadirlos al carrito y seguir los pasos del proceso de compra. Puedes pagar de forma segura con diferentes opciones de pago.",
  },
  {
    q: "¿Ofrecen envío gratuito?",
    a: "Sí, ofrecemos envío gratuito para compras que superen cierto monto. Consulta nuestra sección de envíos para más detalles.",
  },
  {
    q: "¿Cuánto tiempo tardará en llegar mi pedido?",
    a: "El tiempo de entrega puede variar según la ubicación y la opción de envío seleccionada. Por lo general, los pedidos se entregan en un plazo de 2 a 7 días hábiles.",
  },
  {
    q: "¿Qué pasa si tengo algún problema con mi pedido o los productos recibidos?",
    a: "Estamos comprometidos con la satisfacción de nuestros clientes. Si tienes algún problema con tu pedido o los productos recibidos, contáctanos de inmediato y haremos todo lo posible para resolverlo.",
  },
  {
    q: "¿Aceptan devoluciones o cambios?",
    a: "Sí, aceptamos devoluciones y cambios en un plazo determinado desde la recepción del pedido. Por favor, consulta nuestra política de devoluciones para obtener más información.",
  },
  {
    q: "¿Ofrecen muestras gratuitas?",
    a: "Sí, en ocasiones ofrecemos muestras gratuitas con ciertas compras o como promociones especiales. Mantente atento a nuestras ofertas y promociones.",
  },
  {
    q: "¿Tienen programas de fidelidad o recompensas para clientes habituales?",
    a: "Sí, ofrecemos un programa de recompensas para nuestros clientes habituales. Cada compra acumula puntos que pueden ser canjeados por descuentos o productos gratuitos.",
  },
  {
    q: "¿Puedo suscribirme a su boletín para recibir noticias y ofertas?",
    a: "Sí, puedes suscribirte a nuestro boletín para recibir noticias, ofertas exclusivas y novedades sobre nuestros productos y eventos.",
  },
];

export default function FAQPage() {
  // Controla qué ítems están abiertos (permite múltiples abiertos)
  const [openSet, setOpenSet] = useState(new Set());

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    // Fondo claro solo en esta página
    <main className="bg-white text-black">
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Preguntas Frecuentes</h1>
        <p className="text-gray-600 mb-8">
          Encuentra respuestas a las dudas más comunes sobre nuestros productos y tu experiencia de compra.
        </p>

        <div className="divide-y divide-gray-200">
          {faqs.map((item, idx) => {
            const isOpen = openSet.has(idx);
            const panelId = `faq-panel-${idx}`;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left flex items-start gap-4 group focus:outline-none cursor-pointer"
                >
                  {/* Círculo con + / - (cursor en forma de mano sobre el círculo) */}
                  <span
                    aria-hidden="true"
                    className={[
                      "mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
                      "cursor-pointer", // mano al pasar el cursor por el círculo
                      isOpen
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black",
                    ].join(" ")}
                  >
                    {isOpen ? "−" : "+"}
                  </span>

                  <span className="flex-1 font-medium leading-6">
                    {item.q}
                  </span>
                </button>

                {/* Contenido colapsable con animación */}
                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={[
                    "overflow-hidden transition-[grid-template-rows] duration-200 ease-out grid",
                    isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <p className="text-gray-700 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="mt-10 rounded-md bg-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-2">¿Tienes alguna otra pregunta?</h2>
          <p className="text-gray-700 mb-4">
            No dudes en ponerte en contacto con nuestro equipo de atención al cliente, estaremos encantados de ayudarte.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-5 py-3 font-semibold"
          >
            Contactar Soporte
          </a>
        </div>
      </section>
    </main>
  );
}