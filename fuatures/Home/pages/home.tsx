'use client'
import Navbar from '@/app/components/ui/global/navbar';
import { TextScramble } from '../ui/text-scrample'; 
import ContactSection from '@/fuatures/Contact/ui/contact-hero';
import ProjectSection from '../ui/project-section';
import { TextShimmer } from '../ui/text-shimmer';
import Link from 'next/link';
import BlogSection from '../ui/blog-section';
export default function HomePage() {
    return (
        <main>
        <div className='flex items-center justify-between'>
            <Navbar/>
        </div>
        <div className='flex flex-col gap-2 h-1/2'>
            <div className='border m-4 p-2 w-{50%} h-{50%}'>
                <TextScramble className="font-mono uppercase text-2xl" duration={3}>
                    Think, Build, Deploy
                </TextScramble>
            </div>
            <div className='border p-4 m-4'>
                <div>
                    <h1 className='text-8xl'>Hello World!</h1>
                </div>
                <div>
                    <p>My name is <span className='font-bold'>Parham Forati</span>, Im a passionate developer who loves learning and constantly seeks out challenges and projects that push my limits. Growth through solving hard problems is what drives me.</p>
                </div>
                <div className='flex items-center mt-2'>
                    <Link href="/about">
                        <TextShimmer
                            duration={1.2}
                            className='text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]'
                            >
                            More About Me
                        </TextShimmer> 
                    </Link>
                </div>
            </div>
            <div>
                <ContactSection></ContactSection>
            </div>
            <div>
                <ProjectSection/>
            </div>
            <div>
                <BlogSection></BlogSection>
            </div>
        </div>
        </main>
    );
}

