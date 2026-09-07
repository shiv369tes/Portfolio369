import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, Caveat, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Shivam Kedare — Author's Monograph & Engineering Ledger",
  description:
    "Shivam Kedare is a Web Developer & Software Systems Engineer specializing in responsive web development, enterprise event platforms, local AI automation, and algorithmic data systems.",
  generator: "Next.js",
  keywords: [
    "Shivam Kedare",
    "Web Developer",
    "Frontend Developer",
    "Software Engineer",
    "React.js",
    "Next.js",
    "EventsAir",
    "Cvent",
    "Smartsheet Workflows",
    "Python",
    "AI Automation",
    "C++ Systems",
    "Deep Learning",
    "NLP",
    "Fuzzy Logic",
    "SEO Optimization",
    "Engineering Monograph",
  ],
  authors: [{ name: "Shivam Kedare", url: "https://github.com/shiv369tes" }],
  creator: "Shivam Kedare",
  publisher: "Shivam Kedare",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shivam Kedare — Engineering Monograph",
    title: "Shivam Kedare — Web Developer & Software Systems Engineer",
    description:
      "The digital monograph of Shivam Kedare: exploring responsive web experiences, enterprise event platforms, local AI agents, and algorithmic optimization.",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Shivam Kedare — Web Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Kedare — Web Developer & Software Engineer",
    description:
      "Web Developer & Software Systems Engineer specializing in responsive web development, event technology platforms, and local AI automation.",
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#FAF6F1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shivam Kedare",
              url: "https://github.com/shiv369tes",
              jobTitle: "Web Developer & Software Systems Engineer",
              description:
                "Web Developer with experience in responsive websites, digital event platforms, local AI automation, and clean maintainable code.",
              email: "shivamkedare7171@gmail.com",
              telephone: "+919623777548",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressCountry: "India",
              },
              sameAs: [
                "https://github.com/shiv369tes",
                "https://linkedin.com/in/shivamkedare369t",
              ],
              knowsAbout: [
                "Web Development",
                "Frontend Engineering",
                "React.js",
                "Next.js",
                "HTML5 & CSS3",
                "JavaScript (ES6+)",
                "EventsAir",
                "Cvent",
                "Smartsheet Workflows",
                "Python",
                "Local AI Automation (Ollama)",
                "C / C++ Systems",
                "Deep Learning & NLP",
                "SEO Optimization",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-cream-100 text-charcoal-900 font-sans antialiased selection:bg-terracotta-200 selection:text-charcoal-950 min-h-screen relative">
        {/* Paper Grain Noise Overlay */}
        <div className="grain-layer" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
