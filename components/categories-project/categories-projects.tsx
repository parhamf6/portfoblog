'use client'
import { useRouter } from 'next/navigation'
import { useState , useEffect } from 'react'



interface Category {
    id: number
    name: string
    slug: string
}

export default function ProjectCategories() {
    const [query, setQuery] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const router = useRouter()
    
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
        <div className='flex gap-4 flex-wrap'>
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
        </div>
    )
}

