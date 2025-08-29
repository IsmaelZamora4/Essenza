export default function ProductsLayout({ children }) {
  // Fuerza fondo blanco y texto oscuro para TODO /products/*
  return <div className="bg-white text-slate-900 min-h-screen">{children}</div>;
}