"use client"
import React, { useState, useMemo } from 'react';
import { Search, Filter, Code } from 'lucide-react';
import { projects } from '@/lib/data/projects/projects-list';
import ProjectCard from '../home/sections/projects-section/components/project-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// Main Blog Index Component
const ProjectIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');

  // Extract unique types and technologies
  const types = useMemo(() => {
    const types = ['All', ...new Set(projects.map(project => project.type))];
    return types;
  }, []);

  const technologies = useMemo(() => {
    const techs = ['All', ...new Set(projects.flatMap(project => project.tags))];
    return techs;
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = selectedType === 'All' || project.type === selectedType;
      const matchesTech = selectedTech === 'All' || project.tags.includes(selectedTech);
      
      return matchesSearch && matchesType && matchesTech;
    });
  }, [searchQuery, selectedType, selectedTech]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent leading-tight">
            Projects Showcase
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            A collection of my projects, experiments, and development work.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 rounded-2xl">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, technologies, or types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background/80 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              
              {/* Type Filter */}
              <div className="relative min-w-[120px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="pl-10 w-full bg-background/80">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>


              {/* Tech Filter */}
              <div className="relative min-w-[120px]">
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger className="w-full bg-background/80">
                      <SelectValue placeholder="Technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {technologies.map(tech => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="max-w-7/8 mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
                <Code className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                  setSelectedTech('All');
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectIndex;