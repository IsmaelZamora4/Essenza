import Link from "next/link";
import { posts as allPosts } from "../../content/posts";

// Utilidades simples
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de lectura`;
}

export const metadata = {
  title: "Blog | ESSENZA",
  description:
    "Novedades, guías y consejos sobre perfumes nicho, fragancias árabes, cuidado facial y más.",
};

export default function BlogIndexPage() {
  // Ordenar del más nuevo al más antiguo
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="bg-white text-black">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Blog</h1>
          <p className="mt-2 text-gray-600">
            Explora artículos, guías y recomendaciones para elevar tu rutina de belleza.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="border border-gray-200 rounded-lg bg-white"
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">
                    {p.category}
                  </span>
                  <span>•</span>
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span>•</span>
                  <span>{readingTime(p.content)}</span>
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>

                <p className="mt-2 text-gray-700">{p.excerpt}</p>

                <div className="mt-5">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="inline-block bg-black text-white px-4 py-2 font-semibold"
                  >
                    Leer artículo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}