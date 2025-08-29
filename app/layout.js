import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./whatsappbutton/whatsappbutton";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: { default: "Essenza", template: "%s | Essenza" },
  openGraph: { siteName: "Essenza" },
};

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} min-h-screen bg-white text-slate-900 antialiased`}>
        {/* Header global */}
        <Navbar />
        {/* Contenido específico de cada página */}
        {children}
        {/* Footer global */}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}