"use client";

import React from "react";
import {
  Server,
  Shield,
  Zap,
  Terminal,
  Cpu,
  Database,
  Lock,
  ArrowUpRight,
  Sparkles,
  Award,
  BookOpen,
  Code2,
  CheckCircle2,
  GitBranch,
} from "lucide-react";
import { PROJECTS, MONOGRAPH_PLATES } from "@/data/portfolio-data";

interface BookPageProps {
  plateIndex: number;
  side: "left" | "right";
  onInspectProject?: (projectId: string) => void;
}

export function BookPage({ plateIndex, side, onInspectProject }: BookPageProps) {
  const boundedIndex = Math.max(0, Math.min(plateIndex, MONOGRAPH_PLATES.length - 1));

  switch (boundedIndex) {
    case 0:
      return side === "left" ? <FrontispieceLeft /> : <FrontispieceRight />;
    case 1:
      return side === "left" ? <ManifestoLeft /> : <ManifestoRight />;
    case 2:
      return side === "left" ? (
        <ProjectBlueprintLeft project={PROJECTS[0]} plateNumber="Plate III" />
      ) : (
        <ProjectBlueprintRight
          project={PROJECTS[0]}
          onInspect={() => onInspectProject?.(PROJECTS[0].id)}
        />
      );
    case 3:
      return side === "left" ? (
        <ProjectBlueprintLeft project={PROJECTS[1]} plateNumber="Plate IV" />
      ) : (
        <ProjectBlueprintRight
          project={PROJECTS[1]}
          onInspect={() => onInspectProject?.(PROJECTS[1].id)}
        />
      );
    case 4:
      return side === "left" ? (
        <ProjectBlueprintLeft project={PROJECTS[2]} plateNumber="Plate V" />
      ) : (
        <ProjectBlueprintRight
          project={PROJECTS[2]}
          onInspect={() => onInspectProject?.(PROJECTS[2].id)}
        />
      );
    case 5:
      return side === "left" ? (
        <ProjectBlueprintLeft project={PROJECTS[3]} plateNumber="Plate VI" />
      ) : (
        <ProjectBlueprintRight
          project={PROJECTS[3]}
          onInspect={() => onInspectProject?.(PROJECTS[3].id)}
        />
      );
    case 6:
      return side === "left" ? (
        <ProjectBlueprintLeft project={PROJECTS[4]} plateNumber="Plate VII" />
      ) : (
        <ProjectBlueprintRight
          project={PROJECTS[4]}
          onInspect={() => onInspectProject?.(PROJECTS[4].id)}
        />
      );
    case 7:
      return side === "left" ? <TaxonomyLeft /> : <TaxonomyRight />;
    case 8:
      return side === "left" ? <ChronologyLeft /> : <ChronologyRight />;
    case 9:
    default:
      return side === "left" ? <ColophonLeft /> : <ColophonRight />;
  }
}

export function BookSpread({
  plateIndex,
  onInspectProject,
}: {
  plateIndex: number;
  onInspectProject?: (projectId: string) => void;
}) {
  return (
    <div className="w-full h-full grid grid-cols-2 bg-[#FAF6F1] text-[#2C2825] font-sans select-none overflow-hidden">
      <BookPage plateIndex={plateIndex} side="left" onInspectProject={onInspectProject} />
      <BookPage plateIndex={plateIndex} side="right" onInspectProject={onInspectProject} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plate 0: Frontispiece & Table of Plates
───────────────────────────────────────────────────────────── */
function FrontispieceLeft() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between relative bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#E2D5C6] pointer-events-none rounded-sm" />
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Vol. I · Opus Nº 2026</span>
          <span>Archival Edition</span>
        </div>

        <div className="mt-4 sm:mt-6 space-y-1 sm:space-y-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C4604A] font-semibold block">
            The Engineering Monograph
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1816] tracking-tight leading-[0.95]">
            Shivam Kedare
          </h1>
          <p className="font-script text-lg sm:text-2xl text-[#C4604A] pt-0.5 sm:pt-1">
            systems architect & backend engineer
          </p>
        </div>

        <p className="text-[11px] sm:text-xs text-[#5E5854] mt-3 sm:mt-5 leading-relaxed max-w-sm">
          A specialized treatise on high-throughput Node.js runtimes, distributed concurrency,
          fault-tolerant data schemas, and edge-native architectures.
        </p>
      </div>

      <div className="my-auto py-1 sm:py-2 flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-[#C4604A]/60 flex items-center justify-center p-1 shrink-0">
          <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#C4604A] font-bold text-center leading-none">
            VERIFIED<br />SYSTEM
          </span>
        </div>
        <div>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#1A1816]">
            Deterministic Proof of Work
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#7A746D]">
            Mumbai · Global Distributed Deployments
          </p>
        </div>
      </div>

      <div className="pt-2 sm:pt-3 border-t border-[#EDE4D9] flex items-center justify-between text-[9px] sm:text-[10px] text-[#928B87]">
        <span>Colophon Registered 2026</span>
        <span className="font-mono text-[#C4604A]">Page 01</span>
      </div>
    </div>
  );
}

function FrontispieceRight() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between relative bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#E2D5C6] pointer-events-none rounded-sm" />
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Table of Plates</span>
          <span>Index Monograph</span>
        </div>

        <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 max-h-[220px] sm:max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
          {MONOGRAPH_PLATES.slice(1).map((plate) => (
            <div
              key={plate.id}
              className="flex items-baseline justify-between py-1 border-b border-[#EDE4D9]/60 text-[10.5px] sm:text-xs group"
            >
              <div className="flex items-baseline gap-2 truncate">
                <span className="font-mono text-[9px] sm:text-[10px] text-[#C4604A] font-semibold">
                  {plate.plateNumber}
                </span>
                <span className="font-serif text-[#2C2825] font-medium truncate max-w-[130px] sm:max-w-[180px]">
                  {plate.title.replace(/^Blueprint\s[IVX]+:\s*/, "")}
                </span>
              </div>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#928B87] font-mono shrink-0">
                {plate.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 sm:pt-3 border-t border-[#EDE4D9] flex items-center justify-between text-[9px] sm:text-[10px] text-[#5E5854]">
        <span className="font-script text-sm sm:text-base text-[#C4604A]">
          Flip the page to inspect plates →
        </span>
        <span className="font-mono text-[#928B87]">Page 02</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plate 1: The Engineering Manifesto
───────────────────────────────────────────────────────────── */
function ManifestoLeft() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Doctrine & Craft</span>
          <span>Plate II · Left</span>
        </div>

        <div className="mt-3 sm:mt-5">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#566449] font-bold">
            Principle I · Concurrency
          </span>
          <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1A1816] mt-0.5 sm:mt-1 mb-1.5 sm:mb-2">
            Asynchronous Flow over Brute Force
          </h2>
          <p className="text-[11px] sm:text-xs text-[#5E5854] leading-relaxed">
            True scalability is not solved by stacking expensive server cores, but by honoring the
            non-blocking event loop, stream pipelines, and zero-allocation memory buffers.
          </p>
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#EDE4D9]/80">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C4604A] font-bold">
            Principle II · Isolation
          </span>
          <h3 className="font-serif text-sm sm:text-lg font-bold text-[#1A1816] mt-0.5 mb-1">
            Fault Boundaries & Zero Cascading
          </h3>
          <p className="text-[11px] sm:text-xs text-[#5E5854] leading-relaxed">
            Every critical subsystem must degrade gracefully. If a database shard locks, the edge cache
            serves stale-while-revalidate rather than surfacing a catastrophic 500 error.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] flex items-center justify-between text-[9px] sm:text-[10px] text-[#928B87]">
        <span>Doctrine of Engineering</span>
        <span className="font-mono text-[#C4604A]">Page 03</span>
      </div>
    </div>
  );
}

function ManifestoRight() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Pillars of Execution</span>
          <span>Plate II · Right</span>
        </div>

        <div className="mt-3 sm:mt-5">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#7A3B3B] font-bold">
            Principle III · Determinism
          </span>
          <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1A1816] mt-0.5 sm:mt-1 mb-1.5 sm:mb-2">
            Idempotent APIs & Atomic State
          </h2>
          <p className="text-[11px] sm:text-xs text-[#5E5854] leading-relaxed">
            A mutation should produce the identical state whether triggered once or repeated fifty times across an unreliable wireless connection.
          </p>
        </div>

        <div className="mt-4 p-3 rounded bg-[#F3ECE4]/60 border-l-2 border-[#C4604A]">
          <p className="font-script text-sm sm:text-base text-[#C4604A] leading-tight">
            &ldquo;Code should read like clear prose and execute like a Swiss chronometer.&rdquo;
          </p>
          <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#7A746D] font-mono block mt-1">
            — Shivam Kedare, Engineering Notes
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] flex items-center justify-between text-[9px] sm:text-[10px] text-[#928B87]">
        <span>Sign-off & Seal</span>
        <span className="font-mono text-[#C4604A]">Page 04</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Generic Project Blueprint Plates (Plates 2 to 6)
───────────────────────────────────────────────────────────── */
function ProjectBlueprintLeft({ project, plateNumber }: { project: (typeof PROJECTS)[0]; plateNumber: string }) {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span className="text-[#C4604A] font-bold">{plateNumber}</span>
          <span>{project.category}</span>
        </div>

        <div className="mt-3 sm:mt-4 space-y-0.5 sm:space-y-1">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#7A746D] font-mono font-medium">
            {project.edition}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-black text-[#1A1816] tracking-tight leading-tight">
            {project.name}
          </h2>
        </div>

        <p className="text-[11px] sm:text-xs text-[#5E5854] mt-2 sm:mt-3 leading-relaxed">
          {project.purpose}
        </p>

        <div className="mt-3 p-2 sm:p-2.5 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#C4604A] font-semibold block mb-0.5">
            Key Breakthrough:
          </span>
          <p className="text-[10.5px] sm:text-[11px] text-[#2C2825] font-medium leading-normal">
            {project.feature}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t border-[#EDE4D9]">
        {project.stats.map((s) => (
          <div key={s.label} className="text-center p-1 sm:p-1.5 rounded bg-[#F3ECE4]/80">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#7A746D] font-mono block">
              {s.label}
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#1A1816]">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectBlueprintRight({
  project,
  onInspect,
}: {
  project: (typeof PROJECTS)[0];
  onInspect?: () => void;
}) {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Specimen & Implementation</span>
          <span>Dossier</span>
        </div>

        <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-1.5 sm:px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-mono font-medium bg-[#F3ECE4] text-[#4A4541] border border-[#E2D5C6]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.codeSpecimen && (
          <div className="mt-2.5 sm:mt-3 rounded border border-[#EDE4D9] bg-[#1A1816] text-[#FAF6F1] p-2.5 sm:p-3 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-[#928B87] pb-1 mb-1 border-b border-[#383432]">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A]" />
                <span className="truncate max-w-[120px]">{project.codeSpecimen.filename}</span>
              </div>
              <span>{project.codeSpecimen.language}</span>
            </div>
            <pre className="font-mono text-[9px] sm:text-[10px] leading-snug overflow-x-auto text-[#EDE4D9] no-scrollbar max-h-[90px] sm:max-h-[120px]">
              <code>{project.codeSpecimen.code}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] flex items-center justify-between">
        <button
          onClick={onInspect}
          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded bg-[#C4604A] text-white text-[10px] sm:text-[11px] font-medium hover:bg-[#A8493A] transition-colors"
        >
          <span>Inspect Blueprint Dossier</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
        <span className="font-mono text-[8.5px] sm:text-[9px] text-[#928B87]">
          Volume Specimen
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plate 7: Technical Specimen Taxonomy
───────────────────────────────────────────────────────────── */
function TaxonomyLeft() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span className="text-[#C4604A] font-bold">Plate VIII</span>
          <span>Taxonomy · Layer I</span>
        </div>

        <div className="mt-3 sm:mt-4">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#566449] font-bold">
            Backend & Concurrency
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mt-0.5 mb-1.5 sm:mb-2">
            Event Engines & Execution
          </h2>
          <div className="space-y-1 sm:space-y-1.5 text-xs text-[#5E5854]">
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">Node.js & Express.js</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C4604A]">Primary Runtime</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">Python / FastAPI</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#566449]">Async Systems</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">WebSockets & Streaming</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#7A3B3B]">Bidirectional</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">Go & Rust Ingestion</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#928B87]">High-Throughput</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>Specimen Matrix I</span>
        <span>Page 15</span>
      </div>
    </div>
  );
}

function TaxonomyRight() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Storage & Cloud</span>
          <span>Taxonomy · Layer II</span>
        </div>

        <div className="mt-3 sm:mt-4">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C4604A] font-bold">
            Databases & Cloud Fabric
          </span>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mt-0.5 mb-1.5 sm:mb-2">
            Persistent & Volatile Stores
          </h2>
          <div className="space-y-1 sm:space-y-1.5 text-xs text-[#5E5854]">
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF6F1] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">PostgreSQL & Supabase</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C4604A]">ACID & RLS</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF6F1] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">Redis In-Memory</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#566449]">Queues & Cache</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF6F1] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">Docker & Linux Daemons</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#7A3B3B]">Containers</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#FAF6F1] border border-[#EDE4D9]">
              <span className="font-medium text-[#1A1816]">AWS & Cloudflare Edge</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#928B87]">Global Edge</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>Specimen Matrix II</span>
        <span>Page 16</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plate 8: Chronology of Dispatches
───────────────────────────────────────────────────────────── */
function ChronologyLeft() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span className="text-[#C4604A] font-bold">Plate IX</span>
          <span>Dispatch Nº 01</span>
        </div>

        <div className="mt-3 sm:mt-4">
          <span className="px-2 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono font-semibold bg-[#7A3B3B]/10 text-[#7A3B3B] uppercase tracking-wider">
            Proprietary NDA
          </span>
          <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1A1816] mt-1">
            CIARL
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold text-[#C4604A] mb-1.5 sm:mb-2">
            Software Developer (Backend) · 2024 — Present
          </p>
          <p className="text-[11px] sm:text-xs text-[#5E5854] leading-relaxed">
            Designed secure Node.js backend systems, hardware sensor integration modules, and role-based access control schemas.
          </p>
        </div>

        <ul className="mt-2.5 sm:mt-3 space-y-1 text-[10px] sm:text-[11px] text-[#4A4541]">
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A]" />
            <span>Hardware serial API integration</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4604A]" />
            <span>Sub-second live operations telemetry</span>
          </li>
        </ul>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>Active Appointment</span>
        <span>Page 17</span>
      </div>
    </div>
  );
}

function ChronologyRight() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Dispatch Nº 02 & 03</span>
          <span>Chronology</span>
        </div>

        <div className="mt-3 sm:mt-4">
          <span className="px-2 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono font-semibold bg-[#566449]/10 text-[#566449] uppercase tracking-wider">
            Production Internship
          </span>
          <h2 className="font-serif text-base sm:text-xl font-bold text-[#1A1816] mt-1">
            Sumeru Technology Solutions
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold text-[#566449] mb-1.5">
            SDE Intern · 2024
          </p>
          <p className="text-[11px] sm:text-xs text-[#5E5854] leading-relaxed">
            Eliminated cron bottlenecks by migrating scheduled tasks to asynchronous BullMQ Redis queues.
          </p>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-[#EDE4D9]/80">
          <span className="text-[9.5px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#1A1816]">
            Academic Faculty Service (Volunteer)
          </span>
          <p className="text-[10px] sm:text-[11px] text-[#7A746D] mt-0.5">
            Bhimrao Pradhan College · Taught DBMS & System Design to B.Sc. IT Undergraduates.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>Historical Record</span>
        <span>Page 18</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Plate 9: Academic Honors & Grand Colophon
───────────────────────────────────────────────────────────── */
function ColophonLeft() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 border-r border-[#EDE4D9] flex flex-col justify-between bg-[#FAF6F1] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span className="text-[#C4604A] font-bold">Plate X</span>
          <span>Attestation</span>
        </div>

        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
          <div className="p-2.5 sm:p-3 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
            <div className="flex items-center gap-1.5 mb-1">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C4604A]" />
              <span className="font-serif font-bold text-xs sm:text-sm text-[#1A1816]">
                First Rank — B.Sc. IT
              </span>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-[#5E5854]">
              Sonubhau Baswant College, Mumbai University · Secured 1st Rank across graduating cohort.
            </p>
          </div>

          <div className="p-2.5 sm:p-3 rounded bg-[#FDFCFA] border border-[#EDE4D9]">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#1A1816]">
                Data Science Certification
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono text-[#566449] font-bold">VERIFIED</span>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-[#5E5854]">
              Internshala Trainings · Certificate Nº 263gl7b3rur
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>Honors Certified</span>
        <span>Page 19</span>
      </div>
    </div>
  );
}

function ColophonRight() {
  return (
    <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-9 flex flex-col justify-between bg-[#FDFCFA] text-[#2C2825] overflow-hidden select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#928B87] pb-2 sm:pb-3 border-b border-[#EDE4D9]">
          <span>Grand Colophon</span>
          <span>Epilogue</span>
        </div>

        <div className="mt-3 sm:mt-4">
          <h2 className="font-serif text-lg sm:text-2xl font-black text-[#1A1816]">
            Shivam Kedare
          </h2>
          <p className="text-[10px] sm:text-xs text-[#7A746D] font-mono mt-0.5">
            omthakur2366@gmail.com · Mumbai, India
          </p>

          <p className="text-[10.5px] sm:text-xs text-[#5E5854] mt-2 sm:mt-3 leading-relaxed">
            Open for senior backend engineering roles, scalable systems architecture consulting, and high-performance developer tooling contracts.
          </p>

          <div className="mt-3 sm:mt-4 pt-1">
            <p className="font-script text-xl sm:text-2xl text-[#C4604A]">
              Shivam Kedare
            </p>
            <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#928B87] font-mono block">
              Author & Distributed Systems Engineer
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#EDE4D9] text-[8.5px] sm:text-[9px] text-[#928B87] flex justify-between font-mono">
        <span>End of Volume I</span>
        <span>Page 20</span>
      </div>
    </div>
  );
}