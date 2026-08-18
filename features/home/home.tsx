"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import HomeBackground from "./components/home-background";
import HeroSection from "./sections/hero-section/hero";
import AboutSection from "./sections/about-section";
import StackSection from "./sections/stack-section";
import ProjectSection from "./sections/projects-section/project";
import BlogSection from "./sections/blog-section/blog";
import JourneySection from "./sections/journey-section";

export default function HomePage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative">
          <HomeBackground />
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <StackSection />
            <ProjectSection />
            <BlogSection />
            <JourneySection />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}