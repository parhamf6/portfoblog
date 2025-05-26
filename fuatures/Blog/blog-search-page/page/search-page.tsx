// app/blog/search/page.tsx

export const dynamic = 'force-dynamic'

import qs from 'qs'
import SearchResult from '@/components/search-bar/SearchResult'
import BlogCard from '../../blogs-page/ui/blog-card';
import { STRAPI_API_URL } from '@/config/link_storage';
import Navbar from '@/app/components/ui/global/navbar';

const API_URL = STRAPI_API_URL




async function getSearchResults(query: string) {
  try {
    if (!query.trim()) {
      console.log('Empty query, returning empty results')
      return []
    }

    const queryString = qs.stringify({
      filters: {
        title: {
          $containsi: query,
        },
      },
      populate: '*',
    })

    console.log('Making API request to:', `${API_URL}/api/articles?${queryString}`)
    console.log('Using token:', process.env.STRAPI_API_TOKEN ? 'Token exists' : 'No token found')

    const res = await fetch(`${API_URL}/api/articles?${queryString}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('API response not OK:', res.status, res.statusText)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    console.log('API Response:', JSON.stringify(data, null, 2))
    return data.data || []
  } catch (error) {
    console.error('Error in getSearchResults:', error)
    return []
  }
}

interface SearchPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function SearchPage({ searchParams = {} }: SearchPageProps) {
  // Get the search query from the URL parameters
  const query = searchParams?.q ? String(searchParams.q) : ''
  console.log('SearchPage received params:', searchParams)
  console.log('Processed query:', query)
  
  const results = await getSearchResults(query)
  console.log('Search results:', results)

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {query ? `Search Results for: "${query}"` : 'Search Articles'}
          </h1>
          
          {!query && (
            <p className="text-gray-600 mb-8">
              Please enter a search term to find articles.
            </p>
          )}
          
          <div>
            showind data here with blog card
          </div>
        </div>
      </div>
    </main>
  )
}
