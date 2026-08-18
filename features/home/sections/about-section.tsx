"use client";

import { MapPin, Envelope } from "@phosphor-icons/react";
import { SectionHeading } from "@/features/home/components/section-heading";
import { Reveal } from "@/features/home/components/reveal";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading cmd="whoami" title="Developer & biologist, building in the open." />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="space-y-4 font-mono text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a self-taught developer on a long-term mission to deeply understand
                programming, design, and learning. I study molecular biology by day and build
                software at night.
              </p>
              <p>
                Here you&apos;ll find working code, honest writing, and handcrafted tools — all
                open, all evolving. This isn&apos;t a finished product. It&apos;s a living thing.
              </p>
            </div>

            <dl className="lg:pt-2">
              <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-t border-border py-4 font-mono text-sm">
                <dt className="text-muted-foreground">location</dt>
                <dd className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Tehran, IR
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-t border-border py-4 font-mono text-sm">
                <dt className="text-muted-foreground">email</dt>
                <dd>
                  <a
                    href="mailto:parhamfdev@proton.me"
                    className="flex items-center gap-2 break-all transition-colors hover:text-primary"
                  >
                    <Envelope className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    parhamfdev@proton.me
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-t border-border py-4 font-mono text-sm">
                <dt className="text-muted-foreground">status</dt>
                <dd className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  open to work
                </dd>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-y border-border py-4 font-mono text-sm">
                <dt className="text-muted-foreground">focus</dt>
                <dd className="text-muted-foreground">AI · web security · open source</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}