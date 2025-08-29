export default function StoresLoading() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <div className="h-4 w-28 bg-gray-200 mb-2" />
              <div className="h-6 w-3/4 bg-gray-200 mb-2" />
              <div className="h-4 w-full bg-gray-200 mb-1" />
              <div className="h-4 w-2/3 bg-gray-200" />
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-28 bg-gray-200" />
                <div className="h-8 w-24 bg-gray-200" />
                <div className="h-8 w-28 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}