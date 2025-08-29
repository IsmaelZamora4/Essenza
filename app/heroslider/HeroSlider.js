"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

// No iniciar drag si se hace click en elementos interactivos (links/botones/inputs)
function isInteractive(target) {
  return !!target?.closest?.("a, button, input, textarea, select, [role='button']");
}

export default function HeroSlider({
  slides = [],
  interval = 5000, // autoplay a 5s por defecto
  loop = true,
  className = "",
}) {
  const containerRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(0);
  const [dragPx, setDragPx] = useState(0); // desplazamiento en px durante drag

  // Para calcular velocidad del swipe
  const dragMeta = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    lastT: 0,
    vx: 0, // px/ms
    pointerId: null,
  });

  const count = slides.length;
  const slidePct = count > 0 ? 100 / count : 100; // ancho de una slide en % del track

  // Medir ancho del contenedor para el drag y layout
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
  }, []);

  useEffect(() => {
    measure();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Autoplay
  useEffect(() => {
    if (count <= 1) return;
    if (paused || dragging) return;
    const id = setTimeout(() => {
      setIndex((cur) => {
        if (loop) return (cur + 1) % count;
        return clamp(cur + 1, 0, count - 1);
      });
    }, interval);
    return () => clearTimeout(id);
  }, [count, index, paused, dragging, interval, loop]);

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (i) => {
      if (count === 0) return;
      if (loop) {
        const target = (i + count) % count;
        setIndex(target);
      } else {
        setIndex(clamp(i, 0, count - 1));
      }
    },
    [count, loop]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Drag / Swipe con transform (sin scroll nativo)
  const onPointerDown = (e) => {
    if (isInteractive(e.target)) return;

    const el = containerRef.current;
    if (!el) return;
    setPaused(true);
    setDragging(true);
    dragMeta.current.active = true;
    dragMeta.current.pointerId = e.pointerId;
    dragMeta.current.startX = e.clientX;
    dragMeta.current.lastX = e.clientX;
    dragMeta.current.lastT = performance.now();
    dragMeta.current.vx = 0;
    setDragPx(0);
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragMeta.current.active) return;
    const now = performance.now();
    const dx = e.clientX - dragMeta.current.startX;

    setDragPx(dx);
    const dt = Math.max(1, now - dragMeta.current.lastT);
    dragMeta.current.vx = (e.clientX - dragMeta.current.lastX) / dt; // px/ms
    dragMeta.current.lastX = e.clientX;
    dragMeta.current.lastT = now;
  };

  const endDrag = () => {
    const el = containerRef.current;
    if (dragMeta.current.pointerId != null) {
      el?.releasePointerCapture?.(dragMeta.current.pointerId);
    }

    const dx = dragPx;
    const absDx = Math.abs(dx);
    const w = Math.max(1, width);
    const vx = dragMeta.current.vx;

    // Umbrales: con 6% del ancho o swipe rápido cambia
    const byDistance = absDx > w * 0.06;
    const byVelocity = Math.abs(vx) > 0.4; // px/ms

    if (byDistance || byVelocity) {
      if (dx < 0) next();
      else prev();
    }
    dragMeta.current.active = false;
    dragMeta.current.pointerId = null;
    setDragging(false);
    setPaused(false);
    setDragPx(0);
  };

  const onPointerUp = () => endDrag();
  const onPointerCancel = () => endDrag();

  // Transform del track
  const dragPctOfContainer = width ? (dragPx / width) * 100 : 0; // % del contenedor
  const dragPctOfTrack = count > 0 ? dragPctOfContainer / count : 0; // escalar al track
  const trackTransform = `translate3d(calc(${-index * slidePct}% + ${dragPctOfTrack}%), 0, 0)`;
  const trackTransition = dragging ? "none" : "transform 600ms ease-in-out";

  const current = useMemo(() => slides[index] || null, [slides, index]);
  const nextIdx = (index + 1) % Math.max(1, count);
  const prevIdx = (index - 1 + Math.max(1, count)) % Math.max(1, count);

  return (
    <section
      className={`relative isolate bg-black ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !dragging && setPaused(false)}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden h-[60vh] md:h-[80vh] min-h-[380px] w-full bg-black select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="flex h-full"
          style={{
            width: `${Math.max(1, count) * 100}%`,
            transform: trackTransform,
            transition: trackTransition,
            cursor: dragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {slides.map((s, i) => {
            const isCurrent = i === index;
            const isNext = i === nextIdx;
            const isPrev = i === prevIdx;

            return (
              <div
                key={s.id || i}
                className="relative h-full"
                style={{ width: `${slidePct}%`, flex: "0 0 auto" }}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${count}`}
              >
                {s.type === "video" ? (
                  <video
                    src={s.src}
                    poster={s.poster}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                ) : (
                  <Image
                    src={s.src}
                    alt={s.alt || ""}
                    fill
                    priority={isCurrent || isNext}
                    loading={isCurrent || isNext || isPrev ? "eager" : "lazy"}
                    sizes="100vw"
                    className="object-cover z-0"
                    draggable={false}
                    style={{ transform: "translateZ(0)" }}
                  />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/15 to-black/10 pointer-events-none" />
                <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-black/5" />

                {/* Contenido del slide */}
                <div
                  className={[
                    "relative z-20 h-full w-full max-w-6xl mx-auto px-6",
                    s.align === "center"
                      ? "flex items-center justify-center text-center"
                      : s.align === "right"
                      ? "flex items-center justify-end text-right"
                      : "flex items-center justify-start text-left",
                  ].join(" ")}
                >
                  <div className="max-w-xl">
                    {s.eyebrow && (
                      <p className={`text-sm md:text-base tracking-wide mb-2 ${s.theme === "dark" ? "text-black" : "text-white"}`}>
                        {s.eyebrow}
                      </p>
                    )}
                    {s.title && (
                      <h2 className={`text-4xl md:text-6xl font-semibold leading-tight ${s.theme === "dark" ? "text-black" : "text-white"}`}>
                        {s.title}
                      </h2>
                    )}
                    {s.description && (
                      <p className={`mt-3 md:mt-4 text-base md:text-lg ${s.theme === "dark" ? "text-black/80" : "text-white/90"}`}>
                        {s.description}
                      </p>
                    )}

                    {s.ctaHref && s.ctaLabel && (
                      <div className="mt-6">
                        <Link
                          href={s.ctaHref}
                          className="inline-block bg-black text-white px-6 py-3 font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                        >
                          {s.ctaLabel}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute z-30 left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="absolute z-30 right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {count > 1 && (
        <div className="absolute z-30 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${index === i ? "w-6 bg-white shadow" : "w-2.5 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}