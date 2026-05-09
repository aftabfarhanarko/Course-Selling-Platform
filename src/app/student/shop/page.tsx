"use client";

const page = () => {
  const products = Array(6).fill(0);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Shop
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Browse and purchase our available products and services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 animate-pulse"></div>
            <div className="p-4 sm:p-6">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6"></div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition-colors">
                Add to Cart
              </button>
              {/* wehhbbfjihhfiuh */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
