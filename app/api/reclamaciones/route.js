export async function POST(req) {
  try {
    const body = await req.json();

    // Validación básica en servidor (requeridos)
    const required = [
      body?.consumidor?.nombres,
      body?.consumidor?.apellidos,
      body?.consumidor?.tipoDoc,
      body?.consumidor?.nroDoc,
      body?.consumidor?.email,
      body?.consumidor?.telefono,
      body?.bien?.tipo,
      body?.bien?.nombre,
      body?.reclamo?.tipo,
      body?.reclamo?.detalle,
      body?.reclamo?.pedido,
    ];
    if (body?.consumidor?.esMenor) {
      required.push(
        body?.consumidor?.apoderado?.nombre,
        body?.consumidor?.apoderado?.tipoDoc,
        body?.consumidor?.apoderado?.nroDoc
      );
    }
    if (required.some((v) => !v || String(v).trim() === "")) {
      return Response.json({ ok: false, message: "Campos obligatorios faltantes" }, { status: 400 });
    }

    // Generar ID legible: YYYYMMDD-HHMMSS-XXXX
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const id = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
      "-",
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds()),
      "-",
      Math.floor(Math.random() * 9000 + 1000),
    ].join("");

    // Aquí puedes integrar envío por correo o Slack/Webhook
    // Ejemplo (pseudo):
    // await fetch(process.env.SLACK_WEBHOOK_URL, { method: "POST", body: JSON.stringify({ text: `Nuevo ${body.reclamo.tipo} ${id}` }) });

    // Por ahora, solo registramos en logs del servidor
    console.log("Nuevo registro de Libro de Reclamaciones:", { id, body });

    return Response.json({ ok: true, id });
  } catch (err) {
    console.error("Error en /api/reclamaciones", err);
    return Response.json({ ok: false, message: "Error del servidor" }, { status: 500 });
  }
}