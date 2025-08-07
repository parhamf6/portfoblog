import BentoSection from "./sections/bento-section/bento";
import BlogSection from "./sections/blog-section/blog";
import HeroSection from "./sections/hero-section/hero";
import ProjectSEction from "./sections/projects-section/project";
export default function HomePage() {
    return(
        <main>
            <HeroSection/>
            <ProjectSEction />
            <BentoSection/>
            <BlogSection />
        </main>
    )
}