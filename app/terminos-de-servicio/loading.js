export default function TermsLoading() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-10">
        <div className="h-8 w-64 bg-gray-200 mb-2" />
        <div className="h-4 w-48 bg-gray-200" />
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <div className="h-5 w-1/3 bg-gray-200 mb-3" />
              <div className="h-4 w-full bg-gray-200 mb-1" />
              <div className="h-4 w-5/6 bg-gray-200 mb-1" />
              <div className="h-4 w-2/3 bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}