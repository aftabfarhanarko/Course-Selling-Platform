export type Category =
  | "Digital Design"
  | "Growth Marketing"
  | "Sales Architecture"
  | "AI Automation";

export type EarningTier = "$1k - $5k /mo" | "$5k - $10k /mo" | "$10k+ / mo";

export interface Course {
  id: number;
  title: string;
  desc: string;
  price: number;
  potential: string;
  potentialVal: number;
  commission: string;
  commissionVal: number;
  rating: number;
  reviews: string;
  image: string;
  category: Category;
  earnings: EarningTier;
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: "SaaS Interface Architect Masterclass",
    desc: "Master high-conversion SaaS design and build a recurring revenue agency from scratch.",
    price: 499,
    potential: "$8,500/MO POTENTIAL",
    potentialVal: 8500,
    commission: "40% COMMISSION",
    commissionVal: 40,
    rating: 4.9,
    reviews: "1.2k",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    category: "Digital Design",
    earnings: "$1k - $5k /mo",
  },
  {
    id: 2,
    title: "Growth Engine: Performance Marketing",
    desc: "Advanced strategies for scaling digital products using meta-ads and psychological funneling.",
    price: 795,
    potential: "$12,000/MO POTENTIAL",
    potentialVal: 12000,
    commission: "35% COMMISSION",
    commissionVal: 35,
    rating: 4.8,
    reviews: "850",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    category: "Growth Marketing",
    earnings: "$10k+ / mo",
  },
  {
    id: 3,
    title: "AI-First Agency: The 2024 Playbook",
    desc: "The definitive guide to building an automated service agency leveraging LLMs and custom GPTs.",
    price: 1200,
    potential: "$15,000/MO POTENTIAL",
    potentialVal: 15000,
    commission: "25% COMMISSION",
    commissionVal: 25,
    rating: 5.0,
    reviews: "340",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    category: "AI Automation",
    earnings: "$10k+ / mo",
  },
  {
    id: 4,
    title: "High-Ticket Sales Psychology",
    desc: "Learn the mental triggers that close $10k+ deals without feeling like a salesman.",
    price: 599,
    potential: "$9,000/MO POTENTIAL",
    potentialVal: 9000,
    commission: "50% COMMISSION",
    commissionVal: 50,
    rating: 4.7,
    reviews: "2.1k",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
    category: "Sales Architecture",
    earnings: "$5k - $10k /mo",
  },
  {
    id: 5,
    title: "E-Commerce Brand Domination",
    desc: "Build and scale a profitable DTC brand using Facebook & TikTok ads with proven frameworks.",
    price: 449,
    potential: "$7,500/MO POTENTIAL",
    potentialVal: 7500,
    commission: "30% COMMISSION",
    commissionVal: 30,
    rating: 4.6,
    reviews: "980",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    category: "Growth Marketing",
    earnings: "$5k - $10k /mo",
  },
  {
    id: 6,
    title: "UI/UX Design System Mastery",
    desc: "Create scalable design systems used by Fortune 500 companies and charge premium rates.",
    price: 349,
    potential: "$6,000/MO POTENTIAL",
    potentialVal: 6000,
    commission: "45% COMMISSION",
    commissionVal: 45,
    rating: 4.8,
    reviews: "1.5k",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
    category: "Digital Design",
    earnings: "$1k - $5k /mo",
  },
];
