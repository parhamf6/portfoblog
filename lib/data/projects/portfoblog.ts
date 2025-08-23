import { ProjectData } from "@/types/project";
import { Sparkles, Users , TrendingUp } from "lucide-react";


export const PortfoblogData: ProjectData = {
    title: "PortfoBlog",
    tagline: "Solution for a personal blog and prtfolio at the same time",
    duration: "2 months",
    role: "Full-Stack Developer",
    status: "Live",
    
    // Quick Summary for fast overview
    quickSummary: {
      problem: {
        title: "Problem Solved",
        short: "Somthing that has the powers of both worlds",
        detailed: "As a developer my self i want it a space that can show my work for potential work and write about my stories and challenges along the way"
      },
      solution: {
        title: "Our Solution", 
        short: "Built an intuitive, real-time portfolio and blog system.",
        detailed: "I developed a comprehensive platform combining porfolio and work show with a powerful blog that can render every thing and its designed epecily for tech blogs."
      },
      impact: {
        title: "Results Achieved",
        short: "20% increase of social media.",
        detailed: "After lunch the views of my profile and contacts increseed."
      }
    },

    // Process/Research section
    processFlow: {
      title: "Research & Development Process",
      description: "A comprehensive approach from user research to final deployment",
      blogPostUrl: "/blogs/portfoblog-the-story-behind-it",
      stages: [
        { name: "Discovery", duration: "1 weeks", description: "Market research" },
        { name: "Design", duration: "2 weeks", description: "Wireframes, prototypes & user testing" },
        { name: "Development", duration: "4 weeks", description: "Frontend" },
        { name: "Testing", duration: "1 weeks", description: "QA, performance & security testing" },
        { name: "Launch", duration: "1 week", description: "Deployment & monitoring setup" }
      ]
    },

    // Image gallery for project screenshots
    projectImages: [
      {
        id: 1,
        title: "Dashboard Overview",
        description: "Clean, intuitive main dashboard with key metrics",
        url: "screenshot-dashboard.jpg",
        category: "Desktop"
      },
      {
        id: 2, 
        title: "Mobile Experience",
        description: "Fully responsive mobile interface",
        url: "screenshot-mobile.jpg",
        category: "Mobile"
      },
      {
        id: 3,
        title: "User Settings",
        description: "Comprehensive settings panel with dark mode",
        url: "screenshot-settings.jpg", 
        category: "Desktop"
      },
      {
        id: 4,
        title: "Analytics View",
        description: "Advanced analytics with interactive charts",
        url: "screenshot-analytics.jpg",
        category: "Desktop"
      }
    ],

    problem:
      "Developers need a single platform to showcase their work and share technical insights. Existing solutions force them to split their portfolio and blog, making it harder to build a cohesive personal brand.",
    solution:
      "PortfoBlog merges portfolio and blog features, supporting rich markdown, code blocks, image galleries, and responsive layouts. Built with Next.js, React, and Tailwind CSS, it offers a fast, accessible, and customizable experience.",
    targetUsers:
      "Software engineers, designers, and tech bloggers who want to present their projects and write about their experiences in one place.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn/ui"
    ],
    architecture:
      "JAMstack architecture with static generation for speed, API routes for dynamic content, and modular React components for maintainability.",
    keyFeatures: [
      "Unified portfolio and blog with smooth navigation",
      "Markdown rendering with syntax highlighting for code",
      "Responsive design and dark/light mode toggle",
      "Performance optimized with lazy loading and code splitting",
      "SEO and accessibility best practices"
    ],
    challenges: [
      {
        challenge: "Performance optimization",
        solution: "Implemented lazy loading and code splitting, reducing initial bundle size by 40%."
      },
      {
        challenge: "Cross-browser compatibility",
        solution: "Used progressive enhancement and polyfills for older browsers."
      }
    ],
    results: {
      metrics: [
        { label: "Performance Score", value: "95/100", icon: TrendingUp },
        { label: "Load Time", value: "1.2s", icon: Sparkles },
        { label: "User Satisfaction", value: "4.8/5", icon: Users }
      ],
      feedback:
      "\"PortfoBlog made it easy to share my projects and technical articles in one place. The code rendering and gallery features are fantastic!\" – Real User",
      learning:
        "Learned advanced React patterns, improved TypeScript skills, and mastered modern deployment strategies with Next.js."
    },
    links: {
      demo: "https://portfoblog-front-private.vercel.app/",
      github: "https://github.com/parhamf6/portfoblog",
      caseStudy: "/blogs/portfoblog-the-story-behind-it"
    }
  };



// example data
// const projectData: ProjectData = {
//     title: "Your Project Title Here",
//     tagline: "A brief, compelling description of what your project accomplishes",
//     duration: "3 months",
//     role: "Full-Stack Developer",
//     status: "Live",
    
//     // Quick Summary for fast overview
//     quickSummary: {
//       problem: {
//         title: "Problem Solved",
//         short: "Users struggled with inefficient workflow management",
//         detailed: "Our research revealed that 73% of teams were using outdated tools that caused bottlenecks, reduced productivity by 40%, and led to miscommunication across departments. The existing solutions were either too complex or lacked essential collaboration features."
//       },
//       solution: {
//         title: "Our Solution", 
//         short: "Built an intuitive, real-time collaboration platform",
//         detailed: "We developed a comprehensive platform combining project management, real-time chat, file sharing, and automated workflows. The solution uses AI-powered suggestions, integrates with 50+ popular tools, and features a clean, distraction-free interface that teams can master in minutes."
//       },
//       impact: {
//         title: "Results Achieved",
//         short: "40% productivity increase, 95% user satisfaction",
//         detailed: "Within 6 months of launch: 40% increase in team productivity, 60% reduction in project completion time, 95% user satisfaction score, adopted by 500+ teams across 12 countries, and generated $2M+ in revenue for the client."
//       }
//     },

//     // Process/Research section
//     processFlow: {
//       title: "Research & Development Process",
//       description: "A comprehensive approach from user research to final deployment",
//       blogPostUrl: "https://your-blog.com/project-process-deep-dive",
//       stages: [
//         { name: "Discovery", duration: "2 weeks", description: "User interviews & market research" },
//         { name: "Design", duration: "3 weeks", description: "Wireframes, prototypes & user testing" },
//         { name: "Development", duration: "8 weeks", description: "Frontend, backend & API integration" },
//         { name: "Testing", duration: "2 weeks", description: "QA, performance & security testing" },
//         { name: "Launch", duration: "1 week", description: "Deployment & monitoring setup" }
//       ]
//     },

//     // Image gallery for project screenshots
//     projectImages: [
//       {
//         id: 1,
//         title: "Dashboard Overview",
//         description: "Clean, intuitive main dashboard with key metrics",
//         url: "screenshot-dashboard.jpg",
//         category: "Desktop"
//       },
//       {
//         id: 2, 
//         title: "Mobile Experience",
//         description: "Fully responsive mobile interface",
//         url: "screenshot-mobile.jpg",
//         category: "Mobile"
//       },
//       {
//         id: 3,
//         title: "User Settings",
//         description: "Comprehensive settings panel with dark mode",
//         url: "screenshot-settings.jpg", 
//         category: "Desktop"
//       },
//       {
//         id: 4,
//         title: "Analytics View",
//         description: "Advanced analytics with interactive charts",
//         url: "screenshot-analytics.jpg",
//         category: "Desktop"
//       }
//     ],

//     problem: "Describe the specific problem or challenge this project addresses. What pain point does it solve for users?",
//     solution: "Explain your approach and the key innovation behind your solution. What makes it unique?",
//     targetUsers: "Define who benefits from this project - be specific about your target audience.",
//     techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/ui"],
//     architecture: "Modern JAMstack architecture with static generation and API routes for dynamic content",
//     keyFeatures: [
//       "Responsive design with smooth animations",
//       "Dark/light mode toggle with system preference detection",
//       "Performance optimized with lazy loading",
//       "SEO optimized with meta tags and structured data",
//       "Accessible design following WCAG guidelines"
//     ],
//     challenges: [
//       {
//         challenge: "Performance optimization",
//         solution: "Implemented lazy loading and code splitting, reducing initial bundle size by 40%"
//       },
//       {
//         challenge: "Cross-browser compatibility",
//         solution: "Used progressive enhancement and polyfills for older browsers"
//       }
//     ],
//     results: {
//       metrics: [
//         { label: "Performance Score", value: "95/100", icon: TrendingUp },
//         { label: "Load Time", value: "1.2s", icon: Sparkles },
//         { label: "User Satisfaction", value: "4.8/5", icon: Users }
//       ],
//       feedback: "\"This tool has significantly improved our workflow efficiency.\" - John Doe, Product Manager",
//       learning: "Mastered advanced React patterns, improved TypeScript skills, and learned modern deployment strategies."
//     },
//     links: {
//       demo: "https://your-project-demo.com",
//       github: "https://github.com/yourusername/project",
//       caseStudy: "https://your-blog.com/project-case-study"
//     }
//   };
