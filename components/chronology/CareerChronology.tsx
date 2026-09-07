"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CAREER_CHRONOLOGY } from "@/data/portfolio-data";

export function CareerChronology() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EDE4D9]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Chronology of Appointments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight">
              Engineering Dispatches & History
            </h2>
            <p className="text-sm text-[#5E5854] mt-2 max-w-xl">
              Professional history building mission-critical backend systems, hardware integrations,
              and academic mentorship.
            </p>
          </div>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {CAREER_CHRONOLOGY.map((entry, idx) => (
            <motion.div
              key={entry.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-md bg-[#FDFCFA] border border-[#EDE4D9] hover:border-[#D4C3AF] hover:shadow-paper transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#EDE4D9]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#C4604A]/10 text-[#C4604A] uppercase tracking-wider">
                    {entry.classification}
                  </span>
                  <span className="font-mono text-xs text-[#7A746D] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.period}
                  </span>
                </div>

                <span className="font-mono text-xs text-[#928B87] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {entry.location}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-black text-[#1A1816]">
                  {entry.company}
                </h3>
                <p className="text-sm font-semibold text-[#C4604A] mt-0.5 mb-3">
                  {entry.role}
                </p>
                <p className="text-xs sm:text-sm text-[#5E5854] leading-relaxed mb-4">
                  {entry.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="p-4 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-2 mb-4">
                <span className="text-xs font-mono font-semibold text-[#1A1816] uppercase tracking-wider block">
                  Core Engineering Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-[#5E5854]">
                  {entry.deliverables.map((deliv, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A] mt-1.5 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {entry.techUsed.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#F3ECE4] text-[#4A4541] border border-[#E2D5C6]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
