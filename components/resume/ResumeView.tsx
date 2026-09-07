"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  Copy,
  Check,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  Layers,
  Heart,
  Calendar,
} from "lucide-react";

export function ResumeView() {
  const [copied, setCopied] = useState(false);

  const plainTextResume = `SHIVAM KEDARE
Web Developer
EventsAir & Cvent | Local AI Automation | C/C++ Systems
Email: shivamkedare7171@gmail.com | Phone: +91 9623777548 | Location: Mumbai, India
GitHub: https://github.com/shiv369tes | LinkedIn: https://linkedin.com/in/shivamkedare369t

SUMMARY
Web Developer with experience in developing responsive websites and digital experiences using HTML, CSS, JavaScript, React.js, and Next.js. Skilled in UI/UX implementation, responsive web development, frontend development, and website customization. Experienced in building user-focused web solutions with clean, maintainable code and cross-device compatibility.

EXPERIENCE

ATPI | Direct Travel — Mumbai, India
Executive Digital Services (Events Development) | Apr 2025 - Present
- Developed and maintained event websites, mobile applications, and registration pages using the EventsAir platform.
- Built interactive and responsive web features using HTML, CSS, and JavaScript to improve usability and user experience.
- Collaborated with event teams and overseas colleagues to define website structures, event logic, registration workflows, and digital requirements.
- Managed end-to-end digital event setup, from initial configuration and development through testing, launch, and live portal support.
- Worked across multiple event technology platforms, including EventsAir and Cvent, to build and configure event websites, registration experiences, and digital event solutions.
- Worked on live event portals, implementing updates and resolving website and registration requirements during active events.
- Integrated and configured Smartsheet-based workflows to support event data management and digital event processes.
- Customized event websites and registration experiences based on client requirements while maintaining responsive and user-friendly interfaces.

Sankalp Developers Pvt. Ltd — Mumbai, India
Junior Developer | Feb 2019 - Mar 2020
- Developed lead generation and portfolio websites from scratch using HTML, CSS, and JavaScript.
- Implemented SEO best practices to improve website indexing, search visibility, and organic discoverability.
- Built responsive and user-friendly frontend interfaces with cross-device compatibility.
- Optimized website structure, content, and frontend implementation to support usability and search engine performance.

EDUCATION

Jeevandeep Shaikshanik Sanstha Poi's
Master of Science (Information Technology) | Aug 2022 - 2024
- Deep Learning in NLP & Image Recognition
- Researched and developed a project focused on Deep Learning, Natural Language Processing (NLP), and Image Recognition.
- Explored machine learning models, neural networks, data preprocessing, and model optimization for language and image-based applications.

Jeevandeep Shaikshanik Sanstha
Bachelor of Science (Information Technology) | Aug 2019 - Jan 2022
- Developed a fuzzy matching algorithm to improve data accuracy and reduce entry errors by 40%.
- Automated data cleanup, saving 10 hours per week, while collaborating across planning, development, testing, and delivery.
- Project Repository: https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic

PROJECTS

Agni (2025) | Local Windows AI Automation System
- Designed a local automation system that converts natural language into safe Windows actions using an AI planning model and a secure execution agent.
- Built an authenticated API to send user intent to AI, receive structured JSON commands, execute them locally through PowerShell/CMD/VBS, and return real-time results.
- Implemented automatic script generation and reuse via a dedicated C:\\Agni_scripts library to handle commands like launching games or web apps.
- Added safety layers to block destructive operations and integrated a repair-loop where AI fixes invalid commands using execution logs.
- Supports delayed execution, custom scripts, complete logging, and full offline operation with local Ollama models.

Sensor Data Processing & Detection System | C / C++
- Designed and implemented robust algorithms in C and C++ for sensor data processing and detection.
- Optimised sensor data processing logic to improve system reliability and support accurate detection in emergency situations.
- Implemented data processing and detection algorithms, achieving a 95% detection accuracy rate.
- Improved the reliability of sensor-based detection by optimising algorithm performance and processing logic.
- Applied efficient programming and algorithmic techniques in C and C++ to process sensor data and support real-time detection requirements.

String Mapping Fuzzy Logic Algorithm | Python
- Developed a fuzzy matching algorithm to improve data accuracy and reduce entry errors by 40%.
- Automated data cleanup, saving 10 hours per week, while collaborating across planning, development, testing, and delivery.
- Repository: https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic

TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, UI/UX Implementation, Responsive Web Development
- Event Technology: EventsAir Platform, Cvent, Digital Portals, Registration Workflows, Mobile Event Apps, Smartsheet
- Systems & AI: Python, C, C++, Deep Learning (NLP & Vision), Local Ollama LLMs, Windows Scripting (PowerShell, CMD, VBS)
- Security & Tooling: Web Application Security, Bug Hunting Platforms, Vulnerability Testing, Git, GitHub, SEO Best Practices

POSITION OF RESPONSIBILITY
Environment-Related Social Initiative — Head Member | 2016 - 2017
- Collaborated with local influencers to increase awareness of the environmental impact of firecrackers and encourage responsible celebration practices.

CERTIFICATIONS
Ethical Hacking Workshop — Piston InfoSolution | Sept 2018
- Participated in bug hunting platforms to identify and report potential security vulnerabilities in web applications.
- Performed vulnerability testing across various application components and documented identified security issues.

ACHIEVEMENTS / HOBBIES
Save Paws — Animal Welfare Initiative
- Volunteered with animal rescue centers through Save Paws, supporting animal welfare and adoption initiatives.
- Educated individuals on the benefits of pet adoption and responsible pet ownership as an alternative to purchasing pets.
- Repository: https://github.com/shiv369tes/SavePaws

Philosophy & Poetry
- Explored philosophical concepts and poetry, strengthening analytical thinking and interpretation skills.
- Analyzed abstract ideas, themes, and creative expression to develop critical thinking and written interpretation skills.
`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2C2825] font-sans antialiased selection:bg-[#C4604A]/20">
      {/* ── Print Styles Overlay ── */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 12mm 15mm 12mm 15mm;
            size: A4 portrait;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 10pt !important;
            line-height: 1.35 !important;
          }
          .no-print,
          .grain-layer,
          header,
          footer {
            display: none !important;
          }
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
          }
          .print-header-name {
            font-size: 22pt !important;
            font-weight: bold !important;
            text-transform: uppercase;
            letter-spacing: 0.5pt;
            color: #000000 !important;
            margin-bottom: 2pt !important;
          }
          .print-header-subtitle {
            font-size: 10.5pt !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 6pt !important;
            white-space: normal !important;
          }
          .print-contact-bar {
            font-size: 9pt !important;
            border-bottom: 1.5pt solid #000000 !important;
            padding-bottom: 6pt !important;
            margin-bottom: 10pt !important;
            color: #222222 !important;
          }
          .print-section-heading {
            font-size: 11pt !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            border-bottom: 1pt solid #000000 !important;
            padding-bottom: 2pt !important;
            margin-top: 10pt !important;
            margin-bottom: 6pt !important;
            color: #000000 !important;
            letter-spacing: 0.5pt !important;
          }
          .print-bullet-list {
            margin-top: 3pt !important;
            margin-bottom: 6pt !important;
            padding-left: 14pt !important;
          }
          .print-bullet-list li {
            margin-bottom: 2.5pt !important;
            font-size: 9.5pt !important;
          }
          a {
            color: #000000 !important;
            text-decoration: none !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* ── Top Floating Action Toolbar (Web View Only) ── */}
      <div className="no-print sticky top-0 z-50 bg-[#FAF6F1]/90 backdrop-blur-md border-b border-[#EDE4D9] py-3 px-4 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F3ECE4] hover:bg-[#E2D5C6] text-[#1A1816] text-xs font-mono font-medium transition-colors border border-[#EDE4D9]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to</span> Portfolio
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FDFCFA] hover:bg-[#F3ECE4] text-[#1A1816] text-xs font-mono font-medium transition-colors border border-[#D4C3AF] shadow-xs"
              title="Copy plain-text ATS version to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#566449]" />
                  <span className="text-[#566449]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C4604A]" />
                  <span>Copy ATS Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#1A1816] text-[#FAF6F1] hover:bg-[#C4604A] text-xs font-mono font-semibold transition-colors shadow-xs"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#C4604A]" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Resume Document Container ── */}
      <main className="py-8 sm:py-12 px-3 sm:px-6 max-w-4xl mx-auto print-container">
        <article className="p-6 sm:p-10 bg-[#FDFCFA] border border-[#EDE4D9] rounded-xl shadow-paper relative overflow-hidden print-container">
          
          {/* Top Decorative Colophon Stripe (Web View Only) */}
          <div className="no-print h-1.5 w-full bg-gradient-to-r from-[#C4604A] via-[#D4C3AF] to-[#566449] absolute top-0 left-0 right-0" />

          {/* ── HEADER ── */}
          <header className="pb-4 mb-4 border-b border-[#EDE4D9]/80">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left Column: Identity, Multi-line Subtitle & Location */}
              <div className="space-y-2.5 flex-1 min-w-0">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1816] tracking-tight print-header-name">
                  Shivam Kedare
                </h1>
                
                {/* Clean Multi-line Subtitle without collision */}
                <div className="font-mono text-xs sm:text-sm text-[#C4604A] font-bold tracking-tight print-header-subtitle space-y-1">
                  <div className="text-sm sm:text-base text-[#1A1816]">
                    Web Developer
                  </div>
                  <div className="text-[11.5px] sm:text-xs text-[#5E5854] font-medium leading-relaxed">
                    EventsAir &amp; Cvent <span className="text-[#D4C3AF] mx-1">•</span> Local AI Automation <span className="text-[#D4C3AF] mx-1">•</span> C/C++ Systems
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono pt-0.5 text-[#5E5854]">
                  <MapPin className="w-3.5 h-3.5 text-[#C4604A] shrink-0 no-print" />
                  <span className="font-bold text-[#1A1816]">Mumbai, India</span>
                </div>
              </div>

              {/* Right Column: Clean Vertically Aligned Contact Stack */}
              <div className="flex flex-col gap-2 text-xs font-mono text-[#5E5854] print-contact-bar md:border-l md:border-[#EDE4D9] md:pl-6 shrink-0">
                <a
                  href="mailto:shivamkedare7171@gmail.com"
                  className="inline-flex items-center gap-2.5 hover:text-[#C4604A] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C4604A] shrink-0 no-print" />
                  <span className="font-medium text-[#1A1816]">shivamkedare7171@gmail.com</span>
                </a>

                <a
                  href="tel:+919623777548"
                  className="inline-flex items-center gap-2.5 hover:text-[#C4604A] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#566449] shrink-0 no-print" />
                  <span className="font-medium text-[#1A1816]">+91 9623777548</span>
                </a>

                <a
                  href="https://github.com/shiv369tes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#1A1816] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#1A1816] shrink-0 no-print" />
                  <span className="font-medium text-[#1A1816]">github.com/shiv369tes</span>
                </a>

                <a
                  href="https://linkedin.com/in/shivamkedare369t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0 no-print" />
                  <span className="font-medium text-[#1A1816]">linkedin.com/in/shivamkedare369t</span>
                </a>
              </div>
            </div>
          </header>

          {/* ── PROFESSIONAL SUMMARY ── */}
          <section className="mb-7 page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-2.5 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Sparkles className="w-4 h-4 text-[#C4604A] no-print" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4541] leading-relaxed">
              Web Developer with experience in developing responsive websites and digital experiences using{" "}
              <strong>HTML, CSS, JavaScript, React.js, and Next.js</strong>. Skilled in UI/UX implementation,
              responsive web development, frontend development, and website customization. Experienced in building
              user-focused web solutions with clean, maintainable code and cross-device compatibility.
            </p>
          </section>

          {/* ── TECHNICAL SKILLS MATRIX ── */}
          <section className="mb-7 page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-3 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Code2 className="w-4 h-4 text-[#566449] no-print" />
              <span>Technical Skills</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
                <span className="font-mono text-[11px] font-bold text-[#C4604A] uppercase tracking-wider block">
                  Web &amp; Frontend Engineering
                </span>
                <p className="text-[#4A4541] leading-snug">
                  HTML, CSS, JavaScript, React.js, Next.js, UI/UX Implementation, Responsive Web Development, Website Customization, Cross-Device Compatibility
                </p>
              </div>

              <div className="p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
                <span className="font-mono text-[11px] font-bold text-[#566449] uppercase tracking-wider block">
                  Event Platforms &amp; Workflows
                </span>
                <p className="text-[#4A4541] leading-snug">
                  EventsAir Platform, Cvent, Digital Event Portals, Registration Workflows, Mobile Event Applications, Smartsheet Data Workflows
                </p>
              </div>

              <div className="p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
                <span className="font-mono text-[11px] font-bold text-[#1A1816] uppercase tracking-wider block">
                  Systems, Automation &amp; AI
                </span>
                <p className="text-[#4A4541] leading-snug">
                  Python, C, C++, Deep Learning (NLP &amp; Image Recognition), Local Ollama LLM Agents, Windows Scripting (PowerShell, CMD, VBS)
                </p>
              </div>

              <div className="p-3 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
                <span className="font-mono text-[11px] font-bold text-[#7A746D] uppercase tracking-wider block">
                  Security, SEO &amp; Tooling
                </span>
                <p className="text-[#4A4541] leading-snug">
                  Git, GitHub, SEO Best Practices &amp; Indexing, Web Application Security, Bug Hunting Platforms, Vulnerability Testing
                </p>
              </div>
            </div>
          </section>

          {/* ── WORK EXPERIENCE ── */}
          <section className="mb-7">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-4 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Briefcase className="w-4 h-4 text-[#C4604A] no-print" />
              <span>Work Experience</span>
            </h2>

            <div className="space-y-6">
              {/* Job 1 */}
              <div className="page-break-inside-avoid space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1816]">
                      Executive Digital Services (Events Development)
                    </h3>
                    <p className="font-mono text-xs text-[#566449] font-semibold">
                      ATPI | Direct Travel · <span className="text-[#7A746D] font-normal">Mumbai, India</span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                    Apr 2025 – Present
                  </span>
                </div>

                <div className="no-print inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#EDE4D9]/60 text-[10.5px] font-mono text-[#5E5854] border border-[#D4C3AF]">
                  <Calendar className="w-3 h-3 text-[#C4604A]" />
                  <span>Enterprise Event Technology &amp; Digital Solutions</span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-2 text-xs text-[#4A4541] leading-relaxed print-bullet-list">
                  <li>
                    Developed and maintained event websites, mobile applications, and registration pages using the <strong>EventsAir platform</strong>.
                  </li>
                  <li>
                    Built interactive and responsive web features using <strong>HTML, CSS, and JavaScript</strong> to improve usability and user experience.
                  </li>
                  <li>
                    Collaborated with event teams and overseas colleagues to define website structures, event logic, registration workflows, and digital requirements.
                  </li>
                  <li>
                    Managed end-to-end digital event setup, from initial configuration and development through testing, launch, and live portal support.
                  </li>
                  <li>
                    Worked across multiple event technology platforms, including <strong>EventsAir and Cvent</strong>, to build and configure event websites, registration experiences, and digital event solutions.
                  </li>
                  <li>
                    Worked on live event portals, implementing updates and resolving website and registration requirements during active events.
                  </li>
                  <li>
                    Integrated and configured <strong>Smartsheet-based workflows</strong> to support event data management and digital event processes.
                  </li>
                  <li>
                    Customized event websites and registration experiences based on client requirements while maintaining responsive and user-friendly interfaces.
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="page-break-inside-avoid space-y-2 pt-2 border-t border-[#EDE4D9]/60">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1816]">
                      Junior Developer
                    </h3>
                    <p className="font-mono text-xs text-[#566449] font-semibold">
                      Sankalp Developers Pvt. Ltd · <span className="text-[#7A746D] font-normal">Mumbai, India</span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                    Feb 2019 – Mar 2020
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-2 text-xs text-[#4A4541] leading-relaxed print-bullet-list">
                  <li>
                    Developed lead generation and portfolio websites from scratch using <strong>HTML, CSS, and JavaScript</strong>.
                  </li>
                  <li>
                    Implemented <strong>SEO best practices</strong> to improve website indexing, search visibility, and organic discoverability.
                  </li>
                  <li>
                    Built responsive and user-friendly frontend interfaces with cross-device compatibility.
                  </li>
                  <li>
                    Optimized website structure, content, and frontend implementation to support usability and search engine performance.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── FEATURED PROJECTS ── */}
          <section className="mb-7">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-4 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Layers className="w-4 h-4 text-[#566449] no-print" />
              <span>Key Projects</span>
            </h2>

            <div className="space-y-4">
              {/* Project 1: Agni */}
              <div className="page-break-inside-avoid p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-[#EDE4D9]/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#1A1816]">Agni</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C4604A]/15 text-[#C4604A] font-bold">
                      2025
                    </span>
                    <span className="text-xs text-[#7A746D] font-mono">· Local Windows AI Automation</span>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                  <li>
                    Designed a local automation system that converts natural language into safe Windows actions using an AI planning model and a secure execution agent.
                  </li>
                  <li>
                    Built an authenticated API to send user intent to AI, receive structured JSON commands, execute them locally through PowerShell/CMD/VBS, and return real-time results.
                  </li>
                  <li>
                    Implemented automatic script generation and reuse via a dedicated <code className="font-mono text-[11px] bg-[#EDE4D9] px-1 rounded text-[#1A1816]">C:\Agni_scripts</code> library to handle commands like launching games or web apps.
                  </li>
                  <li>
                    Added safety layers to block destructive operations and integrated a repair-loop where AI fixes invalid commands using execution logs.
                  </li>
                  <li>
                    Supports delayed execution, custom scripts, complete logging, and full offline operation with local Ollama models.
                  </li>
                </ul>
              </div>

              {/* Project 2: Sensor Data */}
              <div className="page-break-inside-avoid p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-[#EDE4D9]/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#1A1816]">Sensor Data Processing &amp; Detection System</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#566449]/15 text-[#566449] font-bold">
                      C / C++
                    </span>
                    <span className="text-xs text-[#7A746D] font-mono">· 95% Detection Accuracy</span>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                  <li>
                    Designed and implemented robust algorithms in <strong>C and C++</strong> for sensor data processing and detection.
                  </li>
                  <li>
                    Optimised sensor data processing logic to improve system reliability and support accurate detection in emergency situations.
                  </li>
                  <li>
                    Implemented data processing and detection algorithms, achieving a <strong>95% detection accuracy rate</strong>.
                  </li>
                  <li>
                    Improved the reliability of sensor-based detection by optimising algorithm performance and processing logic.
                  </li>
                  <li>
                    Applied efficient programming and algorithmic techniques in C and C++ to process sensor data and support real-time detection requirements.
                  </li>
                </ul>
              </div>

              {/* Project 3: String Mapping Fuzzy Logic */}
              <div className="page-break-inside-avoid p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#EDE4D9]/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#1A1816]">String Mapping Fuzzy Logic Algorithm</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C4604A]/15 text-[#C4604A] font-bold">
                      Python
                    </span>
                  </div>
                  <a
                    href="https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#C4604A] hover:underline inline-flex items-center gap-1.5 shrink-0 font-medium"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 no-print" />
                  </a>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                  <li>
                    Developed a fuzzy matching algorithm to improve data accuracy and reduce entry errors by 40%.
                  </li>
                  <li>
                    Automated data cleanup, saving 10 hours per week, while collaborating across planning, development, testing, and delivery.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── EDUCATION ── */}
          <section className="mb-7 page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-3 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <GraduationCap className="w-4 h-4 text-[#C4604A] no-print" />
              <span>Education</span>
            </h2>

            <div className="space-y-4">
              {/* Degree 1 */}
              <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1816]">
                      Master of Science in Information Technology (M.Sc. IT)
                    </h3>
                    <p className="font-mono text-xs text-[#566449] font-semibold">
                      Jeevandeep Shaikshanik Sanstha Poi&apos;s · Deep Learning in NLP &amp; Image Recognition
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                    Aug 2022 – 2024
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                  <li>
                    Researched and developed a project focused on Deep Learning, Natural Language Processing (NLP), and Image Recognition.
                  </li>
                  <li>
                    Explored machine learning models, neural networks, data preprocessing, and model optimization for language and image-based applications.
                  </li>
                </ul>
              </div>

              {/* Degree 2 */}
              <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1816]">
                      Bachelor of Science in Information Technology (B.Sc. IT)
                    </h3>
                    <p className="font-mono text-xs text-[#566449] font-semibold">
                      Jeevandeep Shaikshanik Sanstha
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                    Aug 2019 – Jan 2022
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                  <li>
                    Developed a fuzzy matching algorithm to improve data accuracy and reduce entry errors by 40%.
                  </li>
                  <li>
                    Automated data cleanup, saving 10 hours per week, while collaborating across planning, development, testing, and delivery.
                  </li>
                  <li className="list-none pt-1.5 -ml-4">
                    <a
                      href="https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#C4604A] hover:underline bg-[#FAF6F1] px-2.5 py-1 rounded border border-[#EDE4D9]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#C4604A] shrink-0 no-print" />
                      <span>Project Repository: Fuzzy Logic String Mapping ↗</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── POSITION OF RESPONSIBILITY ── */}
          <section className="mb-7 page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-3 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <BookOpen className="w-4 h-4 text-[#566449] no-print" />
              <span>Position of Responsibility</span>
            </h2>

            <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#1A1816]">
                    Environment-Related Social Initiative
                  </h3>
                  <p className="font-mono text-xs text-[#566449] font-semibold">
                    Head Member
                  </p>
                </div>
                <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                  2016 – 2017
                </span>
              </div>
              <p className="text-xs text-[#4A4541] pt-1 leading-relaxed">
                Collaborated with local influencers to increase awareness of the environmental impact of firecrackers and encourage responsible celebration practices.
              </p>
            </div>
          </section>

          {/* ── CERTIFICATIONS & ACADEMIC DISTINCTIONS ── */}
          <section className="mb-7 page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-3 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Award className="w-4 h-4 text-[#C4604A] no-print" />
              <span>Certifications</span>
            </h2>

            <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#C4604A] font-serif font-bold text-sm">
                    <Award className="w-4 h-4 shrink-0 no-print" />
                    <span>Ethical Hacking Workshop</span>
                  </div>
                  <p className="font-mono text-xs text-[#566449] font-semibold">
                    Piston InfoSolution
                  </p>
                </div>
                <span className="font-mono text-xs text-[#C4604A] font-semibold shrink-0">
                  Sept 2018
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list pt-1">
                <li>
                  Participated in bug hunting platforms to identify and report potential security vulnerabilities in web applications.
                </li>
                <li>
                  Performed vulnerability testing across various application components and documented identified security issues.
                </li>
              </ul>
            </div>
          </section>

          {/* ── ACHIEVEMENTS / HOBBIES ── */}
          <section className="page-break-inside-avoid">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A1816] uppercase tracking-wider pb-1 mb-3 border-b border-[#EDE4D9] flex items-center gap-2 print-section-heading">
              <Heart className="w-4 h-4 text-[#C4604A] no-print" />
              <span>Achievements / Hobbies</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#C4604A] font-serif font-bold text-sm">
                  <Heart className="w-4 h-4 shrink-0 no-print" />
                  <span>Save Paws — Animal Welfare</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list">
                  <li>
                    Volunteered with animal rescue centers through Save Paws, supporting animal welfare and adoption initiatives.
                  </li>
                  <li>
                    Educated individuals on the benefits of pet adoption and responsible pet ownership as an alternative to purchasing pets.
                  </li>
                </ul>
                <div className="pt-1">
                  <a
                    href="https://github.com/shiv369tes/SavePaws"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-[#C4604A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>github.com/shiv369tes/SavePaws</span>
                    <ExternalLink className="w-3 h-3 no-print" />
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded bg-[#FAF6F1] border border-[#EDE4D9] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#566449] font-serif font-bold text-sm">
                  <BookOpen className="w-4 h-4 shrink-0 no-print" />
                  <span>Philosophy &amp; Poetry</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#4A4541] print-bullet-list">
                  <li>
                    Explored philosophical concepts and poetry, strengthening analytical thinking and interpretation skills.
                  </li>
                  <li>
                    Analyzed abstract ideas, themes, and creative expression to develop critical thinking and written interpretation skills.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── FOOTER COLOPHON (Web View Only) ── */}
          <footer className="no-print mt-10 pt-6 border-t border-[#EDE4D9] flex items-center justify-end text-xs font-mono text-[#7A746D] gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyText}
                className="hover:text-[#1A1816] transition-colors"
              >
                Copy Text
              </button>
              <span>•</span>
              <button
                onClick={handlePrint}
                className="hover:text-[#C4604A] transition-colors font-semibold"
              >
                Print / Save PDF
              </button>
            </div>
          </footer>

        </article>
      </main>
    </div>
  );
}
