// app/components/ClientStars.tsx
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ClientStars() {
  const [stars, setStars] = useState<{ x: number; y: number; duration: number; delay: number }[]>([])

  useEffect(() => {
    const makeStars = () =>
      Array.from({ length: 20 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))

    setStars(makeStars())

    // Optional: re-generate stars on resize so they reposition
    const onResize = () => setStars(makeStars())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{ x: star.x, y: star.y, opacity: 0 }}
          animate={{ y: [star.y, -100], opacity: [0, 1, 0] }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
          }}
        />
      ))}
    </>
  )
}
