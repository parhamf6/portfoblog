"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const statusVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-default select-none",
  {
    variants: {
      variant: {
        live: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:bg-emerald-500/30 hover:shadow-emerald-500/20",
        maintained:
          "bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/10 hover:bg-primary/30 hover:shadow-primary/20",
        archived: "bg-muted text-muted-foreground border border-border hover:bg-muted/80",
        development:
          "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10 hover:bg-blue-500/30 hover:shadow-blue-500/20",
        paused:
          "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/10 hover:bg-orange-500/30 hover:shadow-orange-500/20",
        deprecated:
          "bg-secondary/20 text-secondary border border-secondary/30 shadow-lg shadow-secondary/10 hover:bg-secondary/30 hover:shadow-secondary/20",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      animated: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "live",
      size: "default",
      animated: true,
    },
  },
)

const statusConfig = {
  live: {
    label: "Live",
    icon: "●",
    description: "Currently deployed and active",
  },
  maintained: {
    label: "Maintained",
    icon: "◐",
    description: "Actively maintained and updated",
  },
  archived: {
    label: "Archived",
    icon: "◯",
    description: "No longer actively maintained",
  },
  development: {
    label: "In Development",
    icon: "◑",
    description: "Currently being developed",
  },
  paused: {
    label: "Paused",
    icon: "⏸",
    description: "Development temporarily paused",
  },
  deprecated: {
    label: "Deprecated",
    icon: "⚠",
    description: "No longer recommended for use",
  },
}

export interface ProjectStatusProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
  variant: keyof typeof statusConfig
  showTooltip?: boolean
  pulseAnimation?: boolean
}

const ProjectStatus = React.forwardRef<HTMLDivElement, ProjectStatusProps>(
  ({ className, variant, size, animated, showTooltip = true, pulseAnimation = false, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const config = statusConfig[variant]

    const pulseVariants = {
      pulse: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
    }

    const iconVariants = {
      idle: {
        scale: 1,
        rotate: 0,
        opacity: 0.8,
      },
      hover: {
        scale: 1.2,
        rotate: variant === "development" ? 360 : 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    }

    const tooltipVariants = {
      hidden: {
        opacity: 0,
        y: 10,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
    }

    return (
      <div className="relative inline-block">
        <motion.div
          ref={ref}
          className={cn(statusVariants({ variant, size, animated, className }))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={pulseAnimation && variant === "live" ? "pulse" : ""}
          variants={pulseVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          <motion.span
            className="inline-block"
            variants={iconVariants}
            initial="idle"
            animate={isHovered ? "hover" : "idle"}
          >
            {config.icon}
          </motion.span>
          <span className="font-medium tracking-wide">{config.label}</span>

          {/* Subtle glow effect for active states */}
          {(variant === "live" || variant === "development") && (
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              animate={{
                opacity: isHovered ? 0.1 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              style={{
                background:
                  variant === "live"
                    ? "radial-gradient(circle, rgb(34 197 94) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgb(59 130 246) 0%, transparent 70%)",
                filter: "blur(8px)",
                zIndex: -1,
              }}
            />
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && isHovered && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-xs text-card-foreground whitespace-nowrap z-50"
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {config.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

ProjectStatus.displayName = "ProjectStatus"

export { ProjectStatus, statusVariants, statusConfig }
