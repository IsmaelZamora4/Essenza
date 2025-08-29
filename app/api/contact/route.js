import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, hint: "Usa POST para enviar el formulario a /api/contact" });
}

const isNonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
const clip = (v, n = 20000) => String(v || "").slice(0, n);

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    // Honeypot anti‑spam
    if (body.company) return NextResponse.json({ ok: true });

    const name = clip(body.name || body.nombre, 200);
    const email = clip(body.email, 320);
    const phone = clip(body.phone || body.telefono, 50);
    const message = clip(body.message || body.comentario, 20000);
    const page_url = clip(body.page_url, 2000);
    const user_agent = clip(body.user_agent, 1000);

    const errors = {};
    if (!isNonEmpty(name)) errors.name = "Nombre requerido";
    if (!isEmail(email)) errors.email = "Correo inválido";
    if (!isNonEmpty(message)) errors.message = "Mensaje requerido";
    if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendKey || !to || !from) {
      return NextResponse.json(
        { ok: false, error: "Faltan RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const subject = `Nuevo mensaje de contacto: ${name}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;">
        <h2 style="margin:0 0 8px;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <div style="white-space:pre-wrap;border:1px solid #eee;padding:12px;border-radius:8px;">${escapeHtml(message)}</div>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
        <p style="color:#666;font-size:12px;">
          URL: ${escapeHtml(page_url)}<br/>
          User-Agent: ${escapeHtml(user_agent)}
        </p>
      </div>
    `;

    // Llamada a Resend
    let data, error;
    try {
      const result = await resend.emails.send({
        from,
        to,
        subject,
        html,
        reply_to: email,
      });
      data = result?.data;
      error = result?.error;
      console.log("RESEND_RESULT:", JSON.stringify(result, null, 2));
    } catch (e) {
      console.error("RESEND_THROWN_ERROR:", e);
      // Devuelve el mensaje de error capturado
      const msg = e?.message || (typeof e === "string" ? e : "Fallo enviando email");
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    if (error) {
      console.error("RESEND_ERROR_OBJECT:", error);
      const msg = error?.message || JSON.stringify(error) || "Fallo enviando email";
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id || null });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Error interno" }, { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}