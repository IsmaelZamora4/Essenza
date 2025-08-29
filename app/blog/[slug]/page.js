import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "../../../content/posts";

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

// Pre-render de rutas dinámicas para todos los posts
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Metadata por post
export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Artículo no encontrado | ESSENZA" };
  return {
    title: `${post.title} | ESSENZA`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="bg-white text-black">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-6">
          <Link href="/blog" className="text-sm text-gray-600 hover:underline">
            ← Volver al Blog
          </Link>
        </nav>

        <header>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5">
              {post.category}
            </span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{readingTime(post.content)}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold">{post.title}</h1>
          {post.author && <p className="mt-1 text-gray-600">Por {post.author}</p>}
        </header>

        <hr className="my-6 border-gray-200" />

        <div
          className="prose prose-neutral max-w-none prose-h2:mt-6 prose-h2:mb-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-600">
          ¿Te gustó este artículo? Más en{" "}
          <Link href="/blog" className="underline">nuestro blog</Link> o{" "}
          <Link href="/contact" className="underline">contáctanos</Link>.
        </footer>
      </article>
    </main>
  );
}