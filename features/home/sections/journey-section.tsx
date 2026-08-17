"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/features/home/components/section-heading";

const education = [
  {
    title: "Bachelor of Molecular Biology",
    place: "University of Sciences",
    period: "2024 — present",
  },
  {
    title: "Development skills",
    place: "University of books & the internet",
    period: "2020 — present",
  },
];

const career = [
  {
    title: "Full-Stack Developer",
    place: "Freelance",
    period: "2022 — present",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading cmd="history" title="The path so far." />

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {[
              { label: "education", items: education },
              { label: "career", items: career },
            ].map((group) => (
              <div key={group.label}>
                <p className="border-b border-border pb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <ul className="divide-y divide-border">
                  {group.items.map((item) => (
                    <li key={item.title} className="py-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-lg font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm text-muted-foreground">{item.place}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}