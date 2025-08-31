"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Download,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Zap,
  Target,
  BookOpen,
  Rocket,
  Globe
} from 'lucide-react';
import { SiPython, SiFastapi, SiPostgresql , SiMysql ,
  SiNodedotjs , SiPhp , SiTailwindcss, SiNextdotjs , 
  SiTypescript , SiJavascript , SiReact , SiFramer , 
  SiFigma , SiLinux , SiGnubash , SiGit , 
  SiGithub, SiDocker } from 'react-icons/si';
import TechnicalSkillsSection from '@/features/about/tech-section';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize GSAP animations
    if (heroRef.current && particlesRef.current) {
      // Animated background particles
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: `-=${scrollY * 0.1}`,
        duration: 0.5,
        ease: "power1.out",
      });
      
      // Parallax effect for hero content
      gsap.to(heroRef.current.querySelector('.hero-content'), {
        y: scrollY * 0.2,
        duration: 0.5,
        ease: "power1.out",
      });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Initialize scroll animations
  useEffect(() => {
    // Animate sections on scroll
    gsap.utils.toArray('.section-animate').forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  const skills = {
    frontend: [
      { name: 'React', level: 80, color: 'var(--badge-react)' },
      { name: 'TypeScript', level: 95, color: 'var(--badge-ts)' },
      { name: 'Next.js', level: 75, color: 'var(--badge-next)' },
      { name: 'Tailwind', level: 95, color: 'var(--primary)' },
    ],
    backend: [
      { name: 'Node.js', level: 80, color: 'var(--badge-node)' },
      { name: 'Python', level: 100, color: 'var(--badge-python)' },
      { name: 'PostgreSQL', level: 75, color: 'var(--badge-go)' },
      { name: 'MongoDB', level: 70, color: 'var(--badge-vue)' },
    ]
  };

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      location: "Remote",
      description: "Leading development of scalable web applications serving 100k+ users.",
      impact: "40% performance improvement",
      technologies: ["React", "Next.js", "TypeScript", "Python", "PostgreSql", "FastAPI", "Django"]
    },
  ];

  const currentFocus = [
    { title: "AI Integration", desc: "Exploring LLMs" },
    { title: "Performance", desc: "Advanced optimization" },
    { title: "Data Science", desc: "Learning data analysis" },
    { title: "Open Source", desc: "Contributing to tools" }
  ];

  // Generate particles for background
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particles.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={particlesRef}>
        {renderParticles()}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div> */}

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7 space-y-8 hero-content">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-3 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium tracking-wide">FULL-STACK DEVELOPER</span>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  Hi, I'm <span className="text-primary">Parham Forati</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  I craft digital experiences that blend beautiful design with powerful functionality. 
                  Turning complex problems into simple, elegant solutions.
                </motion.p>
              </motion.div>
              
              {/* Quick Stats */}
              <motion.div 
                className="flex gap-8 py-6 border-y border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                {[
                  { value: "3+", label: "Years Experience" },
                  { value: "5+", label: "Projects Delivered" },
                  { value: "1k+", label: "Users Impacted" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Actions */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                {/* <motion.button 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </motion.button> */}
                <a target='_blank' href="https://github.com/parhamf6" > 
                  <motion.button 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  Github Profile
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                </a>
                <motion.button 
                  className="border border-border px-8 py-3 rounded-xl font-medium hover:bg-card transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/contact" className='flex gap-2 items-center'>
                    <Mail className="w-4 h-4" />
                    Let's Talk
                  </a>
                </motion.button>
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {[
                  // { icon: Github, href: "https://github.com/parhamf6", label: "GitHub" },
                  { icon: Mail, href: "mailto:parhamfdev@proton.me", label: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Profile Card */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div 
                className="bg-card border border-border rounded-3xl p-8 space-y-6 shadow-lg"
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Photo */}
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Code2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </motion.div>
                </div>
                
                {/* Quick Info */}
                <div className="space-y-4">
                  {[
                    { icon: MapPin, text: "Tehran, IR" },
                    { icon: Globe, text: "Busy at the moment" },
                    { icon: Calendar, text: "Usually responds within 48h" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3 text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Current Focus */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium mb-4">Currently focusing on</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentFocus.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-muted/50 rounded-xl p-3"
                        whileHover={{ 
                          y: -5, 
                          backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className='py-20 px-6 lg:px-12 section-animate'>
        <TechnicalSkillsSection />
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 lg:px-12 bg-card/20 section-animate">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="text-muted-foreground max-w-2xl">
              Building impactful digital products and leading development teams across various industries.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border rounded-2xl p-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <div 
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block"
                    >
                      {exp.impact}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex}
                            className="px-3 py-1 bg-muted text-xs rounded-full border border-border"
                            whileHover={{ 
                              backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                              y: -3,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-6 lg:px-12 section-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {[
                  { 
                    title: "Bachelor of Molecular Biologist", 
                    institution: "University of Sciences", 
                    year: "2024 - Present" 
                  },
                  { 
                    title: "Development Skills", 
                    institution: "University of Books and Internet", 
                    year: "2020" 
                  }
                ].map((edu, index) => (
                  <motion.div 
                    key={index}
                    className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-medium">{edu.title}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Key Certifications */}
            <motion.div 
              className="bg-card border border-border rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Certifications
              </h3>
              <div className="space-y-4">
                {[
                  { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
                  { name: "React Developer", issuer: "Meta", year: "2022" },
                  { name: "TypeScript Fundamentals", issuer: "Microsoft", year: "2022" },
                  { name: "Next.js Certification", issuer: "Vercel", year: "2023" }
                ].map((cert, index) => (
                  <motion.div 
                    key={index}
                    className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-card/20 rounded-xl section-animate"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className='flex items-center gap-2 cursor-pointer'>
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium flex items-center gap-2 group">
                  <Mail className="w-4 h-4" />
                  Start a Conversation
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </button>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/projects" className='flex items-center gap-2 cursor-pointer'>
                <button className="border border-border px-8 py-4 rounded-xl font-medium hover:bg-card transition-all flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Portfolio
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;