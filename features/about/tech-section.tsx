import React from 'react';
import { 
  SiPython, SiFastapi, SiPostgresql, SiMysql,
  SiNodedotjs, SiPhp, SiTailwindcss, SiNextdotjs,
  SiTypescript, SiJavascript, SiReact, SiFramer,
  SiFigma, SiLinux, SiGnubash, SiGit,
  SiGithub, SiDocker, 
  SiDjango
} from 'react-icons/si';
import { Code2, Database, Layers, Wrench, LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  description?: string;
}

interface SkillCategories {
  primary: Skill[];
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

interface SkillCardProps {
  skill: Skill;
  isPrimary?: boolean;
}

interface CategoryIconProps {
  category: keyof SkillCategories;
}

const TechnicalSkillsSection: React.FC = () => {
  const skillCategories: SkillCategories = {
    primary: [
      { 
        name: 'Python', 
        icon: SiPython, 
        color: '#3776ab',
        description: 'Primary backend language'
      },
      { 
        name: 'FastAPI', 
        icon: SiFastapi, 
        color: '#009688',
        description: 'High-performance API framework'
      },
      { 
        name: 'TypeScript', 
        icon: SiTypescript, 
        color: '#3178c6',
        description: 'Type-safe JavaScript'
      },
      { 
        name: 'React', 
        icon: SiReact, 
        color: '#61dafb',
        description: 'Modern UI development'
      }
    ],
    frontend: [
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4' },
        { name: 'Figma', icon: SiFigma, color: '#f24e1e' }
        ],
        backend: [
        // { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
          { name: 'PHP', icon: SiPhp, color: '#777bb4' },
        { name: 'Django', icon: SiDjango, color: '#092e20' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
        { name: 'MySQL', icon: SiMysql, color: '#4479a1' }
    ],
    tools: [
        { name: 'Docker', icon: SiDocker, color: '#2496ed' },
        { name: 'Git', icon: SiGit, color: '#f05032' },
        // { name: 'GitHub', icon: SiGithub, color: '#181717' },
        { name: 'Linux', icon: SiLinux, color: '#fcc624' },
        { name: 'Bash', icon: SiGnubash, color: '#4eaa25' },
    ]
  };

  const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
    const iconMap: Record<keyof SkillCategories, LucideIcon> = {
      primary: Layers,
      frontend: Code2,
      backend: Database,
      tools: Wrench
    };
    const Icon = iconMap[category];
    return <Icon className="w-5 h-5" />;
  };

const SkillCard: React.FC<SkillCardProps> = ({ skill, isPrimary = false }) => {
    const IconComponent = skill.icon;

    // PRIMARY: minimal smooth gradient -> color-wash (no glow)
    if (isPrimary) {
      return (
        <div
          role="button"
          tabIndex={0}
          aria-label={`${skill.name}${skill.description ? ` — ${skill.description}` : ''}`}
          className={`
            group relative rounded-2xl border-1 transition-transform duration-300 transform-gpu
            p-6 hover:-translate-y-0.5 bg-white/4
            focus:outline-none
          `}
          style={{ borderColor: skill.color }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.currentTarget.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
          }}
        >
          {/* BASE GRADIENT TINT (visible by default; fades OUT on hover) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out opacity-100 group-hover:opacity-0"
            style={{
              background: `linear-gradient(135deg, ${skill.color}20 0%, transparent 75%)`
            }}
          />

          {/* COLOR WASH (fades IN after gradient fades) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 delay-75 ease-out opacity-0 group-hover:opacity-30"
            style={{
              background: skill.color
            }}
          />

          {/* CONTENT (above overlays) */}
          <div className="relative z-10 pb-4">
            <div className="flex md:flex-col md:items-start  items-center gap-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `${skill.color}10`,
                  border: `1px solid ${skill.color}22`
                }}
              >
                <IconComponent className="w-7 h-7" style={{ color: skill.color }} />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>{skill.name}</h4>
                {skill.description && (
                  <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                )}
              </div>
            </div>

            {/* <div className="mt-4">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${skill.color}12`, color: skill.color }}
              >
                Primary Stack
              </div>
            </div> */}
          </div>
        </div>
      );
    }

    // NON-PRIMARY: exactly as you gave me (unchanged)
    return (
      <div 
        className={`
          group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
          ${isPrimary 
            ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:bg-none transition-all duration-300' 
            : 'bg-card/75 border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5'
          }
        `}
      >
        <div className={`p-6 ${isPrimary ? 'pb-4' : ''}`}>
          <div className="flex items-center gap-4">
            <div 
              className={`
                flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110
                ${isPrimary ? 'w-14 h-14' : 'w-12 h-12'}
              `}
              style={{ backgroundColor: `${skill.color}20` }}
            >
              <IconComponent 
                className={`${isPrimary ? 'w-7 h-7' : 'w-6 h-6'} transition-all duration-300 group-hover:scale-110`}
                style={{ color: skill.color }}
              />
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${isPrimary ? 'text-lg' : 'text-base'}`}>
                {skill.name}
              </h4>
              {skill.description && (
                <p className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-muted-foreground/80">
                  {skill.description}
                </p>
              )}
            </div>
          </div>
          
          {isPrimary && (
            <div className="mt-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary/25">
                Primary Stack
              </div>
            </div>
          )}
        </div>
        
        {/* Subtle hover overlay */}
        <div 
          className="absolute inset-0 opacity-1 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    );
  };

  return (
    <section className="py-10 px-6 lg:px-12" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Technical Expertise
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Specialized in modern web technologies with a focus on performance, scalability, and exceptional user experiences.
          </p>
        </div>

        {/* Primary Stack - Featured */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              <CategoryIcon category="primary" />
            </div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Primary Stack
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.primary.map((skill) => (
              <SkillCard key={skill.name} skill={skill} isPrimary />
            ))}
          </div>
        </div>

        {/* Other Categories */}
        <div className="grid lg:grid-cols-3 gap-12">
          {(['frontend', 'backend', 'tools'] as const).map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3 group">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}
                >
                  <CategoryIcon category={category} />
                </div>
                <h3 className="text-xl font-semibold capitalize" style={{ color: 'var(--foreground)' }}>
                  {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Tools & DevOps'}
                </h3>
              </div>
              
              <div className="grid  md:grid-cols-2 md:gap-4 gap-2">
                {skillCategories[category].map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-5 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="text-center group">
              <div className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--primary)' }}>20+</div>
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Projects Completed</div>
            </div>
            <div className="w-px h-12" style={{ backgroundColor: 'var(--border)' }}></div>
            <div className="text-center group">
              <div className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--primary)' }}>15+</div>
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkillsSection;