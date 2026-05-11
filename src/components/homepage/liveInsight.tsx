"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { DollarSign, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ─── Types ────────────────────────────────────────────────────────────────────

type EarningItem = {
  id: number;
  name: string;
  course: string;
  amount: string;
  avatar: string;
};

type WithdrawalItem = {
  id: number;
  name: string;
  status: string;
  amount: string;
  avatar: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const allEarners: Omit<EarningItem, "id">[] = [
  {
    name: "John Doe",
    course: "UI Architecture Path",
    amount: "+$120.00",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    name: "Emma",
    course: "Agency Mastery",
    amount: "+$160.41",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    name: "Chloe",
    course: "UI Architecture",
    amount: "+$100.53",
    avatar: "https://i.pravatar.cc/80?img=45",
  },
  {
    name: "Sarah K.",
    course: "Design Systems",
    amount: "+$88.20",
    avatar: "https://i.pravatar.cc/80?img=23",
  },
  {
    name: "Liam",
    course: "Branding Bootcamp",
    amount: "+$74.00",
    avatar: "https://i.pravatar.cc/80?img=3",
  },
  {
    name: "Nina",
    course: "Freelance Fast-Track",
    amount: "+$210.00",
    avatar: "https://i.pravatar.cc/80?img=49",
  },
  {
    name: "Omar",
    course: "Product Design",
    amount: "+$95.50",
    avatar: "https://i.pravatar.cc/80?img=18",
  },
  {
    name: "Zara",
    course: "Motion Design",
    amount: "+$135.00",
    avatar: "https://i.pravatar.cc/80?img=25",
  },
];

const allWithdrawers: Omit<WithdrawalItem, "id">[] = [
  {
    name: "Michael",
    status: "Withdrawal Initiated",
    amount: "$957.34",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Alex Chen",
    status: "Withdrawal Initiated",
    amount: "$300.00",
    avatar: "https://i.pravatar.cc/80?img=15",
  },
  {
    name: "Alex",
    status: "Withdrawal Initiated",
    amount: "$540.62",
    avatar: "https://i.pravatar.cc/80?img=60",
  },
  {
    name: "Michael",
    status: "Withdrawal Initiated",
    amount: "$169.52",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Grace",
    status: "Withdrawal Initiated",
    amount: "$415.00",
    avatar: "https://i.pravatar.cc/80?img=29",
  },
  {
    name: "Carlos",
    status: "Withdrawal Initiated",
    amount: "$880.00",
    avatar: "https://i.pravatar.cc/80?img=7",
  },
  {
    name: "Priya",
    status: "Withdrawal Initiated",
    amount: "$225.30",
    avatar: "https://i.pravatar.cc/80?img=44",
  },
  {
    name: "Yuki",
    status: "Withdrawal Initiated",
    amount: "$310.00",
    avatar: "https://i.pravatar.cc/80?img=38",
  },
];

const ROW_H = 58;
const GAP = 8;
const VISIBLE = 4;
const INTERVAL = 3000;

// ─── Conveyor Hook ────────────────────────────────────────────────────────────
// KEY FIX: instead of AnimatePresence (which battles with layout), we use a
// fixed-height clipping window + CSS translateY to slide rows in. No layout
// recalculation happens — the container height never changes.

function useConveyorFeed<T extends { id: number }>(initial: T[]) {
  const [rows, setRows] = useState<T[]>(initial);
  const [offset, setOffset] = useState(0);
  const busy = useRef(false);

  const push = (item: T) => {
    if (busy.current) return;
    busy.current = true;

    // Prepend new row; container is now VISIBLE+1 rows tall but hidden by clip
    setRows((prev) => [item, ...prev].slice(0, VISIBLE + 1));
    // Instantly shift inner UP so new row is off-screen above
    setOffset(-(ROW_H + GAP));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Transition back to 0 → new row slides INTO view, old rows slide down
        setOffset(0);
        setTimeout(() => {
          setRows((prev) => prev.slice(0, VISIBLE)); // trim stale tail
          busy.current = false;
        }, 580);
      });
    });
  };

  return { rows, offset, push };
}

// ─── Row Components ───────────────────────────────────────────────────────────

function EarningRow({ item }: { item: EarningItem }) {
  return (
    <div
      className="flex items-center justify-between bg-green-50 rounded-[13px] px-4 flex-shrink-0"
      style={{ height: ROW_H }}
    >
      <div className="flex items-center gap-3">
        <Image
          src={item.avatar}
          alt={item.name}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
        />
        <div>
          <p className="text-[13px] font-bold text-slate-900 leading-tight">
            {item.name}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{item.course}</p>
        </div>
      </div>
      <p className="text-[13px] font-bold text-green-600">{item.amount}</p>
    </div>
  );
}

function WithdrawalRow({ item }: { item: WithdrawalItem }) {
  return (
    <div
      className="flex items-center justify-between bg-blue-50 rounded-[13px] px-4 flex-shrink-0"
      style={{ height: ROW_H }}
    >
      <div className="flex items-center gap-3">
        <Image
          src={item.avatar}
          alt={item.name}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
        />
        <div>
          <p className="text-[13px] font-bold text-slate-900 leading-tight">
            {item.name}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{item.status}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[13px] font-bold text-blue-600">{item.amount}</p>
        <span className="text-[9px] font-extrabold tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
          COMPLETED
        </span>
      </div>
    </div>
  );
}

// ─── Feed Viewport ────────────────────────────────────────────────────────────

function Feed({
  children,
  offset,
}: {
  children: React.ReactNode;
  offset: number;
}) {
  const clipH = VISIBLE * ROW_H + (VISIBLE - 1) * GAP;
  return (
    <div className="relative overflow-hidden" style={{ height: clipH }}>
      {/* Bottom fade-out mask */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      {/* Inner sliding container */}
      <div
        className="absolute inset-x-0 top-0 flex flex-col"
        style={{
          gap: GAP,
          transform: `translateY(${offset}px)`,
          // No transition when we snap back to -ROW_H; smooth only when sliding to 0
          transition:
            offset === 0
              ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

let _idCtr = 100;

const LiveInsight = () => {
  const earningFeed = useConveyorFeed<EarningItem>(
    allEarners.slice(0, VISIBLE).map((d, i) => ({ ...d, id: i + 1 })),
  );
  const withdrawalFeed = useConveyorFeed<WithdrawalItem>(
    allWithdrawers.slice(0, VISIBLE).map((d, i) => ({ ...d, id: i + 1 })),
  );

  const [total, setTotal] = useState(12_483_035);
  const [totalKey, setTotalKey] = useState(0);
  const eIdxRef = useRef(VISIBLE);
  const wIdxRef = useRef(VISIBLE);

  useEffect(() => {
    const t = setInterval(() => {
      const id = ++_idCtr;
      const newE = { ...allEarners[eIdxRef.current % allEarners.length], id };
      const newW = {
        ...allWithdrawers[wIdxRef.current % allWithdrawers.length],
        id: id + 1,
      };

      earningFeed.push(newE);
      withdrawalFeed.push(newW);

      setTotal((prev) => prev + parseFloat(newE.amount.replace("+$", "")));
      setTotalKey((k) => k + 1);
      eIdxRef.current++;
      wIdxRef.current++;
    }, INTERVAL);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={`py-10 pb-15 ${plusJakarta.className}`}
      style={{ background: "linear-gradient(160deg,#eef0f5 0%,#e8eaf2 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Live dot */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-[11px] font-bold tracking-[.12em] text-red-500">
              LIVE
            </span>
          </div>

          <h2 className="text-[34px] font-extrabold text-slate-900 tracking-tight leading-none">
            Live Insight
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            See how users are earning and withdrawing in real-time
          </p>

          {/* Total earnings pill */}
          <div className="mt-6 inline-flex flex-col items-center bg-white px-10 py-4 rounded-full shadow-[0_8px_28px_rgba(0,0,0,.09)]">
            <p className="text-[9.5px] font-bold tracking-[.13em] text-slate-400 mb-1">
              TOTAL EARNINGS DISTRIBUTED
            </p>
            <motion.p
              key={totalKey}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[28px] font-extrabold text-blue-600 tracking-tight"
            >
              ${total.toLocaleString("en-US")}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Cards ──────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {/* Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-white rounded-[22px] p-[22px] shadow-[0_4px_24px_rgba(0,0,0,.07)]"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-slate-100">
              <div className="w-[30px] h-[30px] rounded-[9px] bg-green-100 flex items-center justify-center">
                <DollarSign className="w-[15px] h-[15px] text-green-600" />
              </div>
              <h3 className="text-[13px] font-bold text-slate-900">
                Recent Earnings
              </h3>
            </div>
            <Feed offset={earningFeed.offset}>
              {earningFeed.rows.map((item) => (
                <EarningRow key={item.id} item={item} />
              ))}
            </Feed>
          </motion.div>

          {/* Withdrawals */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[22px] p-[22px] shadow-[0_4px_24px_rgba(0,0,0,.07)]"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-slate-100">
              <div className="w-[30px] h-[30px] rounded-[9px] bg-blue-100 flex items-center justify-center">
                <Landmark className="w-[15px] h-[15px] text-blue-600" />
              </div>
              <h3 className="text-[13px] font-bold text-slate-900">
                Recent Withdrawals
              </h3>
            </div>
            <Feed offset={withdrawalFeed.offset}>
              {withdrawalFeed.rows.map((item) => (
                <WithdrawalRow key={item.id} item={item} />
              ))}
            </Feed>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveInsight;
