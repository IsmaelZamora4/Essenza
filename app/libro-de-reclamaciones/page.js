"use client";

import { useState } from "react";

const EMPRESA = {
  razonSocial: "ESSENZA S.A.C.",
  ruc: "20601234567",
  domicilio: "Av. Fragancias 123, Miraflores, Lima, Perú",
  correoAtencion: "atencion@essenza.pe",
};

function Label({ htmlFor, children, required = false }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-800">
      {children} {required && <span className="text-red-600">*</span>}
    </label>
  );
}

function Field({ children }) {
  return <div className="space-y-1">{children}</div>;
}

function Section({ title, subtitle, children }) {
  return (
    <section className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">{children}</div>
    </section>
  );
}

export default function LibroDeReclamacionesPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);
  const [esMenor, setEsMenor] = useState(false);
  const [tipoBien, setTipoBien] = useState("Producto");
  const [tipoReclamo, setTipoReclamo] = useState("Reclamo");

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const files = Array.from(fd.getAll("adjuntos")).filter(Boolean);
    const attachments = files.map((f) => ({
      name: f.name,
      type: f.type,
      size: f.size,
    }));

    const payload = {
      consumidor: {
        nombres: fd.get("nombres")?.toString().trim(),
        apellidos: fd.get("apellidos")?.toString().trim(),
        tipoDoc: fd.get("tipoDoc"),
        nroDoc: fd.get("nroDoc")?.toString().trim(),
        email: fd.get("email")?.toString().trim(),
        telefono: fd.get("telefono")?.toString().trim(),
        domicilio: fd.get("domicilio")?.toString().trim(),
        esMenor: fd.get("esMenor") === "on",
        apoderado: fd.get("esMenor") === "on"
          ? {
              nombre: fd.get("apoderadoNombre")?.toString().trim(),
              tipoDoc: fd.get("apoderadoTipoDoc"),
              nroDoc: fd.get("apoderadoNroDoc")?.toString().trim(),
            }
          : null,
      },
      bien: {
        tipo: fd.get("tipoBien"),
        nombre: fd.get("bienNombre")?.toString().trim(),
        pedido: fd.get("pedido")?.toString().trim(),
        monto: fd.get("monto")?.toString().trim(),
        fecha: fd.get("fecha")?.toString(),
      },
      reclamo: {
        tipo: fd.get("tipoReclamo"),
        detalle: fd.get("detalle")?.toString().trim(),
        pedido: fd.get("pedidoDetalle")?.toString().trim(),
      },
      consent: {
        datos: fd.get("aceptoDatos") === "on",
        veracidad: fd.get("declaroVeracidad") === "on",
      },
      meta: {
        attachments,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
    };

    const required = [
      payload.consumidor.nombres,
      payload.consumidor.apellidos,
      payload.consumidor.tipoDoc,
      payload.consumidor.nroDoc,
      payload.consumidor.email,
      payload.consumidor.telefono,
      payload.bien.tipo,
      payload.bien.nombre,
      payload.reclamo.tipo,
      payload.reclamo.detalle,
      payload.reclamo.pedido,
    ];
    if (payload.consumidor.esMenor) {
      required.push(
        payload.consumidor.apoderado?.nombre,
        payload.consumidor.apoderado?.tipoDoc,
        payload.consumidor.apoderado?.nroDoc
      );
    }
    if (required.some((v) => !v)) {
      alert("Por favor completa los campos obligatorios marcados con *");
      return;
    }
    if (!payload.consent.datos || !payload.consent.veracidad) {
      alert("Debes aceptar el tratamiento de datos y declarar veracidad.");
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Error al registrar la reclamación");
      setSent({ id: data.id, payload });
      form.reset();
      setEsMenor(false);
      setTipoBien("Producto");
      setTipoReclamo("Reclamo");
    } catch (err) {
      console.error(err);
      alert("No se pudo registrar tu reclamo. Inténtalo nuevamente.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <main className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-14">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Libro de Reclamaciones</h1>
          <div className="mt-6 bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600">Registro generado</p>
                <p className="text-xl font-semibold text-slate-900">N.º {sent.id}</p>
              </div>
              <div className="text-right text-sm text-slate-600">
                <div className="font-medium text-slate-900">{EMPRESA.razonSocial}</div>
                <div>RUC {EMPRESA.ruc}</div>
                <div>{EMPRESA.domicilio}</div>
              </div>
            </div>

            <div className="mt-6 text-slate-700 space-y-3">
              <p>Hemos registrado tu {sent.payload.reclamo.tipo.toLowerCase()}. Te responderemos al correo indicado dentro de un plazo máximo de 30 días calendario.</p>
              <p>
                Si necesitas ampliar información, escríbenos a{" "}
                <a className="underline" href={`mailto:${EMPRESA.correoAtencion}`}>{EMPRESA.correoAtencion}</a>.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSent(null)}
                className="inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
              >
                Registrar otra solicitud
              </button>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Nota: La presentación de un reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante la
            autoridad competente. El proveedor debe dar respuesta en un plazo no mayor a 30 días calendario, pudiendo ampliar el plazo hasta 30 días más con justificación.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Libro de Reclamaciones</h1>
        <p className="mt-2 text-slate-600">
          Libro de Reclamaciones Virtual de {EMPRESA.razonSocial} (RUC {EMPRESA.ruc}). Dirección: {EMPRESA.domicilio}.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <Section
            title="1) Datos del consumidor"
            subtitle="Si el consumidor es menor de edad, marca la casilla e incluye los datos del apoderado."
          >
            <Field>
              <Label htmlFor="nombres" required>Nombres</Label>
              <input id="nombres" name="nombres" type="text" required className="input" placeholder="Juan Carlos" />
            </Field>

            <Field>
              <Label htmlFor="apellidos" required>Apellidos</Label>
              <input id="apellidos" name="apellidos" type="text" required className="input" placeholder="Pérez Gómez" />
            </Field>

            <Field>
              <Label htmlFor="tipoDoc" required>Tipo de documento</Label>
              <select id="tipoDoc" name="tipoDoc" required className="input">
                <option value="DNI">DNI</option>
                <option value="CE">Carné de Extranjería</option>
                <option value="PAS">Pasaporte</option>
              </select>
            </Field>

            <Field>
              <Label htmlFor="nroDoc" required>Número de documento</Label>
              <input id="nroDoc" name="nroDoc" type="text" required className="input" inputMode="numeric" maxLength={15} placeholder="12345678" />
            </Field>

            <Field>
              <Label htmlFor="email" required>Correo electrónico</Label>
              <input id="email" name="email" type="email" required className="input" placeholder="tucorreo@dominio.com" />
            </Field>

            <Field>
              <Label htmlFor="telefono" required>Teléfono</Label>
              <input id="telefono" name="telefono" type="tel" required className="input" placeholder="999 999 999" />
            </Field>

            <Field className="md:col-span-2">
              <Label htmlFor="domicilio">Domicilio</Label>
              <input id="domicilio" name="domicilio" type="text" className="input" placeholder="Calle/Av., número, distrito, provincia" />
            </Field>

            {/* AUMENTO DE CONTRASTE */}
            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-900">
                <input
                  type="checkbox"
                  name="esMenor"
                  onChange={(e) => setEsMenor(e.currentTarget.checked)}
                  className="h-4 w-4"
                />
                <span>El consumidor es menor de edad</span>
              </label>
            </div>

            {esMenor && (
              <>
                <Field>
                  <Label htmlFor="apoderadoNombre" required>Nombre del apoderado</Label>
                  <input id="apoderadoNombre" name="apoderadoNombre" type="text" required className="input" />
                </Field>
                <Field>
                  <Label htmlFor="apoderadoTipoDoc" required>Tipo de documento (apoderado)</Label>
                  <select id="apoderadoTipoDoc" name="apoderadoTipoDoc" required className="input">
                    <option value="DNI">DNI</option>
                    <option value="CE">Carné de Extranjería</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                </Field>
                <Field className="md:col-span-2">
                  <Label htmlFor="apoderadoNroDoc" required>Número de documento (apoderado)</Label>
                  <input id="apoderadoNroDoc" name="apoderadoNroDoc" type="text" required className="input" inputMode="numeric" maxLength={15} />
                </Field>
              </>
            )}
          </Section>

          <Section
            title="2) Bien contratado"
            subtitle="Indica si se trata de un producto o servicio y los datos de tu compra."
          >
            <Field>
              <Label htmlFor="tipoBien" required>Tipo</Label>
              <select
                id="tipoBien"
                name="tipoBien"
                required
                className="input"
                value={tipoBien}
                onChange={(e) => setTipoBien(e.target.value)}
              >
                <option>Producto</option>
                <option>Servicio</option>
              </select>
            </Field>

            <Field>
              <Label htmlFor="bienNombre" required>Producto/Servicio</Label>
              <input id="bienNombre" name="bienNombre" type="text" required className="input" placeholder="Ej. DARA CARO — Sweet Obsession" />
            </Field>

            <Field>
              <Label htmlFor="pedido">N.º de pedido (opcional)</Label>
              <input id="pedido" name="pedido" type="text" className="input" placeholder="Ej. #12345" />
            </Field>

            <Field>
              <Label htmlFor="monto">Monto (opcional)</Label>
              <input id="monto" name="monto" type="number" step="0.01" className="input" placeholder="Ej. 149.90" />
            </Field>

            <Field className="md:col-span-2">
              <Label htmlFor="fecha">Fecha de compra (opcional)</Label>
              <input id="fecha" name="fecha" type="date" className="input" />
            </Field>
          </Section>

          <Section
            title="3) Tipo y detalle"
            subtitle="Selecciona si es Reclamo o Queja y describe lo sucedido."
          >
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* AUMENTO DE CONTRASTE */}
                <div className="flex items-center gap-4 text-slate-900">
                  {["Reclamo", "Queja"].map((t) => (
                    <label key={t} className="inline-flex items-center gap-2 text-sm text-slate-900">
                      <input
                        type="radio"
                        name="tipoReclamo"
                        value={t}
                        checked={tipoReclamo === t}
                        onChange={() => setTipoReclamo(t)}
                        className="h-4 w-4"
                        required
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-medium">Reclamo:</span> disconformidad relacionada al producto/servicio.
                  {" "}<span className="font-medium">Queja:</span> malestar o descontento sobre la atención al público.
                </div>
              </div>
            </div>

            <Field className="md:col-span-2">
              <Label htmlFor="detalle" required>Detalle de la reclamación</Label>
              <textarea id="detalle" name="detalle" required rows={5} className="input" placeholder="Describe los hechos con la mayor precisión posible…" />
            </Field>

            <Field className="md:col-span-2">
              <Label htmlFor="pedidoDetalle" required>Pedido del consumidor</Label>
              <textarea id="pedidoDetalle" name="pedidoDetalle" required rows={4} className="input" placeholder="¿Qué solución solicitas?" />
            </Field>

            <Field className="md:col-span-2">
              <Label htmlFor="adjuntos">Adjuntar archivos (opcional)</Label>
              <input
                id="adjuntos"
                name="adjuntos"
                type="file"
                className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-white hover:file:bg-slate-800"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
              />
              <p className="text-xs text-slate-500 mt-1">Formatos: JPG, PNG o PDF. Máx. 5MB c/u.</p>
            </Field>
          </Section>

          <section className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
            <div className="space-y-3">
              {/* AUMENTO DE CONTRASTE */}
              <label className="inline-flex items-start gap-2 text-sm text-slate-900">
                <input type="checkbox" name="aceptoDatos" className="h-4 w-4 mt-0.5" required />
                <span>
                  Autorizo el tratamiento de mis datos personales conforme a la{" "}
                  <a className="underline text-slate-900 hover:text-slate-700" href="/politica-de-privacidad" target="_blank" rel="noreferrer">
                    Política de Privacidad
                  </a>.
                </span>
              </label>

              {/* AUMENTO DE CONTRASTE */}
              <label className="inline-flex items-start gap-2 text-sm text-slate-900">
                <input type="checkbox" name="declaroVeracidad" className="h-4 w-4 mt-0.5" required />
                <span>Declaro que la información proporcionada es veraz y exacta.</span>
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Atención al consumidor: <a className="underline" href={`mailto:${EMPRESA.correoAtencion}`}>{EMPRESA.correoAtencion}</a>
              </p>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {sending ? "Enviando…" : "Enviar"}
              </button>
            </div>
          </section>
        </form>

        <p className="mt-6 text-xs text-slate-500">
          La presentación de un reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante la autoridad competente.
          El proveedor debe dar respuesta en un plazo no mayor a 30 días calendario, pudiendo ampliar el plazo hasta 30 días más con justificación.
        </p>
      </div>
    </main>
  );
}