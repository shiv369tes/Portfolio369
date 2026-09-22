import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PortfolioSections.css'

gsap.registerPlugin(ScrollTrigger)

const projects=[
 {n:'I',type:'AUTONOMOUS AI',title:'Agni Automation Agent',desc:'A local machine automation system that converts natural language into safe Windows actions using an AI planning model and secure execution agent.',tags:'Python · Ollama · PowerShell · Windows',link:'https://github.com/'},
 {n:'II',type:'ENTERPRISE WEB',title:'EventsAir Digital Platform',desc:'Interactive event websites, responsive mobile experiences and dynamic attendee registration workflows engineered for global events.',tags:'HTML · CSS · JavaScript · React · EventsAir'},
 {n:'III',type:'ALGORITHMIC SYSTEM',title:'String Mapping Fuzzy Logic',desc:'A high-precision fuzzy string matching system for noisy institutional data, record normalization and automated cleanup.',tags:'Python · Pandas · Levenshtein',link:'https://github.com/'},
 {n:'IV',type:'LOW-LEVEL SYSTEMS',title:'Sensor Detection System',desc:'Real-time sensor ingestion, signal processing and emergency condition detection engineered in C and C++.',tags:'C · C++ · POSIX · Real-Time Buffers'},
 {n:'V',type:'COMMUNITY WEB',title:'Save Paws Platform',desc:'A responsive platform supporting animal rescue centres, pet adoption matching and public education.',tags:'HTML · CSS · JavaScript · React · Next.js',link:'https://github.com/'},
]

const stack=['React.js','Next.js','JavaScript','TypeScript','Node.js','Three.js','GSAP','Python','C / C++','MongoDB','MySQL','EventsAir','Cvent','Smartsheet','REST APIs','Responsive UI']

function Reveal({children,className=''}){
 const ref=useRef(null)
 useEffect(()=>{const ctx=gsap.context(()=>{gsap.fromTo(ref.current,{opacity:0,y:45},{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 82%'}})},ref);return()=>ctx.revert()},[])
 return <div ref={ref} className={className}>{children}</div>
}

export default function PortfolioSections(){
 return <div className="ledger">
   <section id="about" className="ledger-section about-section">
    <Reveal className="section-copy"><span className="section-kicker">PLATE II · THE AUTHOR</span><h2>The engineer<br/><em>behind the interface.</em></h2><p>Shivam Kedare is a web developer and software systems engineer focused on responsive web development, enterprise event technology, local AI automation and high-performance digital experiences.</p><p>From event registration journeys to experimental automation agents, the goal is simple: make complex systems feel intuitive.</p></Reveal>
    <div className="section-index">02<br/><span>ABOUT</span></div>
   </section>

   <section id="systems" className="ledger-section manifesto-section">
    <Reveal className="manifesto"><span className="section-kicker">PLATE III · DOCTRINE</span><h2>Clean interfaces.<br/>Resilient systems.<br/><em>Human outcomes.</em></h2><div className="rule-line"/><p>Modern digital solutions reach their highest potential when visual clarity meets robust engineering.</p></Reveal>
   </section>

   <section className="ledger-section stack-section">
    <Reveal className="wide-copy"><span className="section-kicker">PLATE IV · TECHNICAL TAXONOMY</span><h2>THE<br/><em>STACK.</em></h2><div className="stack-grid">{stack.map((item,i)=><div className="stack-item" key={item}><span>{String(i+1).padStart(2,'0')}</span><strong>{item}</strong></div>)}</div></Reveal>
   </section>

   <section id="projects" className="ledger-section projects-section">
    <div className="projects-head"><span className="section-kicker">PLATES V–IX · BLUEPRINT ARCHIVE</span><h2>SELECTED<br/><em>SYSTEMS.</em></h2></div>
    <div className="projects-list">{projects.map(p=><Reveal key={p.n} className="project-card"><div className="project-num">{p.n}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.desc}</p><small>{p.tags}</small>{p.link&&<a href={p.link} target="_blank" rel="noreferrer">INSPECT BLUEPRINT ↗</a>}</div></Reveal>)}</div>
   </section>

   <section id="chronology" className="ledger-section chronology-section">
    <Reveal className="chronology-inner"><span className="section-kicker">PLATE X · CHRONOLOGY</span><h2>ENGINEERING<br/><em>DISPATCHES.</em></h2><div className="timeline">
      <article><time>APR 2025 — PRESENT</time><h3>ATPI | Direct Travel</h3><p>Executive Digital Services · Events Development</p><span>EventsAir · Cvent · JavaScript · Smartsheet · Responsive UI</span></article>
      <article><time>FEB 2019 — MAR 2020</time><h3>Sankalp Developers Pvt. Ltd</h3><p>Junior Developer · Frontend & Web Development</p><span>HTML · CSS · JavaScript · SEO · Responsive Design</span></article>
      <article><time>2016 — PRESENT</time><h3>Save Paws & Social Initiatives</h3><p>Community leadership, animal welfare and open-source web work.</p><span>Web Outreach · Advocacy · Save Paws Platform</span></article>
    </div></Reveal>
   </section>

   <section id="contact" className="ledger-section contact-section">
    <Reveal className="contact-inner"><span className="section-kicker">COLOPHON · DIRECT CORRESPONDENCE</span><h2>WHAT ARE WE<br/><em>BUILDING NEXT?</em></h2><p>Available for web development, digital event engineering, responsive frontend consulting and local AI automation systems.</p><div className="contact-actions"><a href="mailto:shivamkedare7171@gmail.com">EMAIL ↗</a><a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/shiv__369_/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div><div className="contact-footer"><span>SHIVAM.OS // 2026</span><span>MUMBAI · INDIA</span></div></Reveal></section>
 </div>
}
