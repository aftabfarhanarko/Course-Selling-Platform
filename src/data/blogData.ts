export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "mastering-nextjs-14-app-router",
    title: "Mastering Next.js 14 App Router & Full-Stack Server Actions",
    excerpt: "A comprehensive guide on leveraging server actions, streaming, and optimized routing for modern full-stack web applications.",
    content: `
      <p class="lead">Next.js 14 brings revolutionary changes to full-stack web development. With native Server Actions, streaming SSR, and enhanced caching mechanisms, developers can build ultra-performant web applications with significantly less boilerplate code.</p>

      <h2>Why the App Router Matters</h2>
      <p>The App Router introduces a paradigm shift from traditional client-side fetching to zero-bundle-size server components. By default, every component inside the <code>app</code> directory is a Server Component, allowing you to fetch data directly alongside your markup.</p>

      <blockquote>"Server Actions allow developers to mutate data directly from server components without needing API routes."</blockquote>

      <h2>Key Performance Highlights</h2>
      <ul>
        <li><strong>Zero Bundle Overhead:</strong> React Server Components keep heavy libraries on the server side.</li>
        <li><strong>Built-in Data Caching:</strong> Next.js automatically dedupes and caches fetch requests across your page hierarchy.</li>
        <li><strong>Parallel & Intercepting Routes:</strong> Render multiple dynamic views concurrently within the same page.</li>
      </ul>

      <h2>Practical Implementation Code</h2>
      <pre><code>// Example Server Action
"use server";

export async function updateProfile(formData: FormData) {
  const name = formData.get("name");
  await db.user.update({ where: { id: 1 }, data: { name } });
}</code></pre>

      <h2>Conclusion</h2>
      <p>Mastering Next.js 14 App Router unlocks unparalleled speed, developer experience, and SEO readiness for modern SaaS platforms and course selling applications.</p>
    `,
    author: {
      name: "Aftab Farhan Arko",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    },
    date: "Aug 24, 2026",
    readTime: "6 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    tags: ["Next.js", "React", "TypeScript", "WebDev"],
    featured: true,
  },
  {
    id: "2",
    slug: "css-tailwind-tricks-for-premium-ui",
    title: "10 Essential CSS & Tailwind Tricks for Premium Sleek UIs",
    excerpt: "Learn how to use modern CSS backdrop filters, smooth glassmorphic shadows, and micro-interactions for modern web applications.",
    content: `
      <p class="lead">Creating visually stunning user interfaces requires more than basic Tailwind utility classes. By combining glassmorphism, dynamic gradients, and refined hover state transitions, your web application can look like a world-class product.</p>

      <h2>1. Subtle Glassmorphism</h2>
      <p>Using backdrop blur alongside semi-transparent background colors gives cards an elevated depth that feels modern and lightweight.</p>

      <h2>2. Custom Radial Glow Gradients</h2>
      <p>Adding absolute-positioned blurred gradient Orbs behind your hero section brings instant visual warmth and contrast to dark or light themes.</p>

      <h2>3. Smooth Micro-Interactions</h2>
      <p>Adding subtle hover scale transitions (e.g. <code>hover:scale-105 transition-transform duration-500</code>) creates high-end interactivity that delights users without causing layout shifts.</p>
    `,
    author: {
      name: "Sophia Martinez",
      role: "Head of UX & Product Design",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    date: "Aug 20, 2026",
    readTime: "4 min read",
    category: "UI Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    tags: ["CSS", "TailwindCSS", "UI/UX", "Frontend"],
    featured: false,
  },
  {
    id: "3",
    slug: "building-scalable-microservices-nodejs",
    title: "Building Scalable Microservices with Node.js & Docker",
    excerpt: "Discover patterns for decoupling backend microservices and maintaining high resilience in high-traffic production environments.",
    content: `
      <p class="lead">Microservices architecture enables engineering teams to scale individual business domains independently. Here is how to structure robust Node.js microservices with Docker containerization.</p>

      <h2>Containerizing Node.js Services</h2>
      <p>Docker ensures consistent runtime environments across development, staging, and production clusters. Using multi-stage Docker builds significantly reduces final image sizes.</p>

      <h2>Message Queues & Event-Driven Architecture</h2>
      <p>Decouple synchronous HTTP dependencies using RabbitMQ or Kafka to achieve fault tolerance and asynchronous background job processing.</p>
    `,
    author: {
      name: "Michael Chen",
      role: "Senior DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    date: "Aug 15, 2026",
    readTime: "8 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    tags: ["Node.js", "Docker", "Microservices", "DevOps"],
    featured: false,
  },
  {
    id: "4",
    slug: "ai-driven-personalized-learning-paths",
    title: "How AI-Driven Personalization is Reshaping Tech Education",
    excerpt: "Explore how machine learning algorithms analyze student code and adapt course curriculums in real time for maximum retention.",
    content: `
      <p class="lead">Personalized learning has long been the holy grail of edtech. With modern LLMs and adaptive learning algorithms, students receive real-time code reviews and custom exercises tailored to their exact skill gaps.</p>

      <h2>Adaptive Challenge Engine</h2>
      <p>If a student struggles with recursion, the system dynamically generates bite-sized refresher exercises before advancing to dynamic programming modules.</p>
    `,
    author: {
      name: "David Vance",
      role: "Senior AI Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    date: "Aug 10, 2026",
    readTime: "5 min read",
    category: "AI & Tech",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    tags: ["AI", "Machine Learning", "EdTech", "Career"],
    featured: false,
  },
  {
    id: "5",
    slug: "roadmap-to-become-fullstack-developer-2026",
    title: "Complete Roadmap to Become a Full-Stack Developer in 2026",
    excerpt: "A step-by-step developer learning path covering HTML/CSS fundamentals, React, TypeScript, Database Design, and Cloud Deployment.",
    content: `
      <p class="lead">The tech landscape evolves rapidly. Here is the curated, modern step-by-step roadmap for aspirational developers to become job-ready full-stack software engineers in 2026.</p>

      <h2>Phase 1: Modern JavaScript & React Ecosystem</h2>
      <p>Master ECMAScript features, asynchronous programming, TypeScript strict mode, and component composition in React 19.</p>

      <h2>Phase 2: Backend Architecture & Databases</h2>
      <p>Learn relational (PostgreSQL, Spanner) and document databases, ORMs (Prisma, Drizzle), and REST/GraphQL API design.</p>
    `,
    author: {
      name: "Aftab Farhan Arko",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    },
    date: "Aug 02, 2026",
    readTime: "10 min read",
    category: "Career",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    tags: ["Roadmap", "Career", "FullStack", "WebDev"],
    featured: false,
  },
];
