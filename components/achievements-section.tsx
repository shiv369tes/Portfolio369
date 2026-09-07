'use client'

import { motion, type Variants } from "framer-motion"
import { Award, GraduationCap, Trophy, Calendar, ExternalLink } from "lucide-react"

type Highlight = {
  id: number
  title: string
  organization: string
  description: string
  icon: React.ElementType
  link?: string
  linkText?: string
  date?: string
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Data Science Training Certificate",
    organization: "Internshala Trainings",
    description: "Completed Data Science Training with hands-on projects.",
    icon: Award,
    link: "https://trainings.internshala.com/verify-certificate/?certificate_number=263gl7b3rur",
    linkText: "View Certificate",
    date: "2024",
  },
  {
    id: 2,
    title: "Assistant Professor (Volunteer)",
    organization: "Bhimrao Pradhan College, Mumbai University",
    description: "Taught B.Sc. IT students and delivered core subjects.",
    icon: GraduationCap,
    date: "June 2024 – August 2024",
  },
  {
    id: 3,
    title: "First Rank – B.Sc. IT",
    organization: "Sonubhau Baswant College, Mumbai University",
    description: "Secured the First Rank in B.Sc. IT academically.",
    icon: Trophy,
    date: "April 2024",
  },
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function HighlightsSection() {
  return (
    <section id="highlights" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Highlights</h2>
        <p className="text-center text-muted-foreground mb-12">Achievements & Recognition</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((highlight) => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ highlight }: { highlight: Highlight }) {
  const Icon = highlight.icon

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group bg-card border border-border rounded-2xl p-6 flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        {highlight.date && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{highlight.date}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">{highlight.title}</h3>
        <p className="text-sm font-medium text-primary mb-2">{highlight.organization}</p>
        <p className="text-sm text-muted-foreground mb-4">{highlight.description}</p>
      </div>

      {highlight.link && (
        <motion.a
          href={highlight.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary w-fit hover:text-primary/80"
        >
          {highlight.linkText}
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      )}
    </motion.div>
  )
}
