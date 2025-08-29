// Índice simple de páginas del sitio para el buscador.
// Agrega o quita rutas según tu proyecto.
export const siteIndex = [
  { label: "Inicio", href: "/", keywords: ["home", "inicio"] },
  { label: "Blog", href: "/blog", keywords: ["artículos", "noticias"] },
  { label: "Puntos de Venta", href: "/puntos-de-venta", keywords: ["tiendas", "stores", "venta"] },
  { label: "Términos de Servicio", href: "/terminos-de-servicio", keywords: ["terminos", "condiciones", "tos"] },
  { label: "Sobre Nosotros", href: "/nosotros", keywords: ["about", "quienes somos"] },
  { label: "Contacto", href: "/contact", keywords: ["ayuda", "soporte", "contacto"] },
  // Si aún no tienes FAQ, lo dejará como "No existe".
  { label: "FAQ", href: "/faq", keywords: ["preguntas frecuentes", "preguntas", "faq"] },
];