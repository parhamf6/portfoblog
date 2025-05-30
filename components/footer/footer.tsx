"use client"
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full border-t border-border text-muted-foreground text-sm py-8 px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Section 1: Social + Contact */}
      <div className="flex flex-col space-y-3">
        <div className="flex space-x-4">
          {[{
            href: "https://github.com/parhamf6",
            icon: <Github size={20} />
          }, {
            href: "https://linkedin.com/in/yourusername",
            icon: <Linkedin size={20} />
          }, {
            href: "mailto:parhamfdev@proton.me",
            icon: <Mail size={20} />
          }].map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition transform hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </div>
        <span className="text-xs select-text">Contact: parhamfdev@proton.me</span>
      </div>

      {/* Section 2: Navigation */}
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        {[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { href: "/projects", label: "Projects" },
          { href: "/about", label: "About" },
          // { href: "/privacy", label: "Privacy Policy" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-[#eab308] transition transform hover:scale-105"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Section 3: Signature + Copyright */}
      <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-2 select-text">
        <span className="inline-flex items-center gap-1">
          Made with
          <span
            className="text-yellow-500 animate-bounce-slow"
            aria-label="heart"
            role="img"
          >
            ❤️
          </span>
          by Parham F
        </span>
        <span>© Parham Forati {new Date().getFullYear()}</span>
      </div>

      <style jsx>{`
        /* Custom slower bounce animation */
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
          display: inline-block;
        }
      `}</style>
    </footer>
  );
}

