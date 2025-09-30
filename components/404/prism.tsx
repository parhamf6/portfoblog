"use client"

import PrismaticBurst from "@/components/404/prismatic-burst"
import { Button } from "@/components/ui/button"
import { Home, Compass, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFoundV2() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Prismatic Burst Background */}
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          intensity={1.5}
          speed={0.3}
          animationType="rotate3d"
          colors={["#f8df0b", "#f82e0b", "#ff6b35", "#ffd700", "#ff4500"]}
          distort={8}
          rayCount={12}
          mixBlendMode="lighten"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Sparkle Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-full bg-primary/20 p-6 backdrop-blur-sm">
              <Sparkles className="h-16 w-16 text-primary" />
            </div>
          </motion.div>

          {/* 404 Number with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text font-serif text-[10rem] font-bold leading-none text-transparent md:text-[14rem]"
            style={{
              backgroundSize: "200% auto",
              animation: "shimmer 3s linear infinite",
            }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 space-y-3"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Lost in the Digital Cosmos
            </h2>
            <p className="mx-auto max-w-lg text-lg text-muted-foreground">
              This page has drifted into another dimension. Let's navigate you back to familiar territory.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 bg-transparent"
            >
              <Link href="/about">
                <Compass className="mr-2 h-5 w-5" />
                Explore Portfolio
              </Link>
            </Button>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 rounded-lg border border-primary/20 bg-card/30 p-4 backdrop-blur-sm"
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Fun fact:</span> The first documented 404 error occurred at
              CERN in 1992.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  )
}
