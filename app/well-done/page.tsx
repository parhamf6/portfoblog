"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation'; // Added for navigation
import { Button } from '@/components/ui/button';

// ====================================================================
// CONFIGURATION & DATA SECTION
// ====================================================================
// Easy to modify portfolio data - update this section to customize
const portfolioData = {
  personal: {
    name: "Parham Forati",
    title: "Full-Stack Developer",
    location: "Tehran ,Iran",
    email: "parhamfdev@proton.me",
    phone: "no mate use email",
    website: "https://portfoblog-front-private.vercel.app/",
    tagline: "Building the future, one line of code at a time",
    story: [
      "🌟 My journey started with curiosity and a simple 'Hello World'",
      "💻 From breaking things to building solutions, I discovered my passion",
      "🚀 Today, I craft digital experiences that make a difference",
      "🎯 Always learning, always growing, always coding with purpose"
    ]
  },
  
  // App routes - modify these to match your actual routes
  routes: {
    home: { path: "/", description: "Welcome page and introduction" },
    about: { path: "/about", description: "Learn more about me" },
    projects: { path: "/projects", description: "My work and creations" },
    blogs: { path: "/blogs", description: "Thoughts and tutorials" },
    contact: { path: "/contact", description: "Get in touch" },
  },
  skills: [
    { name: "TypeScript", level: 95, color: "bg-[oklch(0.55_0.18_240)]", category: "Languages" },
    { name: "React/Next.js", level: 90, color: "bg-[oklch(0.65_0.18_200)]", category: "Frontend" },
    { name: "Node.js", level: 85, color: "bg-[oklch(0.55_0.15_140)]", category: "Backend" },
    { name: "Python", level: 100, color: "bg-[oklch(0.55_0.18_240)]", category: "Languages" },
    { name: "PostgreSQL", level: 88, color: "bg-[oklch(0.55_0.18_240)]", category: "Database" },
    { name: "Docker", level: 82, color: "bg-[oklch(0.65_0.18_200)]", category: "DevOps" },
    { name: "PHP", level: 75, color: "bg-[oklch(0.7_0.2_30)]", category: "Languages" },
    { name: "Tailwind CSS", level: 90, color: "bg-[oklch(0.65_0.18_200)]", category: "Frontend" }
  ],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "Freelance",
      period: "2022 - Present", // Added duration field
      description: "Leading development of scalable web applications serving 100k+ users.",
      achievements: ["40% performance improvement",]
    },
  ],
  projects: [
    { 
      name: "Portfoblog", 
      tech: "React, Next.js, TypeScript", // Fixed typo in Next.js
      status: "Live",
      description: "Portfolio Blog for developers(your in it right now)",
      link: "https://github.com/parhamf6/portfoblog"
    },
    { 
      name: "Developers Tools Dashboard", // Fixed typo in name
      tech: "Next.js, TypeScript, React", 
      status: "In Progress/Live",
      description: "collection of useful daily tools for developers",
      link: "https://devhub-taupe.vercel.app/"
    },
  ]
};
// Fun content arrays - add more jokes, quotes, facts
const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why don't programmers like nature? It has too many bugs! 🌿",
  "What's the object-oriented way to become wealthy? Inheritance! 💰",
  "Why did the programmer quit his job? He didn't get arrays! 📊",
  "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
  "Why do Java developers wear glasses? Because they don't see sharp! 👓",
  "How do you comfort a JavaScript bug? You console it! 🤗",
  "I'd tell them a UDP joke but there's no guarantee that they would get it.",
  "C and C++ went to a five star bar, C was stopped by the gate guards because C got no class.",
];
const quotes = [
  "\"Code is poetry written in logic.\" - Anonymous",
  "\"The best error message is the one that never shows up.\" - Thomas Fuchs", 
  "\"Programs must be written for people to read.\" - Harold Abelson",
  "\"Simplicity is the ultimate sophistication.\" - Leonardo da Vinci",
  "\"First, solve the problem. Then, write the code.\" - John Johnson",
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
  "\"The only way to learn a new programming language is by writing programs in it.\" - Dennis Ritchie",
  "\"Code never lies, comments sometimes do.\" - Ron Jeffries",
  "\"NVIDIA, FUCK YOU.\" - Linus Torvalds"
];
const techFacts = [
  "🚀 The first computer bug was an actual bug - a moth found in a Harvard computer in 1947!",
  "💾 The term 'byte' comes from 'bite' but was spelled differently to avoid confusion with 'bit'",
  "🌐 The first website ever created is still online: http://info.cern.ch/hypertext/WWW/TheProject.html",
  "🔐 The '@' symbol was used in email addresses because it was the only symbol available on keyboards that wasn't used in names",
  "⚡ JavaScript was created in just 10 days by Brendan Eich in 1995",
  "🐍 Python was named after the British comedy group 'Monty Python'",
  "☕ Java was originally called 'Oak' but was renamed due to trademark issues"
];
// ====================================================================
// GAME COMPONENTS SECTION
// ====================================================================
// Guess the Number Game
const GuessGame = ({ onExit }) => {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Guess a number between 1 and 100!');
  const [gameOver, setGameOver] = useState(false);
  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a valid number between 1 and 100');
      return;
    }
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (num === target) {
      setMessage(`🎉 Correct! You got it in ${newAttempts} attempts!`);
      setGameOver(true);
    } else if (num < target) {
      setMessage(`📈 Too low! Try higher. (Attempt ${newAttempts})`);
    } else {
      setMessage(`📉 Too high! Try lower. (Attempt ${newAttempts})`);
    }
    setGuess('');
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onExit();
      if (e.key === 'Enter' && !gameOver) handleGuess();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onExit, gameOver, guess]);
  return (
    <div className="text-center p-4">
      <div className="text-primary text-xl mb-4">🎯 Guess the Number!</div>
      <div className="mb-4 text-foreground">{message}</div>
      {!gameOver && (
        <div className="mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="bg-card border border-border rounded px-3 py-2 text-foreground mr-2"
            placeholder="Enter your guess"
            min="1"
            max="100"
            autoFocus
          />
          <button
            onClick={handleGuess}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
          >
            Guess!
          </button>
        </div>
      )}
      <div className="text-muted-foreground text-sm">
        {gameOver ? 'Press ESC to exit' : 'Press ESC to exit, Enter to submit'}
        
      </div>
      <Button
        onClick={onExit}
        className='mt-4'
        aria-label="Go back"
        >
          Go Back     
      </Button>
    </div>
  );
};
// Rock Paper Scissors Game
const RockPaperScissors = ({ onExit }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [lastRound, setLastRound] = useState(null);
  const [rounds, setRounds] = useState(0);
  const choices = ['🪨', '📄', '✂️'];
  const choiceNames = ['rock', 'paper', 'scissors'];
  const play = (playerChoice) => {
    const computerChoice = Math.floor(Math.random() * 3);
    const newRounds = rounds + 1;
    setRounds(newRounds);
    let result;
    if (playerChoice === computerChoice) {
      result = 'tie';
    } else if (
      (playerChoice === 0 && computerChoice === 2) ||
      (playerChoice === 1 && computerChoice === 0) ||
      (playerChoice === 2 && computerChoice === 1)
    ) {
      result = 'win';
      setPlayerScore(prev => prev + 1);
    } else {
      result = 'lose';
      setComputerScore(prev => prev + 1);
    }
    setLastRound({
      player: playerChoice,
      computer: computerChoice,
      result,
      round: newRounds
    });
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onExit();
      if (e.key === '1') play(0);
      if (e.key === '2') play(1);
      if (e.key === '3') play(2);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onExit]);
  return (
    <div className="text-center p-4">
      <div className="text-primary text-xl mb-4">🎮 Rock Paper Scissors</div>
      
      <div className="mb-4">
        <div className="text-lg mb-2">
          You: {playerScore} | Computer: {computerScore}
        </div>
        
        {lastRound && (
          <div className="mb-4 p-3 bg-card rounded border border-border">
            <div className="text-lg mb-2">
              {choices[lastRound.player]} vs {choices[lastRound.computer]}
            </div>
            <div className={`font-bold ${
              lastRound.result === 'win' ? 'text-primary' :
              lastRound.result === 'lose' ? 'text-secondary' : 'text-muted-foreground'
            }`}>
              {lastRound.result === 'win' ? '🎉 You Win!' :
               lastRound.result === 'lose' ? '💥 You Lose!' : '🤝 It\'s a Tie!'}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2 mb-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            className="bg-card hover:bg-muted border border-border rounded px-4 py-2 mx-2 text-2xl transition-colors"
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="text-muted-foreground text-sm flex flex-col gap-4">
        Click buttons or press 1, 2, 3 keys | ESC to exit
        <div >
        <Button
        onClick={onExit}
        aria-label="Go back"
        >
          Go Back     
        </Button>
      </div>
      </div>
      
    </div>
  );
};
// Typing Speed Test Game
const TypingTest = ({ onExit }) => {
  const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "JavaScript is a versatile programming language",
    "React makes building user interfaces enjoyable",
    "TypeScript adds static typing to JavaScript",
    "CSS Grid and Flexbox are powerful layout tools"
  ];
  const [currentSentence] = useState(sentences[Math.floor(Math.random() * sentences.length)]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    if (userInput === currentSentence && !finished) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsTyped = currentSentence.split(' ').length;
      setWpm(Math.round(wordsTyped / timeInMinutes));
      setFinished(true);
    }
    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentSentence[i]) correct++;
    }
    setAccuracy(userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 100);
  }, [userInput, currentSentence, startTime, finished]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onExit]);
  return (
    <div className="p-4">
      <div className="text-primary text-xl mb-4 text-center">⌨️ Typing Speed Test</div>
      
      <div className="mb-4 flex justify-center gap-8 text-sm">
        <div>WPM: <span className="text-primary font-bold">{wpm}</span></div>
        <div>Accuracy: <span className="text-primary font-bold">{accuracy}%</span></div>
      </div>
      <div className="mb-4 p-4 bg-card rounded border border-border font-mono text-lg leading-relaxed">
        {currentSentence.split('').map((char, index) => (
          <span
            key={index}
            className={
              index < userInput.length
                ? userInput[index] === char
                  ? 'text-primary bg-primary/20'
                  : 'text-secondary bg-secondary/20'
                : index === userInput.length
                ? 'bg-primary/50 animate-pulse'
                : 'text-muted-foreground'
            }
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => !finished && setUserInput(e.target.value)}
        className="w-full bg-background border border-border rounded px-3 py-2 font-mono text-foreground"
        placeholder={finished ? "Test completed! Press ESC to exit" : "Start typing here..."}
        disabled={finished}
        autoFocus
      />
      {finished && (
        <div className="mt-4 p-3 bg-primary/10 rounded text-center">
          <div className="text-primary font-bold text-lg">🎉 Test Complete!</div>
          <div className="text-sm text-muted-foreground">Press ESC to exit</div>
        </div>
      )}
    </div>
  );
};
// Matrix Effect Component (Enhanced)
const MatrixEffect = ({ onExit }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);
    const draw = () => {
      ctx.fillStyle = 'rgba(21, 25, 41, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#f8df0b';
      ctx.font = fontSize + 'px monospace';
      
      drops.forEach((y, index) => {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, index * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }
        drops[index]++;
      });
    };
    const interval = setInterval(draw, 35);
    
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onExit]);
  return (
    <div className="text-center p-4">
      <div className="text-primary mb-4 text-xl">🌐 Welcome to the Matrix</div>
      <canvas ref={canvasRef} className="border border-primary rounded mx-auto" />
      <div className="text-muted-foreground text-sm mt-4">
        "There is no spoon" - Press ESC to return to reality
      </div>
      <Button
        onClick={onExit}
        className='mt-4'
        aria-label="Go back"
        >
          Go Back     
      </Button>
    </div>
  );
};
// ====================================================================
// COMMAND SYSTEM SECTION
// ====================================================================
// This is where all terminal commands are defined
const commandSystem = {
  // Navigation Commands
  help: {
    description: "Show all available commands with categories",
    category: "Navigation",
    execute: () => ({
      output: [
        "🚀 Available Commands:",
        "",
        "📁 Navigation & File System:",
        "├── ls              - List all available routes",
        "├── cd <route>      - Navigate to a route (home, about, projects, blogs, contact)",
        // "├── pwd             - Show current location",
        "└── help            - Show this help menu",
        "",
        "👤 Portfolio & Info:",
        "├── about           - Personal information and background",
        "├── story           - My journey and experiences", 
        "├── skills          - Technical skills with proficiency levels",
        "├── experience      - Professional work history",
        "├── projects        - Featured projects and work",
        "└── contact         - Contact information and social links",
        // "└── resume          - Professional resume",
        "",
        "🎮 Games & Entertainment:",
        "├── guess           - Number guessing game",
        "├── rps             - Rock Paper Scissors",
        // "├── typing          - Typing speed test",
        "└── matrix          - Enter the Matrix",
        // "└── trivia          - Tech trivia questions",
        "",
        "🛠️ Utilities & Fun:",
        "├── joke            - Random programming joke",
        "├── quote           - Inspirational developer quote",
        "├── fact            - Interesting tech fact",
        // "├── coffee          - ASCII coffee art",
        // "├── weather         - Current weather info",
        "├── time            - Current date and time",
        "└── clear           - Clear the terminal",
        "",
        "💡 Pro Tips:",
        "• Use TAB for autocompletion",
        "• Use ↑↓ arrows for command history", 
        "• Type 'cd' followed by any route to navigate",
        "• All commands are case-insensitive"
      ]
    })
  },
  ls: {
    description: "List all available app routes",
    category: "Navigation",
    execute: () => ({
      output: [
        "📂 Available Routes:",
        "",
        ...Object.entries(portfolioData.routes).map(([route, info]) => 
          `${route.padEnd(12)} -> ${info.path.padEnd(12)} | ${info.description}`
        ),
        "",
        "💡 Use 'cd <route>' to navigate to any of these routes",
        "📝 Example: cd projects"
      ]
    })
  },
  cd: {
    description: "Navigate to different app routes",
    category: "Navigation", 
    execute: (cmd, _, router) => { // Added router parameter
      const parts = cmd.split(' ');
      if (parts.length < 2) {
        return {
          output: [
            "❌ Usage: cd <route>",
            "📁 Available routes: " + Object.keys(portfolioData.routes).join(', '),
            "💡 Example: cd projects"
          ]
        };
      }
      const route = parts[1].toLowerCase();
      if (portfolioData.routes[route]) {
        return {
          output: [
            `🚀 Navigating to /${route}...`,
            `📍 Destination: ${portfolioData.routes[route].description}`,
            `🔗 URL: ${portfolioData.routes[route].path}`,
            "",
            "✨ Redirecting now..."
          ],
          navigate: route,
          router: router // Pass router for actual navigation
        };
      } else {
        return {
          output: [
            `❌ Route '${route}' not found`,
            "📁 Available routes: " + Object.keys(portfolioData.routes).join(', ')
          ]
        };
      }
    }
  },
  pwd: {
    description: "Show current working directory", 
    category: "Navigation",
    execute: () => ({
      output: [
        "📍 Current Location: /portfolio/terminal",
        "🌐 Domain: yourwebsite.com",
        "🗂️ Context: Interactive Terminal Session"
      ]
    })
  },
  // Portfolio Information Commands
  about: {
    description: "Personal information and background",
    category: "Portfolio",
    execute: () => ({
      output: [
        `╭─ About ${portfolioData.personal.name} ───────────────────╮`,
        `│ Title:    ${portfolioData.personal.title.padEnd(25)}    │`,
        `│ Location: ${portfolioData.personal.location.padEnd(25)} │`,
        `│ Email:    ${portfolioData.personal.email.padEnd(25)}    │`,
        // `│ Website:  ${portfolioData.personal.website.padEnd(25)} │`,
        `╰─────────────────────────────────────────╯`,
        "",
        `🎯 ${portfolioData.personal.tagline}`,
        "",
        "💡 Always exploring new technologies and best practices", 
        "🌟 Open to collaboration and exciting opportunities",
        "",
        "💬 Want to know my story? Type 'story'"
      ]
    })
  },
  story: {
    description: "My journey and personal story",
    category: "Portfolio",
    execute: () => ({
      output: [
        "📖 My Story:",
        "",
        ...portfolioData.personal.story,
        "",
        "🎭 The chapters so far:",
        "├── Chapter 1: The Curious Beginner",
        "│   Started with Python, fell in love with problem-solving",
        "├── Chapter 2: The Learning Journey", 
        "│   Dove deep into JavaScript, React, and backend technologies",
        "├── Chapter 3: The Professional Growth",
        "│   Built real products to solve real problems for me and developers",
        "└── Chapter 4: The Current Adventure",
        "    Exploring new frontiers, build more tools and learn every day!",
        "",
        "🔮 The story continues... What chapter will we write together?"
      ]
    })
  },
  skills: {
    description: "Technical skills with proficiency levels",
    category: "Portfolio",
    execute: () => {
      const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {});
      const output = ["🛠️ Technical Skills & Proficiency:", ""];
      
      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        output.push(`${category}:`);
        skills.forEach(skill => {
          const bar = "█".repeat(Math.floor(skill.level / 5)) + "░".repeat(20 - Math.floor(skill.level / 5));
          output.push(`├── ${skill.name.padEnd(15)} [${bar}] ${skill.level}%`);
        });
        output.push("");
      });
      output.push("🎯 Specialized in modern full-stack development");
      output.push("📚 Continuous learner and technology enthusiast");
      
      return { output };
    }
  },
  experience: {
    description: "Professional work history and achievements",
    category: "Portfolio",
    execute: () => ({
      output: [
        "💼 Professional Experience:",
        "",
        ...portfolioData.experience.flatMap((exp, index) => [
          `${index + 1}. 🏢 ${exp.company} - ${exp.role}`,
          `   ⏰ Duration: ${exp.period}`, // Fixed to use period instead of duration
          `   📋 ${exp.description}`,
          `   🏆 Key Achievements:`,
          ...exp.achievements.map(achievement => `      • ${achievement}`),
          ""
        ]),
        "🚀 Ready for the next challenge and opportunity!"
      ]
    })
  },
  projects: {
    description: "Featured projects and portfolio work",
    category: "Portfolio", 
    execute: () => ({
      output: [
        "🚀 Featured Projects:",
        "",
        ...portfolioData.projects.flatMap((project, index) => [
          `${index + 1}. 📱 ${project.name}`,
          `   🛠️  Tech Stack: ${project.tech}`,
          `   📊 Status: ${project.status}`,
          `   📝 ${project.description}`,
          `   🔗 ${project.link}`,
          ""
        ]),
        "💡 Each project taught me something new and valuable!",
        "🌟 Want to collaborate? Type 'contact' to get in touch!"
      ]
    })
  },
  contact: {
    description: "Contact information and social links",
    category: "Portfolio",
    execute: () => ({
      output: [
        "📧 Let's Connect!",
        "",
        "💌 Direct Contact:",
        `├── Email:    ${portfolioData.personal.email}`,
        `├── Phone:    ${portfolioData.personal.phone}`, // Now using the added phone field
        `└── Website:  ${portfolioData.personal.website}`,
        "",
        "🔗 Find Me Online:",
        "└── 🐙 GitHub:    https://github.com/yourusername",
        // "├── 💼 LinkedIn:  https://linkedin.com/in/yourprofile",
        // "├── 🐦 Twitter:   https://twitter.com/yourhandle",
        // "├── 📸 Instagram: https://instagram.com/yourhandle",
        // "└── 💻 Portfolio: https://yourportfolio.com",
        "",
        "💬 Always excited to discuss:",
        "• New opportunities and collaborations",
        "• Interesting technical challenges", 
        "• Creative projects and ideas",
        "• Coffee and code (not necessarily in that order) ☕",
        "",
        "📮 Don't hesitate to reach out!"
      ]
    })
  },
  resume: {
    description: "Professional resume and CV",
    category: "Portfolio",
    execute: () => ({
      output: [
        "📄 Professional Resume:",
        "",
        "🔄 Generating download link...",
        "✅ Resume compiled successfully!",
        "",
        "📋 Quick Summary:",
        `├── Name: ${portfolioData.personal.name}`,
        `├── Title: ${portfolioData.personal.title}`,
        `├── Experience: ${portfolioData.experience.length} positions`,
        `├── Skills: ${portfolioData.skills.length} technologies`,
        `└── Projects: ${portfolioData.projects.length} featured works`,
        "",
        "🔗 Download Links:",
        "├── PDF Format: https://yourwebsite.com/resume.pdf",
        "├── Word Format: https://yourwebsite.com/resume.docx", 
        "└── Online View: https://yourwebsite.com/resume",
        "",
        "📧 For the latest version, contact me directly!",
        "💼 Updated monthly with new achievements"
      ]
    })
  },
  // Game Commands
  guess: {
    description: "Number guessing game (1-100)",
    category: "Games",
    execute: () => ({ component: 'guess' })
  },
  rps: {
    description: "Rock Paper Scissors game",
    category: "Games", 
    execute: () => ({ component: 'rps' })
  },
  typing: {
    description: "Typing speed test challenge",
    category: "Games",
    execute: () => ({ component: 'typing' })
  },
  matrix: {
    description: "Enter the Matrix digital rain",
    category: "Games",
    execute: () => ({ component: 'matrix' })
  },
  trivia: {
    description: "Tech trivia questions",
    category: "Games",
    execute: () => {
      const questions = [
        { q: "What does HTML stand for?", a: "HyperText Markup Language" },
        { q: "Which company created JavaScript?", a: "Netscape" },
        { q: "What year was React first released?", a: "2013" },
        { q: "What does CSS stand for?", a: "Cascading Style Sheets" },
        { q: "Who created Python?", a: "Guido van Rossum" }
      ];
      const question = questions[Math.floor(Math.random() * questions.length)];
      return {
        output: [
          "🧠 Tech Trivia Time!",
          "",
          `❓ ${question.q}`,
          "",
          "🤔 Think you know the answer?",
          `💡 Answer: ${question.a}`,
          "",
          "🎯 Type 'trivia' again for another question!"
        ]
      };
    }
  },
  // Fun & Utility Commands
  joke: {
    description: "Random programming joke",
    category: "Fun",
    execute: () => ({
      output: [
        "😄 Here's a programming joke for you:",
        "",
        jokes[Math.floor(Math.random() * jokes.length)],
        "",
        "🎭 Type 'joke' again for another one!"
      ]
    })
  },
  quote: {
    description: "Inspirational developer quote",
    category: "Fun",
    execute: () => ({
      output: [
        "💭 Words of Wisdom:",
        "",
        quotes[Math.floor(Math.random() * quotes.length)],
        "",
        "✨ Let this inspire your coding journey!"
      ]
    })
  },
  fact: {
    description: "Interesting technology fact",
    category: "Fun",
    execute: () => ({
      output: [
        "🔬 Tech Fact of the Moment:",
        "",
        techFacts[Math.floor(Math.random() * techFacts.length)],
        "",
        "🤓 The more you know!"
      ]
    })
  },
  coffee: {
    description: "ASCII coffee art for coding fuel",
    category: "Fun",
    execute: () => ({
      output: [
        "☕ Fresh Coffee Served!",
        "",
        "    ( (",
        "     ) )",
        "  ________",
        " |        |]",
        " \\   ☕   / ",
        "  `------'  ",
        "",
        "💭 Perfect fuel for those late-night coding sessions!",
        "🚀 Ready to code with caffeine power!"
      ]
    })
  },
  weather: {
    description: "Current weather information",
    category: "Utilities",
    execute: () => ({
      output: [
        "🌤️  Current Weather Report:",
        "",
        "📍 Location: Your City",
        "🌡️  Temperature: 22°C (72°F)",  
        "☁️  Condition: Partly Cloudy",
        "💧 Humidity: 65%",
        "💨 Wind: 10 km/h NE",
        "🌅 Sunrise: 6:30 AM",
        "🌇 Sunset: 7:45 PM",
        "",
        "🔮 Forecast: Perfect weather for coding outdoors!",
        "☀️ Note: In a real app, this would fetch live weather data"
      ]
    })
  },
  time: {
    description: "Current date and time information",
    category: "Utilities",
    execute: () => {
      const now = new Date();
      return {
        output: [
          "🕐 Time & Date Information:",
          "",
          `📅 Date: ${now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}`,
          `⏰ Time: ${now.toLocaleTimeString()}`,
          `🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
          `⚡ Unix Timestamp: ${Math.floor(now.getTime() / 1000)}`,
          `📊 Day of Year: ${Math.ceil((now - new Date(now.getFullYear(), 0, 1)) / 86400000)}`,
          "",
          "⏱️  Perfect timing for some coding!"
        ]
      };
    }
  },
  clear: {
    description: "Clear the terminal screen",
    category: "Utilities",
    execute: () => ({ clear: true })
  },
  history: {
    description: "Show recent command history",
    category: "Utilities",
    execute: (_, commandHistory) => ({
      output: [
        "📜 Command History (Last 10):",
        "",
        ...commandHistory.slice(-10).map((cmd, index) => 
          `${(commandHistory.length - 10 + index + 1).toString().padStart(3)}. ${cmd}`
        ),
        "",
        `📊 Total Commands Executed: ${commandHistory.length}`,
        "💡 Use ↑↓ arrow keys to navigate history"
      ]
    })
  },
  // Easter Eggs and Special Commands
  // konami: {
  //   description: "Easter egg - Konami code activated",
  //   category: "Easter Eggs",
  //   execute: () => ({
  //     output: [
  //       "🎮 KONAMI CODE ACTIVATED!",
  //       "",
  //       "↑ ↑ ↓ ↓ ← → ← → B A",
  //       "",
  //       "🚀 CHEAT MODE ENABLED!",
  //       "✨ You've unlocked the secret developer mode!",
  //       "🎯 All skills now show 100% proficiency",
  //       "💰 Infinite coffee activated",
  //       "🔥 Matrix mode permanently available",
  //       "",
  //       "🏆 Achievement Unlocked: 'Old School Gamer'",
  //       "🎊 You're part of an elite group of users!"
  //     ]
  //   })
  // },
  sudo: {
    description: "Easter egg - sudo attempt",
    category: "Easter Eggs", 
    execute: (cmd) => ({
      output: [
        "🔐 sudo: command not found",
        "",
        "🤖 Nice try, but this isn't a real Linux terminal!",
        "😏 However, I appreciate the authentic approach.",
        "",
        "💡 Fun fact: This terminal is built with React!",
      ]
    })
  },
  whoami: {
    description: "Identity check - who am I?",
    category: "System",
    execute: () => ({
      output: [
        `👤 You are: visitor@${portfolioData.personal.name.toLowerCase().replace(' ', '')}-portfolio`,
        `🏠 Home: /portfolio/well-done`,
        `🎯 Purpose: Exploring an awesome developer's work`,
        `⚡ Privileges: Guest access to all public commands`,
        `🚀 Status: Welcome! Feel free to explore`,
        "",
        "💬 Want to know more about the owner? Type 'about'"
      ]
    })
  }
};
// ====================================================================
// MAIN TERMINAL COMPONENT
// ====================================================================
export default function PortfolioTerminal() {
  // State Management
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  
  // Router for navigation
  const router = useRouter();
  
  // Helper Functions
  const addToHistory = useCallback((entry) => {
    setHistory(prev => [...prev, entry]);
  }, []);
  
  const typewriterEffect = useCallback((text, callback) => {
    setIsLoading(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 30);
  }, []);
  
  // Command Execution
  const executeCommand = useCallback((cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setCommandHistory(prev => [...prev, trimmedCmd]);
    
    addToHistory({ type: 'input', content: `$ ${cmd}` });
    
    // Handle special cases
    if (trimmedCmd === '') return;
    
    // Find and execute command
    const commandKey = trimmedCmd.split(' ')[0];
    
    if (commandSystem[commandKey]) {
      const result = commandSystem[commandKey].execute(trimmedCmd, commandHistory, router);
      
      if (result.clear) {
        setHistory([]);
        // Re-add welcome message after clear
        setTimeout(() => {
          addToHistory({ type: 'output', content: '✨ Terminal cleared! Type "help" to see available commands.' });
        }, 100);
        return;
      }
      
      if (result.component) {
        setCurrentComponent(result.component);
        return;
      }
      
      if (result.navigate && result.router) {
        // Actually navigate to the route
        result.router.push(`/${result.navigate}`);
        addToHistory({ type: 'success', content: `🎯 Successfully navigated to /${result.navigate}` });
      }
      
      if (result.output) {
        result.output.forEach((line, index) => {
          setTimeout(() => {
            addToHistory({ 
              type: result.navigate ? 'success' : 'output', 
              content: line 
            });
          }, index * 20); // Slight delay for smoother output
        });
      }
    } else {
      // Handle unknown commands with helpful suggestions
      const similarCommands = Object.keys(commandSystem).filter(cmd => 
        cmd.includes(commandKey) || commandKey.includes(cmd)
      );
      
      addToHistory({ type: 'error', content: `❌ Command not found: '${cmd}'` });
      
      if (similarCommands.length > 0) {
        addToHistory({ 
          type: 'info', 
          content: `💡 Did you mean: ${similarCommands.slice(0, 3).join(', ')}?` 
        });
      }
      
      addToHistory({ type: 'info', content: '📚 Type "help" to see all available commands' });
    }
  }, [commandHistory, addToHistory, router]);
  
  // Event Handlers
  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    
    executeCommand(input);
    setInput("");
    setHistoryIndex(-1);
    setShowSuggestions(false);
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      const matches = Object.keys(commandSystem).filter(cmd => 
        cmd.startsWith(value.trim().toLowerCase())
      ).slice(0, 5); // Limit suggestions
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
        setShowSuggestions(false);
      } else if (suggestions.length > 1) {
        // Cycle through suggestions
        const currentSuggestion = suggestions.find(s => s.startsWith(input));
        const currentIndex = suggestions.indexOf(currentSuggestion);
        const nextIndex = (currentIndex + 1) % suggestions.length;
        setInput(suggestions[nextIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      if (currentComponent) {
        setCurrentComponent(null);
      }
    }
  };
  
  // Auto-scroll effect
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  // Welcome message on mount
  useEffect(() => {
    const welcomeMessages = [
      '🚀 Welcome to the Interactive Portfolio Terminal!',
      `💼 Exploring ${portfolioData.personal.name}'s digital workspace...`,
      '✨ This isn\'t just a portfolio - it\'s an experience!',
      '',
      '🎯 Quick Start Guide:',
      '├── Type "help" to see all available commands',
      '├── Try "about" to learn about me',  
      '├── Use "ls" to see available routes',
      '├── Play games like "guess", "rps", or "typing"',
      '└── Type "story" to hear my journey',
      '',
      '💡 Pro tip: Use TAB for autocompletion and ↑↓ for history!',
      '🎮 Ready to explore? Let\'s start your journey...',
      ''
    ];
    welcomeMessages.forEach((msg, index) => {
      setTimeout(() => {
        addToHistory({ type: 'output', content: msg });
      }, index * 150);
    });
  }, [addToHistory]);
  
  // Render game components
  if (currentComponent === 'matrix') {
    return <MatrixEffect onExit={() => setCurrentComponent(null)} />;
  }
  if (currentComponent === 'guess') {
    return <GuessGame onExit={() => setCurrentComponent(null)} />;
  }
  if (currentComponent === 'rps') {
    return <RockPaperScissors onExit={() => setCurrentComponent(null)} />;
  }
  if (currentComponent === 'typing') {
    return <TypingTest onExit={() => setCurrentComponent(null)} />;
  }
  
  // Main Terminal UI
  return (
    <div className="w-full max-w-5xl mx-auto p-4 min-h-screen">
      <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-muted/30 px-4 py-3 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-primary hover:bg-primary/80 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-[oklch(0.55_0.15_140)] hover:bg-[oklch(0.55_0.15_140)]/80 cursor-pointer transition-colors"></div>
            </div>
            <span className="font-mono text-sm text-muted-foreground ml-2">
              {portfolioData.personal.name.toLowerCase().replace(' ', '')}@portfolio-terminal:~$
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.15_140)] animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div 
          ref={terminalRef} 
          className="p-4 h-[500px] overflow-y-auto font-mono text-sm space-y-1 bg-background/60 relative scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        >
          {/* Command History */}
          <AnimatePresence mode="popLayout">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className={`leading-relaxed ${
                  entry.type === 'input' 
                    ? 'text-primary font-semibold' 
                    : entry.type === 'error'
                    ? 'text-secondary'
                    : entry.type === 'info'
                    ? 'text-[oklch(0.65_0.18_200)]'
                    : entry.type === 'success'
                    ? 'text-[oklch(0.55_0.15_140)]'
                    : 'text-foreground/90'
                }`}
              >
                {entry.content}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Loading Indicator */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-primary"
            >
              <div className="animate-spin">⟳</div>
              <span>Processing...</span>
            </motion.div>
          )}
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10"
              style={{ bottom: '70px', left: '20px' }}
            >
              <div className="text-muted-foreground mb-2 text-xs font-semibold">💡 Suggestions:</div>
              <div className="space-y-1">
                {suggestions.map((cmd, index) => (
                  <div 
                    key={cmd} 
                    className={`text-sm px-2 py-1 rounded cursor-pointer transition-colors ${
                      index === 0 ? 'bg-primary/20 text-primary' : 'text-foreground/80 hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setInput(cmd);
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }}
                  >
                    <span className="font-mono">{cmd}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {commandSystem[cmd]?.description}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                Press TAB to cycle through suggestions
              </div>
            </motion.div>
          )}
          
          {/* Command Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            autoComplete="off"
            className="flex items-center gap-2 mt-4 pt-2"
          >
            <span className="text-primary font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
              placeholder="Type a command... (try 'help' to get started)"
              disabled={isLoading}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              inputMode="text"
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary font-bold"
            >
              █
            </motion.span>
          </form>
        </div>
        
        {/* Terminal Footer */}
        <div className="px-4 py-2 border-t border-border/50 bg-muted/10">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="text-muted-foreground">
              <span className="hidden sm:inline">Use </span>
              <kbd className="px-1 py-0.5 bg-muted rounded text-foreground">↑↓</kbd>
              <span className="hidden sm:inline"> for history | </span>
              <span className="sm:hidden"> history | </span>
              <kbd className="px-1 py-0.5 bg-muted rounded text-foreground">TAB</kbd>
              <span className="hidden sm:inline"> for autocomplete | </span>
              <span className="sm:hidden"> autocomplete | </span>
              <kbd className="px-1 py-0.5 bg-muted rounded text-foreground">ESC</kbd>
              <span className="hidden sm:inline"> to exit games</span>
              <span className="sm:hidden"> exit</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>Commands: {commandHistory.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.15_140)] animate-pulse"></div>
                <span>Ready</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}