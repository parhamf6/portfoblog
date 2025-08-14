"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ProcessStage {
  name: string
  duration: string
  description: string
}

interface ProcessFlowData {
  title: string
  description: string
  blogPostUrl: string
  stages: ProcessStage[]
}

interface ProcessFlowProps {
  data: ProcessFlowData
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ data }) => {
  return (
    <Card className="border-0 bg-gradient-to-br from-background via-background to-muted/20">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{data.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{data.description}</p>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0 group">
            <a href={data.blogPostUrl} className="inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Case Study
              <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between">
              {/* Connection Line */}
              <motion.div 
                className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              
              {data.stages.map((stage, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center relative z-10 flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Stage Circle */}
                  <motion.div 
                    className="w-12 h-12 bg-background border-2 border-primary/30 rounded-full flex items-center justify-center mb-4 group hover:border-primary/60 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </motion.div>
                  
                  {/* Stage Content */}
                  <div className="text-center space-y-2 max-w-32">
                    <h4 className="font-semibold text-sm">{stage.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {stage.duration}
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  {index < data.stages.length - 1 && (
                    <motion.div
                      className="absolute top-6 -right-4 text-primary/40"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + 0.8 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {data.stages.map((stage, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-background border-2 border-primary/30 rounded-full flex items-center justify-center shrink-0 mt-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </motion.div>
                
                <div className="flex-1 space-y-2 pb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{stage.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {stage.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </div>
                
                {index < data.stages.length - 1 && (
                  <div className="absolute left-5 mt-12 w-0.5 h-8 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Summary */}
        <motion.div 
          className="mt-8 pt-6 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>{data.stages.length} Stages</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {data.stages.reduce((total, stage) => {
                  const weeks = parseInt(stage.duration.split(' ')[0]) || 0
                  return total + weeks
                }, 0)} Weeks Total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Completed</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default ProcessFlow
