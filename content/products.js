// Catálogo simple sin backend
export const products = [
  // DARA CARO – Sweet Obsession (ya lo tenías)
  {
    slug: "dara-caro-sweet-obsession",
    category: "nicho",
    brand: "DARA CARO",
    name: "Sweet Obsession Parfum",
    shortPhrase: "Obsesión dulce y audaz.",
    price: 100.0,
    volume: "100 ml",
    origin: "Hecho en Francia",
    stock: 18,
    images: [
      "/products/dara-caro/1.webp",
      "/products/dara-caro/2.webp",
      "/products/dara-caro/3.webp",
    ],
    pyramid: {
      top: ["Algodón de azúcar", "Oud"],
      heart: ["Bergamota", "Vainilla"],
      base: ["Cereza", "Ámbar"],
    },
    accords: [
      { key: "dulce", label: "Dulce (algodón de azúcar)", percent: 90, color: "#ef4444" },
      { key: "oud", label: "Amaderado (oud)", percent: 85, color: "#92400e" },
      { key: "vainilla", label: "Cremoso (vainilla)", percent: 75, color: "#fbbf24" },
      { key: "bergamota", label: "Cítrico (bergamota)", percent: 70, color: "#22d3ee" },
      { key: "cereza", label: "Frutal (cereza)", percent: 60, color: "#f472b6" },
      { key: "ambar", label: "Ámbar", percent: 65, color: "#f59e0b" },
    ],
    description:
      "Una fragancia intensa y envolvente que combina dulzor adictivo con matices amaderados y ámbar cálido.",
  },

  // NIAREUCE – Niareuce Parfum
  {
    slug: "niareuce-parfum",
    category: "nicho",
    brand: "ELYSIAN",
    name: "Niareuce Parfum",
    shortPhrase: "Frescura afrutada con un corazón floral luminoso.",
    price: 199.0,
    volume: "100 ml",
    origin: "Hecho en Francia",
    stock: 0,
    images: [
      "/products/niareuce/1.webp",
      "/products/niareuce/2.webp",
      "/products/niareuce/3.webp",
    ],
    pyramid: {
      top: ["Cítricos frescos", "Frutos rojos", "Manzana verde"],
      heart: ["Rosas búlgaras", "Jazmín blanco", "Peonía"],
      base: ["Almizcle blanco", "Maderas nobles", "Ámbar suave", "Acordes acuáticos"],
    },
    accords: [
      { key: "afrutados", label: "Afrutados", percent: 95, color: "#f59e0b" },
      { key: "fresco", label: "Fresco", percent: 88, color: "#22d3ee" },
      { key: "dulce", label: "Dulce", percent: 80, color: "#f43f5e" },
      { key: "florales", label: "Florales", percent: 80, color: "#f472b6" },
      { key: "floral-blanco", label: "Floral blanco", percent: 70, color: "#facc15" },
      { key: "rosas", label: "Rosas", percent: 70, color: "#fb7185" },
      { key: "almizclado", label: "Almizclado", percent: 60, color: "#94a3b8" },
      { key: "amaderado", label: "Amaderado", percent: 50, color: "#92400e" },
      { key: "acuatico", label: "Acuático", percent: 50, color: "#06b6d4" },
    ],
    description:
      "Salida brillante de cítricos y frutos rojos sobre un corazón floral de rosas y jazmín. En el fondo, almizcle blanco y maderas nobles con un toque acuático y ámbar suave.",
  },

  // BERGAMOT – Bergamot Niche
  {
    slug: "bergamot-niche",
    category: "nicho",
    brand: "BERGAMOT",
    name: "Bergamot Niche",
    shortPhrase: "Frescura pura en cada nota.",
    price: 120.0,
    volume: "100 ml",
    origin: "Hecho en Francia",
    stock: 20,
    images: [
      "/products/bergamot/1.webp",
      "/products/bergamot/2.webp",
      "/products/bergamot/3.webp",
    ],
    pyramid: {
      top: ["Bergamota fresca", "Limón siciliano", "Mandarina"],
      heart: ["Hojas verdes", "Lavanda", "Notas acuáticas"],
      base: ["Cedro", "Almizcle blanco", "Vetiver"],
    },
    accords: [
      { key: "citricos", label: "Cítricos", percent: 95, color: "#f59e0b" },
      { key: "fresco", label: "Fresco", percent: 90, color: "#22d3ee" },
      { key: "verde", label: "Verde", percent: 85, color: "#16a34a" },
      { key: "acuatico", label: "Acuático", percent: 75, color: "#06b6d4" },
      { key: "aromatico", label: "Aromático", percent: 70, color: "#a78bfa" },
      { key: "amaderado", label: "Amaderado", percent: 55, color: "#92400e" },
      { key: "almizclado", label: "Almizclado", percent: 45, color: "#94a3b8" },
    ],
    description:
      "Un estallido cítrico y limpio que se abre con bergamota, limón y mandarina. Evoluciona hacia matices verdes y acuáticos con lavanda, y se asienta en un fondo elegante de cedro, almizcle y vetiver.",
  },
  

  // NOCTIS – Améthyste
  {
    slug: "noctis-amethyste",
    category: "nicho",
    brand: "NOCTIS",
    name: "Améthyste",
    shortPhrase: "El misterio hecho fragancia.",
    price: 150.0,
    volume: "100 ml",
    origin: "Hecho en Francia",
    stock: 9,
    images: [
      "/products/noctis/1.webp",
      "/products/noctis/2.webp",
      "/products/noctis/3.webp",
    ],
    pyramid: {
      top: ["Pimienta rosa", "Bergamota", "Ciruela oscura"],
      heart: ["Rosa negra", "Jazmín nocturno", "Orquídea"],
      base: ["Ámbar", "Incienso", "Almizcle blanco", "Madera de sándalo"],
    },
    accords: [
      { key: "ambarado", label: "Ambarado", percent: 90, color: "#f59e0b" },
      { key: "especiado-calido", label: "Especiado cálido", percent: 85, color: "#b45309" },
      { key: "floral-oscuro", label: "Floral oscuro", percent: 75, color: "#a21caf" },
      { key: "almizclado", label: "Almizclado", percent: 70, color: "#94a3b8" },
      { key: "amaderado", label: "Amaderado", percent: 65, color: "#92400e" },
      { key: "dulce", label: "Dulce", percent: 55, color: "#f43f5e" },
      { key: "incienso", label: "Incienso", percent: 50, color: "#6b7280" },
    ],
    description:
      "Ambarado y especiado con un corazón floral oscuro de rosa negra y jazmín nocturno. El fondo de incienso, sándalo y almizcle viste la fragancia con un halo místico.",
  },

  // VALENTINO – Donna
  {
    slug: "valentino-donna",
    category: "nicho",
    brand: "VALENTINO",
    name: "Donna",
    shortPhrase: "Elegancia atemporal hecha aroma",
    price: 150.0,
    volume: "150 ml",
    origin: "Hecho en Italia",
    stock: 10,
    images: [
      "/products/valentino/1.webp",
      "/products/valentino/2.webp",
      "/products/valentino/3.webp",
    ],
    accords: [
      { label: "Iris", percent: 90 },
      { label: "Rosas", percent: 85 },
      { label: "Atalcado", percent: 80 },
      { label: "Cuero", percent: 70 },
      { label: "Avainillado", percent: 65 },
      { label: "Terrosos", percent: 60 },
      { label: "Pachulí", percent: 55 },
      { label: "Amaderado", percent: 50 },
      { label: "Violeta", percent: 45 },
      { label: "Cítrico", percent: 40 },
    ],
    pyramid: {
      top: ["bergamota", "mandarina", "limón"],
      heart: ["iris", "rosa búlgara", "violeta"],
      base: ["cuero", "vainilla", "pachulí", "maderas suaves"],
    },
    description:
      "Una composición elegante con iris y rosas sobre un toque atalcado, cuero y vainilla, asentada en matices terrosos y amaderados.",
  },

  // =========================
  // PERFUMES ÁRABES (nuevos)
  // =========================

  {
    slug: "al-qasr-royale",
    category: "arabes",
    brand: "HOUSE OF ZAFIR",
    name: "Al Qasr Royale",
    shortPhrase: "Un palacio en cada gota.",
    price: 180.0,
    volume: "150 ml",
    origin: "Hecho en Arabia Saudita",
    stock: 10,
    images: [
      "/products/al-qasr-royale/1.webp",
      "/products/al-qasr-royale/2.webp",
      "/products/al-qasr-royale/3.webp",
    ],
    accords: [
      { label: "Ambarado", percent: 95, color: "#f59e0b" },
      { label: "Oriental especiado", percent: 85, color: "#b45309" },
      { label: "Resinoso (benjuí, ládano)", percent: 80, color: "#6b7280" },
      { label: "Floral blanco (jazmín, nardo)", percent: 70, color: "#facc15" },
      { label: "Amaderado (cedro, sándalo)", percent: 65, color: "#92400e" },
      { label: "Dulce (miel dorada, vainilla)", percent: 55, color: "#f43f5e" },
      { label: "Oud árabe", percent: 50, color: "#92400e" },
    ],
    pyramid: {
      top: ["azafrán", "cardamomo", "bergamota"],
      heart: ["jazmín árabe", "nardo", "miel dorada"],
      base: ["Ámbar", "oud", "benjuí", "madera de cedro"],
    },
    description:
      "Oro líquido con especias orientales, flores blancas y un fondo ambarado y resinoso con oud.",
  },

  {
    slug: "saphir-obscur",
    category: "arabes",
    brand: "MAISON AL ZAHRA",
    name: "Saphir Obscur",
    shortPhrase: "El enigma hecho esencia.",
    price: 150.0,
    volume: "150 ml",
    origin: "Hecho en Omán",
    stock: 10,
    images: [
      "/products/saphir-obscur/1.webp",
      "/products/saphir-obscur/2.webp",
      "/products/saphir-obscur/3.webp",
    ],
    accords: [
      { label: "Ambarado", percent: 85, color: "#f59e0b" },
      { label: "Especiado oriental", percent: 80, color: "#b45309" },
      { label: "Incienso ahumado", percent: 75, color: "#6b7280" },
      { label: "Floral oscuro", percent: 70, color: "#a21caf" },
      { label: "Amaderado (oud, cedro)", percent: 65, color: "#92400e" },
      { label: "Almizclado", percent: 55, color: "#94a3b8" },
      { label: "Cuero suave", percent: 50, color: "#92400e" },
    ],
    pyramid: {
      top: ["pimienta negra", "nuez moscada", "azafrán"],
      heart: ["rosa de Damasco", "lirio nocturno", "incienso"],
      base: ["ámbar negro", "oud", "cuero suave", "almizcle blanco"],
    },
    description:
      "Oscuro, especiado e incienso profundo con un corazón floral rico y un fondo ambarado y de cuero suave.",
  },

  {
    slug: "dahmir-al-sahra",
    category: "arabes",
    brand: "MAISON AL QAMAR",
    name: "Dahmir Al Sahra",
    shortPhrase: "La eternidad en las dunas.",
    price: 120.0,
    volume: "150 ml",
    origin: "Hecho en Kuwait",
    stock: 10,
    images: [
      "/products/dahmir-al-sahra/1.webp",
      "/products/dahmir-al-sahra/2.webp",
      "/products/dahmir-al-sahra/3.webp",
    ],
    accords: [
      { label: "Ambarado", percent: 90, color: "#f59e0b" },
      { label: "Oud intenso", percent: 85, color: "#92400e" },
      { label: "Especiado cálido", percent: 80, color: "#b45309" },
      { label: "Cuero ahumado", percent: 70, color: "#92400e" },
      { label: "Resinoso (incienso, mirra)", percent: 65, color: "#6b7280" },
      { label: "Almizclado", percent: 55, color: "#94a3b8" },
    ],
    pyramid: {
      top: ["pimienta negra", "cardamomo", "clavo"],
      heart: ["rosa oriental", "incienso", "cuero oscuro"],
      base: ["Ámbar", "oud", "mirra", "almizcle"],
    },
    description:
      "Especias cálidas, oud y resinas en un viaje ambarado con cuero y almizcle.",
  },

  {
    slug: "sultan-al-zahab",
    category: "arabes",
    brand: "DAR AL MALAKI",
    name: "Sultan Al Zahab",
    shortPhrase: "La realeza hecha perfume.",
    price: 200.0,
    volume: "150 ml",
    origin: "Hecho en Egipto",
    stock: 10,
    images: [
      "/products/sultan-al-zahab/1.webp",
      "/products/sultan-al-zahab/2.webp",
      "/products/sultan-al-zahab/3.webp",
    ],
    accords: [
      { label: "Ambarado real", percent: 95, color: "#f59e0b" },
      { label: "Oud árabe", percent: 85, color: "#92400e" },
      { label: "Especiado dulce", percent: 80, color: "#b45309" },
      { label: "Floral blanco (jazmín, azahar)", percent: 70, color: "#facc15" },
      { label: "Resinoso (incienso, mirra)", percent: 65, color: "#6b7280" },
      { label: "Almizclado", percent: 55, color: "#94a3b8" },
      { label: "Vainilla dorada", percent: 50, color: "#fbbf24" },
    ],
    pyramid: {
      top: ["azafrán", "bergamota", "miel especiada"],
      heart: ["jazmín", "azahar", "incienso"],
      base: ["Ámbar dorado", "oud", "mirra", "vainilla", "almizcle blanco"],
    },
    description:
      "Un perfil regio con ámbar dorado, oud árabe, especias dulces y flores blancas.",
  },

  {
    slug: "al-qamar-noir",
    category: "arabes",
    brand: "DAR AL LAYL",
    name: "Al Qamar Noir",
    shortPhrase: "La noche hecha esencia.",
    price: 100.0,
    volume: "150 ml",
    origin: "Hecho en Emiratos Árabes Unidos",
    stock: 0,
    images: [
      "/products/al-qamar-noir/1.webp",
      "/products/al-qamar-noir/2.webp",
      "/products/al-qamar-noir/3.webp",
    ],
    accords: [
      { label: "Incienso místico", percent: 90, color: "#6b7280" },
      { label: "Ambarado", percent: 85, color: "#f59e0b" },
      { label: "Oud intenso", percent: 80, color: "#92400e" },
      { label: "Especiado cálido", percent: 70, color: "#b45309" },
      { label: "Floral nocturno", percent: 65, color: "#a21caf" },
      { label: "Resinoso (mirra, benjuí)", percent: 55, color: "#6b7280" },
      { label: "Almizclado etéreo", percent: 50, color: "#94a3b8" },
    ],
    pyramid: {
      top: ["cardamomo", "pimienta rosa", "bergamota oscura"],
      heart: ["rosa negra", "jazmín de medianoche", "incienso"],
      base: ["Ámbar", "oud", "mirra", "benjuí", "almizcle blanco"],
    },
    description:
      "Nocturno y envolvente: incienso místico, oud intenso y ámbar sobre flores oscuras.",
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}