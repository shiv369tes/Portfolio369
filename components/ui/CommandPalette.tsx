"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Layers, Terminal, Mail, FileText, ArrowRight, ExternalLink, Radio } from "lucide-react";
import { PROJECTS, MONOGRAPH_PLATES, SKILL_SPECIMENS } from "@/data/portfolio-data";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onOpenTerminal?: () => void;
  onNavigate?: (id: string) => void;
}

export function CommandPalette({
  open,
  onClose,
  onSelectProject,
  onOpenTerminal,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filteredProjects = PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.purpose.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSkills = SKILL_SPECIMENS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-[#FAF6F1] text-[#2C2825] rounded-lg border border-[#EDE4D9] shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#EDE4D9] bg-[#FDFCFA]">
            <Search className="w-4 h-4 text-[#C4604A]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blueprints, skills, plates, or actions..."
              className="flex-1 bg-transparent text-sm text-[#1A1816] placeholder-[#928B87] focus:outline-none font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded text-[#928B87] hover:text-[#1A1816]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Command Items */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4 no-scrollbar">
            {/* Quick Actions */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-[#928B87] px-2 block mb-1">
                Quick Actions
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onOpenTerminal?.();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded text-left hover:bg-[#F3ECE4] transition-colors text-xs text-[#1A1816]"
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-3.5 h-3.5 text-[#C4604A]" />
                    <span>Launch Live Telemetry REPL Console</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#928B87]">Terminal</span>
                </button>

                <a
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2 rounded text-left hover:bg-[#F3ECE4] transition-colors text-xs text-[#1A1816]"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-[#566449]" />
                    <span>Inspect Verified Curriculum Vitae (Resume)</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#928B87]" />
                </a>

                <button
                  onClick={() => {
                    onNavigate?.("workbench");
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded text-left hover:bg-[#F3ECE4] transition-colors text-xs text-[#1A1816]"
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-3.5 h-3.5 text-[#C4604A]" />
                    <span>Live Device Activity &amp; Signal Station</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#928B87]">Telemetry</span>
                </button>
              </div>
            </div>

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#928B87] px-2 block mb-1">
                  Blueprint Editions ({filteredProjects.length})
                </span>
                <div className="space-y-1">
                  {filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject?.(p.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2 rounded text-left hover:bg-[#F3ECE4] transition-colors text-xs text-[#1A1816]"
                    >
                      <div>
                        <p className="font-medium text-[#1A1816]">{p.name}</p>
                        <p className="text-[10px] text-[#7A746D]">{p.purpose}</p>
                      </div>
                      <span className="font-mono text-[10px] text-[#C4604A] shrink-0 ml-2">
                        {p.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {filteredSkills.length > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#928B87] px-2 block mb-1">
                  Technical Specimens ({filteredSkills.length})
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {filteredSkills.slice(0, 6).map((s) => (
                    <div
                      key={s.name}
                      className="p-2 rounded bg-[#FDFCFA] border border-[#EDE4D9] text-[11px]"
                    >
                      <span className="font-medium text-[#1A1816] block truncate">{s.name}</span>
                      <span className="text-[9px] font-mono text-[#C4604A]">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-2.5 bg-[#F3ECE4] border-t border-[#EDE4D9] flex items-center justify-between text-[10px] font-mono text-[#7A746D]">
            <span>Navigate with arrows · Esc to exit</span>
            <span>Shivam Kedare Monograph</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
