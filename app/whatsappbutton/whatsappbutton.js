"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Botón flotante (toggle: abre y cierra el chat) */}
      <button
        className="fixed left-6 bottom-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all"
        aria-label={open ? "Cerrar chat WhatsApp" : "Abrir chat WhatsApp"}
        aria-expanded={open}
        onClick={toggleOpen}
        type="button"
      >
        <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={36} height={36} />
      </button>

      {/* Modal chat */}
      {open && <WhatsAppModal onClose={() => setOpen(false)} />}
    </>
  );
}

function WhatsAppModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiBtnRef = useRef(null);

  const whatsappNumber = "51918605351";

  // Cerrar picker al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showEmoji &&
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(e.target)
      ) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmoji]);

  // Cerrar modal con ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSend = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message || "¡Hola! ¿Cómo podemos ayudarte?"
    )}`;
    window.open(url, "_blank");
    onClose();
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed left-6 bottom-28 z-50">
      <div className="relative bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-visible w-[390px] max-w-[calc(100vw-2rem)]">
        {/* Header negro con ondas integradas (sin recortes) */}
        <div
          className="relative rounded-t-xl overflow-visible"
          style={{ background: "linear-gradient(180deg,#000 0%,#111 100%)" }}
        >
          <div className="flex items-start justify-between px-6 pt-5 pb-10">
            <div className="pr-8">
              <div className="text-2xl font-bold text-white leading-tight">
                Essenza
              </div>
              <div
                className="text-white/95 text-base font-semibold mt-1"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,.25)" }}
              >
                Responderemos lo antes posible
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="text-white hover:text-[#25D366] text-2xl font-bold"
              type="button"
            >
              &times;
            </button>
          </div>

          {/* Ondas: dentro del header, pegadas abajo y con sombra suave */}
          <svg
            className="absolute left-0 bottom-[-1px] w-full h-[36px] pointer-events-none"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sombra muy suave bajo la onda */}
            <path
              d="M0,44 C180,88 360,88 540,66 C720,44 900,8 1080,16 C1260,24 1350,60 1440,76 L1440,120 L0,120 Z"
              fill="rgba(0,0,0,0.08)"
            />
            {/* Onda blanca principal */}
            <path
              d="M0,52 C180,96 360,96 540,72 C720,48 900,12 1080,20 C1260,28 1350,64 1440,80 L1440,120 L0,120 Z"
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.06))" }}
            />
          </svg>
        </div>

        {/* Mensaje de bienvenida */}
        <div className="px-6 pt-3 pb-2 flex gap-2 items-start">
          <div className="relative w-9 h-9">
            <Image
              src="/logocircular.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-full border"
            />
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#25D366]"
            />
          </div>
          <div className="bg-[#f2f4f8] rounded-lg px-4 py-2 text-gray-700 text-sm font-medium">
            ¡Hola! ¿Cómo podemos ayudarte?
          </div>
        </div>

        {/* Burbujita del usuario (preview) */}
        {message && (
          <div className="px-6 py-1 flex gap-2 justify-end">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-black text-sm max-w-[80%] break-words shadow">
              {message}
            </div>
          </div>
        )}

        {/* Input + Emoji picker */}
        <div className="px-5 pb-4 pt-3 bg-[#fafbfc] flex items-center gap-2 border-t border-neutral-200 relative rounded-b-xl">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border border-neutral-300 rounded-2xl px-4 py-2 text-[15px] focus:outline-[#25D366] bg-white text-black"
            placeholder="Mandar un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          {/* Botón emoji */}
          <button
            ref={emojiBtnRef}
            className="text-2xl text-neutral-600 cursor-pointer pr-1"
            onClick={() => setShowEmoji((v) => !v)}
            aria-label="Abrir selector de emojis"
            type="button"
          >
            😊
          </button>

          {/* Emoji picker dentro del modal, sin recorte */}
          {showEmoji && (
            <div
              ref={pickerRef}
              className="absolute right-2 bottom-16 bg-white rounded-xl shadow-2xl border border-gray-200 z-[60] w-[300px] max-h-[280px] overflow-y-auto"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" theme="light" />
            </div>
          )}

          <button
            aria-label="Enviar"
            className="p-2 bg-[#25D366] hover:bg-[#1ebc59] rounded-full text-white flex items-center justify-center transition-all"
            onClick={handleSend}
            type="button"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#25D366" />
              <path
                d="M7 12H17M12 7L17 12L12 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}