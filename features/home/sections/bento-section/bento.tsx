"use client";
import { motion } from "motion/react";
import { TechStack } from "./components/stack-btn";
import { ContactCard } from "./components/contact-card";
import { AboutCard, GitHubCard } from "./components/about-github-cards";
import { ContactSection } from "./components/bolt/contact-section";
import { AnimatedBeamDemo } from "../../components/bream";

export default function BentoSection() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Tech Stack - Takes 2 columns on larger screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            id="techstack"
            className="lg:col-span-2 pb-16 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 min-h-[300px]"
          >
            <TechStack />
          </motion.div>
          
          {/* Contact Card - Single column */}
          <div className="min-h-[300px]">
            <ContactSection />
          </div>
        </div>
        
        {/* Bottom row for About and GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutCard />
          <GitHubCard />
        </div>
      </div>
    </div>
  );
}


// export default function BentoSection() {
//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       <div className="mx-auto ">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-12 text-center"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
//             Portfolio
//           </h1>
//           <p className="text-muted-foreground">
//             Crafting digital experiences with modern technologies
//           </p>
//         </motion.div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] lg:h-[500px]">
//           {/* Tech Stack - Takes 2 columns on larger screens */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             id="techstack"
//             className="lg:col-span-2 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full"
//           >
//             <TechStack />
//             {/* <AnimatedBeamDemo /> */}
//           </motion.div>

//           {/* Contact Card - Single column, full height */}
          
//           <div className="h-full">
//             <ContactSection />
//           </div>
//         </div>

//         {/* Bottom row for About and GitHub */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           <AboutCard />
//           <GitHubCard />
//         </div>
//       </div>
//     </div>
//   );
// }
