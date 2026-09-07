"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Maximize2, Minimize2, Sparkles, Send, CornerDownLeft } from "lucide-react";
import { PROJECTS, SKILL_SPECIMENS } from "@/data/portfolio-data";

interface TelemetryConsoleProps {
  open: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export function TelemetryConsole({ open, onClose }: TelemetryConsoleProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init",
      command: "shivamkedare --telemetry-init",
      time: new Date().toLocaleTimeString(),
      output: (
        <div className="space-y-1 text-[#EDE4D9]">
          <p className="text-[#C4604A] font-bold">
            Shivam Kedare Terminal REPL &amp; Telemetry Console v2.6.0
          </p>
          <p className="text-xs text-[#928B87]">
            Type <span className="text-[#C4604A] font-bold font-mono">help</span> to list commands or inspect systems.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const timeStr = new Date().toLocaleTimeString();

    let outputContent: React.ReactNode = null;

    if (lower === "help") {
      outputContent = (
        <div className="space-y-1 text-xs text-[#EDE4D9]">
          <p className="text-[#C4604A] font-semibold">Available Commands:</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-[#C4604A]">whoami / bio</span> — Author summary
            </div>
            <div>
              <span className="text-[#C4604A]">skills</span> — Technical specimen table
            </div>
            <div>
              <span className="text-[#C4604A]">projects</span> — List active blueprints
            </div>
            <div>
              <span className="text-[#C4604A]">resume / cv</span> — Open verified curriculum vitae
            </div>
            <div>
              <span className="text-[#C4604A]">metrics</span> — Telemetry &amp; performance
            </div>
            <div>
              <span className="text-[#C4604A]">contact</span> — Direct inquiries
            </div>
            <div>
              <span className="text-[#C4604A]">clear</span> — Reset terminal buffer
            </div>
          </div>
        </div>
      );
    } else if (lower === "whoami" || lower === "bio") {
      outputContent = (
        <div className="space-y-1.5 text-xs text-[#EDE4D9]">
          <p className="font-bold text-[#FAF6F1]">Shivam Kedare</p>
          <p className="text-[#928B87]">Web Developer &amp; Software Systems Engineer · Mumbai, India</p>
          <p className="text-[#EDE4D9] leading-relaxed">
            Specializing in responsive frontend architectures (HTML5, CSS3, JavaScript, React.js, Next.js),
            enterprise event platforms (EventsAir, Cvent), local AI automation systems (Agni, Ollama), and
            high-precision C/C++ &amp; Python algorithms.
          </p>
        </div>
      );
    } else if (lower === "skills") {
      outputContent = (
        <div className="space-y-2 text-xs text-[#EDE4D9]">
          <p className="text-[#C4604A] font-semibold">Technical Specimen Matrix:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            {SKILL_SPECIMENS.slice(0, 8).map((s) => (
              <div key={s.name} className="flex justify-between border-b border-[#383432] pb-0.5">
                <span>{s.name}</span>
                <span className="text-[#C4604A]">{s.level}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === "projects") {
      outputContent = (
        <div className="space-y-2 text-xs text-[#EDE4D9]">
          <p className="text-[#C4604A] font-semibold">Active Blueprint Editions:</p>
          <div className="space-y-1.5 text-[11px] font-mono">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-1.5 rounded bg-[#2C2825]">
                <div className="flex justify-between font-bold text-[#FAF6F1]">
                  <span>{p.name}</span>
                  <span className="text-[#C4604A]">{p.category}</span>
                </div>
                <p className="text-[#928B87] text-[10px]">{p.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === "metrics") {
      outputContent = (
        <div className="space-y-1.5 text-xs font-mono text-[#EDE4D9]">
          <p className="text-[#566449] font-bold">● Production Systems Telemetry: Optimal</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>Cross-Device Compatibility: <span className="text-[#C4604A] font-bold">100%</span></div>
            <div>Sensor Detection Accuracy: <span className="text-[#566449] font-bold">95.0%</span></div>
            <div>Fuzzy Matching Precision: <span className="text-[#FAF6F1] font-bold">98.5%</span></div>
            <div>Event Logic Completion: <span className="text-[#566449] font-bold">99.8%</span></div>
          </div>
        </div>
      );
    } else if (lower === "resume" || lower === "cv") {
      window.open("/resume", "_blank");
      outputContent = (
        <p className="text-xs text-[#566449]">
          ✓ Opened verified curriculum vitae in new window (/resume)
        </p>
      );
    } else if (lower === "contact") {
      window.open("mailto:shivamkedare7171@gmail.com?subject=Inquiry%20for%20Shivam%20Kedare", "_blank");
      outputContent = (
        <p className="text-xs text-[#566449]">
          ✓ Initiated direct correspondence dispatch to shivamkedare7171@gmail.com
        </p>
      );
    } else if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      outputContent = (
        <p className="text-xs text-[#7A3B3B]">
          Command not recognized: &ldquo;{trimmed}&rdquo;. Type &ldquo;help&rdquo; for available commands.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        command: trimmed,
        output: outputContent,
        time: timeStr,
      },
    ]);
    setInputVal("");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#1A1816] text-[#FAF6F1] rounded-lg border border-[#4A4541] shadow-2xl overflow-hidden flex flex-col h-[520px]"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#2C2825] border-b border-[#383432] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C4604A] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#D4C3AF] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#566449] inline-block" />
              <span className="font-mono text-xs text-[#928B87] ml-2">
                shivamkedare@workstation:~ (zsh)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#928B87] hover:text-[#FAF6F1] hover:bg-[#383432] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Screen & History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs no-scrollbar">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[#928B87]">
                  <span className="text-[#C4604A]">➜</span>
                  <span className="text-[#EDE4D9] font-bold">{item.command}</span>
                  <span className="text-[10px] ml-auto text-[#7A746D]">{item.time}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Command Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 p-3 bg-[#2C2825] border-t border-[#383432]"
          >
            <span className="text-[#C4604A] font-mono font-bold">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command (try 'help', 'skills', 'metrics', 'projects', 'whoami')..."
              className="flex-1 bg-transparent text-[#FAF6F1] font-mono text-xs focus:outline-none placeholder-[#7A746D]"
            />
            <button
              type="submit"
              className="p-1.5 rounded bg-[#C4604A] text-white hover:bg-[#A8493A] transition-colors text-xs"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
