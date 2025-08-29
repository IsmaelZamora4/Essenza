"use client";

export default function ProductActions({ stock = 0, onAdd, onBuyNow }) {
  const inStock = (stock ?? 0) > 0;

  const primaryBase =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const primaryEnabled =
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900 ring-offset-white";
  const primaryDisabled =
    "bg-slate-300 text-slate-500 cursor-not-allowed";

  const outlineBase =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const outlineEnabled =
    "border-slate-900 text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-900 ring-offset-white";
  const outlineDisabled =
    "border-slate-300 text-slate-400 cursor-not-allowed";

  return (
    <div className="mt-4 flex gap-3">
      <button
        type="button"
        onClick={inStock ? onAdd : undefined}
        disabled={!inStock}
        className={`${primaryBase} ${inStock ? primaryEnabled : primaryDisabled}`}
        title={inStock ? "Agregar al carrito" : "Sin stock"}
        aria-disabled={!inStock}
      >
        Agregar al carrito
      </button>

      <button
        type="button"
        onClick={inStock ? onBuyNow : undefined}
        disabled={!inStock}
        className={`${outlineBase} ${inStock ? outlineEnabled : outlineDisabled}`}
        title={inStock ? "Comprar ahora" : "Sin stock"}
        aria-disabled={!inStock}
      >
        Comprar ahora
      </button>
    </div>
  );
}