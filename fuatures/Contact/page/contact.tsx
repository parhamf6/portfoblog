"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/ui/global/navbar';
// import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
    //   toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <main>
        <div>
            <Navbar></Navbar>
        </div>
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center border p-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a project in mind or want to discuss potential opportunities? Id love to hear from you.
                </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border transition-all hover:shadow-md">
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-medium mb-1">Email</h3>
                        <p className="text-muted-foreground mb-2">Feel free to email me directly</p>
                        <a 
                            href="mailto:hello@example.com" 
                            className="text-primary hover:underline"
                        >
                            hello@example.com
                        </a>
                        </div>
                    </div>
                    </div>

                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border transition-all hover:shadow-md">
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary"
                        >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
                        <p className="text-muted-foreground mb-2">Connect with me professionally</p>
                        <a 
                            href="https://linkedin.com/in/johndoe" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            linkedin.com/in/johndoe
                        </a>
                        </div>
                    </div>
                    </div>

                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border transition-all hover:shadow-md">
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-medium mb-1">GitHub</h3>
                        <p className="text-muted-foreground mb-2">Check out my code and projects</p>
                        <a 
                            href="https://github.com/johndoe" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            github.com/johndoe
                        </a>
                        </div>
                    </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="Your name"
                    />
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                    />
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Write your message here..."
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                    {submitting ? (
                        <div className="flex items-center">
                        <svg 
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                            ></circle>
                            <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Sending...
                        </div>
                    ) : (
                        "Send Message"
                    )}
                    </button>
                </form>
                </div>

                <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold mb-4">Looking for a Developer?</h2>
                <p className="text-muted-foreground mb-6">
                    If youre looking for a skilled developer to join your team or help with your project, 
                    Id be happy to discuss how my skills align with your needs. Im currently open to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
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
                    <span>Teaching</span>
                    </div>
                    <div className="flex items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
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
                    <span>Contract projects</span>
                    </div>
                    <div className="flex items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
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
                    <span>Freelance work</span>
                    </div>
                    <div className="flex items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
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
                    <span>Consulting</span>
                    </div>
                </div>
                <Link 
                    href="/about" 
                    className="text-primary hover:underline font-medium inline-flex items-center"
                >
                    Learn more about my experience
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
                    className="ml-1"
                    >
                    <path d="m9 18 6-6-6-6"/>
                    </svg>
                </Link>
                </div>
            </div>
            </div>
    </main>
  );
}












// 'use client'
// import Navbar from '../global/navbar';
// import { TextScramble } from '../text-scrample';
// import { Mail } from 'lucide-react';
// export default function ContactPage() {
//     return (
//         <main>
//         <div className='flex items-center justify-between'>
//             <Navbar/>
//         </div>
//         <div className='flex flex-col gap-2 h-1/2'>
//             <div className='border m-4 p-2 w-{50%} h-{50%}'>
//                 <TextScramble className="font-mono uppercase text-2xl" duration={3}>
//                     Think, Build, Deploy
//                 </TextScramble>
//             </div>
//             <div className='border m-4 p-2 flex flex-col gap-4'>
//                 <h1 className='text-2xl font-bold'>Contact me</h1>
//                 <div className='flex items-center justify-between'>
//                     <div>
//                         Contact Via Email : 
//                     </div>
//                     <div className='flex gap-2 items-center'>
//                         <h2>Parhamfdev@proton.me</h2>
//                         <Mail />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </main>
//     );
// }

