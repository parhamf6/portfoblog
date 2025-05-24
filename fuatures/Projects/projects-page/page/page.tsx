"use client";

import { useEffect, useState } from 'react';
// import Link from 'next/link';
import Navbar from '@/app/components/ui/global/navbar';
import ProjectCard from '@/fuatures/Projects/projects-page/ui/project-card';
import { ProjectPosts } from '@/types/projects';
import { motion } from 'framer-motion';
import { getProjectPosts } from '@/actions/project-actions';

export default function ProjectPage() {
    const [posts, setPosts] = useState<ProjectPosts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getProjectPosts(sortOrder);
                if (!fetchedPosts || fetchedPosts.length === 0) {
                    setError('No blog posts found.');
                } else {
                    setPosts(fetchedPosts);
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load Project posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [sortOrder]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <main>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='border p-2 m-4 flex flex-col gap-8'>
                <div>
                    <h1 className='text-center font-bold'>Put the Search Here</h1>
                </div>
                {/* <div className='flex gap-2 flex-col '>
                    <div>
                        Filter by category :
                    </div>
                    <div className='flex'>
                        <div className='p-2 m-2 border rounded-[16px]'>
                            Back-End
                        </div>
                        <div className='p-2 m-2 border rounded-[16px]'>
                            Front-End
                        </div>
                        <div className='p-2 m-2 border rounded-[16px]'>
                            Python
                        </div>
                        <div className='p-2 m-2 border rounded-[16px]'>
                            JavaScript
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='border m-4 p-2'>
                <div className='flex items-center justify-between'>
                    <div className=' p-2 mb-4 mt-4 text-2xl'>
                        <h1>All Posts :</h1>
                    </div>
                    <div className=" p-2 mb-4 mt-4 ">
                        <label htmlFor="sortOrder" className="mr-2 text-sm font-medium">Sort by:</label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                            className="border px-3 py-1 rounded text-sm"
                        >
                            <option value="desc">Newest</option>
                            <option value="asc">Oldest</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {posts && posts.length > 0 ? (
                            posts.map((post: ProjectPosts, i: number) => (
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
                            ))
                        ) : (
                            <div className="text-center w-full py-8">
                                No blog posts available.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}






{/* <div className='text-4xl font-bold'>
                        <h1>Top Blog Posts</h1>
                    </div>
                    <div>
                        <div className='border m-8 mr-16 ml-16'></div>
                    </div> */}