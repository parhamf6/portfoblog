"use client"
import React, { useState, useMemo } from 'react';
import { Search, Filter, Code, Tag, Layers, X, Sparkles } from 'lucide-react';
import { projects } from '@/lib/data/projects/projects-list';
import ProjectCard from '../home/sections/projects-section/components/project-card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Main Project Index Component
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

  const clearType = () => setSelectedType('All');
  const clearTech = () => setSelectedTech('All');
  const clearAllFilters = () => {
    setSelectedType('All');
    setSelectedTech('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedType !== 'All' || selectedTech !== 'All' || searchQuery;
  const hasFilterSelections = selectedType !== 'All' || selectedTech !== 'All';

  return (
    <div className="min-h-screen bg-background text-foreground mb-32">
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
            
            {/* Header with Clear All */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Find Projects</h3>
                <Sparkles className="w-4 h-4 text-primary/60" />
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {/* Search and Main Filters Row */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                
                {/* Search Bar */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects, technologies, or types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-background/80 border border-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filters Container */}
                <div className="flex flex-col sm:flex-row gap-3 lg:min-w-0">
                  
                  {/* Type Filter */}
                  <div className="relative min-w-[160px]">
                    <div className="mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Project Type</span>
                    </div>
                    <div className="relative">
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full bg-background/80 border-border hover:border-primary/50 focus:border-primary transition-colors text-sm">
                          <div className="flex items-center gap-2 text-left">
                            {/* <Layers className="w-3 h-3 text-muted-foreground flex-shrink-0" /> */}
                            <SelectValue placeholder="All Types" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Layers className="w-3 h-3 text-muted-foreground" />
                                {type}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedType && selectedType !== 'All' && (
                        <button
                          onClick={clearType}
                          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tech Filter */}
                  <div className="relative min-w-[160px]">
                    <div className="mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Technology</span>
                    </div>
                    <div className="relative">
                      <Select value={selectedTech} onValueChange={setSelectedTech}>
                        <SelectTrigger className="w-full bg-background/80 border-border hover:border-primary/50 focus:border-primary transition-colors text-sm">
                          <div className="flex items-center gap-2 text-left">
                            {/* <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" /> */}
                            <SelectValue placeholder="All Technologies" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {technologies.map(tech => (
                            <SelectItem key={tech} value={tech}>
                              <div className="flex items-center gap-2">
                                <Tag className="w-3 h-3 text-muted-foreground" />
                                {tech}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedTech && selectedTech !== 'All' && (
                        <button
                          onClick={clearTech}
                          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters and Results Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50">
                
                {/* Active Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {(hasFilterSelections || searchQuery) && (
                    <>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Filter className="w-3 h-3" />
                        Active filters:
                      </span>
                      {searchQuery && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-sm">
                          <Search className="w-3 h-3" />
                          "{searchQuery.length > 20 ? searchQuery.substring(0, 20) + '...' : searchQuery}"
                          <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-primary/80">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedType && selectedType !== 'All' && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 text-sm">
                          <Layers className="w-3 h-3" />
                          {selectedType}
                          <button onClick={clearType} className="ml-1 hover:text-blue-900">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedTech && selectedTech !== 'All' && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-sm">
                          <Tag className="w-3 h-3" />
                          {selectedTech}
                          <button onClick={clearTech} className="ml-1 hover:text-green-900">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                    </>
                  )}
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium text-foreground">{filteredProjects.length}</span>
                    <span>{filteredProjects.length === 1 ? 'project' : 'projects'} found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="max-w-7/8 mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-6">
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
                onClick={clearAllFilters}
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