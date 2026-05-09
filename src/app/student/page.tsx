const page = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Welcome to Student Hub
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Navigate to Dashboard, Courses, Wallet, or other sections using the
          sidebar menu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6"
          >
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
