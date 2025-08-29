import Link from "next/link";
import Image from "next/image";

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* Grid principal */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Categorías */}
        <div>
          <h3 className="tracking-[.25em] text-xs text-neutral-300 mb-6">CATEGORÍAS</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/perfumes-nicho" className="hover:underline">Perfumes Nicho</Link></li>
            <li><Link href="/perfumes-arabes" className="hover:underline">Perfumes Árabes</Link></li>
          </ul>
        </div>

        {/* Explora */}
        <div>
          <h3 className="tracking-[.25em] text-xs text-neutral-300 mb-6">EXPLORA</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/nosotros" className="hover:underline">Sobre Nosotros</Link></li>
            <li><Link href="/contact" className="hover:underline">Contacto</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/puntos-de-venta" className="hover:underline">Puntos de Venta</Link></li>
          </ul>
        </div>

        {/* Términos y condiciones */}
        <div>
          <h3 className="tracking-[.25em] text-xs text-neutral-300 mb-6">TÉRMINOS Y CONDICIONES</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/terminos-de-servicio" className="hover:underline">Términos de Servicio</Link></li>
            <li><Link href="/politica-de-privacidad" className="hover:underline">Políticas de Privacidad</Link></li>
            <li><Link href="/politica-de-cookies" className="hover:underline">Políticas de Cookies</Link></li>
            <li><Link href="/politica-de-suscripcion" className="hover:underline">Política de Suscripción al Newsletter</Link></li>
            <li className="flex items-center gap-3">
              <Link href="/libro-de-reclamaciones" className="hover:underline">Libro de Reclamaciones</Link>
              <Image src="/icons/libro-reclamaciones.svg" alt="Libro de Reclamaciones" width={60} height={36}/>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="tracking-[.25em] text-xs text-neutral-300 mb-6">ÚNETE A NUESTRO NEWSLETTER</h3>

          <label className="flex items-start gap-3 text-sm mb-4 cursor-pointer select-none">
            <input type="checkbox" className="mt-1 border border-neutral-500 rounded-sm bg-transparent accent-white"/>
            <span>Acepto la <Link href="/politica-de-suscripcion" className="underline">política de suscripción al newsletter</Link>.</span>
          </label>

          <div className="group flex items-center justify-between gap-3 border-b border-neutral-500 py-3">
            <input
              type="email"
              placeholder="Introducir el correo electrónico aquí"
              className="w-full bg-transparent text-sm placeholder:text-neutral-400 focus:outline-none"
            />
            <button aria-label="Enviar" className="text-neutral-300 group-hover:text-white transition-colors">
              <ArrowRight />
            </button>
          </div>

          <p className="text-xs text-neutral-400 mt-3">
            Entérate primero de nuestras ofertas y promociones.
          </p>

          {/* Redes */}
          <div className="flex items-center gap-5 mt-6">
            <a
              href="https://www.facebook.com/ismael.zamora.756786/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <Image src="/icons/facebook.svg" alt="Facebook" width={18} height={18}/>
            </a>
            <a
              href="https://www.instagram.com/ismaa.zr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <Image src="/icons/instagram.svg" alt="Instagram" width={18} height={18}/>
            </a>
            <a
              href="https://wa.me/51918605351"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp"
              className="hover:opacity-80"
            >
              <Image src="/icons/whatsapp.svg" alt="Whatsapp" width={18} height={18}/>
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-neutral-400 text-center md:text-left">
            © {new Date().getFullYear()}, Essenza Perú. | Elaborado por <span className="font-semibold">Ismael Zamora</span>
          </p>

          {/* Medios de pago (reemplaza por tus imágenes) */}
          <div className="flex items-center gap-3 opacity-90">
            <Image src="/payments/visa.svg" alt="Visa" width={40} height={24}/>
            <Image src="/payments/mastercard.svg" alt="Mastercard" width={40} height={24}/>
            <Image src="/payments/amex.svg" alt="Amex" width={40} height={24}/>
            <Image src="/payments/diners.svg" alt="Diners" width={40} height={24}/>
          </div>
        </div>
      </div>
    </footer>
  );
}