"use client"

import React, { useState } from 'react';
import { Mail, MessageCircle, Github, Linkedin, Twitter, Send, Coffee, Code, Lightbulb, Users, ArrowRight, Star, Globe, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import HeroBackground from '@/components/contact-hero-background';
import TextType from '@/components/text-animation/text-type';

const ContactPage = () => {
  const [selectedIntent, setSelectedIntent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    intent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const contactIntents = [
    {
      id: 'collaborate',
      icon: Users,
      title: 'Collaboration',
      description: 'Open source projects & partnerships',
      gradient: 'from-blue-500 to-purple-600',
      accent: 'border-blue-500/50'
    },
    {
      id: 'project',
      icon: Code,
      title: 'Project Inquiry',
      description: 'Custom development solutions',
      gradient: 'from-green-500 to-teal-600',
      accent: 'border-green-500/50'
    },
    {
      id: 'feedback',
      icon: MessageCircle,
      title: 'Feedback',
      description: 'Code reviews & constructive feedback',
      gradient: 'from-orange-500 to-red-600',
      accent: 'border-orange-500/50'
    },
    {
      id: 'idea',
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Breakthrough concepts & research',
      gradient: 'from-yellow-400 to-orange-500',
      accent: 'border-yellow-500/50'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/parhamf6',
      description: 'Open source contributions',
      stats: '10+ repos',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'from-gray-500 to-gray-700'
    },
    // {
    //   name: 'LinkedIn',
    //   icon: Linkedin,
    //   url: '#',
    //   description: 'Professional network',
    //   stats: '100+ connections',
    //   color: 'from-blue-600 to-blue-800',
    //   hoverColor: 'from-blue-500 to-blue-700'
    // },
    // {
    //   name: 'Twitter',
    //   icon: Twitter,
    //   url: '#',
    //   description: 'Tech thoughts & updates',
    //   stats: '10+ followers',
    //   color: 'from-sky-500 to-blue-600',
    //   hoverColor: 'from-sky-400 to-blue-500'
    // },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:parhamfdev@proton.me',
      description: 'parhamfdev@proton.me',
      stats: '24h response',
      color: 'from-primary to-yellow-600',
      hoverColor: 'from-yellow-400 to-yellow-600'
    }
  ];

  const handleIntentSelect = (intent) => {
    setSelectedIntent(intent.id);
    setFormData(prev => ({ ...prev, intent: intent.id, subject: intent.title }));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: '', email: '', subject: '', message: '', intent: '' });
      setSelectedIntent('');
    }, 1500);
  };

  return (
    <div className="min-h-screen  text-foreground overflow-hidden">
      {/* Hero Section - Full Height */}
      <div className="min-h-screen relative">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,58,55,0.3),rgba(255,255,255,0))]"></div>
        {/* <div className="relative h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>
        </div> */}
        {/* Animated Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent animate-pulse"></div>
        </div> */}
        
        {/* Grid Pattern Overlay */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(248,223,11,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(248,223,11,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}

        <div className="relative min-h-screen max-w-7xl mx-auto px-6 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            
            {/* Left Side - Text Content */}
            <div className="space-y-8 flex flex-col justify-center">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur border border-border text-sm w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Available worldwide</span>
              </div> */}
              
              <div className="space-y-6">
                {/* <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Say Hello
                </h1> */}
                <TextType 
                    text={["Say hello", "Contact Me", "Happy Building!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className='text-5xl lg:text-7xl font-bold leading-tight font-serif'
                    />
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  If you’re interested in my work, have questions, or would like to collaborate, please don’t hesitate to reach out. I’ll get back to you as soon as possible.
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.querySelector('#contact-form').scrollIntoView({ behavior: 'smooth' })}
                  className="group px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  Start Collaboration
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="/projects" 
                  className="px-6 py-3 border border-border rounded-lg font-medium hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center"
                >
                  View Projects
                </a>
              </div>
            </div>

            {/* Right Side - Social Cards */}
            <div className="flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                const tiltClass = idx % 2 === 0 ? "group-hover:-rotate-2" : "group-hover:rotate-2";

                return (
                    <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${link.name}`}
                    className={`
                        group relative overflow-hidden transform transition-all duration-300
                        rounded-2xl p-4 flex items-start gap-4 border border-white/10
                        bg-gradient-to-br from-white/3 to-transparent shadow-sm
                        hover:scale-105 ${tiltClass}
                    `}
                    >
                    {/* decorative hover glow */}
                    <span
                        aria-hidden
                        className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-white/5 opacity-0 group-hover:opacity-60 transition-opacity duration-350 blur-xl pointer-events-none"
                    />

                    {/* Icon */}
                    <div
                        className={`
                        relative z-10 flex items-center justify-center w-12 h-12 rounded-lg
                        bg-gradient-to-br ${link.color} text-white shadow-md flex-shrink-0
                        transition-transform duration-300 group-hover:scale-110
                        `}
                    >
                        <Icon className="w-6 h-6" />
                    </div>

                    {/* Text */}
                    <div className="relative z-10 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-white truncate">
                            {link.name}
                        </h3>
                        {link.stats && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/6 text-white/90 whitespace-nowrap">
                            {link.stats}
                            </span>
                        )}
                        </div>

                        {link.description && (
                        <p className="mt-1 text-xs text-white/70 line-clamp-2">
                            {link.description}
                        </p>
                        )}
                    </div>

                    {/* hover overlay */}
                    <div
                        className={`
                        absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 bg-gradient-to-br ${link.hoverColor ?? link.color}
                        mix-blend-overlay
                        `}
                        aria-hidden
                    />
                    </a>
                );
                })}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative  backdrop-blur">
        <div className="relative h-full w-full bg-slate-950">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>
        </div>
        {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(253,58,55,0.3),rgba(255,255,255,0))]" /> */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Intent Selection */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">What brings you here?</h2>
                <p className="text-muted-foreground">Choose the option that best describes your intention</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactIntents.map((intent) => {
                  const Icon = intent.icon;
                  const isSelected = selectedIntent === intent.id;
                  
                  return (
                    <button
                      key={intent.id}
                      onClick={() => handleIntentSelect(intent)}
                      className={`group relative p-6 rounded-xl border transition-all duration-300 text-left hover:scale-105 ${
                        isSelected 
                          ? `${intent.accent} bg-primary/5 scale-105 shadow-lg shadow-primary/20` 
                          : 'border-border bg-card/50 backdrop-blur hover:border-primary/30 hover:bg-primary/5'
                      }`}
                    >
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${intent.gradient} mb-4 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {intent.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {intent.description}
                      </p>

                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="sticky top-8">
              <div id="contact-form" className="bg-card/80 backdrop-blur rounded-2xl border border-border shadow-2xl shadow-primary/5 p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground text-sm">Fill out the form and I'll respond within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground/80">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground/80">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 resize-none backdrop-blur"
                      placeholder="Tell me about your project, idea, or just say hello..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    disabled={true}
                    className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground py-4 rounded-lg font-medium hover:from-primary/90 hover:to-yellow-500/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/20 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {/* Send Message */}
                        On development , use email insted
                      </>
                    )}
                  </button>
                </form>

                {showSuccess && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 text-sm">Message sent! I'll get back to you soon.</span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="sticky top-8">
              <div id="contact-form" className="bg-card/80 backdrop-blur rounded-2xl border border-border shadow-2xl shadow-primary/5 p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground text-sm">Fill out the form and I'll respond within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground/80">Name</label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground/80">Email</label>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 backdrop-blur"
                      placeholder="What's this about?"
                    />
                  </div>
                  <input type="hidden" name="intent" value={formData.intent} />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground/80">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background/50 border border-input rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200 resize-none backdrop-blur"
                      placeholder="Tell me about your project, idea, or just say hello..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground py-4 rounded-lg font-medium hover:from-primary/90 hover:to-yellow-500/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/20 group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Open Email to Send
                  </button>
                </form>

                {showSuccess && (
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-blue-500 text-sm">Email client opened! Send the pre-filled message from your email app.</span>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;