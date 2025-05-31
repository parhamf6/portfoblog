'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, Twitter, Linkedin } from 'lucide-react';

const ShareButton = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const fullUrl = typeof window !== 'undefined' ? window.location.origin + pathname : '';

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(fullUrl);
        alert('Link copied to clipboard!');
        setOpen(false);
    };

    const shareTo = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}`,
    };

    return (
        <div className="relative inline-block text-left mt-4">
        <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-yellow-100 dark:hover:bg-yellow-900 transition text-sm"
        >
            <Share2 size={16} />
            Share
        </button>

        <AnimatePresence>
            {open && (
            <motion.div
                className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 p-2 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                <button
                onClick={copyToClipboard}
                className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-yellow-50 dark:hover:bg-zinc-700"
                >
                <Copy size={16} className="mr-2" /> Copy Link
                </button>
                <a
                href={shareTo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-yellow-50 dark:hover:bg-zinc-700"
                >
                <Twitter size={16} className="mr-2" /> Twitter
                </a>
                <a
                href={shareTo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-yellow-50 dark:hover:bg-zinc-700"
                >
                <Linkedin size={16} className="mr-2" /> LinkedIn
                </a>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
    };

export default ShareButton;
