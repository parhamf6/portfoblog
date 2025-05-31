"use client";

import { useEffect, useState } from 'react';
// import Link from 'next/link';
import BlogCard from '../ui/blog-card';
import { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';
import { getBlogPosts } from '@/actions/blog-actions';
import SearchBar from '@/components/search-bar/SearchBar';
import BlogCategories from '@/components/categories-blog/categories-blog';

export default function BlogPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");



    useEffect(() => {
    const fetchPosts = async () => {
        try {
            setLoading(true); // Also set loading true on sort change
            const fetchedPosts = await getBlogPosts(sortOrder);
            if (!fetchedPosts || fetchedPosts.length === 0) {
                setError("No blog posts found.");
            } else {
                setPosts(fetchedPosts);
                setError(null);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to load blog posts. Please try again later.");
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
            <div className='border p-2 m-4 flex flex-col gap-8'>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className='border p-2 m-4 flex flex-col gap-8'>
                <BlogCategories />
            </div>
            <div className='border m-4 p-2'>
                <div className='flex items-center justify-between'>
                    <div className='p-2 m-2 text-2xl'>
                        <h1>All Posts :</h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sortOrder" className="mr-2 text-sm font-medium">Sort by:</label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                            className="border px-3 py-1 rounded text-sm"
                        >
                            <option className='text-gray-600' value="desc">Newest</option>
                            <option className='text-gray-600' value="asc">Oldest</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {posts && posts.length > 0 ? (
                            posts.map((post: BlogPost, i: number) => (
                                <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="w-[350px] h-[500px]"
                                >
                                <BlogCard post={post} />
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