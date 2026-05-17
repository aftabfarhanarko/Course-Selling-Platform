// components/admin/users/ViewModal.tsx
import { X, Mail, Hash, Calendar, BadgeCheck, Ban, Trash2, Phone, Globe, Send, MessageCircle, ShieldAlert, CreditCard, ExternalLink } from "lucide-react";
import { UiUser } from "./types";
import { Avatar } from "./Avatar";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { InfoRow } from "./InfoRow";

export function ViewModal({ user, onClose }: { user: UiUser; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Banner */}
        <div className="relative h-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 flex-shrink-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <X size={15} />
          </button>
          <div className="absolute -bottom-8 left-5 border-4 border-white rounded-2xl shadow-xl">
            <Avatar user={user} size="lg" />
          </div>
        </div>

        {/* Identity row */}
        <div className="pt-12 px-5 pb-3 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">{user.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Mail size={11} className="text-gray-400 flex-shrink-0" />
            <p className="text-[12px] text-gray-400 break-all">{user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Account Info</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { icon: <Hash size={12} />, label: "User ID", value: String(user.id) },
                { icon: <Calendar size={12} />, label: "Joined", value: user.joinDate },
                { icon: <BadgeCheck size={12} />, label: "Active", value: user.isActive ? "Yes" : "No", color: user.isActive ? "text-emerald-600" : "text-red-500" },
                { icon: <Ban size={12} />, label: "Banned", value: user.isBanned ? "Yes" : "No", color: user.isBanned ? "text-red-600" : "text-emerald-600" },
                ...(user.deletedAt ? [{ icon: <Trash2 size={12} />, label: "Deleted At", value: user.deletedAt, color: "text-red-500" }] : []),
              ] as { icon: React.ReactNode; label: string; value: string; color?: string }[]).map((r) => (
                <div key={r.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                    {r.icon}
                    <span className="text-[9px] font-bold uppercase tracking-wide">{r.label}</span>
                  </div>
                  <p className={`text-[13px] font-bold ${r.color ?? "text-gray-800"}`}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>

          {(user.phone || user.country || user.telegram || user.whatsapp) && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contact</p>
              <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                {user.phone && <InfoRow icon={<Phone size={12} />} label="Phone" value={user.phone} />}
                {user.country && <InfoRow icon={<Globe size={12} />} label="Country" value={user.country} />}
                {user.telegram && <InfoRow icon={<Send size={12} />} label="Telegram" value={user.telegram} valueClass="text-blue-600" />}
                {user.whatsapp && <InfoRow icon={<MessageCircle size={12} />} label="WhatsApp" value={user.whatsapp} valueClass="text-green-600" />}
              </div>
            </div>
          )}

          {(user.referCode || user.banReason) && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Other</p>
              <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                {user.referCode && <InfoRow icon={<Hash size={12} />} label="Refer Code" value={user.referCode} valueClass="font-mono text-violet-600" />}
                {user.banReason && <InfoRow icon={<ShieldAlert size={12} />} label="Ban Reason" value={user.banReason} valueClass="text-red-600" />}
              </div>
            </div>
          )}

          {(user.nidFrontSide || user.nidBackSide) && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <CreditCard size={11} /> NID Documents
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[{ label: "Front Side", url: user.nidFrontSide }, { label: "Back Side", url: user.nidBackSide }]
                  .filter((n) => n.url)
                  .map((n) => (
                    <a key={n.label} href={n.url} target="_blank" rel="noopener noreferrer" className="group relative block">
                      <img
                        src={n.url!}
                        alt={n.label}
                        className="w-full h-28 object-cover rounded-xl border border-gray-200 group-hover:opacity-80 transition-opacity"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                      />
                      <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-all">
                        <ExternalLink size={16} className="text-white drop-shadow" />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 text-center">{n.label}</p>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border-2 border-gray-200 text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}