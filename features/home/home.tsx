import BentoSection from "./sections/bento-section/bento";
import BlogSection from "./sections/blog-section/blog";
import HeroSection from "./sections/hero-section/hero";
import ProjectSection from "./sections/projects-section/project";
import TimelineSectin from "./sections/timeline-section/timeline";
export default function HomePage() {
    return(
        <main>
            <HeroSection/>
            <ProjectSection />
            <BentoSection/>
            <BlogSection />
            <TimelineSectin />
        </main>
    )
}