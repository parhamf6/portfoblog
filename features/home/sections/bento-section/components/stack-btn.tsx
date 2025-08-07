"use client";
import { motion } from "motion/react";
import { 
  SiPython, 
  SiTypescript, 
  SiDocker, 
  SiDjango, 
  SiFastapi, 
  SiTailwindcss, 
  SiReact, 
  SiNextdotjs 
} from "react-icons/si";

const technologies = [
  { name: "Python", icon: SiPython, color: '#FFD43B' },
  { name: "TypeScript", icon: SiTypescript, color: '#3178C6' },
  { name: "Docker", icon: SiDocker, color: '#2496ED' },
  { name: "Django", icon: SiDjango, color: "#23bd09" },
  { name: "FastAPI", icon: SiFastapi, color: '#009688'  },
  { name: "Tailwind", icon: SiTailwindcss, color: '#06B6D4'},
  { name: "React", icon: SiReact, color: '#61DBFB' },
  { name: "Next.js", icon: SiNextdotjs, color: '#000000' },
];

export function TechStack() {
  return (
    
    <div className="bg-secondary/20">
      <div className="space-y-4 rounded-xl p-4 absolute inset-0 -z-10 h-full w-full items-center ">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
        <p className="text-sm text-muted-foreground">
          Technologies I work with daily
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 font-serif">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/80"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 group-hover:shadow-lg"
                style={{ 
                  backgroundColor: tech.color,
                  boxShadow: `0 0 20px ${tech.color}40`
                }}
              >
                <tech.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </div>
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg"
              style={{ backgroundColor: tech.color }}
            />
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}







// // components/StackButtonGrid.tsx
// 'use client'
// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import clsx from 'clsx'

// type Stack = {
//   name: string
//   slug: string
//   color: string // HEX or Tailwind-compatible
// }

// const stacks: Stack[] = [
//   { name: 'Python', slug: 'python', color: '#3776AB' },
//   { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
//   { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
//   { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
//   { name: 'React', slug: 'react', color: '#61DAFB' },
//   { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
//   { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
//   { name: 'Docker', slug: 'docker', color: '#2496ED' },
//   { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
//   { name: 'Git', slug: 'git', color: '#F05032' },
// ]

// export function StackButtonGrid() {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
//       {stacks.map((stack) => (
//         <StackButton key={stack.slug} stack={stack} />
//       ))}
//     </div>
//   )
// }

// function StackButton({ stack }: { stack: Stack }) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.08, boxShadow: `0 0 16px ${stack.color}` }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className={clsx(
//         'group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-700 px-0 py-0 text-sm font-semibold shadow-sm transition-all duration-300',
//         'bg-gray-950/80 hover:bg-gray-900/80 min-h-[80px] min-w-[80px] w-full aspect-square',
//         'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
//       )}
//       style={{ boxShadow: `0 0 0px ${stack.color}` }}
//       onMouseEnter={e => {
//         (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px ${stack.color}`
//       }}
//       onMouseLeave={e => {
//         (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0px ${stack.color}`
//       }}
//     >
//       <img
//         src={`https://cdn.simpleicons.org/${stack.slug}/${stack.slug}`}
//         alt={stack.name}
//         width={32}
//         height={32}
//         className="transition-transform group-hover:scale-110 drop-shadow"
//         style={{ filter: 'brightness(1.1)' }}
//       />
//       <span className="text-xs font-medium text-gray-200 text-center mt-1">{stack.name}</span>
//     </motion.button>
//   )
// }