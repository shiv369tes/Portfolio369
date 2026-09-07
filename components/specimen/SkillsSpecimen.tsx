"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Database, Cpu, Terminal, Shield, CheckCircle2, Sparkles } from "lucide-react";
import { SKILL_SPECIMENS, type SkillItem } from "@/data/portfolio-data";

const CATEGORIES = [
  "All",
  "Backend & Concurrency",
  "Databases & Storage",
  "Infrastructure & Cloud",
  "Languages & Protocols",
] as const;

export function SkillsSpecimen() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills =
    activeCategory === "All"
      ? SKILL_SPECIMENS
      : SKILL_SPECIMENS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EDE4D9]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>The Archival Taxonomy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight">
              Technical Specimen Matrix
            </h2>
            <p className="text-sm text-[#5E5854] mt-2 max-w-xl">
              An inventory of languages, database engines, concurrency patterns, and cloud platforms
              tested under high production workloads.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                activeCategory === cat
                  ? "bg-[#1A1816] text-[#FAF6F1] font-semibold shadow-sm"
                  : "bg-[#F3ECE4] text-[#5E5854] hover:bg-[#E2D5C6] hover:text-[#1A1816]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Specimen Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-5 sm:p-6 rounded-md bg-[#FAF6F1] border border-[#EDE4D9] hover:border-[#D4C3AF] hover:shadow-paper transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A746D]">
                  {skill.category}
                </span>
                <span className="font-mono text-xs font-bold text-[#C4604A]">
                  {skill.experience}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-1">
                {skill.name}
              </h3>

              <p className="text-xs text-[#5E5854] leading-relaxed mb-4">
                {skill.specimenNote}
              </p>

              <div className="pt-3 border-t border-[#EDE4D9] flex items-center justify-between text-[11px] font-mono text-[#4A4541]">
                <span>Demonstrated Depth:</span>
                <span className="font-semibold text-[#1A1816]">{skill.level}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
