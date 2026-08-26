"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactCards = [
    {
      title: "Email Us",
      value: "support@edunova.com",
      description: "Our dedicated support team replies within 24 hours.",
      icon: Mail,
    },
    {
      title: "Call Us",
      value: "+880 1800-123456",
      description: "Available Sun - Thu from 9am to 6pm GMT+6.",
      icon: Phone,
    },
    {
      title: "Visit Office",
      value: "Dhaka, Bangladesh",
      description: "Banani 11, Tech Hub Tower, Level 8",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-20 overflow-hidden" style={{ fontFamily: "var(--font-bai-jamjuree)" }}>
      {/* Background Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" /> Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We'd Love to <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">Hear From You</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Have questions about a course or enterprise training? Send us a message and we will respond promptly.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{card.title}</h3>
                <p className="text-base font-extrabold text-[#4F46E5] mb-2">{card.value}</p>
                <p className="text-xs text-slate-500 font-medium">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Map Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xl shadow-indigo-500/5 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 text-sm font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Course Inquiry / Support"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 text-sm font-medium transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
