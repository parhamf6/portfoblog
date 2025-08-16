import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Coffee,
  Heart,
  Code,
  Star,
  GitFork,
  MessageCircle,
  Calendar
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/parhamf6',
      icon: Github,
      stats: '10 repos',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/parhamforati',
      icon: Linkedin,
      stats: '100 connects',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      href: 'mailto:parhamfdev@proton.me',
      icon: Mail,
      stats: 'Open inbox',
      color: 'hover:text-primary'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Resume', href: '/resume.pdf' },
    { name: 'Contact', href: '/Contact' }
  ];

  const recentProjects = [
    { name: 'PortfoBlog', stars: 2, forks: 0 },
    { name: 'GitFather', stars: 2, forks: 0 },
    { name: 'DevHub', stars: 4, forks: 0 }
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Parham Forati
              </h3>
              <p className="text-muted-foreground text-lg mb-4">
                Developer, Molecular Biologist, Tech enthusiast
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Passionate about creating open-source tools that solve real problems. 
                Currently focused on Machine Learning. 
                Always learning, always building.
              </p>
            </div>

            {/* Social Links with Stats */}
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 text-muted-foreground transition-colors ${link.color} group`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                  <span className="text-xs opacity-60 group-hover:opacity-100">
                    {link.stats}
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Coffee CTA */}
            {/* <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <a
                href="https://buymeacoffee.com/parhamforati"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Coffee className="w-4 h-4" />
                Buy me a coffee
              </a>
            </div> */}
          </div>

          {/* Recent Projects */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Recent Projects
            </h4>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.name} className="group">
                  <a
                    href={`https://github.com/parhamf6/${project.name.toLowerCase()}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="font-medium">{project.name}</div>
                    <div className="flex items-center gap-3 text-xs mt-1 opacity-60 group-hover:opacity-100">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <a
              href="https://github.com/parhamf6"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary mt-4 transition-colors"
            >
              View all repositories
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
          <div className="max-w-md">
            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified when I publish new articles and open-source projects.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© {currentYear} Parham Forati.</span>
              <span className="flex items-center gap-1">
                Built with <Heart className="w-3 h-3 text-red-400" /> and lots of coffee
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </a> */}
              {/* <a href="/rss.xml" className="hover:text-primary transition-colors">
                RSS
              </a> */}
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="w-3 h-3" />
                Last updated: Aug 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;