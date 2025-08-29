import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="breadcrumb" className="text-sm mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const content = item?.href ? (
            <Link
              href={item.href}
              className={isLast ? "text-slate-800 hover:underline" : "hover:underline"}
              aria-current={isLast ? "page" : undefined}
            >
              {item.label}
            </Link>
          ) : (
            <span className={isLast ? "text-slate-800" : ""} aria-current={isLast ? "page" : undefined}>
              {item.label}
            </span>
          );

          return (
            <li key={`${item?.label ?? idx}-${idx}`} className="flex items-center gap-2">
              {content}
              {!isLast && <span className="text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}