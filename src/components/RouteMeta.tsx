"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { COURSES } from "@/lib/courses";

type MetaInfo = {
  title: string;
  description?: string;
  noIndex?: boolean;
};

function ensureMetaDescription(content: string) {
  if (typeof document === "undefined") return;

  let meta = document.querySelector('meta[name="description"]') as
    | HTMLMetaElement
    | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function ensureRobots(noIndex: boolean) {
  if (typeof document === "undefined") return;

  let meta = document.querySelector('meta[name="robots"]') as
    | HTMLMetaElement
    | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "robots";
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", noIndex ? "noindex,nofollow" : "index,follow");
}

function resolveMeta(pathname: string): MetaInfo {
  const staticMap: Record<string, MetaInfo> = {
    "/": {
      title: "Home",
      description: "A comprehensive platform for selling and learning courses.",
    },
    "/courses": {
      title: "Courses",
      description: "Browse available courses and start learning today.",
    },
    "/shop": {
      title: "Shop",
      description: "Explore products and resources available on the platform.",
    },
    "/stats": {
      title: "Stats",
      description: "View platform statistics and performance insights.",
    },
    "/affiliate": {
      title: "Affiliate",
      description: "Affiliate program dashboard and referral performance.",
      noIndex: true,
    },
    "/login": {
      title: "Login",
      description: "Login to access your account.",
      noIndex: true,
    },
    "/signup": {
      title: "Sign Up",
      description: "Create an account to get started.",
      noIndex: true,
    },
    "/admin": {
      title: "Admin",
      description: "Admin dashboard for managing the Course Selling Platform.",
      noIndex: true,
    },
    "/student": {
      title: "Student",
      description:
        "Student dashboard for courses, payments, products, and withdrawals.",
      noIndex: true,
    },
  };

  if (staticMap[pathname]) return staticMap[pathname];

  const courseMatch = pathname.match(/^\/courses\/(\d+)(?:\/)?$/);
  if (courseMatch) {
    const id = Number(courseMatch[1]);
    const course = COURSES.find((c) => c.id === id);
    const title = course?.title ?? "Course Details";
    return {
      title,
      description: course
        ? `${course.title} course details (${course.category}).`
        : "Course details page.",
    };
  }

  const adminMatch = pathname.match(/^\/admin\/([^/]+)(?:\/)?$/);
  if (adminMatch) {
    const seg = adminMatch[1];
    const adminTitles: Record<string, string> = {
      dashboard: "Admin Dashboard",
      users: "Users",
      courses: "Courses",
      products: "Products",
      category: "Categories",
      coupons: "Coupons",
      instructor: "Instructors",
      enrollments: "Enrollments",
      paymentMethods: "Payment Methods",
      withdraw: "Withdraw",
      wallet: "Wallet",
      percentage: "Percentage",
      shop: "Shop",
    };

    return {
      title: adminTitles[seg] ?? "Admin",
      description: "Admin dashboard for managing the Course Selling Platform.",
      noIndex: true,
    };
  }

  const studentTitles: Array<[RegExp, string]> = [
    [/^\/student\/dashboard\/?$/, "Student Dashboard"],
    [/^\/student\/courses\/?$/, "My Courses"],
    [/^\/student\/payment-methods\/?$/, "Payment Methods"],
    [/^\/student\/products\/?$/, "My Products"],
    [/^\/student\/shop\/?$/, "Student Shop"],
    [/^\/student\/submitProduct\/createProduct\/?$/, "Create Product"],
    [/^\/student\/submitProduct\/?$/, "Submit Product"],
    [/^\/student\/wallet\/?$/, "Wallet"],
    [/^\/student\/withdraw\/?$/, "Withdraw"],
  ];
  for (const [re, t] of studentTitles) {
    if (re.test(pathname)) {
      return {
        title: t,
        description:
          "Student dashboard for courses, payments, products, and withdrawals.",
        noIndex: true,
      };
    }
  }

  return {
    title: "Course Selling Platform",
    description: "A comprehensive platform for selling and learning courses.",
  };
}

export default function RouteMeta() {
  const pathname = usePathname() ?? "/";

  React.useEffect(() => {
    const info = resolveMeta(pathname);
    const base = "Course Selling Platform";
    const title =
      info.title === base ? base : `${info.title} | Course Selling Platform`;

    document.title = title;
    if (info.description) ensureMetaDescription(info.description);
    ensureRobots(Boolean(info.noIndex));
  }, [pathname]);

  return null;
}