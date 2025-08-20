"use client"
import React, { useState, useEffect } from 'react';
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

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    frontend: [
      { name: 'React', level: 95, color: 'var(--badge-react)' },
      { name: 'TypeScript', level: 90, color: 'var(--badge-ts)' },
      { name: 'Next.js', level: 88, color: 'var(--badge-next)' },
      { name: 'Tailwind', level: 92, color: 'var(--primary)' },
    ],
    backend: [
      { name: 'Node.js', level: 85, color: 'var(--badge-node)' },
      { name: 'Python', level: 80, color: 'var(--badge-python)' },
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
      technologies: ["React", "Next.js", "TypeScript", "Python", "PostgreSql", "FastAPI", "Dajngo"]
    },
  ];

  const currentFocus = [
    { title: "AI Integration", desc: "Exploring LLMs" },
    { title: "Performance", desc: "Advanced optimization" },
    { title: "Data Science", desc: "Learning data analysis" },
    { title: "Open Source", desc: "Contributing to tools" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground mt-8">
      {/* Subtle Background */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      {/* Hero Section - Left Aligned */}
      <section className="min-h-screen flex items-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium tracking-wide">FULL-STACK DEVELOPER</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm <span className="text-primary">Parham Forati</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  I craft digital experiences that blend beautiful design with powerful functionality. 
                  Turning complex problems into simple, elegant solutions.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 py-6 border-y border-border">
                <div>
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1k+</div>
                  <div className="text-sm text-muted-foreground">Users Impacted</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2 group">
                  <Download className="w-4 h-4" />
                  Download Resume
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button className="border border-border px-8 py-3 rounded-xl font-medium hover:bg-card transition-all flex items-center gap-2">
                  <a href="/contact" className='flex gap-2 items-center '>
                    <Mail className="w-4 h-4" />
                    Let's Talk
                  </a>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/parhamf6", label: "GitHub" },
                //   { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:parhamfdev@proton.me", label: "Email" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
                {/* Photo */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Tehran ,IR</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>Bussy at the moment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Usually responds within 48h</span>
                  </div>
                </div>

                {/* Current Focus */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-medium mb-4">Currently focusing on</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentFocus.map((item, index) => (
                      <div key={index} className="bg-muted/50 rounded-xl p-3">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Minimal Grid */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground max-w-2xl">
              Specialized in modern web technologies with a focus on performance, scalability, and user experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Frontend */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Frontend Development
              </h3>
              <div className="grid gap-4">
                {skills.frontend.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            backgroundColor: skill.color,
                            width: `${skill.level}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-secondary" />
                Backend Development
              </h3>
              <div className="grid gap-4">
                {skills.backend.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            backgroundColor: skill.color,
                            width: `${skill.level}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Clean Timeline */}
      <section className="py-20 px-6 lg:px-12 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="text-muted-foreground max-w-2xl">
              Building impactful digital products and leading development teams across various industries.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all group">
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
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {exp.impact}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-muted text-xs rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications - Compact */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <h4 className="font-medium">Bachelor of Molecular Biologist</h4>
                  <p className="text-sm text-muted-foreground">University of Sciences</p>
                  <p className="text-xs text-muted-foreground">2024 - Present</p>
                </div>
                <div className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <h4 className="font-medium">Development Skills</h4>
                  <p className="text-sm text-muted-foreground">niversity of Books and Internet</p>
                  <p className="text-xs text-muted-foreground">2020</p>
                </div>
              </div>
            </div>

            {/* Key Certifications */}
            <div className="bg-card border border-border rounded-2xl p-8">
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
                  <div key={index} className="pb-4 border-b border-border last:border-b-0 last:pb-0">
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean & Focused */}
      <section className="py-20 px-6 lg:px-12 bg-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2 group">
              <Mail className="w-4 h-4" />
              Start a Conversation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="border border-border px-8 py-4 rounded-xl font-medium hover:bg-card transition-all flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;