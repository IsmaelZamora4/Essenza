"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteIndex } from "../content/site-index";
import { products } from "../content/products";

function normalize(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export default function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");
  const [highlight, setHighlight] = useState(0); // índice resaltado en el dropdown
  const router = useRouter();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Header + spacer
  const headerRef = useRef(null);
  const [spacerH, setSpacerH] = useState(0);

  // Top bar
  const [showTopBar, setShowTopBar] = useState(true);
  const topBarOuterRef = useRef(null); // contenedor que colapsa
  const topBarInnerRef = useRef(null); // contenido con padding
  const [topBarMaxH, setTopBarMaxH] = useState(0);

  // Sugerencias: estado de existencia
  const [existMap, setExistMap] = useState(new Map());

  // Mostrar/ocultar franja superior según scroll
  useEffect(() => {
    const onScroll = () => setShowTopBar(window.scrollY <= 0);
    onScroll(); // estado inicial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Medir altura NATURAL del top bar UNA sola vez, con fuentes cargadas
  useLayoutEffect(() => {
    let cancelled = false;

    const measureOnce = async () => {
      try {
        if (typeof document !== "undefined" && "fonts" in document) {
          await (document.fonts?.ready || Promise.resolve());
        }
      } catch {
        // noop
      }
      if (cancelled) return;

      const outer = topBarOuterRef.current;
      const inner = topBarInnerRef.current;
      if (!outer || !inner) return;

      const h = inner.scrollHeight || inner.offsetHeight || 0;
      const finalH = h > 0 ? h : 32; // ~2rem
      setTopBarMaxH(finalH);
    };

    measureOnce();
    return () => {
      cancelled = true;
    };
  }, []);

  // Medir altura del header (para el spacer, ya que es fixed)
  useLayoutEffect(() => {
    const measureHeader = () => {
      const h = headerRef.current?.offsetHeight || 0;
      setSpacerH(h);
    };
    measureHeader();
    const ro = new ResizeObserver(measureHeader);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", measureHeader);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  // Recalcular spacer cuando cambie el contenido dentro del header
  useEffect(() => {
    const h = headerRef.current?.offsetHeight || 0;
    if (h !== spacerH) setSpacerH(h);
  }, [openSearch, mobileOpen, showTopBar, topBarMaxH, spacerH]);

  // Autofocus cuando se abre buscador (desktop)
  useEffect(() => {
    if (openSearch) inputRef.current?.focus();
  }, [openSearch]);

  // Bloquear scroll cuando panel mobile o buscador overlay están abiertos
  useEffect(() => {
    const lock = mobileOpen || openSearch;
    const original = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen, openSearch]);

  // Cerrar buscador inline con clic fuera (solo desktop)
  useEffect(() => {
    function onDocClick(e) {
      if (!openSearch) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenSearch(false);
        setQ("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openSearch]);

  // Cerrar con Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenSearch(false);
        setQ("");
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Resetear highlight al cambiar el query
  useEffect(() => {
    setHighlight(0);
  }, [q]);

  // Sugerencias de PÁGINAS
  const suggestionsPages = useMemo(() => {
    const n = normalize(q);
    if (n.length < 2) return [];
    return siteIndex
      .filter((item) =>
        normalize([item.label, ...(item.keywords || [])].join(" ")).includes(n)
      )
      .slice(0, 7)
      .map((item) => ({ ...item, type: "page" }));
  }, [q]);

  // Sugerencias de PERFUMES
  const suggestionsProducts = useMemo(() => {
    const n = normalize(q);
    if (n.length < 2) return [];
    const items = products
      .map((p) => {
        const title = `${p.brand ? p.brand + " " : ""}${p.name}`;
        const haystack = normalize(
          [
            title,
            p.slug,
            p.category,
            ...(p.accords?.map((a) => a.label) || []),
            ...(p.pyramid?.top || []),
            ...(p.pyramid?.heart || []),
            ...(p.pyramid?.base || []),
          ]
            .filter(Boolean)
            .join(" ")
        );
        const matches = haystack.includes(n);
        return matches
          ? {
              type: "product",
              href: `/products/${p.slug}`,
              label: title,
              thumb: p.images?.[0] || null,
              subtitle: "Perfume",
            }
          : null;
      })
      .filter(Boolean)
      .slice(0, 7);
    return items;
  }, [q]);

  const allSuggestions = useMemo(
    () => [...suggestionsProducts, ...suggestionsPages],
    [suggestionsProducts, suggestionsPages]
  );

  const openSuggestion = (s) => {
    if (!s) return;
    router.push(s.href);
    setOpenSearch(false);
    setQ("");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) {
      setOpenSearch(false);
      return;
    }
    // Si hay resultados, abrir el primero; si no, mantener abierto y no hacer nada.
    if (allSuggestions.length > 0) {
      openSuggestion(allSuggestions[0]);
    }
  };

  // Verificar existencia (HEAD) de los href sugeridos
  useEffect(() => {
    let cancelled = false;

    async function check(href) {
      const current = existMap.get(href);
      if (current === "ok" || current === "missing" || current === "checking") return;

      setExistMap((prev) => new Map(prev).set(href, "checking"));
      try {
        const res = await fetch(href, { method: "HEAD" });
        const status = res.ok ? "ok" : res.status === 404 ? "missing" : "ok";
        if (!cancelled) {
          setExistMap((prev) => new Map(prev).set(href, status));
        }
      } catch {
        if (!cancelled) {
          setExistMap((prev) => new Map(prev).set(href, "error"));
        }
      }
    }

    allSuggestions.forEach((s) => check(s.href));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSuggestions]);

  const statusPill = (status) => {
    if (status === "ok")
      return (
        <span className="ml-2 hidden md:inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
          Disponible
        </span>
      );
    if (status === "missing")
      return (
        <span className="ml-2 hidden md:inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
          No existe
        </span>
      );
    if (status === "checking")
      return (
        <span className="ml-2 hidden md:inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          Verificando…
        </span>
      );
    return null;
  };

  // Manejo de teclado dentro del input de búsqueda
  const onSearchKeyDown = (e) => {
    const count = allSuggestions.length;
    if (count === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + count) % count);
    } else if (e.key === "Enter") {
      // El form ya evita default y abre el primero; si hay highlight, abrimos ese
      if (count > 0) {
        e.preventDefault();
        openSuggestion(allSuggestions[highlight] || allSuggestions[0]);
      }
    }
  };

  return (
    <>
      {/* Header FIXED */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 bg-gray-800 text-white"
      >
        {/* Top bar: contenedor que colapsa (sin padding) */}
        <div
          ref={topBarOuterRef}
          style={{
            maxHeight: showTopBar ? topBarMaxH : 0,
            opacity: topBarMaxH === 0 ? 0 : showTopBar ? 1 : 0,
          }}
          className="w-full overflow-hidden bg-black transition-[max-height,opacity] duration-300 ease-out"
          aria-hidden={!showTopBar}
        >
          {/* Contenido con padding (altura natural a medir) */}
          <div
            ref={topBarInnerRef}
            className="text-xs text-gray-200 px-4 md:px-6 py-2 flex justify-between items-center"
          >
            <span>Un&apos;arte invisibile, un&apos;impronta indimenticabile.</span>
            <span className="hidden sm:inline">¡Delivery a todo el Perú! 🚚 </span>
          </div>
        </div>

        {/* Header principal */}
        <div className="w-full bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 lg:py-4 grid grid-cols-3 items-center">
            {/* Botón menú (solo mobile) */}
            <div className="lg:hidden justify-self-start">
              <button
                aria-label="Abrir menú"
                className="p-2 rounded hover:bg-gray-700 text-white"
                onClick={() => setMobileOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="justify-self-center lg:justify-self-start col-start-2 lg:col-start-1">
              <Link href="/" className="block">
                <Image
                  src="/logo.png"
                  alt="Logo Essenza"
                  width={180}
                  height={60}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Navegación (desktop) */}
            <nav className="hidden lg:flex justify-center gap-8 col-start-2">
              <Link href="/perfumes-nicho" className="font-semibold tracking-wide hover:underline">
                PERFUMES NICHO
              </Link>
              <Link href="/perfumes-arabes" className="font-semibold tracking-wide hover:underline">
                PERFUMES ÁRABES
              </Link>
              <Link href="/puntos-de-venta" className="font-semibold tracking-wide hover:underline">
                PUNTOS VENTA
              </Link>
              <Link href="/nosotros" className="font-semibold tracking-wide hover:underline">
                SOBRE NOSOTROS
              </Link>
            </nav>

            {/* Acciones derecha */}
            <div className="justify-self-end flex items-center gap-2 sm:gap-3 col-start-3">
              {/* Buscador inline (md+) */}
              <div className="hidden md:block">
                {!openSearch ? (
                  <button
                    aria-label="Abrir buscador"
                    title="Buscar"
                    onClick={() => setOpenSearch(true)}
                    className="p-2 rounded hover:bg-gray-700 cursor-pointer text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M21 21l-4.2-4.2m1.2-4A7 7 0 1 1 7 5a7 7 0 0 1 11 7.8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <div ref={wrapperRef} className="relative">
                    <form onSubmit={submitSearch} role="search" aria-label="Buscar en el sitio" className="relative flex items-center">
                      <input
                        ref={inputRef}
                        type="search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={onSearchKeyDown}
                        placeholder="Buscar perfumes, páginas…"
                        className="h-9 w-64 lg:w-80 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 pl-3 pr-20 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                      <button
                        type="submit"
                        aria-label="Buscar"
                        title="Buscar"
                        className="absolute right-10 p-2 text-gray-700 hover:text-black cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M21 21l-4.2-4.2m1.2-4A7 7 0 1 1 7 5a7 7 0 0 1 11 7.8Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Cerrar buscador"
                        title="Cerrar"
                        onClick={() => {
                          setOpenSearch(false);
                          setQ("");
                        }}
                        className="absolute right-1 p-2 text-gray-700 hover:text-black cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </form>

                    {/* Dropdown de sugerencias (desktop) */}
                    {q.trim().length >= 2 && (
                      <div
                        className={[
                          "absolute left-0 right-0 mt-2 z-[100] origin-top",
                          "rounded-md border border-gray-200 bg-white shadow-lg",
                          "animate-in fade-in slide-in-from-top-1 duration-150",
                        ].join(" ")}
                      >
                        {/* Productos */}
                        <SuggestionGroup title="Productos" emptyText="No hay productos que coincidan.">
                          {suggestionsProducts.map((s, idx) => (
                            <SuggestionItem
                              key={s.href}
                              active={highlight === idx}
                              onMouseEnter={() => setHighlight(idx)}
                              onClick={() => openSuggestion(s)}
                              thumb={s.thumb}
                              label={s.label}
                              subtitle={s.subtitle}
                              status={existMap.get(s.href)}
                            />
                          ))}
                        </SuggestionGroup>

                        {/* Páginas */}
                        <SuggestionGroup title="Páginas" emptyText="No hay páginas que coincidan.">
                          {suggestionsPages.map((s, idx) => {
                            const offset = suggestionsProducts.length;
                            const isActive = highlight === idx + offset;
                            return (
                              <SuggestionItem
                                key={s.href}
                                active={isActive}
                                onMouseEnter={() => setHighlight(idx + offset)}
                                onClick={() => openSuggestion(s)}
                                label={s.label}
                                subtitle="Página"
                                status={existMap.get(s.href)}
                              />
                            );
                          })}
                        </SuggestionGroup>

                        {/* Sin resultados */}
                        {allSuggestions.length === 0 && (
                          <div className="p-4 text-sm text-gray-600">Sin resultados. Prueba con otro término.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Búsqueda (mobile) */}
              <button
                aria-label="Buscar"
                title="Buscar"
                onClick={() => setOpenSearch(true)}
                className="p-2 rounded hover:bg-gray-700 md:hidden"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 21l-4.2-4.2m1.2-4A7 7 0 1 1 7 5a7 7 0 0 1 11 7.8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Usuario / Carrito */}
              <button aria-label="Usuario" title="Usuario" className="p-2 rounded hover:bg-gray-700">👤</button>
              <button aria-label="Carrito" title="Carrito" className="p-2 rounded hover:bg-gray-700">🛒</button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer (anima suavemente la variación) */}
      <div aria-hidden="true" style={{ height: spacerH }} className="transition-all duration-300 ease-out" />

      {/* Drawer móvil */}
      {mobileOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div
            className="fixed z-[80] top-0 left-0 h-full w-80 max-w-[85%] bg-gray-800 text-white shadow-2xl ring-1 ring-black/10 p-6 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-80">Menú</span>
              <button
                aria-label="Cerrar menú"
                className="p-2 rounded hover:bg-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 space-y-4">
              <Link href="/perfumes-nicho" className="block font-semibold tracking-wide" onClick={() => setMobileOpen(false)}>
                PERFUMES NICHO
              </Link>
              <Link href="/perfumes-arabes" className="block font-semibold tracking-wide" onClick={() => setMobileOpen(false)}>
                PERFUMES ÁRABES
              </Link>
              <Link href="/puntos-de-venta" className="block font-semibold tracking-wide" onClick={() => setMobileOpen(false)}>
                PUNTOS VENTA
              </Link>
              <Link href="/nosotros" className="block font-semibold tracking-wide" onClick={() => setMobileOpen(false)}>
                SOBRE NOSOTROS
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Overlay de búsqueda (mobile) */}
      {openSearch && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] bg-black/60"
            onClick={() => {
              setOpenSearch(false);
              setQ("");
            }}
            aria-hidden="true"
          />
          {/* Sheet superior */}
          <div className="fixed z-[80] inset-x-0 top-0 bg-white shadow-2xl">
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
              <form onSubmit={submitSearch} role="search" aria-label="Buscar en el sitio" className="relative flex items-center">
                <input
                  autoFocus
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Buscar perfumes, páginas…"
                  className="h-11 w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 pl-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <button
                  type="submit"
                  aria-label="Buscar"
                  title="Buscar"
                  className="absolute right-9 p-2 text-gray-700 hover:text-black cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M21 21l-4.2-4.2m1.2-4A7 7 0 1 1 7 5a7 7 0 0 1 11 7.8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Cerrar buscador"
                  title="Cerrar"
                  onClick={() => {
                    setOpenSearch(false);
                    setQ("");
                  }}
                  className="absolute right-1 p-2 text-gray-700 hover:text-black cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </form>

              {/* Sugerencias (mobile) */}
              {q.trim().length >= 2 && (
                <div className="mt-3 rounded-md border border-gray-200 bg-white shadow-sm">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-600 px-1">Productos</div>
                    {suggestionsProducts.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-600">No hay productos que coincidan.</div>
                    ) : (
                      suggestionsProducts.map((s, idx) => (
                        <button
                          key={s.href}
                          onClick={() => openSuggestion(s)}
                          className={[
                            "w-full flex items-center gap-3 px-3 py-2 rounded",
                            highlight === idx ? "bg-gray-100" : "hover:bg-gray-50",
                          ].join(" ")}
                        >
                          {s.thumb ? (
                            <Image
                              src={s.thumb}
                              alt={s.label}
                              width={36}
                              height={36}
                              className="h-9 w-9 rounded object-cover ring-1 ring-gray-200"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded bg-gray-100 ring-1 ring-gray-200" />
                          )}
                          <div className="text-left">
                            <div className="text-sm font-medium text-gray-900">{s.label}</div>
                            <div className="text-xs text-gray-600">{s.subtitle}</div>
                          </div>
                          {statusPill(existMap.get(s.href))}
                        </button>
                      ))
                    )}
                  </div>

                  <div className="border-t border-gray-200 p-2">
                    <div className="text-xs font-semibold text-gray-600 px-1">Páginas</div>
                    {suggestionsPages.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-600">No hay páginas que coincidan.</div>
                    ) : (
                      suggestionsPages.map((s, idx) => {
                        const offset = suggestionsProducts.length;
                        const isActive = highlight === idx + offset;
                        return (
                          <button
                            key={s.href}
                            onClick={() => openSuggestion(s)}
                            className={[
                              "w-full flex items-center gap-3 px-3 py-2 rounded",
                              isActive ? "bg-gray-100" : "hover:bg-gray-50",
                            ].join(" ")}
                          >
                            <div className="h-9 w-9 rounded bg-gray-100 ring-1 ring-gray-200" />
                            <div className="text-left">
                              <div className="text-sm font-medium text-gray-900">{s.label}</div>
                              <div className="text-xs text-gray-600">Página</div>
                            </div>
                            {statusPill(existMap.get(s.href))}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {allSuggestions.length === 0 && (
                    <div className="px-3 py-3 text-sm text-gray-600">Sin resultados. Prueba con otro término.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Componentes de sugerencias (desktop) ---------- */

function SuggestionGroup({ title, children, emptyText }) {
  const items = Array.isArray(children) ? children : [children].filter(Boolean);
  const hasItems = items.length > 0;
  return (
    <div className="py-2">
      <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">{title}</div>
      {hasItems ? (
        <ul className="max-h-72 overflow-auto">{items}</ul>
      ) : (
        <div className="px-3 pb-2 text-sm text-gray-600">{emptyText}</div>
      )}
      <div className="mt-2 border-t border-gray-100" />
    </div>
  );
}

function SuggestionItem({ active, onMouseEnter, onClick, thumb, label, subtitle, status }) {
  return (
    <li
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={[
        "flex items-center gap-3 px-3 py-2 cursor-pointer",
        active ? "bg-gray-100" : "hover:bg-gray-50",
      ].join(" ")}
      role="option"
      aria-selected={active}
      tabIndex={-1}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={label}
          width={36}
          height={36}
          className="h-9 w-9 rounded object-cover ring-1 ring-gray-200"
        />
      ) : (
        <div className="h-9 w-9 rounded bg-gray-100 ring-1 ring-gray-200" />
      )}
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-gray-900">{label}</div>
        {subtitle && <div className="text-xs text-gray-600">{subtitle}</div>}
      </div>
      {status && (
        <div className="ml-auto">{/* pill compacta ya controlada por statusPill en padre si quieres */}</div>
      )}
    </li>
  );
}