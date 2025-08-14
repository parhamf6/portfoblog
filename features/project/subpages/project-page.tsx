"use client"
import React, { useState } from 'react';
import { ExternalLink, Github, Play, Code, Users, Calendar, TrendingUp, Sparkles, ChevronRight, ArrowRight, ChevronDown, ChevronUp, Clock, Target, Zap, BookOpen, Image, ArrowLeft, ArrowRight as ArrowRightIcon, LucideIcon } from 'lucide-react';
import { SummaryData ,  Metric } from '@/types/project';
import { ProjectData as ProjectType } from '@/types/project';

type TabId = 'summary' | 'overview' | 'process' | 'gallery' | 'technical' | 'results';
type SummarySection = 'problem' | 'solution' | 'impact';

interface ExpandedSummary {
  problem: boolean;
  solution: boolean;
  impact: boolean;
}

export const ProjectShowcase: React.FC<{project:ProjectType}> = ({project}) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [expandedSummary, setExpandedSummary] = useState<ExpandedSummary>({
    problem: false,
    solution: false,
    impact: false
  });

  // Mock data - replace with your actual project data
  const projectData = project;

  const toggleSummary = (section: SummarySection): void => {
    setExpandedSummary(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => 
      prev === projectData.projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectData.projectImages.length - 1 : prev - 1
    );
  };

  const SummaryCard: React.FC<{ section: SummarySection; data: SummaryData }> = ({ section, data }) => {
    const isExpanded = expandedSummary[section];
    const icons: Record<SummarySection, LucideIcon> = {
      problem: Target,
      solution: Zap, 
      impact: TrendingUp
    };
    const IconComponent = icons[section];

    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:bg-card/70 transition-all duration-300">
        <button
          onClick={() => toggleSummary(section)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{data.title}</h3>
              <p className="text-muted-foreground text-sm">{data.short}</p>
            </div>
          </div>
          {isExpanded ? 
            <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          }
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-border/50">
            <div className="pt-4">
              <p className="text-muted-foreground leading-relaxed">{data.detailed}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ProcessDiagram: React.FC = () => (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">{projectData.processFlow.title}</h3>
          <p className="text-muted-foreground">{projectData.processFlow.description}</p>
        </div>
        <a 
          href={projectData.processFlow.blogPostUrl}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Read Full Case Study
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Process Flow Visualization */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {projectData.processFlow.stages.map((stage, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border-2 border-primary/30 mb-3">
                <span className="text-lg font-bold text-primary">{index + 1}</span>
              </div>
              <h4 className="font-semibold text-sm mb-1">{stage.name}</h4>
              <p className="text-xs text-muted-foreground text-center mb-1">{stage.duration}</p>
              <p className="text-xs text-muted-foreground/80 text-center max-w-20">{stage.description}</p>
              
              {index < projectData.processFlow.stages.length - 1 && (
                <div className="absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50" />
              )}
            </div>
          ))}
        </div>

        {/* Placeholder for process diagram */}
        <div className="bg-muted/10 rounded-xl p-12 border-2 border-dashed border-border/50">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
              <Code className="w-12 h-12 text-primary" />
            </div>
            <h4 className="text-lg font-semibold">Process Flow Diagram</h4>
            <p className="text-muted-foreground max-w-md mx-auto">
              Replace this section with your actual process diagram, architecture flowchart, 
              or user journey visualization
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ImageGallery: React.FC = () => {
    const currentImage = projectData.projectImages[currentImageIndex];
    
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Gallery</h3>
            <p className="text-muted-foreground">Screenshots and key features showcase</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Image className="w-4 h-4" />
            {currentImageIndex + 1} of {projectData.projectImages.length}
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative mb-6 group">
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-2">
            <div className="bg-muted/20 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Image className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{currentImage.title}</p>
                  <p className="text-sm text-muted-foreground">{currentImage.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full">
                    {currentImage.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/70">Replace with actual screenshot: {currentImage.url}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-3 justify-center">
          {projectData.projectImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-12 rounded-lg border-2 transition-all duration-300 ${
                index === currentImageIndex
                  ? 'border-primary bg-primary/20'
                  : 'border-border/50 bg-muted/20 hover:border-primary/50'
              }`}
            >
              <div className="w-full h-full rounded-md bg-muted/40 flex items-center justify-center">
                <span className="text-xs font-mono">{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const TechBadge: React.FC<{ tech: string }> = ({ tech }) => {
    const badgeColors: Record<string, string> = {
      'TypeScript': 'bg-[oklch(0.55_0.18_240)] text-white',
      'React': 'bg-[oklch(0.65_0.18_200)] text-white',
      'Next.js': 'bg-[oklch(0.95_0_0)] text-black',
      'Node.js': 'bg-[oklch(0.55_0.15_140)] text-white',
      'Tailwind CSS': 'bg-[oklch(0.65_0.18_200)] text-white',
      'Framer Motion': 'bg-[oklch(0.6_0.15_300)] text-white',
      'Shadcn/ui': 'bg-[oklch(0.7_0.2_100)] text-black'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColors[tech] || 'bg-muted text-muted-foreground'}`}>
        {tech}
      </span>
    );
  };

  const TabButton: React.FC<{ 
    id: TabId; 
    label: string; 
    isActive: boolean; 
    onClick: (id: TabId) => void;
  }> = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      {label}
    </button>
  );

  const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
    const IconComponent = metric.icon;
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:bg-card/80 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">
                  {projectData.status}
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {projectData.duration}
                </span>
                <span className="text-muted-foreground">{projectData.role}</span>
              </div>
              
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {projectData.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {projectData.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {projectData.techStack.map((tech, index) => (
                  <TechBadge key={index} tech={tech} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={projectData.links.demo}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 group"
                >
                  <Play className="w-4 h-4" />
                  Live Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={projectData.links.github}
                  className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/50 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
                <a
                  href={projectData.links.caseStudy}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <Code className="w-4 h-4" />
                  Case Study
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Project Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-1">
                <div className="bg-muted/20 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Project Screenshot/Demo</p>
                    <p className="text-xs text-muted-foreground/70">Replace with actual project visuals</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-16">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 p-2 bg-card/30 backdrop-blur-sm rounded-xl border border-border/30">
          <TabButton
            id="summary"
            label="Quick Summary"
            isActive={activeTab === 'summary'}
            onClick={setActiveTab}
          />
          <TabButton
            id="overview"
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="process"
            label="Process & Research"
            isActive={activeTab === 'process'}
            onClick={setActiveTab}
          />
          <TabButton
            id="gallery"
            label="Gallery"
            isActive={activeTab === 'gallery'}
            onClick={setActiveTab}
          />
          <TabButton
            id="technical"
            label="Technical Details"
            isActive={activeTab === 'technical'}
            onClick={setActiveTab}
          />
          <TabButton
            id="results"
            label="Results & Impact"
            isActive={activeTab === 'results'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Project at a Glance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get a quick understanding of the project's core problem, solution, and impact. 
                Click each section to dive deeper into the details.
              </p>
            </div>

            <div className="grid gap-4 max-w-4xl mx-auto">
              <SummaryCard section="problem" data={projectData.quickSummary.problem} />
              <SummaryCard section="solution" data={projectData.quickSummary.solution} />
              <SummaryCard section="impact" data={projectData.quickSummary.impact} />
            </div>

            {/* Quick Stats */}
            <div className="mt-12 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{projectData.duration}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" />
                    Development Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">{projectData.techStack.length}</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">40%</div>
                  <div className="text-sm text-muted-foreground">Productivity Boost</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8">
            <ProcessDiagram />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <ImageGallery />
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  The Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {projectData.problem}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-secondary rounded-full" />
                  The Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {projectData.solution}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Innovation</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <h4 className="font-semibold mb-3">Target Users</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {projectData.targetUsers}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Key Features</h4>
                <div className="space-y-3">
                  {projectData.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Architecture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {projectData.architecture}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Technical Challenges</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {projectData.challenges.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-secondary">{item.challenge}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {projectData.results.metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">User Feedback</h3>
                <blockquote className="text-muted-foreground italic leading-relaxed border-l-4 border-primary pl-4">
                  {projectData.results.feedback}
                </blockquote>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Personal Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {projectData.results.learning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Interested in working together?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. 
            Let's create something amazing together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200">
              Get In Touch
            </button>
            <button className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-muted/50 transition-all duration-200">
              View More Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;