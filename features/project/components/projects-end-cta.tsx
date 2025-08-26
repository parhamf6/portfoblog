import Link from "next/link";

export default function ProjectPageCta() {
    return(
        <div className="container mx-auto px-6 py-16">
            <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Interested in working together?</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    I'm always open to discussing new opportunities and interesting projects. 
                    Let's create something amazing together.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/contact">
                        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200">
                            Get In Touch
                        </button>
                    </Link>

                    <Link href="/projects">
                        <button className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-muted/50 transition-all duration-200">
                            View More Projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}