import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const NARRATIVE_BEATS = [
  { start: 0.00, end: 0.12, eyebrow: 'ARCHIVAL EDITION · 2026', headline: 'Shivam\nKedare.', sub: 'Web developer & software systems engineer.' },
  { start: 0.12, end: 0.25, eyebrow: 'THE AUTHOR', headline: 'I build\ndigital worlds.', sub: 'Responsive interfaces, event technology and interactive web experiences.' },
  { start: 0.25, end: 0.39, eyebrow: 'THE SYSTEM', headline: 'Code becomes\nexperience.', sub: 'React · Next.js · JavaScript · TypeScript · Node.js · Three.js' },
  { start: 0.39, end: 0.53, eyebrow: 'THE WORK', headline: 'Enterprise\nmeets craft.', sub: 'Digital event platforms, registration journeys and high-performance frontends.' },
  { start: 0.53, end: 0.67, eyebrow: 'THE EXPERIMENTS', headline: 'AI. Logic.\nAutomation.', sub: 'Local AI agents, fuzzy matching, sensor processing and creative engineering.' },
  { start: 0.67, end: 0.80, eyebrow: 'SELECTED SYSTEMS', headline: 'Five projects.\nOne mindset.', sub: 'Explore the engineering ledger below.' },
  { start: 0.80, end: 0.92, eyebrow: 'THE NEXT CHAPTER', headline: 'What will\nwe build?', sub: 'Open to meaningful digital products, web experiences and collaborations.' },
  { start: 0.92, end: 1.00, eyebrow: null, headline: 'SYSTEM\nREADY.', sub: null },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const beatsRef = useRef([])
  const progressRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let trigger
    let initialized = false

    const init = () => {
      if (initialized || !video.duration) return
      initialized = true
      const duration = video.duration

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 7}`,
        pin: true,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: self => {
          video.currentTime = self.progress * duration
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`

          beatsRef.current.forEach((el, i) => {
            if (!el) return
            const beat = NARRATIVE_BEATS[i]
            const p = self.progress
            const fade = 0.035
            let opacity = 0
            let y = 22
            if (p >= beat.start && p <= beat.end) {
              const local = (p - beat.start) / (beat.end - beat.start)
              if (local < fade) {
                opacity = local / fade
                y = 22 * (1 - opacity)
              } else if (local > 1 - fade) {
                opacity = (1 - local) / fade
                y = 0
              } else {
                opacity = 1
                y = 0
              }
            }
            el.style.opacity = opacity
            el.style.transform = `translate3d(0, ${y}px, 0)`
          })
        },
      })
      ScrollTrigger.refresh()
    }

    video.addEventListener('loadedmetadata', init)
    if (video.readyState >= 1) init()

    return () => {
      video.removeEventListener('loadedmetadata', init)
      trigger?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="dn-hero">
      <video ref={videoRef} className="dn-video" src="/video/one.mp4" muted playsInline preload="auto" />
      <div className="dn-video-overlay" />
      <div className="dn-vignette" />
      <div className="dn-grain" />
      <div className="dn-top-fade" />
      <div className="dn-bottom-fade" />

      <div className="dn-ritual" aria-hidden="true">
        <span className="ritual-circle ritual-circle-1" />
        <span className="ritual-circle ritual-circle-2" />
        <span className="ritual-line ritual-line-a" />
        <span className="ritual-line ritual-line-b" />
        <span className="ritual-core" />
      </div>

      <nav className="dn-nav">
        <a className="dn-logo" href="#about">Shivam<span>.OS</span></a>
        <div className="dn-nav-meta">VOL. I · OPUS Nº 2026</div>
        <div className="dn-nav-links">
          <a href="#about">About</a>
          <a href="#systems">Systems</a>
          <a href="#chronology">Chronology</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="dn-corner dn-corner--tl" />
      <div className="dn-corner dn-corner--tr" />
      <div className="dn-corner dn-corner--bl" />
      <div className="dn-corner dn-corner--br" />

      <div className="dn-beats">
        {NARRATIVE_BEATS.map((beat, i) => (
          <div key={i} className="dn-beat" ref={el => (beatsRef.current[i] = el)}>
            {beat.eyebrow && <span className="dn-beat-eyebrow">{beat.eyebrow}</span>}
            <h1 className="dn-beat-headline">{beat.headline}</h1>
            {beat.sub && <p className="dn-beat-sub">{beat.sub}</p>}
          </div>
        ))}
      </div>

      <div className="dn-side-label">WEB · SYSTEMS · AUTOMATION · EXPERIENCE</div>
      <div className="dn-scroll-cue"><span>SCROLL TO ENTER</span><i /></div>
      <div className="dn-progress"><div ref={progressRef} className="dn-progress-fill" /></div>
    </section>
  )
}
