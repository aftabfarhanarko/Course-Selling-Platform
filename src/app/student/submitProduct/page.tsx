"use client";

import { Upload } from "lucide-react";

function page() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Submit Product
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Upload and submit your product for review.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8">
        <form className="space-y-4 sm:space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Product File
            </label>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 sm:p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-zinc-400" />
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Drag and drop your file here, or click to browse
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 sm:py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 sm:py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe your product"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm"
            >
              Submit Product
            </button>
            <button
              type="button"
              className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
