"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Twitter, Send, CheckCircle2, Stamp, MapPin, Sparkles } from "lucide-react";

export function PostalContactStation() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Author / Name is required";
    if (!formState.email.trim()) {
      errs.email = "Return address (email) is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Invalid email format";
    }
    if (!formState.message.trim()) errs.message = "Dispatch message cannot be blank";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Dispatch failed");

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Postal dispatch error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EDE4D9]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Postal Dispatch Station</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight">
              Initiate Direct Correspondence
            </h2>
            <p className="text-sm text-[#5E5854] mt-2 max-w-xl">
              Available for web development appointments, enterprise digital event engineering, responsive frontend consulting,
              and local AI automation systems.
            </p>
          </div>
        </div>

        {/* ── Main Postal Layout ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Coordinates & Social Registry (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-md bg-[#FDFCFA] border border-[#EDE4D9] shadow-paper">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EDE4D9]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7A746D]">
                  Coordinates Registry
                </span>
                <span className="font-mono text-[10px] text-[#566449] font-bold">
                  ● ACTIVE DISPATCH
                </span>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:shivamkedare7171@gmail.com"
                  className="flex items-center gap-3 p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] hover:border-[#C4604A] transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#C4604A]/10 text-[#C4604A] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#928B87] block">
                      Direct Inquiries
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#1A1816] group-hover:text-[#C4604A] transition-colors">
                      shivamkedare7171@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919623777548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] hover:border-[#566449] transition-colors group"
                >
                  <div className="w-8 h-8 rounded bg-[#566449]/10 text-[#566449] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#928B87] block">
                      Encrypted Messaging / WhatsApp
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#1A1816] group-hover:text-[#566449] transition-colors">
                      +91 9623777548
                    </span>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-5 mt-5 border-t border-[#EDE4D9]">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#7A746D] block mb-3">
                  Verified Public Repositories & Profiles:
                </span>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/shiv369tes" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/shivamkedare369t" },
                    { icon: Mail, label: "Email", href: "mailto:shivamkedare7171@gmail.com" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded bg-[#FAF6F1] text-[#5E5854] hover:text-[#1A1816] hover:bg-[#EDE4D9] border border-[#EDE4D9] transition-colors"
                      title={s.label}
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Airmail Stationery Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-md bg-[#FDFCFA] border-2 border-dashed border-[#D4C3AF] shadow-paper relative overflow-hidden">
              
              {/* Postal Airmail Edge Stripes */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  background: "repeating-linear-gradient(45deg, #C4604A, #C4604A 12px, #FAF6F1 12px, #FAF6F1 20px, #566449 20px, #566449 32px, #FAF6F1 32px, #FAF6F1 40px)",
                }}
              />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EDE4D9] pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4604A]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1A1816] font-semibold">
                    Airmail Stationery Dispatch Nº 88
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#928B87]">
                  <MapPin className="w-3 h-3" />
                  <span>Destination: Mumbai Hub</span>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-[#566449]/10 text-[#566449] flex items-center justify-center mx-auto mb-2 border border-[#566449]/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1816]">
                    Dispatch Sealed & Transmitted
                  </h3>
                  <p className="text-xs text-[#5E5854] max-w-sm mx-auto leading-relaxed">
                    Thank you. Your message has been routed via our webhook pipeline. I will respond to your return address within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded text-xs font-mono text-[#C4604A] hover:underline"
                  >
                    Send Another Dispatch →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#4A4541] mb-1">
                        Author / Name *
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Mira Castellano"
                        className="w-full px-3.5 py-2.5 rounded border border-[#EDE4D9] bg-[#FAF6F1] text-xs font-sans text-[#1A1816] placeholder-[#928B87] focus:outline-none focus:border-[#C4604A]"
                      />
                      {errors.name && <p className="text-[10px] text-[#7A3B3B] mt-1 font-mono">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-[#4A4541] mb-1">
                        Return Address (Email) *
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. mira@studio.org"
                        className="w-full px-3.5 py-2.5 rounded border border-[#EDE4D9] bg-[#FAF6F1] text-xs font-sans text-[#1A1816] placeholder-[#928B87] focus:outline-none focus:border-[#C4604A]"
                      />
                      {errors.email && <p className="text-[10px] text-[#7A3B3B] mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[#4A4541] mb-1">
                      Dispatch Message / Inquiry *
                    </label>
                    <textarea
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline system architecture requirements, appointment timeline, or consulting scope..."
                      className="w-full px-3.5 py-2.5 rounded border border-[#EDE4D9] bg-[#FAF6F1] text-xs font-sans text-[#1A1816] placeholder-[#928B87] focus:outline-none focus:border-[#C4604A] leading-relaxed"
                    />
                    {errors.message && <p className="text-[10px] text-[#7A3B3B] mt-1 font-mono">{errors.message}</p>}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-script text-base text-[#7A746D]">
                      instant encrypted webhook transmission
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#C4604A] text-white font-medium text-xs hover:bg-[#A8493A] transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Transmitting..." : "Seal & Dispatch"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
