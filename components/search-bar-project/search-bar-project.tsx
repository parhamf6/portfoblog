'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBarProject() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsSearching(true)
      // Add a small delay to show the loading state
      setTimeout(() => {
        router.push(`/projects/search?q=${encodeURIComponent(query.trim())}`)
        setIsSearching(false)
      }, 300)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="border rounded p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          disabled={isSearching}
        />
        {/* Search icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
          ) : (
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSearching || !query.trim()}
        className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
          isSearching || !query.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-600 active:transform active:scale-95'
        }`}
      >
        {isSearching ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Searching...</span>
          </div>
        ) : (
          'Search'
        )}
      </button>
    </form>
  )
}


// import { useRouter, useSearchParams } from 'next/navigation'
// import { useState, useEffect } from 'react'

// export default function SearchBar() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [query, setQuery] = useState('')

//   // Initialize query from URL if present
//   useEffect(() => {
//     const urlQuery = searchParams.get('q')
//     if (urlQuery) {
//       setQuery(urlQuery)
//     }
//   }, [searchParams])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     const trimmed = query.trim()
//     console.log('SearchBar - Original query:', query)
//     console.log('SearchBar - Trimmed query:', trimmed)
    
//     if (trimmed) {
//       const searchUrl = `/blog/search?q=${encodeURIComponent(trimmed)}`
//       console.log('SearchBar - Navigating to:', searchUrl)
//       router.push(searchUrl)
//     }
//   }

//   return (
//     <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => {
//             console.log('SearchBar - Input changed:', e.target.value)
//             setQuery(e.target.value)
//           }}
//           placeholder="Search articles..."
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   )
// }
