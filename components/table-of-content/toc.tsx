'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (headings.length === 0) return null;

  return (
    <div className="bg-zinc-200 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 transition-all">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-800 dark:text-gray-100 focus:outline-none"
      >
        <span>Table of Contents</span>
        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <nav>
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`ml-${(heading.level - 1) * 4} transition-all duration-300 hover:translate-x-1`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-blue-600 dark:text-yellow-400 hover:underline text-sm"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
