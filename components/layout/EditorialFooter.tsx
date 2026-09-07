"use client";

import React from "react";
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Heart } from "lucide-react";

export function EditorialFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF6F1] border-t border-[#EDE4D9] text-[#2C2825] font-sans pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ── Curator Letter & Personal Reflection Card ── */}
        <div className="p-8 sm:p-10 rounded-md bg-[#FDFCFA] border border-[#EDE4D9] shadow-paper mb-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.22em] text-[#C4604A] font-semibold block">
              Author&apos;s Epilogue &amp; Mission
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1816]">
              Crafting Intuitive, Cross-Device Experiences with Resilient Code
            </h3>
            <p className="text-sm text-[#5E5854] leading-relaxed">
              Modern digital solutions reach their highest potential when clean frontend aesthetics meet
              robust engineering. Whether delivering dynamic enterprise event websites, automating complex
              registration workflows with Smartsheet, or integrating safe local AI automation models, my
              focus is on building accessible, maintainable web applications with uncompromising performance.
            </p>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="font-script text-2xl sm:text-3xl text-[#C4604A]">
                  Shivam Kedare
                </p>
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#928B87]">
                  Web Developer &amp; Software Systems Engineer · Mumbai, 2026
                </span>
              </div>

              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#C4604A]/60 flex items-center justify-center p-1 shrink-0">
                <span className="text-[8px] font-mono text-[#C4604A] font-bold text-center leading-none">
                  COLOPHON<br />SEAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Directory & Colophon Grid ── */}
        <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-[#EDE4D9] text-xs">
          {/* Identity */}
          <div className="space-y-2">
            <span className="font-serif text-lg font-black text-[#1A1816] block">
              Shivam Kedare<span className="text-[#C4604A]">.</span>
            </span>
            <p className="text-[#5E5854] leading-relaxed">
              The Author&apos;s Engineering Monograph. Registered digital publication recording responsive web systems,
              enterprise event platforms, and algorithmic solutions.
            </p>
          </div>

          {/* Directory Links */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#928B87] font-semibold block">
              Volume Directory
            </span>
            <ul className="space-y-1.5 text-[#5E5854]">
              <li><a href="#sketchbook" className="hover:text-[#C4604A] transition-colors">3D Physical Monograph</a></li>
              <li><a href="#workbench" className="hover:text-[#C4604A] transition-colors">Live Telemetry Station</a></li>
              <li><a href="#projects" className="hover:text-[#C4604A] transition-colors">Featured Blueprints</a></li>
              <li><a href="#skills" className="hover:text-[#C4604A] transition-colors">Technical Specimen Matrix</a></li>
              <li><a href="#experience" className="hover:text-[#C4604A] transition-colors">Chronology of Appointments</a></li>
            </ul>
          </div>

          {/* Publications & Articles */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#928B87] font-semibold block">
              External Dispatches
            </span>
            <ul className="space-y-1.5 text-[#5E5854]">
              <li>
                <a href="https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4604A] transition-colors">
                  Fuzzy Logic Engine ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/shiv369tes/SavePaws" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4604A] transition-colors">
                  Save Paws Platform ↗
                </a>
              </li>
              <li>
                <a href="/resume" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4604A] transition-colors">
                  Curriculum Vitae (Resume) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#928B87] font-semibold block">
              Public Ledger
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/shiv369tes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#F3ECE4] hover:bg-[#E2D5C6] text-[#1A1816] transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/shivamkedare369t"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#F3ECE4] hover:bg-[#E2D5C6] text-[#1A1816] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:shivamkedare7171@gmail.com"
                className="p-2 rounded bg-[#F3ECE4] hover:bg-[#E2D5C6] text-[#1A1816] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] font-mono text-[#928B87] pt-2">
              shivamkedare7171@gmail.com
            </p>
          </div>
        </div>

        {/* ── Bottom Colophon ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#928B87]">
          <span>© 2026 Shivam Kedare. Typeset in Playfair Display, Inter &amp; Caveat.</span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#5E5854] hover:text-[#1A1816] transition-colors"
          >
            <span>Return to Masthead</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C4604A]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
