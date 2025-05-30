"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { toast } from 'sonner';

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const copyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    // toast.success('URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="">
        <div className='p-4 m-8 mt-12'>
            <header className="mb-12 p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-6">
                <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg">
                    {/* <img src="/images/profile.png" alt="" /> */}
                    <Image 
                    src="/images/profile.png" 
                    alt="Profile Picture" 
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-cover"
                    priority
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Parham Forati</h1>
                    <p className="text-xl text-muted-foreground mb-6">Full Stack Developer</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                        href="/John-Doe-CV.pdf" 
                        download
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-medium transition-colors inline-flex items-center"
                    >
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-2"
                        >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        Download CV
                    </a>
                    <button 
                        onClick={copyPageUrl}
                        className="border border-input hover:bg-accent hover:text-accent-foreground px-6 py-2.5 rounded-md font-medium transition-colors inline-flex items-center"
                    >
                        {copied ? (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="mr-2"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                        ) : (
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="mr-2"
                        >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        )}
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                    </div>
                </div>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">About Me</h2>
                <div className="prose prose-lg max-w-none">
                <p>
                    I am a Full Stack Developer with 2+ years of experience building modern web applications.
                    My passion is in creating intuitive user experiences backed by robust architecture.
                    I enjoy tackling complex problems and turning them into simple, elegant solutions.
                </p>
                <p>
                    With a background in self-learning from a young age, I stay up-to-date with
                    the latest technologies and best practices in the field. I thrive in collaborative environments
                    and enjoy the process of transforming ideas into production-ready applications.
                </p>
                <p>
                    My focus is giving life to ideas and learn, i love learning that what i am doing my
                    entire life , the next chapter of my learning after full stack web would be 
                    machine learning and basic cyber security focused on OWASP.
                </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                    <ul className="space-y-2">
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        React.js / Next.js
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        TypeScript / JavaScript
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Tailwind CSS / Styled Components
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Redux / Context API
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        HTML5 / CSS3 
                    </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Backend</h3>
                    <ul className="space-y-2">
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Django
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        MongoDB / PostgreSQL
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        FastAPI
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        GraphQL / REST APIs
                    </li>
                    <li className="flex items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                        >
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Docker / CI/CD
                    </li>
                    </ul>
                </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Experience</h2>
                <div className="space-y-8">
                <div className="group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">Freelancer Full Stack Developer</h3>
                    <span className="text-muted-foreground">2022 - Present</span>
                    </div>
                    <h4 className="text-lg text-primary mb-2">Freelance</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Led development of scalable web applications using Next.js and Node.js</li>
                    <li>Build Back-End Using Python FrameWorks such as Django, FastAPI</li>
                    <li>Design UI/UX for personal project</li>
                    <li>Optimized database queries resulting in 30% improved performance</li>
                    </ul>
                </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Projects</h2>
                <p className="text-muted-foreground mb-6">
                Ive worked on numerous projects throughout my career, ranging from e-commerce platforms to data visualization tools.
                Here are some highlights from my portfolio.
                </p>
                <div className="flex justify-center">
                <Link 
                    href="/projects" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-medium transition-colors inline-flex items-center"
                >
                    View All Projects
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2"
                    >
                    <path d="m9 18 6-6-6-6"/>
                    </svg>
                </Link>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>
                <div className="group mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">Bachelor of Mulcullar Biology</h3>
                    <span className="text-muted-foreground">2024 - Present</span>
                </div>
                <h4 className="text-lg text-primary">University of Scince</h4>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                    <p>Focus of studing the scince of biology in mullcular level , great
                        place for connecting tech knoladge with biology
                    </p>
                </div>
            </section>
            <section className='mt-4'>
                <div className=' pb-2 mb-6 mt-4'></div>
                <div className="group mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">Self-Study Computrer Scince</h3>
                    <span className="text-muted-foreground">2021 - Present</span>
                </div>
                <h4 className="text-lg text-primary">University of Books,Internet</h4>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-secondary/50 px-4 py-2 rounded-md text-sm font-medium">
                    Data Structures & Algorithms
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-md text-sm font-medium">
                    Software Engineering
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-md text-sm font-medium">
                    Database Systems
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-md text-sm font-medium">
                    Web Development
                </div>
                <div className="bg-secondary/50 px-4 py-2 rounded-md text-sm font-medium">
                    Computer Networks
                </div>
                </div>
            </section>
        </div>
    </div>
  );
}