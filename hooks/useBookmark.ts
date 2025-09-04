"use client"

import { useState, useEffect } from "react"

export interface BookmarkHook {
  bookmarkedBlogs: string[]
  isBookmarked: (blogId: string) => boolean
  toggleBookmark: (blogId: string) => void
  clearAllBookmarks: () => void
}

export const useBookmarks = (): BookmarkHook => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfoblog-bookmarks")
    console.log("[v0] Loading bookmarks from localStorage:", saved)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setBookmarkedBlogs(parsed)
          console.log("[v0] Loaded bookmarks:", parsed)
        }
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      console.log("[v0] Saving bookmarks to localStorage:", bookmarkedBlogs)
      localStorage.setItem("portfoblog-bookmarks", JSON.stringify(bookmarkedBlogs))
    }
  }, [bookmarkedBlogs, isLoaded])

  const isBookmarked = (blogId: string): boolean => {
    return bookmarkedBlogs.includes(blogId)
  }

  const toggleBookmark = (blogId: string): void => {
    console.log("[v0] Toggling bookmark for blogId:", blogId)
    setBookmarkedBlogs((prev) => {
      const newBookmarks = prev.includes(blogId) ? prev.filter((id) => id !== blogId) : [...prev, blogId]
      console.log("[v0] New bookmarks state:", newBookmarks)
      return newBookmarks
    })
  }

  const clearAllBookmarks = (): void => {
    setBookmarkedBlogs([])
  }

  return {
    bookmarkedBlogs,
    isBookmarked,
    toggleBookmark,
    clearAllBookmarks,
  }
}
