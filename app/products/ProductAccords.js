import React from "react";

// Mapa de colores por acorde (keys normalizadas en minúsculas y sin tildes)
const ACCORD_COLORS = {
  // familias base
  dulce: "#f43f5e",
  afrutados: "#f59e0b",
  fresco: "#22d3ee",
  florales: "#f472b6",
  "floral blanco": "#facc15",
  "floral oscuro": "#a21caf",
  rosas: "#fb7185",
  iris: "#a78bfa",
  violeta: "#7c3aed",
  atalcado: "#c084fc",

  almizclado: "#94a3b8",
  amaderado: "#92400e",
  acuatico: "#06b6d4",
  aromatico: "#a78bfa",
  incienso: "#6b7280",

  citrico: "#f59e0b",
  citricos: "#f59e0b",

  ambar: "#f59e0b",
  ambarado: "#f59e0b",

  cuero: "#92400e",
  avainillado: "#fbbf24",
  terroso: "#78350f",
  terrosos: "#78350f",
  pachuli: "#65a30d",
};

function normalize(s = "") {
  return s
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes
}

// Intenta: 1) usar a.color, 2) match exacto, 3) match parcial (por ej. "dulce (algo)")
function colorFor(accord) {
  if (accord?.color) return accord.color;

  const raw = accord?.key || accord?.label || "";
  const key = normalize(raw).trim();

  if (ACCORD_COLORS[key]) return ACCORD_COLORS[key];

  // match parcial si la etiqueta trae extras
  for (const k of Object.keys(ACCORD_COLORS)) {
    if (key.includes(k)) return ACCORD_COLORS[k];
  }

  return "#8884d8"; // fallback
}

export default function ProductAccords({ accords = [] }) {
  if (!accords?.length) return null;

  const sorted = [...accords].sort((a, b) => (b.percent || 0) - (a.percent || 0));

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Acordes principales</h2>
      <div className="flex flex-col">
        {sorted.map((a) => {
          const pct = Math.max(0, Math.min(100, a.percent ?? 0));
          const barColor = colorFor(a);
          return (
            <div
              key={a.key || a.label}
              className="grid grid-cols-[220px,1fr,3.5rem] items-center gap-4 py-1"
            >
              <span className="text-sm text-slate-700 truncate" title={a.label}>
                {a.label}
              </span>

              <div className="relative h-4 rounded-full overflow-hidden bg-slate-200">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: barColor }}
                />
              </div>

              <span
                className="text-sm text-slate-600 text-right"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}