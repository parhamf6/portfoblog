'use client'
import { useRouter } from 'next/navigation'
import { useState , useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface Category {
    id: number
    name: string
    slug: string
}

export default function ProjectCategories() {
    // const [query, setQuery] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    
    const handleCategoryClick = (category: string) => {
        if (category.trim()) {
            setIsSearching(true)
            // Optional delay for visual feedback/loading state
            setTimeout(() => {
                // Redirect to categories page with 'c' parameter
                router.push(`/projects/categories?c=${encodeURIComponent(category.trim())}`)
                setIsSearching(false)
            }, 300)
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const res = await fetch('https://ingenious-blessing-e681962b65.strapiapp.com/api/categories')
            const json = await res.json()
            setCategories(json.data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
        }

        fetchCategories()
    }, [])


    return (
        <div className=" transition-all">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-800 dark:text-gray-100 focus:outline-none"
            >
                <span>Categories</span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                <nav className='flex gap-4 flex-wrap'>
                    <Link
                    className="category-button px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
                    href='/projects'>
                    All
                    </Link>
                    {categories.map((cat) => (
                    <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="category-button px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
                    disabled={isSearching}
                    >
                    {isSearching ? 'Loading...' : cat.name}
                    </button>
                ))}
                    </nav>
            </div>
            </div>
    )
}

