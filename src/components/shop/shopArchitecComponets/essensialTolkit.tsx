"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { create } from "zustand";

import {
  BarChart3,
  FileText,
  ShieldCheck,
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  priceLabel: string;
  category: string;
  price: string;
};

type Store = {
  selectProduct: Product | null;
  setSelectedProduct: (p: Product) => void;
};

export const useProductStore = create<Store>((set) => ({
  selectProduct: null,

  setSelectedProduct: (p) =>
    set({
      selectProduct: p,
    }),
}));

const EssentialToolkit = () => {
  const [activeCategory, setActiveCategory] =
    useState("All Products");

  const router = useRouter();

  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct,
  );

  const products = [
    {
      id: 1,
      category: "Software",
      badge: "SECURITY",
      title: "VelocityVPN – Secure Your Earnings",
      description:
        "Military-grade encryption for the nomad entrepreneur. Protect your transactions and access global markets without restrictions.",
      priceLabel: "STARTING AT",
      price: "$12.99",
      priceSuffix: "/mo",
      buttonText: "Buy Now",
      icon: ShieldCheck,
      cardBg: "#EEF2FF",
      iconColor: "#B8C4F5",
      badgeColor: "#2563EB",
      buttonColor: "#0B57F0",
    },

    {
      id: 2,
      category: "Software",
      badge: "PRODUCTIVITY",
      title: "Architect CRM – Client Management",
      description:
        "Built for high-ticket service providers. Pipeline tracking, automated invoicing, and lifetime client retention tools.",
      priceLabel: "ONE-TIME",
      price: "$297.00",
      priceSuffix: "",
      buttonText: "Get Access",
      icon: BarChart3,
      cardBg: "#EEF8F0",
      iconColor: "#B7D9C2",
      badgeColor: "#15803D",
      buttonColor: "#0B57F0",
    },

    {
      id: 3,
      category: "Templates",
      badge: "LEGAL",
      title: "High-Ticket Contract Templates",
      description:
        "Iron-clad agreements vetted by specialized attorneys. Protect your intellectual property and guarantee payment terms.",
      priceLabel: "BUNDLE PRICE",
      price: "$149.00",
      priceSuffix: "",
      buttonText: "Download",
      icon: FileText,
      cardBg: "#F7F4EA",
      iconColor: "#D6C79D",
      badgeColor: "#B58900",
      buttonColor: "#0B57F0",
    },
  ];

  const categories = [
    "All Products",
    "Software",
    "Templates",
  ];

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory,
        );

  return (
    <section className="bg-[#F7F7FB] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Title */}
          <div>
            <h2 className="text-[40px] font-bold tracking-[-1.5px] text-[#111827]">
              Essential Toolkit
            </h2>

            <div className="mt-3 h-[4px] w-[62px] rounded-full bg-[#0B57F0]" />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-white text-[#0B57F0] shadow-sm"
                    : "text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-[30px] bg-white"
              >
                {/* Top Area */}
                <div
                  className="relative flex h-[250px] items-center justify-center"
                  style={{
                    backgroundColor: product.cardBg,
                  }}
                >
                  {/* Badge */}
                  <div
                    className="absolute left-5 top-5 rounded-full bg-white px-3 py-[5px] text-[10px] font-bold tracking-[0.08em]"
                    style={{
                      color: product.badgeColor,
                    }}
                  >
                    {product.badge}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <Icon
                      strokeWidth={1.5}
                      className="h-[78px] w-[78px]"
                      style={{
                        color: product.iconColor,
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="max-w-[270px] text-[22px] font-bold leading-[1.15] tracking-[-0.8px] text-[#111827]">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-[15px] leading-7 text-[#6B7280]">
                    {product.description}
                  </p>

                  {/* Bottom */}
                  <div className="mt-8 flex items-end justify-between gap-4">
                    {/* Price */}
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-[#9CA3AF]">
                        {product.priceLabel}
                      </p>

                      <div className="mt-1 flex items-end">
                        <span className="text-[42px] font-bold leading-none tracking-[-2px] text-[#111827]">
                          {product.price}
                        </span>

                        {product.priceSuffix && (
                          <span className="mb-[4px] ml-1 text-sm font-medium text-[#9CA3AF]">
                            {product.priceSuffix}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => {
                        setSelectedProduct(product);

                        router.push("/shop/shopCard");
                      }}
                      className="flex h-[58px] min-w-[122px] items-center justify-center rounded-full px-6 text-[15px] font-semibold leading-[1.1] text-white shadow-[0px_12px_25px_rgba(11,87,240,0.22)] transition-all duration-200 hover:scale-[1.03]"
                      style={{
                        backgroundColor:
                          product.buttonColor,
                      }}
                    >
                      {product.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EssentialToolkit;