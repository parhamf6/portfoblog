// app/projects/categories/page.tsx
export const dynamic = 'force-dynamic'
import qs from 'qs'
import ProjectCard from '@/fuatures/Projects/projects-page/ui/project-card';
import { STRAPI_API_URL } from '@/config/link_storage';
import Navbar from '@/app/components/ui/global/navbar';
import ProjectCategories from '@/components/categories-project/categories-projects';
import SearchBar from '@/components/search-bar/SearchBar';
import { Suspense } from 'react';

const API_URL = 'https://ingenious-blessing-e681962b65.strapiapp.com'

async function getCategoryResults(category: string) {
  try {
    if (!category.trim()) {
      console.log('Empty category, returning empty results')
      return []
    }

    const queryString = qs.stringify({
      filters: {
        $or: [
          {
            category: {
              name: {
                $containsi: category,
              },
            },
          },
          {
            category: {
              slug: {
                $containsi: category,
              },
            },
          },
        ]
      },
      populate: {
        category: true,
        cover: true,
      }
    })

    console.log('Making API request to:', `${API_URL}/api/projects?${queryString}`)
    
    const res = await fetch(`${API_URL}/api/projects?${queryString}`, {
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
    console.error('Error in getCategoryResults:', error)
    return []
  }
}

// Loading component for category results
function CategoryLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-700 animate-pulse">Loading category...</p>
        <p className="text-sm text-gray-500 mt-1">Finding projects in this category</p>
      </div>
    </div>
  )
}

// Category results component
async function CategoryResults({ category }: { category: string }) {
  const results = await getCategoryResults(category)
  console.log('Category results:', results)
  
  // Transform Strapi data to match your ProjectPost type
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
    cover: item.cover,
  }))

  return (
    <div>
      {transformedResults && transformedResults.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-6">
            Found {transformedResults.length} article{transformedResults.length !== 1 ? 's' : ''} in "{category}" category
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {transformedResults.map((post: any, i: number) => (
              <div
                key={post.id}
                className="w-[350px] h-[500px] transform transition-all duration-500 hover:scale-105"
              >
                <ProjectCard post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center w-full py-8">
          <div className="text-6xl mb-4">📂</div>
          <p className="text-gray-600 text-lg">
            No projects found in "{category}" category.
          </p>
        </div>
      )}
    </div>
  )
}

interface CategoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CategoryPage({ searchParams }: CategoryPageProps) {
  // Await the searchParams Promise
  const params = await searchParams
  
  // Get the category from the URL parameters
  const category = params?.c ? String(params.c) : ''
  console.log('CategoryPage received params:', params)
  console.log('Processed category:', category)

  return (
    <main>
      <Navbar />
      <div className='border p-2 m-4 flex flex-col gap-8'>
        <div>
          <SearchBar />
        </div>
        <div>
          <ProjectCategories />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {category ? `Category: "${category}"` : 'Browse Categories'}
          </h1>
          
          {!category && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <p className="text-gray-600 mb-8 text-lg">
                Please select a category to view articles.
              </p>
            </div>
          )}
          
          {category && (
            <Suspense fallback={<CategoryLoading />}>
              <CategoryResults category={category} />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  )
}