import TermsClient from "./TermsClient";
import { terms } from "../../content/terms";

export const metadata = {
  title: "Términos de Servicio | ESSENZA",
  description:
    "Lee nuestros términos y condiciones de uso, compras, envíos, devoluciones y privacidad.",
};

export default function TermsPage() {
  return (
    <main className="bg-white text-black">
      <TermsClient sections={terms.sections} updatedAt={terms.updatedAt} />
    </main>
  );
}