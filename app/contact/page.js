"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "" // honeypot
  });
  const [status, setStatus] = useState({ sending: false, ok: null, error: null });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, error: null });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company, // honeypot
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const msg = json?.errors ? Object.values(json.errors).join(" • ") : json?.error || "No se pudo enviar.";
        throw new Error(msg);
      }
      setStatus({ sending: false, ok: true, error: null });
      setForm({ name: "", email: "", phone: "", message: "", company: "" });
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err.message || "Error" });
    }
  };

  return (
    // Fondo blanco solo en la sección principal de esta página
    <main className="bg-white text-black">
      {/* Para centrar verticalmente también, añade min-h-[60vh] flex items-start justify-center (o justify-center para centro vertical) */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="mb-4 text-xl font-semibold">Contáctate con nosotros</h1>

        {/* Honeypot invisible */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={onChange}
          autoComplete="off"
          tabIndex={-1}
          className="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0"
          aria-hidden="true"
        />

        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none"
          />
          <input
            name="phone"
            placeholder="Número de teléfono"
            value={form.phone}
            onChange={onChange}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none"
          />
          <textarea
            name="message"
            placeholder="Comentario"
            rows={6}
            value={form.message}
            onChange={onChange}
            required
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none resize-vertical"
          />
          <button
            type="submit"
            disabled={status.sending}
            className="w-full sm:w-56 font-semibold bg-black text-white px-4 py-3 disabled:opacity-60"
          >
            {status.sending ? "Enviando..." : "ENVIAR MENSAJE"}
          </button>
        </form>

        {status.ok && <div className="mt-3 text-green-700">¡Gracias! Tu mensaje fue enviado.</div>}
        {status.ok === false && <div className="mt-3 text-red-700">{status.error}</div>}
      </section>
    </main>
  );
}