"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EditorialHeader } from "@/components/layout/EditorialHeader";
import { EngineeringBook } from "@/components/book/EngineeringBook";
import { LiveDeviceStation } from "@/components/station/LiveDeviceStation";
import { ProjectsDossier } from "@/components/dossier/ProjectsDossier";
import { ProjectModal } from "@/components/dossier/ProjectModal";
import { SkillsSpecimen } from "@/components/specimen/SkillsSpecimen";
import { CareerChronology } from "@/components/chronology/CareerChronology";
import { AcademicHonors } from "@/components/honors/AcademicHonors";
import { PostalContactStation } from "@/components/contact/PostalContactStation";
import { EditorialFooter } from "@/components/layout/EditorialFooter";
import { TelemetryConsole } from "@/components/terminal/TelemetryConsole";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PROJECTS, type Project } from "@/data/portfolio-data";
import { Sparkles, Terminal, Activity, BookOpen, ShieldCheck } from "lucide-react";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  // ⌘K keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInspectProjectById = (projectId: string) => {
    const p = PROJECTS.find((item) => item.id === projectId);
    if (p) setSelectedProject(p);
  };

  return (
    <main className="relative min-h-screen bg-[#FAF6F1] text-[#2C2825] font-sans selection:bg-[#F3CCC2] selection:text-[#1A1816]">
      {/* Terracotta Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#C4604A] z-[9999] origin-left shadow-sm"
        style={{ scaleX: progress }}
      />

      {/* Editorial Navigation Header */}
      <EditorialHeader
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 1. Hero: 3D Physical Engineering Monograph */}
      <div id="sketchbook">
        <EngineeringBook
          onInspectProject={handleInspectProjectById}
          onNavigateSection={handleNavigate}
        />
      </div>

      {/* 2. Live Gazette Editorial Status Ticker */}
      <div className="py-3 px-4 bg-[#F3ECE4] border-y border-[#EDE4D9] text-xs font-mono text-[#5E5854] overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#566449] animate-pulse" />
            <span className="font-semibold text-[#1A1816]">STATUS: AVAILABLE FOR 2026 ENGAGEMENTS</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[11px] text-[#7A746D]">
            <span>REACT &amp; NEXT.JS</span>
            <span>•</span>
            <span>EVENTSAIR &amp; CVENT PORTALS</span>
            <span>•</span>
            <span>LOCAL AI AGENTS (OLLAMA)</span>
            <span>•</span>
            <span>SMARTSHEET AUTOMATION</span>
            <span>•</span>
            <span>CROSS-DEVICE RESPONSIVE UI</span>
          </div>

          <button
            onClick={() => setTerminalOpen(true)}
            className="text-[11px] text-[#C4604A] hover:underline font-semibold shrink-0"
          >
            Press ⌘` or Click for Terminal ➜
          </button>
        </div>
      </div>

      {/* 3. Live Cross-Device & Discord Gateway Signal Station */}
      <LiveDeviceStation />

      {/* 4. Complete Project Blueprint Archives (Dossier) */}
      <ProjectsDossier onSelectProject={(p) => setSelectedProject(p)} />

      {/* 5. Technical Specimen Taxonomy Matrix */}
      <SkillsSpecimen />

      {/* 6. Chronology of Appointments & Career History */}
      <CareerChronology />

      {/* 7. Academic Distinctions & Verified Certifications */}
      <AcademicHonors />

      {/* 8. Postal Airmail Correspondence Station */}
      <PostalContactStation />

      {/* 9. Grand Colophon, Curator Letter & Directory */}
      <EditorialFooter />

      {/* Floating REPL Console Trigger Badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setTerminalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1A1816] text-[#FAF6F1] hover:bg-[#C4604A] transition-all shadow-lg border border-[#4A4541] font-mono text-xs font-semibold"
          title="Open Telemetry Terminal Console (⌘`)"
        >
          <Terminal className="w-3.5 h-3.5 text-[#C4604A]" />
          <span>REPL Console</span>
        </button>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={handleInspectProjectById}
        onOpenTerminal={() => setTerminalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Project Blueprint Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Live Terminal REPL Console Drawer */}
      <TelemetryConsole
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </main>
  );
}
