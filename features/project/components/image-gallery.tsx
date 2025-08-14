"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from "lucide-react"

interface ProjectImage {
  id: number
  title: string
  description: string
  url: string
  category: string
}

interface ModernImageGalleryProps {
  images: ProjectImage[]
  title?: string
  subtitle?: string
}

const ModernImageGallery: React.FC<ModernImageGalleryProps> = ({
  images,
  title = "Project Gallery",
  subtitle = "Screenshots and key features showcase",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const currentImage = images[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      prevImage()
    } else if (info.offset.x < -swipeThreshold) {
      nextImage()
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") setIsFullscreen(false)
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  return (
    <>
      <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="relative z-10 p-4 md:p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="px-2 md:px-3 py-1 md:py-1.5 bg-primary/20 border border-primary/30 rounded-full">
                <span className="text-primary text-xs md:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 md:p-2 bg-card/60 hover:bg-card/80 border border-border/50 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-4 md:pb-6">
          {/* Mobile Layout (default) */}
          <div className="block lg:hidden space-y-4">
            {/* Main Image */}
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border border-border/20"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 0.95 }}
              >
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
                >
                  <div className="text-center space-y-3 p-4">
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </motion.div>
                    <div className="space-y-2">
                      <span className="px-2 py-1 bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium rounded-full">
                        {currentImage.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 font-mono bg-muted/20 px-2 py-1 rounded-md break-all">
                      {currentImage.url}
                    </p>
                  </div>
                </motion.div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>

                {/* Progress Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <div className="flex gap-1.5">
                    {images.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-primary w-6" : "bg-border/50 w-1.5 hover:bg-border"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Title and Description */}
            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3 p-4 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-border/30 rounded-xl"
            >
              <motion.h4
                className="text-lg md:text-xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {currentImage.title}
              </motion.h4>
              <motion.p
                className="text-muted-foreground text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentImage.description}
              </motion.p>
              <div className="flex items-center justify-between pt-2 border-t border-border/20">
                <span className="px-2 py-1 bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium rounded-md">
                  {currentImage.category}
                </span>
                <span className="text-xs text-muted-foreground/60">
                  {currentImageIndex + 1} of {images.length}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-muted-foreground">Gallery</h5>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                      index === currentImageIndex
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/30 bg-muted/10 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center mb-0.5 ${
                          index === currentImageIndex ? "bg-primary/20" : "bg-muted/30"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            index === currentImageIndex ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-medium leading-tight truncate w-full ${
                          index === currentImageIndex ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {image.category}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg and up) */}
          <div className="hidden lg:flex gap-6">
            {/* Main Image Display */}
            <div
              className="flex-1 relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border border-border/20">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
                >
                  <div className="text-center space-y-4 p-8">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Play className="w-12 h-12 text-primary" />
                    </motion.div>
                    <div className="space-y-2">
                      <span className="px-3 py-1 bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium rounded-full">
                        {currentImage.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 font-mono bg-muted/20 px-3 py-1 rounded-md">
                      {currentImage.url}
                    </p>
                  </div>
                </motion.div>

                {/* Navigation Arrows */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:scale-110 transition-all duration-200 shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex gap-2">
                    {images.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-primary w-8" : "bg-border/50 w-2 hover:bg-border"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar with Thumbnails and Info */}
            <div className="w-64 space-y-6">
              {/* Thumbnail Gallery */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-muted-foreground">Gallery</h5>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      onClick={() => goToImage(index)}
                      className={`aspect-video rounded-lg border-2 transition-all duration-300 overflow-hidden group ${
                        index === currentImageIndex
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-border/30 bg-muted/10 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center mb-1 ${
                            index === currentImageIndex ? "bg-primary/20" : "bg-muted/30"
                          }`}
                        >
                          <span
                            className={`text-xs font-bold ${
                              index === currentImageIndex ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium leading-tight ${
                            index === currentImageIndex ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {image.category}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Dedicated Title and Description Section */}
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4 p-4 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-border/30 rounded-xl"
              >
                <div className="space-y-3">
                  <motion.h4
                    className="text-xl font-bold text-foreground leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {currentImage.title}
                  </motion.h4>
                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentImage.description}
                  </motion.p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/20">
                  <span className="px-2 py-1 bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium rounded-md">
                    {currentImage.category}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {currentImageIndex + 1} of {images.length}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card transition-all duration-200"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center space-y-4 md:space-y-6 p-6 md:p-12">
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Play className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  </motion.div>
                  <div className="space-y-3">
                    <h4 className="text-xl md:text-3xl font-bold text-foreground">{currentImage.title}</h4>
                    <p className="text-sm md:text-lg text-muted-foreground max-w-2xl">{currentImage.description}</p>
                    <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-secondary/20 border border-secondary/30 text-secondary text-xs md:text-sm font-medium rounded-full">
                        {currentImage.category}
                      </span>
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-primary/20 border border-primary/30 text-primary text-xs md:text-sm font-medium rounded-full">
                        {currentImageIndex + 1} of {images.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ModernImageGallery
