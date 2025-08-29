"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ images = [], alt = "Producto" }) {
  const pics = Array.isArray(images) && images.length > 0 ? images : ["/banner.webp"];
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState("right");
  const wrapRef = useRef(null);

  const hasMultiple = pics.length > 1;

  const goTo = useCallback(
    (i, d = "right") => {
      setDir(d);
      setIndex(((i % pics.length) + pics.length) % pics.length);
    },
    [pics.length]
  );

  const goNext = useCallback(() => goTo(index + 1, "right"), [index, goTo]);
  const goPrev = useCallback(() => goTo(index - 1, "left"), [index, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  function onMove(e) {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wrapRef.current.style.setProperty("--x", `${x}%`);
    wrapRef.current.style.setProperty("--y", `${y}%`);
  }
  function onEnter() {
    wrapRef.current?.classList.add(styles.zoomed);
  }
  function onLeave() {
    wrapRef.current?.classList.remove(styles.zoomed);
  }

  return (
    <div>
      <div className={`relative w-full h-[440px] md:h-[520px] bg-slate-100 rounded overflow-hidden ${styles.viewer}`}>
        <div
          ref={wrapRef}
          className={styles.imgWrap}
          data-dir={dir}
          onMouseMove={onMove}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={hasMultiple ? goNext : undefined}
          role={hasMultiple ? "button" : undefined}
          aria-label={hasMultiple ? "Siguiente imagen" : undefined}
          tabIndex={hasMultiple ? 0 : -1}
        >
          <Image
            key={pics[index]}
            src={pics[index]}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-contain ${styles.img}`}
            priority
          />
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 text-white w-9 h-9 grid place-items-center hover:bg-slate-900/80"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Siguiente imagen"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 text-white w-9 h-9 grid place-items-center hover:bg-slate-900/80"
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-2">
          {pics.map((src, i) => {
            const selected = i === index;
            return (
              <button
                key={src + i}
                type="button"
                onClick={() => goTo(i, i > index ? "right" : "left")}
                className={`relative w-20 h-20 rounded overflow-hidden bg-slate-100 border ${
                  selected ? "border-slate-600 ring-2 ring-slate-400" : "border-slate-200 hover:border-slate-400"
                }`}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <Image src={src} alt={`${alt} miniatura ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}