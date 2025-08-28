"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NavigationLink } from "@/components/global/navigation-link"
import dynamic from "next/dynamic"
const commands = [
  { cmd: "ls", output: ["home/", "projects/", "blogs/", "about/", "contact/"] },
  {
    cmd: "whoami",
    output: [
      "developer@portfoblog:~$ A passionate full-stack developer",
      "Building innovative solutions with modern tech",
    ],
  },
  {
    cmd: "help",
    output: [
      "Available commands:",
      "ls - list directories",
      "cd <dir> - navigate to directory",
      "whoami - about me",
      "clear - clear terminal",
      "home - go to homepage",
    ],
  },
  { cmd: "pwd", output: ["/404/lost-in-cyberspace"] },
]

const ClientStars = dynamic(() => import("@/components/client-stars-404"), {ssr:false})

export default function NotFound() {
  const router = useRouter()
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([
    { type: "output", content: "Welcome to the void... 🌌" },
    { type: "output", content: 'Type "help" to see available commands' },
  ])
  const [currentTime, setCurrentTime] = useState("")
  const [glitchText, setGlitchText] = useState("404")
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = ["4", "0", "4", "█", "▓", "▒", "░"]
      const glitched = Array.from("404")
        .map(() =>
          Math.random() > 0.8
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : "404"[Math.floor(Math.random() * 3)],
        )
        .join("")
      setGlitchText(glitched)

      setTimeout(() => setGlitchText("404"), 100)
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim()) return

    // Convert input to lowercase for command processing
    const inputLowerCase = terminalInput.trim().toLowerCase()
    
    const newHistory = [...terminalHistory, { type: "input" as const, content: `$ ${terminalInput}` }]

    const command = commands.find((cmd) => cmd.cmd === inputLowerCase)
    if (command) {
      command.output.forEach((line) => {
        newHistory.push({ type: "output", content: line })
      })
    } else if (inputLowerCase === "clear") {
      setTerminalHistory([])
      setTerminalInput("")
      return
    } else if (inputLowerCase === "home") {
      newHistory.push({ type: "output", content: "Navigating to home..." })
      setTerminalHistory(newHistory)
      setTimeout(() => {
        router.push("/")
      }, 500)
      setTerminalInput("")
      return
    } else if (inputLowerCase.startsWith("cd ")) {
      const dir = inputLowerCase.split(" ")[1]
      newHistory.push({ type: "output", content: `Navigating to /${dir}...` })
      setTerminalHistory(newHistory)
      setTimeout(() => {
        router.push(`/${dir}`)
      }, 1000)
      setTerminalInput("")
      return
    } else {
      newHistory.push({ type: "output", content: `Command not found: ${terminalInput}` })
      newHistory.push({ type: "output", content: 'Type "help" for available commands' })
    }

    setTerminalHistory(newHistory)
    setTerminalInput("")
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(248, 223, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248, 223, 11, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div> */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ClientStars />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 font-mono text-sm text-muted-foreground"
        >
          {currentTime}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-8xl md:text-9xl font-mono font-bold text-primary mb-4 select-none"
            style={{ fontFamily: "var(--font-mono)" }}
            animate={{
              textShadow: [
                "0 0 10px rgba(248, 223, 11, 0.5)",
                "0 0 20px rgba(248, 223, 11, 0.8)",
                "0 0 10px rgba(248, 223, 11, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {glitchText}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist in this
              dimension.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            <div className="bg-muted/20 px-4 py-2 border-b border-border/50 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-sm text-muted-foreground ml-2">terminal@portfoblog:~/404</span>
            </div>

            <div ref={terminalRef} className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-1 bg-background/50">
              <AnimatePresence>
                {terminalHistory.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={entry.type === "input" ? "text-primary" : "text-foreground/80"}
                  >
                    {entry.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                <span className="text-primary">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                  placeholder="Type a command..."
                  autoFocus
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-primary"
                >
                  █
                </motion.span>
              </form>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-4 mt-8 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <NavigationLink href="/">
                <span className="mr-2">🏠</span>
                Go Home
              </NavigationLink>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild variant="outline" className="border-border hover:bg-muted bg-transparent">
              <Link href="/projects">
                <span className="mr-2">💼</span>
                View Projects
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild variant="outline" className="border-border hover:bg-muted bg-transparent">
              <NavigationLink href="/blogs">
                <span className="mr-2">📝</span>
                Read Blog
              </NavigationLink>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground"
        >
          <div>
            System Status: <span className="text-green-400">Online</span>
          </div>
          <div>
            Error Code: <span className="text-primary">404_NOT_FOUND</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}