"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Server, Shield, Zap } from "lucide-react"

const highlights = [
  {
    icon: Server,
    title: "Scalable Architecture",
    description: "Designing systems that grow with your business needs",
  },
  {
    icon: Zap,
    title: "Real-time APIs",
    description: "Building low-latency endpoints for instant data delivery",
  },
  {
    icon: Shield,
    title: "Secure Systems",
    description: "Implementing robust authentication and data protection",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
              Passionate about building reliable backend systems
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I&apos;m a Backend Engineer specializing in building scalable, high-performance systems. My expertise lies
              in designing APIs that handle real-time data efficiently while maintaining security and reliability.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With experience in Node.js, database optimization, and cloud infrastructure, I focus on creating solutions
              that are not just functional but also maintainable and secure. I believe in writing clean code that solves
              real problems.
            </p>
            <Button asChild>
              <a href="#contact" className="gap-2">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted">
              <img
                src="/name.svg?height=500&width=500"
                alt="Shivam Kedare - Web Developer &amp; Software Systems Engineer"
                className="object-cover w-full h-full max-w-md mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Backend Focus</p>
                  <p className="text-xs text-muted-foreground">APIs & Systems</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
