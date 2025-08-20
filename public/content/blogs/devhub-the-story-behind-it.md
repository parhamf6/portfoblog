```markdown
<!-- meta: Devhub: the story behind it -->
```
# What if I could have all the tools I need every day to develop in one place?

The idea started from that point — I decided it would be good to bring together all the useful tools that developers need into one place. That’s how the idea of **DevHub** was born.  

The name might not be perfect, but for now it’s good enough. The idea is to add developer tools we use every day, and in the future also expand into **productivity tools** such as project management, issue management, task management, calendar, and time tracking.  

There are many things I have planned for this project. It has a lot of potential, but also requires a lot of work. There are competitors in some of the areas we want to cover — but DevHub is **open source**, and that gives us freedom to innovate and build anyway.  



# How I did it?

The hardest part was definitely the **UX**. Because DevHub has so many features, I had to be very careful about creating a smooth user flow. I don’t know how much I succeeded, but I tried my best. This was my first project where I took UX/UI seriously.  

Besides UX, the stack I chose was this:

## shadcn and building on it
There are plenty of libraries built on top of **shadcn**, and we used some of them. shadcn itself made the job a lot easier — it gave me clean, consistent components and a faster workflow.  

## The old combo: React, Next.js, Tailwind, TypeScript
This is the perfect combo for many people, and one of the most widely used modern stacks. It’s fast, has a ton of ready-to-use boilerplates, components, and themes. That means **faster development** and clean, production-ready results.  

## Backend: not built yet, but planned
For the productivity tools, I plan to use my beloved **Python** with **FastAPI** and **PostgreSQL**.  
You might ask: *Why not use Next.js and TypeScript? They’re powerful too.* You’re right — but I like Python, and honestly I’m faster and more confident with it. I can debug and understand Python code a lot quicker than TypeScript.  

Also, it’s good to **learn and master more than one stack**. This way I keep growing on both the JS/TS side and the Python side.  


# The story of design

Like most apps, we needed a few core parts:  
- A **homepage** that would invite users to try the app  
- A **dashboard** that holds all the features  
- A **learning page** for managing resources  
- **About**, **contact**, and **support** pages  

## Homepage: the hardest part
Building a homepage (or landing page / hero section) is always the hardest part for me. You need creativity, strong copywriting, and good calls-to-action.  

In today’s world full of fancy homepages, this part is especially tough — even harder if you’re a perfectionist. That’s why I personally like backend more: the competition there is in **best practices and security**, not in looks. But many people love frontend for exactly that reason.  

For DevHub, I spent around **two weeks** designing and redesigning the homepage. Two weeks for one page is a lot, and even now I feel like I want to redesign it again after adding backend features.  

## Dashboard: simple but clean
If you look at it, the dashboard may seem *too simple*. But that was exactly the plan. The goal was to keep it **direct and distraction-free**. It should guide users to what they want without overwhelming them.  



# The tools: the main part

The core of DevHub is, of course, the **tools**.  

Building tools is hard. At first, the hard point is building the tool initially, but after maybe 15 tools, the problem becomes "what's next?" There are many tools available on the web, but which ones are more wanted by users? This is hard, but with a little bit of research, you can make a checklist of tools you should add. 

After a certain point — around 40 tools — new ones will become **very specific** and have a smaller audience. Then another problem comes: **too many tools can overwhelm users**. You should be careful because if the options go too much, users may feel bad and lost. So the right user flow helps them find it 

To solve this, you need the right user flow:  
- Clear **categories**  
- Useful **tags**  
- A **powerful search**  

That way users can quickly find exactly what they need.  



# Building tools: first use of vibe coding

If you try to build tools that you know would take lots of time, learning, and enormous amounts of lines of code, I built them using AI tools. It was nice, but it needs a lot of structure and a few tests to find the best prompt for it. You can see how I use AI-assisted coding in [this post]("blogs/how-i-use-vibe-coding-to-ship-faster").
But the short story is I created UI structure for tools in each category and said, for example, "this is the code for JSON to YAML converter, now build one for JSON to TOML with the same structure." And then in a few minutes, you have the functions for it.
But it's very important - you should see the code, check it, and fix the mistakes and understand it. If you don't do this, you're going to have a bad time debugging in the future.

👉 You can read more about how I use vibe coding in [this post]("blogs/how-i-use-vibe-coding-to-ship-faster").  


# Overview: what is DevHub actually?

**DevHub is a comprehensive client-side developer tools platform built with Next.js.**  

It currently provides **20+ utilities** for security, data conversion, encoding, and general development tasks.  

The system works **entirely in the browser** — with no server-side dependencies. That means:  
- Privacy first  
- High performance  
- Local data processing and storage  



# System Architecture
DevHub follows a **tool-centric architecture** where all functionality revolves around the central tools registry defined in `lib/tools/toolDate.ts`.
The system uses a modular approach with a clear separation between:  
- Tool logic  
- UI components  
- Data management  



# Tool Registry System

The tool registry is the **single source of truth** for all tools in the platform.  
It’s located in `lib/tools/toolDate.ts` and exports a `tools` array containing `ToolCardProps` objects that define each tool’s metadata, routing, and categorization.  

Each tool entry has:  
- **name** – Display name  
- **slug** – URL-safe identifier used for routing  
- **description** – Brief tool description  
- **info** – Detailed tool information  
- **category** – For filtering  
- **version** – Tool version string  
- **tags** – Array of searchable tags  
- **type** – Always set to `"tool"`  

### Purpose and Core Architecture
The Tool Registry System is built around this centralized data structure. It provides:  
- **Centralized tool definitions** – Everything in one place means no hunting through multiple files when you want to understand what tools exist or add new ones.
- **Dynamic categorization** – Categories are extracted automatically from the tools data, so the navigation updates itself when you add tools to new categories.
- **Consistent schema** – Every tool follows the same pattern, which makes the codebase predictable and maintainable.
- **UI integration** – The data structure is designed specifically for how the UI consumes it, making rendering fast and straightforward.


# Security and Privacy Architecture: Client-Side First

DevHub follows a **privacy-first architecture** where all data processing happens on the client side. No user data is transmitted to external servers or stored remotely.  

Key security features:  
- All cryptographic operations use the **Web Crypto API** for secure random generation  
- Private keys can be protected with passphrases  
- Sensitive data is never logged or transmitted  
- LocalStorage is used for persistence instead of remote databases  
- No tracking beyond basic analytics  

## The Privacy Promise
One of DevHub's core principles is that your data stays with you. Everything processes locally in your browser - no servers, no databases, no data transmission. This isn't just a feature, it's a fundamental architectural decision.
## How It Works Technically
#### Web Crypto API:
For all cryptographic operations, DevHub uses the browser's built-in Web Crypto API. This means secure random number generation, hashing, and encryption happen using battle-tested browser implementations.
#### Local Processing:
When you convert JSON to YAML or generate a hash, the processing happens in your browser using JavaScript. The data never leaves your machine.
#### Memory-Only Operations:
Most tools work entirely in memory. Input goes in, gets processed, output comes out, and then it's gone (unless you explicitly save it).
#### Local Storage for Preferences:
The only thing stored persistently is your preferences (like theme choice), and even that stays local to your browser.
## What This Means for Users
#### Complete Privacy:
Your sensitive data, API keys, private information - none of it ever hits a server.
#### Works Offline:
Since everything is client-side, most tools work even without an internet connection.
#### Fast Performance:
No network requests mean instant results for most operations.
#### No Vendor Lock-in:
Your data isn't trapped in someone else's system because it never leaves yours.



# What's Next?
There's still a lot of work to do. The backend features I mentioned, more tools to add, and probably a redesign of some parts. But hey, that's the fun part of building something - it's never really finished, just better with each iteration.
The open-source nature means anyone can contribute, suggest tools, or even fork it and make their own version. That's the beauty of it - we're building something useful together.
