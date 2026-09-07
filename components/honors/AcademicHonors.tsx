"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap, CheckCircle2, ShieldCheck } from "lucide-react";
import { ACADEMIC_HONORS } from "@/data/portfolio-data";

export function AcademicHonors() {
  return (
    <section id="honors" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EDE4D9]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Academic Distinctions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight">
              Honors & Certified Attestations
            </h2>
            <p className="text-sm text-[#5E5854] mt-2 max-w-xl">
              Academic excellence recognition from Mumbai University and professional verified credentials.
            </p>
          </div>
        </div>

        {/* Honors Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {ACADEMIC_HONORS.map((honor, idx) => (
            <motion.div
              key={honor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-md bg-[#FAF6F1] border border-[#EDE4D9] hover:border-[#D4C3AF] hover:shadow-paper transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EDE4D9]">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#C4604A]/10 text-[#C4604A]">
                    {honor.badge}
                  </span>
                  <span className="font-mono text-xs text-[#928B87]">
                    {honor.date}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1A1816] mb-1">
                  {honor.title}
                </h3>
                <p className="text-xs font-semibold text-[#566449] mb-3">
                  {honor.organization}
                </p>
                <p className="text-xs text-[#5E5854] leading-relaxed">
                  {honor.description}
                </p>
              </div>

              {honor.link && (
                <div className="pt-4 mt-4 border-t border-[#EDE4D9]">
                  <a
                    href={honor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C4604A] hover:underline"
                  >
                    <span>{honor.linkText || "Verify Credential"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
