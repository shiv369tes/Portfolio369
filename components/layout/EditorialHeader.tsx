"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, FileText, Menu, X, BookOpen, Clock, Sparkles } from "lucide-react";

interface EditorialHeaderProps {
  onOpenSearch: () => void;
  onOpenTerminal: () => void;
  onNavigate: (sectionId: string) => void;
}

export function EditorialHeader({
  onOpenSearch,
  onOpenTerminal,
  onNavigate,
}: EditorialHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { label: "Monograph", id: "sketchbook" },
    { label: "Live Telemetry", id: "workbench" },
    { label: "Blueprints", id: "projects" },
    { label: "Taxonomy", id: "skills" },
    { label: "Chronology", id: "experience" },
    { label: "Dispatches", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF6F1]/90 backdrop-blur-md border-b border-[#EDE4D9] shadow-sm py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Colophon Mark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("sketchbook")}
              className="text-left group"
            >
              <span className="font-serif text-xl sm:text-2xl font-black text-[#1A1816] tracking-tight group-hover:text-[#C4604A] transition-colors">
                Shivam Kedare<span className="text-[#C4604A]">.</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-mono tracking-[0.2em] text-[#928B87]">
                Web Developer &amp; Software Systems Engineer
              </span>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#5E5854]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-[#1A1816] transition-colors relative py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live IST clock badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F3ECE4] border border-[#EDE4D9] text-[10px] font-mono text-[#7A746D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#566449] animate-pulse" />
              <span>IST {istTime || "14:00 PM"}</span>
            </div>

            {/* ⌘K Search trigger */}
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#D4C3AF] bg-[#FDFCFA] text-xs text-[#5E5854] hover:text-[#1A1816] hover:border-[#C4604A] transition-all shadow-sm"
              title="Search Archives (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#C4604A]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline font-mono text-[9px] px-1 py-0.5 bg-[#EDE4D9] rounded text-[#7A746D]">
                ⌘K
              </kbd>
            </button>

            {/* Live Terminal REPL trigger */}
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1816] text-[#FAF6F1] hover:bg-[#C4604A] transition-colors text-xs font-mono font-semibold"
              title="Launch Live Telemetry Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C4604A]" />
              <span className="hidden sm:inline">REPL</span>
            </button>

            {/* Resume button */}
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F3ECE4] text-[#1A1816] border border-[#E2D5C6] hover:bg-[#E2D5C6] transition-colors text-xs font-semibold"
            >
              <FileText className="w-3.5 h-3.5 text-[#566449]" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 text-[#1A1816] lg:hidden rounded hover:bg-[#F3ECE4]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF6F1] border-b border-[#EDE4D9] px-4 py-4 space-y-2 shadow-lg"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm font-medium text-[#2C2825] hover:text-[#C4604A] border-b border-[#EDE4D9]/60"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenTerminal();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#1A1816] text-[#FAF6F1] text-xs font-mono"
              >
                <Terminal className="w-4 h-4 text-[#C4604A]" />
                <span>Launch Telemetry Console</span>
              </button>

              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#F3ECE4] text-[#1A1816] text-xs font-semibold"
              >
                <span>CV (Resume)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
