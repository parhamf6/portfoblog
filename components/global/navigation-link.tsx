"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface NavigationLinkProps {
  href: string
  children: ReactNode
  className?: string
  delay?: number
}

export function NavigationLink({ href, children, className = "", delay = 0 }: NavigationLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Add a small delay for visual feedback before navigation
    setTimeout(() => {
      router.push(href)
    }, delay)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}
