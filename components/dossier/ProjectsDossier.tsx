"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles, Filter, Eye } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio-data";

interface ProjectsDossierProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ["All", "Distributed Web", "Low-Level Tools", "Autonomous AI", "Mobile Systems"] as const;

export function ProjectsDossier({ onSelectProject }: ProjectsDossierProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Masthead ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EDE4D9]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Complete Blueprint Archives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight">
              Featured Systems & Instruments
            </h2>
            <p className="text-sm text-[#5E5854] mt-2 max-w-xl">
              Engineered systems ranging from in-browser virtual shells to Windows kernel optimizers,
              local autonomous agents, and edge-native markdown runtimes.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title or technology..."
              className="w-full px-4 py-2 text-xs rounded border border-[#D4C3AF] bg-[#FDFCFA] text-[#1A1816] placeholder-[#928B87] focus:outline-none focus:border-[#C4604A]"
            />
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all ${
                  isActive
                    ? "bg-[#1A1816] text-[#FAF6F1] font-semibold shadow-sm"
                    : "bg-[#F3ECE4] text-[#5E5854] hover:bg-[#E2D5C6] hover:text-[#1A1816]"
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="group relative bg-[#FDFCFA] border border-[#EDE4D9] rounded-md overflow-hidden hover:border-[#D4C3AF] hover:shadow-paper-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#F3ECE4] border-b border-[#EDE4D9]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FAF6F1]/90 backdrop-blur text-[#C4604A] border border-[#EDE4D9]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#928B87] block">
                        {project.edition}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1816] mt-0.5">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#5E5854] leading-relaxed line-clamp-2">
                      {project.purpose}
                    </p>

                    <div className="p-2.5 rounded bg-[#FAF6F1] border border-[#EDE4D9]">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C4604A] block mb-0.5">
                        Key Architecture:
                      </span>
                      <p className="text-[11px] text-[#2C2825] font-medium leading-snug">
                        {project.feature}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F3ECE4] text-[#5E5854]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EDE4D9]/60 mt-4">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4604A] hover:text-[#A8493A] transition-colors"
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#928B87] hover:text-[#1A1816] inline-flex items-center gap-1"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
