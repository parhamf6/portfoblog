"use client";
import { motion } from "motion/react";
import { TechStack } from "./components/stack-btn";
import { ContactCard } from "./components/contact-card";
import { AboutCard, GitHubCard } from "./components/about-github-cards";
// import { motion } from "framer-motion";
// import { TechStack } from "./components/bolt/tech-stack";
import { ContactSection } from "./components/bolt/contact-section";
// import { AboutSection } from "./components/bolt/about-section";
// import { GitHubSection } from "./components/bolt/github-section";
import { AnimatedBeamDemo } from "../../components/bream";
export default function BentoSection() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Portfolio
          </h1>
          <p className="text-muted-foreground">
            Crafting digital experiences with modern technologies
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] lg:h-[500px]">
          {/* Tech Stack - Takes 2 columns on larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full"
          >
            <TechStack />
            {/* <AnimatedBeamDemo /> */}
          </motion.div>

          {/* Contact Card - Single column, full height */}
          <div className="h-full">
            {/* <ContactCard /> */}
            <ContactSection />
          </div>
        </div>

        {/* Bottom row for About and GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <AboutCard />
          <GitHubCard />
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import { TechStack } from "./components/bolt/tech-stack";
// import { ContactSection } from "./components/bolt/contact-section";
// import { AboutSection } from "./components/bolt/about-section";
// import { GitHubSection } from "./components/bolt/github-section";
// export default function BentoSection() {
//   return (
//     <main className="min-h-screen bg-background p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           className="mb-12 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
//             Developer
//             <span className="text-primary ml-2">Portfolio</span>
//           </h1>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Building exceptional digital experiences with modern technologies
//           </p>
//         </motion.div>

//         {/* Bento Grid */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           {/* Tech Stack - Large card */}
//           <div className="md:col-span-6 md:row-span-2">
//             <TechStack />
//           </div>
          
//           {/* Contact with Globe - Large card */}
//           <div className="md:col-span-6 md:row-span-2">
//             <ContactSection />
//           </div>
          
//           {/* About - Medium card */}
//           <div className="md:col-span-6">
//             <AboutSection />
//           </div>
          
//           {/* GitHub - Medium card */}
//           <div className="md:col-span-6">
//             <GitHubSection />
//           </div>
//         </motion.div>

//         {/* Footer */}
//         <motion.footer 
//           className="mt-16 text-center text-sm text-muted-foreground"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 1 }}
//         >
//           <p>© 2025 Your Name. Built with Next.js & Tailwind CSS</p>
//         </motion.footer>
//       </div>
//     </main>
//   );
// }