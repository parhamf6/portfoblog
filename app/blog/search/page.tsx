// app/blog/search/page.tsx

export const dynamic = 'force-dynamic'

import qs from 'qs'
import BlogCard from '@/fuatures/Blog/blogs-page/ui/blog-card';
import { STRAPI_API_URL } from '@/config/link_storage';
import Navbar from '@/app/components/ui/global/navbar';
import SearchBar from '@/components/search-bar/SearchBar';
import { Suspense } from 'react';

const API_URL = STRAPI_API_URL

async function getSearchResults(query: string) {
  try {
    if (!query.trim()) {
      console.log('Empty query, returning empty results')
      return []
    }

    const queryString = qs.stringify({
      filters: {
        $or: [
          {
            title: {
              $containsi: query,
            },
          },
          {
            description: {
              $containsi: query,
            },
          },
          {
            slug: {
              $containsi: query,
            },
          }
        ]
      },
      populate: "*"
    })

    console.log('Making API request to:', `${API_URL}/api/articles?${queryString}`)
    console.log('Using token:', process.env.STRAPI_API_TOKEN ? 'Token exists' : 'No token found')

    // Try without auth first to test permissions
    const res = await fetch(`${API_URL}/api/articles?${queryString}`, {
      cache: 'no-store',
    })
    
    // If above fails, try with auth
    // const res = await fetch(`${API_URL}/api/articles?${queryString}`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    //   },
    //   cache: 'no-store',
    // })

    if (!res.ok) {
      console.error('API response not OK:', res.status, res.statusText)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    console.log('API Response:', JSON.stringify(data, null, 2))
    
    // Debug: Check if cover data exists
    if (data.data && data.data.length > 0) {
      console.log('First search result structure:', JSON.stringify(data.data[0], null, 2))
      console.log('Cover data in first result:', data.data[0].cover)
    }
    
    return data.data || []
  } catch (error) {
    console.error('Error in getSearchResults:', error)
    return []
  }
}

// Loading component for search results
function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Spinning circle */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-700 animate-pulse">Searching...</p>
        <p className="text-sm text-gray-500 mt-1">Finding the best articles for you</p>
      </div>
    </div>
  )
}

// Search results component
async function SearchResults({ query }: { query: string }) {
  const results = await getSearchResults(query)
  console.log('Search results:', results)

  // Transform Strapi data to match your BlogPost type
  const transformedResults = results.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    slug: item.slug,
    date: item.date,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    publishedAt: item.publishedAt,
    cover: item.cover, // Include the cover field
    // Add any other fields your BlogPost type expects
  }))

  // Debug: Check transformed results
  console.log('Transformed results with cover:', transformedResults.map(r => ({
    title: r.title,
    hasCover: !!r.cover
  })))

  return (
    <div>
      {transformedResults && transformedResults.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-6">
            Found {transformedResults.length} result{transformedResults.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {transformedResults.map((post: any, i: number) => (
              <div
                key={post.id}
                className="w-[350px] h-[500px] transform transition-all duration-500 hover:scale-105"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center w-full py-8">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">
            No articles found for "{query}". Try a different search term.
          </p>
        </div>
      )}
    </div>
  )
}

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await the searchParams Promise
  const params = await searchParams
  
  // Get the search query from the URL parameters
  const query = params?.q ? String(params.q) : ''
  console.log('SearchPage received params:', params)
  console.log('Processed query:', query)

  return (
    <main>
      <Navbar />
      <div className='border p-2 m-4 flex flex-col gap-8'>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {query ? `Search Results for: "${query}"` : 'Search Articles'}
          </h1>
          
          {!query && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 mb-8 text-lg">
                Please enter a search term to find articles.
              </p>
            </div>
          )}
          
          {query && (
            <Suspense fallback={<SearchLoading />}>
              <SearchResults query={query} />
            </Suspense>
          )}
        </div>
      </div>

    </main>
  )
}