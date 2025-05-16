import { HoverButton } from '@/app/components/ui/21stdev/hover-button';
import { Mail, Github, Linkedin  } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
    return (
        <div className='flex gap-4 items-center justify-between p-4 m-4 border'>
            <div>
                <div>
                    <h2>Get in Touch</h2>
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='hover:scale-110'><Linkedin /></div>
                    <div className='hover:scale-110'><Github /></div>
                    <div className='hover:scale-110'><Mail /></div>
                </div>
            </div>
            <div>
                <Link href="/contact">
                    <HoverButton
                    startColor="#ff6b6b"
                    endColor="#f472b6"
                    animationIntensity="high"
                    className="px-12 py-5 text-xl"
                    >
                        Contact me
                    </HoverButton>
                </Link>
            </div>
        </div>
    );
  }







//   {/* <div className='relative'>
//                 <GlowEffect
//                     colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
//                     mode='colorShift'
//                     blur='soft'
//                     duration={3}
//                     scale={0.9}
//                 />
//                 <button className='relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-2xl text-zinc-50 outline outline-[#fff2f21f]'>
//                     Contact Me <ArrowRight className='h4 w-4' />
//                 </button>
//             </div> */}