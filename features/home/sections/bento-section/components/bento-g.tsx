// // components/BentoGrid.tsx
// "use client"
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { Globe } from './globe';
// import { StackButtonGrid } from './stack-btn';

// const BentoGrid = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
//       {/* Top Left: Tech Stack */}
//       <TechStackBox />
      
//       {/* Top Right: Contact */}
//       <ContactBox />
      
//       {/* Bottom Left: About */}
//       <AboutBox />
      
//       {/* Bottom Right: GitHub Stats */}
//       <GitHubStatsBox />
//     </div>
//   );
// };

// // Tech Stack Box Component
// const TechStackBox = () => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   return (
//     <motion.div
//       className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 overflow-hidden min-h-[300px]"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       whileHover={{ 
//         scale: 1.02,
//         boxShadow: "0 0 25px 5px rgba(139, 92, 246, 0.4)",
//         transition: { duration: 0.3 }
//       }}
//       style={{
//         backgroundImage: isHovered 
//           ? "url('/patterns/circuit-board.svg')" 
//           : "url('/patterns/dot-pattern.svg')",
//         backgroundBlendMode: "soft-light",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         transition: "background-image 0.3s ease-in-out"
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 z-0"></div>
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
//             Tech Stack
//           </h2>
//           <motion.div
//             className="w-3 h-3 rounded-full bg-green-500"
//             animate={{ 
//               boxShadow: isHovered ? ["0 0 0 0 rgba(72, 187, 120, 0.4)", "0 0 0 10px rgba(72, 187, 120, 0)", "0 0 0 0 rgba(72, 187, 120, 0)"] : "none"
//             }}
//             transition={{ 
//               duration: 1.5, 
//               repeat: isHovered ? Infinity : 0,
//               repeatType: "loop"
//             }}
//           />
//         </div>
//         <div className="h-full">
//           <StackButtonGrid />
//         </div>
//       </div>
//       <div className="absolute bottom-4 right-4 text-xs text-gray-500">
//         Hover to explore
//       </div>
//     </motion.div>
//   );
// };

// // Contact Box Component
// const ContactBox = () => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   return (
//     <motion.div
//       className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 overflow-hidden min-h-[300px]"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       whileHover={{ 
//         boxShadow: isHovered ? "0 0 25px 5px rgba(249, 115, 22, 0.4)" : "0 0 0 0 rgba(0, 0, 0, 0)",
//         transition: { duration: 0.3 }
//       }}
//       style={{
//         backgroundImage: isHovered 
//           ? "url('/patterns/flow-lines.svg')" 
//           : "url('/patterns/plus.svg')",
//         backgroundBlendMode: "soft-light",
//         backgroundSize: "cover"
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-amber-900/20 z-0"></div>
//       <div className="relative z-10 flex flex-col h-full gap-6">
//         <div className="flex-1 flex flex-col justify-center">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300">
//               Connect & Collaborate
//             </h2>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 <motion.div
//                   className="w-3 h-3 rounded-full bg-orange-500"
//                   animate={{ 
//                     scale: [1, 1.2, 1],
//                   }}
//                   transition={{ 
//                     duration: 1.5, 
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }}
//                 />
//                 <span className="text-xs text-orange-400">Available</span>
//               </div>
//               <div className="flex items-center gap-1 text-xs text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Tehran, Iran
//               </div>
//             </div>
//           </div>
//           <p className="text-gray-300 mb-4">
//             Open for freelance opportunities and exciting projects. Let's build something amazing together.
//           </p>
//           <div className="flex gap-3">
//             <motion.a
//               href="mailto:your.email@example.com"
//               className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium text-sm"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Email Me
//             </motion.a>
//             <motion.a
//               href="https://calendly.com/yourusername"
//               target="_blank"
//               className="inline-flex items-center justify-center px-4 py-2 border border-orange-500/30 text-orange-400 rounded-lg font-medium text-sm"
//               whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 146, 60, 0.1)' }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Schedule a Call
//             </motion.a>
//           </div>
//         </div>
//         <div className="flex-1 h-48 md:h-64 relative">
//           <Globe className={isHovered ? "scale-110" : "scale-100"} />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // About Box Component
// const AboutBox = () => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   const achievements = [
//     { number: "5+", label: "Years Experience" },
//     { number: "20+", label: "Projects Delivered" },
//     { number: "3", label: "Industry Awards" }
//   ];

//   return (
//     <motion.div
//       className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 overflow-hidden min-h-[300px]"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       whileHover={{ 
//         boxShadow: isHovered ? "0 0 25px 5px rgba(14, 165, 233, 0.4)" : "0 0 0 0 rgba(0, 0, 0, 0)",
//         transition: { duration: 0.3 }
//       }}
//       style={{
//         backgroundImage: isHovered 
//           ? "url('/patterns/circuit-board.svg')" 
//           : "url('/patterns/hexagons.svg')",
//         backgroundBlendMode: "soft-light",
//         backgroundSize: "cover"
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 z-0"></div>
//       <div className="relative z-10 h-full flex flex-col">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
//             Full-Stack Developer
//           </h2>
//         </div>
        
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           {achievements.map((item, index) => (
//             <div key={index} className="text-center p-2 rounded-lg bg-blue-900/20">
//               <div className="text-xl font-bold text-blue-400">{item.number}</div>
//               <div className="text-xs text-gray-400">{item.label}</div>
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4 flex-1">
//           <p className="text-gray-300 leading-relaxed">
//             Passionate about creating performant web applications with clean, maintainable code. Specialized in React, Node.js, and cloud architecture.
//           </p>
          
//           <div className="flex flex-wrap gap-2">
//             {["TypeScript", "React", "Node.js", "AWS", "Next.js"].map((tech, index) => (
//               <span key={index} className="px-3 py-1 rounded-full text-xs bg-blue-900/20 text-blue-300 border border-blue-500/20">
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
        
//         <motion.a
//           href="/about"
//           className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium text-sm transition-all duration-300 self-start flex items-center gap-2"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           More About Me
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </motion.a>
//       </div>
//     </motion.div>
//   );
// };

// // GitHub Stats Box Component
// const GitHubStatsBox = () => {
//   const [isInView, setIsInView] = useState(false);
//   const [stats, setStats] = useState({
//     commits: 0,
//     stars: 0,
//     repos: 0
//   });

//   useEffect(() => {
//     // This would be replaced with actual API call
//     const mockStats = {
//       commits: 1247,
//       stars: 42,
//       repos: 28
//     };
//     setStats(mockStats);
//   }, []);

//   const Counter = ({ value }: { value: number }) => {
//     const [count, setCount] = useState(0);
    
//     useEffect(() => {
//       if (isInView) {
//         const interval = setInterval(() => {
//           setCount(prev => {
//             if (prev >= value) {
//               clearInterval(interval);
//               return value;
//             }
//             return prev + Math.ceil(value / 30);
//           });
//         }, 30);
//         return () => clearInterval(interval);
//       }
//     }, [isInView, value]);
    
//     return <span>{count}</span>;
//   };

//   return (
//     <motion.div
//       className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 overflow-hidden min-h-[300px]"
//       onViewportEnter={() => setIsInView(true)}
//       onViewportLeave={() => setIsInView(false)}
//       whileHover={{ 
//         boxShadow: "0 0 25px 5px rgba(34, 197, 94, 0.4)",
//         transition: { duration: 0.3 }
//       }}
//       style={{
//         backgroundImage: "url('https://bg.ibelick.com/waves.svg')",
//         backgroundBlendMode: "overlay",
//         backgroundSize: "cover"
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20 z-0"></div>
//       <div className="relative z-10 h-full flex flex-col">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
//             GitHub Stats
//           </h2>
//           <motion.div
//             className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           </motion.div>
//         </div>
        
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
//             <div className="text-green-500 font-semibold text-3xl">
//               <Counter value={stats.commits} />
//             </div>
//             <div className="text-gray-400 text-sm">Commits</div>
//           </div>
//           <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
//             <div className="text-green-500 font-semibold text-3xl">
//               <Counter value={stats.stars} />
//             </div>
//             <div className="text-gray-400 text-sm">Stars</div>
//           </div>
//           <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
//             <div className="text-green-500 font-semibold text-3xl">
//               <Counter value={stats.repos} />
//             </div>
//             <div className="text-gray-400 text-sm">Repos</div>
//           </div>
//         </div>
        
//         <motion.a
//           href="https://github.com/yourusername"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-auto px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//           </svg>
//           View GitHub Profile
//         </motion.a>
//       </div>
//     </motion.div>
//   );
// };

// export default BentoGrid;