import Image from "next/image";

export default function Nosotros() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center pt-12 pb-24">
      {/* Logo grande */}
      <div className="mb-8 flex justify-center">
        <Image
          src="/nosotros.png"
          alt="Essenza Logo"
          width={340}
          height={120}
          priority
          className="object-contain"
        />
      </div>

      {/* Texto principal */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <p className="text-gray-700 text-base md:text-lg mb-4">
          <span className="font-bold text-black">ESSENZA</span> nació en 2020 y
          se ha convertido en el destino por excelencia para quienes buscan una
          experiencia única en perfumería nicho, árabe y de diseñador, además de
          una curaduría selecta de cosmética de lujo. Reunimos marcas exclusivas
          en un solo lugar y diseñamos una experiencia multisensorial que
          despierta emociones y deja una huella inolvidable.
        </p>
        <p className="text-gray-700 text-base md:text-lg">
          Nos apasiona un estilo de vida donde lujo, exclusividad y tendencia se
          encuentran para realzar tu belleza interior. Nuestros productos
          potencian tu marca personal y ofrecen una experiencia de belleza
          inigualable.
        </p>
      </div>

      {/* Misión, Visión, Valores */}
      <div className="w-full flex flex-col gap-12 items-center">
        {/* Misión */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 md:mb-0 md:text-right w-full md:w-[180px] text-black">
            Misión
          </h2>
          <p className="text-lg text-gray-700 md:text-left w-full">
            Somos una marca de perfumería nicho y cosmética para personas
            auténticas que buscan una experiencia de compra excepcional,
            sintiéndose exclusivos y sofisticados al adquirir nuestros
            productos.
          </p>
        </div>

        {/* Visión */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 md:mb-0 md:text-right w-full md:w-[180px] text-black">
            Visión
          </h2>
          <p className="text-lg text-gray-700 md:text-left w-full">
            Ser los líderes en perfumería nicho y cosmética en el Perú,
            brindando experiencias de belleza inigualables, promoviendo el
            bienestar y la confianza de nuestros clientes a través de una
            selección única de productos.
          </p>
        </div>

        {/* Valores */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 md:mb-0 md:text-right w-full md:w-[180px] text-black">
            Valores
          </h2>
          <p className="text-lg text-gray-700 md:text-left w-full">
            Compromiso con nuestros clientes · Calidad · Diferenciación ·
            Responsabilidad · Autenticidad · Inclusividad · Innovación ·
            Honestidad.
          </p>
        </div>
      </div>
    </main>
  );
}
