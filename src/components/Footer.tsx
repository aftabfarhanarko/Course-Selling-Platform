"use client";

import { Mail, Share2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className="bg-[#DFE2FF] md:rounded-t-none mb-0 rounded-t-2xl border-t border-gray-300"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {/* wqeyuihgdfu8yih */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-8">
            {/* Left - Logo & Copyright */}
            <div className="flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-900">LOGO</h3>
              <p className="text-sm text-gray-600 mt-1">
                © 2024 IncomeArchitect. All rights reserved. <br />
                Precision Prosperity.
              </p>
            </div>

            {/* Center - Links */}
            <div className="flex gap-8 flex-1 justify-center">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contract
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Policy
              </Link>
            </div>

            {/* Right - Icons */}
            <div className="flex gap-4 flex-shrink-0">
              <button className="inline-flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="inline-flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden   ">
            {/* Logo & Copyright */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                IncomeArchitect
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                © 2024 IncomeArchitect. All rights reserved. <br />
                Precision Prosperity.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-6 justify-center mb-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contract
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Policy
              </Link>
            </div>

            {/* Icons */}
            <div className="flex gap-4 justify-center">
              <button className="inline-flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="inline-flex cursor-pointer items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
