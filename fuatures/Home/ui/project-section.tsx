'use client';

import { motion } from 'framer-motion';
import ProjectCard from '../../Projects/projects-page/ui/project-card';
// import { ChevronRight } from 'lucide-react';
import { InteractiveHoverButton } from '../../../app/components/ui/21stdev/cool-hover-btm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProjectPosts } from '@/types/projects';
import { getProjectPosts } from '@/actions/project-actions';

export default function ProjectSection() {
  const [posts, setPosts] = useState<ProjectPosts[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchPosts = async () => {
        try {
          const fetchedPosts = await getProjectPosts();
          // Get only the first 3 posts
          setPosts(fetchedPosts.slice(0, 3));
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);

    if (loading) {
      return (
        <section className="py-20 px-4 md:px-8 border p-4 m-4 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">Loading...</div>
          </div>
        </section>
      );
    }
  




  return (
    <section className="py-20 px-4 md:px-8 border p-4 m-4 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center justify-between ml-4 mr-4'>
          <div className=" mb-12">
            <h2 className="text-4xl font-bold mb-2 dark:text-foreground-dark">Projects</h2>
            <p className="text-textc-light dark:text-textc-dark text-lg">
              Here are some things Ive built recently.
            </p>
          </div>
          {/* <div className='mb-12 p-2 border rounded-2xl bg-[#00B2CA] outline '>
            <a href="" className=' text-textc-light dark:text-textc-dark flex '>See More <span><ChevronRight /></span></a>
          </div> */}
          <div className='relative items-center mb-12 justify-center'>
            <Link href={"/projects"}>
              <InteractiveHoverButton></InteractiveHoverButton>
            </Link>
          </div>
        </div>
        

        <div className="flex flex-wrap justify-center gap-4">
          {posts.map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-[350px] h-[500px]"
                      >
                        <ProjectCard post={post} />
                      </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
