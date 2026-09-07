"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, ChevronRight } from "lucide-react"

const experiences = [
  {
    company: "CIARL",
    role: "Software Developer",
    description:
      "NDA-bound work focused on secure backend development. Built Node.js backend systems, internal dashboards, RBAC APIs, and hardware integration modules.",
    highlights: [
      "Secure Node.js backend architecture",
      "Role-based access control APIs",
      "Hardware integration systems",
    ],
  },
  {
    company: "Sumeru Technology Solutions",
    role: "SDE Intern",
    description:
      "Worked on performance optimization and API development. Improved cron-to-queue systems, developed RESTful APIs, and researched Supabase RLS implementation.",
    highlights: ["Performance optimization", "Cron-to-queue migration", "Supabase RLS research"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Career</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Work Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:flex absolute top-6 w-4 h-4 rounded-full bg-primary ${
                    index % 2 === 0 ? "-right-2" : "-left-2"
                  }`}
                />

                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
