export interface Project {
  id: string;
  name: string;
  edition: string;
  category: 'Distributed Web' | 'Low-Level Tools' | 'Autonomous AI' | 'Mobile Systems';
  purpose: string;
  feature: string;
  url: string;
  github?: string;
  image: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  problemStatement: string;
  solutionDetails: string[];
  codeSpecimen?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface MonographPlate {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  plateNumber: string;
  accent: string;
}

export interface CareerEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  classification: string;
  description: string;
  deliverables: string[];
  techUsed: string[];
}

export interface SkillItem {
  name: string;
  level: string;
  category: 'Backend & Concurrency' | 'Databases & Storage' | 'Infrastructure & Cloud' | 'Languages & Protocols';
  experience: string;
  specimenNote: string;
}

export interface AcademicHonor {
  id: number;
  title: string;
  organization: string;
  description: string;
  date: string;
  verified?: boolean;
  link?: string;
  linkText?: string;
  badge: string;
}

export const MONOGRAPH_PLATES: MonographPlate[] = [
  {
    id: 0,
    slug: 'frontispiece',
    title: 'Shivam Kedare — The Author’s Monograph',
    subtitle: 'Responsive Web Development, Digital Event Experiences & Local AI Systems',
    category: 'Frontispiece & Colophon',
    plateNumber: 'Plate I',
    accent: '#C4604A',
  },
  {
    id: 1,
    slug: 'manifesto',
    title: 'The Engineering Manifesto',
    subtitle: 'Pillars of Resilient Systems: Responsive Fidelity, Safe Automation & Algorithmic Precision',
    category: 'Doctrine & Philosophy',
    plateNumber: 'Plate II',
    accent: '#566449',
  },
  {
    id: 2,
    slug: 'agni',
    title: 'Blueprint I: Agni Automation Agent',
    subtitle: 'Local AI System Converting Natural Language to Safe Windows Execution with Ollama & PowerShell',
    category: 'Autonomous AI',
    plateNumber: 'Plate III',
    accent: '#C4604A',
  },
  {
    id: 3,
    slug: 'eventsair',
    title: 'Blueprint II: EventsAir & Digital Experiences',
    subtitle: 'Enterprise Event Websites, Interactive Registration Portals & Smartsheet Automated Workflows',
    category: 'Distributed Web',
    plateNumber: 'Plate IV',
    accent: '#566449',
  },
  {
    id: 4,
    slug: 'fuzzy-matching',
    title: 'Blueprint III: String Mapping Fuzzy Logic',
    subtitle: 'Python Fuzzy Matching Algorithm Reducing Entry Errors by 40% & Saving 10 Hours Weekly',
    category: 'Low-Level Tools',
    plateNumber: 'Plate V',
    accent: '#7A3B3B',
  },
  {
    id: 5,
    slug: 'sensor-detection',
    title: 'Blueprint IV: Sensor Processing & Detection',
    subtitle: 'High-Performance C/C++ Real-Time Sensor Processing Engine Achieving 95% Detection Accuracy',
    category: 'Low-Level Tools',
    plateNumber: 'Plate VI',
    accent: '#C4604A',
  },
  {
    id: 6,
    slug: 'save-paws',
    title: 'Blueprint V: Save Paws Platform',
    subtitle: 'Community Animal Rescue & Pet Adoption Web App Promoting Welfare Initiatives & Education',
    category: 'Distributed Web',
    plateNumber: 'Plate VII',
    accent: '#566449',
  },
  {
    id: 7,
    slug: 'taxonomy',
    title: 'The Technical Specimen Taxonomy',
    subtitle: 'Matrix of Frontend Frameworks, AI Agents, C/C++ Systems, Event Tech & Cloud Workflows',
    category: 'Engineering Matrix',
    plateNumber: 'Plate VIII',
    accent: '#C4604A',
  },
  {
    id: 8,
    slug: 'chronology',
    title: 'Chronology of Dispatches',
    subtitle: 'Professional Engineering Appointments, Digital Event Systems & Development Leadership',
    category: 'Career Ledger',
    plateNumber: 'Plate IX',
    accent: '#566449',
  },
  {
    id: 9,
    slug: 'colophon',
    title: 'Academic Honors & Grand Colophon',
    subtitle: 'M.Sc. IT (Deep Learning & NLP), B.Sc. IT (Fuzzy Logic), Ethical Hacking & Postal Coordinates',
    category: 'Attestation & Epilogue',
    plateNumber: 'Plate X',
    accent: '#632F2F',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'agni',
    name: 'Agni Automation Agent',
    edition: 'Edition I · Autonomous AI Instrument',
    category: 'Autonomous AI',
    purpose: 'Local machine automation system that converts natural language into safe Windows actions using an AI planning model and secure execution agent.',
    feature: 'PowerShell/CMD/VBS script generation with automatic library caching, destructive command blocker, and local Ollama model support.',
    url: 'https://github.com/shiv369tes',
    github: 'https://github.com/shiv369tes',
    image: '/agni-optimized.webp',
    stats: [
      { label: 'Model', value: 'Local Ollama' },
      { label: 'Safety Layer', value: 'AST Verified' },
      { label: 'Execution', value: 'Sub-60ms' },
    ],
    techStack: ['Python', 'Ollama / Local LLM', 'PowerShell', 'Windows CMD / VBS', 'AST Parser', 'FastAPI'],
    problemStatement:
      'Autonomous desktop assistants frequently suffer from hallucinated or unverified shell commands that can inadvertently corrupt system configuration or delete critical user files.',
    solutionDetails: [
      'Built an authenticated API pipeline converting user natural language intent into verified, structured JSON command payloads.',
      'Implemented automatic script generation and reuse through a dedicated C:\\Agni_scripts library for rapid recurring task execution.',
      'Constructed multi-layered safety boundaries to block destructive operations and engineered an autonomous repair-loop using execution error logs.',
      'Enabled full offline privacy and air-gapped capability via local Ollama models with delayed execution and comprehensive system logging.',
    ],
    codeSpecimen: {
      filename: 'agni_safety_agent.py',
      language: 'python',
      code: `class AgniExecutionBoundary:
    BLOCKED_PATTERNS = [r"format\\s+", r"del\\s+/[fqs]", r"rmdir\\s+/s", r"reg\\s+delete"]

    def validate_command(self, payload: CommandPayload) -> bool:
        if any(re.search(p, payload.script_content, re.I) for p in self.BLOCKED_PATTERNS):
            self.logger.alert(f"Destructive operation intercepted: {payload.id}")
            return False
        return self.verify_ast_safety(payload.script_content)`,
    },
  },
  {
    id: 'eventsair',
    name: 'EventsAir Digital Platform',
    edition: 'Edition II · Enterprise Web Instrument',
    category: 'Distributed Web',
    purpose: 'Interactive event websites, responsive mobile web applications, and dynamic attendee registration workflows engineered at ATPI | Direct Travel.',
    feature: 'End-to-end registration logic, cross-device usability, and live Smartsheet-based data synchronization during active global summits.',
    url: 'https://github.com/shiv369tes',
    github: 'https://github.com/shiv369tes',
    image: '/EventsAir.jpg',
    stats: [
      { label: 'Portals', value: '25+ Events' },
      { label: 'Fidelity', value: '100% Cross-Device' },
      { label: 'Data Sync', value: 'Real-time' },
    ],
    techStack: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React.js', 'EventsAir Platform', 'Cvent', 'Smartsheet API'],
    problemStatement:
      'High-profile enterprise event portals require seamless registration journeys capable of handling thousands of concurrent attendees across diverse mobile and desktop devices without data dropouts.',
    solutionDetails: [
      'Engineered interactive and responsive web features using HTML, CSS, and modern JavaScript to maximize registration completion rates.',
      'Collaborated with international event teams to define complex attendee branching logic, custom registration forms, and digital workflows.',
      'Managed end-to-end event setup across EventsAir and Cvent platforms from initial architecture through stress testing, launch, and live operations.',
      'Configured automated Smartsheet-based data pipelines to ensure real-time reporting, credential validation, and client dashboard visibility.',
    ],
    codeSpecimen: {
      filename: 'registration-flow-engine.ts',
      language: 'typescript',
      code: `export async function processAttendeeRegistration(data: AttendeePayload): Promise<RegistrationResult> {
  const validatedForm = await EventSchema.parseAsync(data);
  const portalSession = await EventsAirGateway.initAttendeeSession(validatedForm);
  await SmartsheetSync.pushRecord({
    sheetId: process.env.EVENT_SMARTSHEET_ID!,
    row: { email: validatedForm.email, status: 'CONFIRMED', timestamp: Date.now() }
  });
  return { status: 200, confirmationCode: portalSession.code };
}`,
    },
  },
  {
    id: 'fuzzy-matching',
    name: 'String Mapping Fuzzy Logic',
    edition: 'Edition III · Algorithmic Instrument',
    category: 'Low-Level Tools',
    purpose: 'High-precision fuzzy string matching algorithm developed in Python to reconcile noisy institutional data entries and automate record normalization.',
    feature: 'Automated data normalization saving 10 hours per week and reducing record entry errors by 40%.',
    url: 'https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic',
    github: 'https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic',
    image: '/terminal-optimized.webp',
    stats: [
      { label: 'Error Drop', value: '-40%' },
      { label: 'Time Saved', value: '10 hrs/wk' },
      { label: 'Accuracy', value: '98.5%' },
    ],
    techStack: ['Python', 'Fuzzy Matching Logic', 'Levenshtein Metric', 'Pandas', 'Regex', 'Data Cleansing'],
    problemStatement:
      'Manual reconciliation across disparate legacy data sources creates high error rates, duplicated entries, and tens of human engineering hours wasted weekly on manual cleansing.',
    solutionDetails: [
      'Developed an automated fuzzy token matching pipeline incorporating weighted Levenshtein distance and phonetic similarity scoring.',
      'Reduced data entry inaccuracies by 40% across extensive institutional records and candidate datasets.',
      'Automated recurring batch data normalization routines, saving 10 engineering hours each week.',
      'Packaged the algorithm as a modular Python script library with unit tests and benchmark reports.',
    ],
    codeSpecimen: {
      filename: 'fuzzy_mapping_engine.py',
      language: 'python',
      code: `def match_fuzzy_tokens(source_str: str, candidate_pool: list[str], threshold: float = 0.85) -> str | None:
    best_match, highest_score = None, 0.0
    for candidate in candidate_pool:
        ratio = levenshtein_similarity(source_str.strip().lower(), candidate.strip().lower())
        if ratio > highest_score and ratio >= threshold:
            highest_score = ratio
            best_match = candidate
    return best_match`,
    },
  },
  {
    id: 'sensor-detection',
    name: 'Sensor Detection System',
    edition: 'Edition IV · Low-Level Systems Instrument',
    category: 'Low-Level Tools',
    purpose: 'Real-time sensor data ingestion, algorithmic signal processing, and emergency condition detection system engineered in C and C++.',
    feature: 'Low-overhead real-time stream processing delivering a 95% accurate emergency detection rate under noisy telemetry.',
    url: 'https://github.com/shiv369tes',
    github: 'https://github.com/shiv369tes',
    image: '/Sensor data image.png',
    stats: [
      { label: 'Accuracy', value: '95% Detection' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Footprint', value: '< 6MB' },
    ],
    techStack: ['C', 'C++', 'POSIX / Win32', 'Real-Time Buffers', 'Digital Signal Filtering', 'Algorithm Optimization'],
    problemStatement:
      'Emergency monitoring hardware requires predictable sub-millisecond response loops and zero runtime memory fragmentation to prevent catastrophic missed detections.',
    solutionDetails: [
      'Implemented robust cyclic buffer ingestion routines in C and C++ to eliminate dynamic heap allocations during high-frequency sensor reads.',
      'Optimized detection threshold logic to maintain system stability and achieved a verified 95% emergency detection accuracy rate.',
      'Engineered signal smoothing algorithms to filter out transient hardware noise and false positive electrical spikes.',
      'Validated memory safety and runtime performance across continuous multi-hour stress simulations.',
    ],
    codeSpecimen: {
      filename: 'sensor_processor.cpp',
      language: 'cpp',
      code: `bool SensorBuffer::EvaluateEmergencyCondition(const float* signalWindow, size_t windowSize) {
    float movingAverage = 0.0f;
    for (size_t i = 0; i < windowSize; ++i) {
        movingAverage += signalWindow[i];
    }
    movingAverage /= static_cast<float>(windowSize);
    return (movingAverage > EMERGENCY_THRESHOLD_DELTA) && (signalWindow[windowSize - 1] > CRITICAL_SPIKE_LIMIT);
}`,
    },
  },
  {
    id: 'save-paws',
    name: 'Save Paws Adoption Platform',
    edition: 'Edition V · Community Web Platform',
    category: 'Distributed Web',
    purpose: 'Responsive web platform created to support animal rescue centers, streamline pet adoption matching, and educate the public on animal welfare.',
    feature: 'Interactive pet catalog, digital adoption questionnaires, and responsive community educational modules on responsible pet ownership.',
    url: 'https://github.com/shiv369tes/SavePaws',
    github: 'https://github.com/shiv369tes/SavePaws',
    image: '/Save paws.jpg',
    stats: [
      { label: 'Mission', value: 'Animal Welfare' },
      { label: 'UI', value: '100% Mobile Ready' },
      { label: 'Inquiries', value: 'Direct Dispatch' },
    ],
    techStack: ['HTML5 / CSS3', 'JavaScript', 'React.js', 'Next.js', 'Responsive UI', 'REST APIs'],
    problemStatement:
      'Local animal rescue centers often struggle to find adoptive families because prospective pet owners lack easy-to-use digital tools to discover rescue animals.',
    solutionDetails: [
      'Built a responsive, accessible frontend catalog showcasing rescue animals with photos, medical histories, and temperament tags.',
      'Engineered interactive inquiry and adoption forms to streamline shelter vetting and communication with prospective adopters.',
      'Published public awareness modules explaining the ethical benefits of adoption over commercial pet purchase.',
      'Applied SEO best practices to maximize search visibility and organic reach for rescue drives across the Mumbai metropolitan area.',
    ],
    codeSpecimen: {
      filename: 'PetAdoptionRegistry.tsx',
      language: 'typescript',
      code: `export function filterRescueProfiles(pets: PetProfile[], filter: FilterCriteria): PetProfile[] {
  return pets.filter((pet) => {
    const matchesSpecies = filter.species === 'all' || pet.species === filter.species;
    const matchesVaccinated = !filter.requireVaccinated || pet.isVaccinated;
    const matchesStatus = pet.adoptionStatus === 'AVAILABLE';
    return matchesSpecies && matchesVaccinated && matchesStatus;
  });
}`,
    },
  },
];

export const SKILL_SPECIMENS: SkillItem[] = [
  {
    name: 'React.js & Next.js',
    level: '96% Proficiency',
    category: 'Backend & Concurrency',
    experience: '3+ Years',
    specimenNote: 'Component lifecycles, server and client state management, responsive UI design.',
  },
  {
    name: 'HTML5, CSS3 & Responsive UI',
    level: '98% Proficiency',
    category: 'Languages & Protocols',
    experience: '4+ Years',
    specimenNote: 'Cross-browser compatibility, modern CSS layout engines, responsive mobile views.',
  },
  {
    name: 'JavaScript (ES6+) & TypeScript',
    level: '95% Proficiency',
    category: 'Languages & Protocols',
    experience: '4+ Years',
    specimenNote: 'Modern async/await workflows, DOM interaction, strict types, and robust modules.',
  },
  {
    name: 'Python Systems & AI Scripts',
    level: '92% Proficiency',
    category: 'Languages & Protocols',
    experience: '3+ Years',
    specimenNote: 'Fuzzy logic algorithms, data processing pipelines, and local AI agent integrations.',
  },
  {
    name: 'Local LLMs & Ollama Agents',
    level: '90% Proficiency',
    category: 'Backend & Concurrency',
    experience: '2+ Years',
    specimenNote: 'AI planning models, structured JSON command generation, and sandboxed OS execution.',
  },
  {
    name: 'C & C++ Systems Programming',
    level: '86% Proficiency',
    category: 'Languages & Protocols',
    experience: '2+ Years',
    specimenNote: 'Real-time sensor data processing, memory management, and detection algorithms.',
  },
  {
    name: 'EventsAir & Event Technology',
    level: '94% Proficiency',
    category: 'Infrastructure & Cloud',
    experience: '2+ Years',
    specimenNote: 'Enterprise event websites, registration logic, and mobile attendee portal deployment.',
  },
  {
    name: 'REST APIs & Web Services',
    level: '92% Proficiency',
    category: 'Backend & Concurrency',
    experience: '3+ Years',
    specimenNote: 'API contract design, async integrations, JSON schemas, and webhook handlers.',
  },
  {
    name: 'Smartsheet Automated Workflows',
    level: '90% Proficiency',
    category: 'Databases & Storage',
    experience: '2+ Years',
    specimenNote: 'Automated data collection, digital event processes, and live spreadsheet syncing.',
  },
  {
    name: 'SEO & Search Discoverability',
    level: '94% Proficiency',
    category: 'Infrastructure & Cloud',
    experience: '3+ Years',
    specimenNote: 'Semantic markup, search engine performance, metadata tuning, and fast indexing.',
  },
  {
    name: 'Deep Learning (NLP & Vision)',
    level: '86% Proficiency',
    category: 'Databases & Storage',
    experience: '2+ Years',
    specimenNote: 'M.Sc. research in neural networks, natural language processing, and image recognition.',
  },
  {
    name: 'Web Security & Bug Hunting',
    level: '84% Proficiency',
    category: 'Infrastructure & Cloud',
    experience: '2+ Years',
    specimenNote: 'Vulnerability testing across application layers, input sanitization, and ethical hacking.',
  },
];

export const CAREER_CHRONOLOGY: CareerEntry[] = [
  {
    company: 'ATPI | Direct Travel',
    role: 'Executive Digital Services (Events Development)',
    period: 'Apr 2025 — Present',
    location: 'Mumbai, India',
    classification: 'Corporate Enterprise',
    description:
      'Developed and maintained event websites, mobile web applications, and registration journeys using EventsAir, Cvent, and custom web frontends with Smartsheet workflow automation.',
    deliverables: [
      'Engineered interactive, responsive web features using HTML, CSS, and JavaScript for high-attendance global events.',
      'Collaborated with cross-border event stakeholders to define registration architectures, business logic, and security workflows.',
      'Managed digital event setups end-to-end from configuration and frontend development through QA, launch, and live event support.',
      'Integrated and configured Smartsheet-based workflows to power real-time attendee data management and reporting.',
    ],
    techUsed: ['HTML5', 'CSS3', 'JavaScript', 'EventsAir', 'Cvent', 'Smartsheet', 'Cross-Device UI'],
  },
  {
    company: 'Sankalp Developers Pvt. Ltd',
    role: 'Junior Developer',
    period: 'Feb 2019 — Mar 2020',
    location: 'Mumbai, India',
    classification: 'Frontend & Web Development',
    description:
      'Developed lead generation and portfolio web applications from scratch, implemented SEO strategies, and crafted user-friendly responsive frontend interfaces.',
    deliverables: [
      'Built fast, cross-device compatible landing pages and web portals using clean HTML, CSS, and modern JavaScript.',
      'Implemented on-page SEO best practices to improve website indexing, search rankings, and organic inbound discoverability.',
      'Optimized frontend asset delivery, DOM structure, and mobile usability across multiple client projects.',
    ],
    techUsed: ['HTML5', 'CSS3', 'JavaScript', 'SEO Optimization', 'Responsive Design', 'UI/UX'],
  },
  {
    company: 'Save Paws & Social Welfare Initiatives',
    role: 'Head Member & Community Volunteer',
    period: '2016 — Present',
    location: 'Mumbai, India',
    classification: 'Community Leadership',
    description:
      'Spearheaded environmental awareness campaigns and volunteered extensively with animal rescue centers to champion animal welfare, adoption drives, and public education.',
    deliverables: [
      'Served as Head Member (2016–2017) collaborating with local influencers to promote environmental responsibility.',
      'Volunteered with animal shelters through Save Paws, driving adoption initiatives as an ethical alternative to purchasing pets.',
      'Engineered the Save Paws open-source web platform to connect rescue shelters with prospective pet parents.',
    ],
    techUsed: ['Community Leadership', 'Web Outreach', 'Advocacy', 'Save Paws Platform', 'Public Relations'],
  },
];

export const ACADEMIC_HONORS: AcademicHonor[] = [
  {
    id: 1,
    title: 'Master of Science (Information Technology)',
    organization: 'Jeevandeep Shaikshanik Sanstha Poi’s',
    description: 'Specialized thesis research in Deep Learning, Natural Language Processing (NLP), and Image Recognition with neural network optimization.',
    date: 'Aug 2022 — 2024',
    badge: 'M.Sc. IT Degree',
  },
  {
    id: 2,
    title: 'Bachelor of Science (Information Technology)',
    organization: 'Jeevandeep Shaikshanik Sanstha',
    description: 'Developed a Python fuzzy matching algorithm reducing data entry errors by 40% and saving 10 hours per week of manual cleanup.',
    date: 'Aug 2019 — Jan 2022',
    verified: true,
    link: 'https://github.com/shiv369tes/-String-Mapping-using-python-Fuzzy-Logic',
    linkText: 'Inspect Fuzzy Logic Project',
    badge: 'B.Sc. IT Degree',
  },
  {
    id: 3,
    title: 'Ethical Hacking Workshop & Bug Hunting',
    organization: 'Piston InfoSolution',
    description: 'Participated in bug hunting platforms to identify and report web vulnerabilities, performing comprehensive security audits across web components.',
    date: 'Sept 2018',
    verified: true,
    badge: 'Security Credential',
  },
];
