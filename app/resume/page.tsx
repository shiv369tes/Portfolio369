import type { Metadata } from "next";
import { ResumeView } from "@/components/resume/ResumeView";

export const metadata: Metadata = {
  title: "Resume & CV — Shivam Kedare | Web Developer",
  description:
    "Official resume of Shivam Kedare, Web Developer specializing in responsive websites, digital experiences (EventsAir, Cvent), local AI automation systems (Agni), and C/C++ data processing algorithms.",
  keywords: [
    "Shivam Kedare Resume",
    "Shivam Kedare CV",
    "Web Developer Resume",
    "EventsAir Developer Mumbai",
    "Next.js Developer CV",
    "React.js Developer",
    "Frontend Engineer",
    "Agni AI Automation",
  ],
  authors: [{ name: "Shivam Kedare", url: "https://shivamkedare.in" }],
  creator: "Shivam Kedare",
  publisher: "Shivam Kedare",
  metadataBase: new URL("https://shivamkedare.in"),
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://shivamkedare.in/resume",
    siteName: "Shivam Kedare — Web Developer Resume",
    title: "Shivam Kedare — Resume / Curriculum Vitae",
    description:
      "Web Developer specializing in responsive web experiences, digital event technologies (EventsAir, Cvent), and local AI automation systems.",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Shivam Kedare — Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Kedare — Resume / CV",
    description:
      "Web Developer focused on responsive web experiences, enterprise event platforms, and local AI automation.",
    images: ["/icon.svg"],
  },
};

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shivam Kedare",
    url: "https://shivamkedare.in/resume",
    jobTitle: "Web Developer / Software Systems Engineer",
    worksFor: {
      "@type": "Organization",
      name: "ATPI | Direct Travel",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Jeevandeep Shaikshanik Sanstha",
    },
    knowsAbout: [
      "Web Development",
      "React.js & Next.js",
      "EventsAir & Cvent",
      "Local AI Automation (Agni)",
      "C & C++ Algorithms",
      "Python Systems",
      "UI/UX Implementation",
      "SEO Best Practices",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeView />
    </>
  );
}
