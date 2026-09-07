"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Database,
  Server,
  Cloud,
  Code,
  GitBranch,
  Terminal,
  Box,
  Layers,
  Lock,
  Cpu,
  HardDrive,
  Network,
} from "lucide-react"

const skillCategories = [
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Code },
      { name: "REST APIs", icon: Network },
      { name: "GraphQL", icon: Layers },
      { name: "WebSockets", icon: Cpu },
      { name: "Python", icon: Terminal },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: HardDrive },
      { name: "Redis", icon: Box },
      { name: "Supabase", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "Prisma", icon: Layers },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Docker", icon: Box },
      { name: "Git", icon: GitBranch },
      { name: "AWS", icon: Cloud },
      { name: "Vercel", icon: Cloud },
      { name: "Linux", icon: Terminal },
      { name: "Auth/Security", icon: Lock },
    ],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Technical Skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Technologies I Work With</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-border">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <skill.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
