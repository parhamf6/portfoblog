import React from 'react';
import { BookOpen, Code2 } from 'lucide-react';

const AnimatedPortfolioButtons = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Explore My Work</h2>
          <p className="text-muted-foreground text-lg">Discover insights and innovations through my articles and projects</p>
        </div>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          
          {/* Blog Button */}
          <button className="animated-button blog-button">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <BookOpen className="button-icon" size={20} />
            <span className="text">Read My Blog</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>

          {/* Projects Button */}
          <button className="animated-button projects-button">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <Code2 className="button-icon" size={20} />
            <span className="text">View Projects</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </div>

        {/* Alternative Single Button for Hero Section */}
        <div className="border-t border-border pt-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Alternative Hero Button</h3>
          <div className="flex justify-center">
            <button className="animated-button hero-button">
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Explore My Work</span>
              <span className="circle"></span>
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <style jsx>{`
          .animated-button {
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 18px 40px;
            border: 3px solid;
            border-color: transparent;
            font-size: 16px;
            background-color: transparent;
            border-radius: 100px;
            font-weight: 600;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            font-family: var(--font-sans);
          }

          /* Blog Button Styling */
          .blog-button {
            color: oklch(0.85 0.19 100); /* Primary yellow */
            box-shadow: 0 0 0 2px oklch(0.85 0.19 100);
          }

          .blog-button:hover {
            color: oklch(0.12 0.01 270); /* Dark text on hover */
            box-shadow: 0 0 0 12px transparent;
            border-radius: 16px;
          }

          .blog-button .circle {
            background-color: oklch(0.85 0.19 100); /* Primary yellow */
          }

          .blog-button:active {
            scale: 0.95;
            box-shadow: 0 0 0 4px oklch(0.85 0.19 100);
          }

          /* Projects Button Styling */
          .projects-button {
            color: oklch(0.7 0.2 300); /* Purple accent */
            box-shadow: 0 0 0 2px oklch(0.7 0.2 300);
          }

          .projects-button:hover {
            color: oklch(0.95 0.005 260); /* Light text on hover */
            box-shadow: 0 0 0 12px transparent;
            border-radius: 16px;
          }

          .projects-button .circle {
            background-color: oklch(0.7 0.2 300); /* Purple */
          }

          .projects-button:active {
            scale: 0.95;
            box-shadow: 0 0 0 4px oklch(0.7 0.2 300);
          }

          /* Hero Button Styling */
          .hero-button {
            color: oklch(0.85 0.19 100);
            box-shadow: 0 0 0 2px oklch(0.85 0.19 100);
            padding: 20px 48px;
            font-size: 18px;
          }

          .hero-button:hover {
            color: oklch(0.12 0.01 270);
            box-shadow: 0 0 0 12px transparent;
            border-radius: 16px;
          }

          .hero-button .circle {
            background-color: oklch(0.85 0.19 100);
          }

          .hero-button:active {
            scale: 0.95;
            box-shadow: 0 0 0 4px oklch(0.85 0.19 100);
          }

          /* Common SVG and Icon Styling */
          .animated-button svg {
            position: absolute;
            width: 24px;
            z-index: 9;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .blog-button svg {
            fill: oklch(0.85 0.19 100);
          }

          .projects-button svg {
            fill: oklch(0.7 0.2 300);
          }

          .hero-button svg {
            fill: oklch(0.85 0.19 100);
          }

          .blog-button:hover svg,
          .hero-button:hover svg {
            fill: oklch(0.12 0.01 270);
          }

          .projects-button:hover svg {
            fill: oklch(0.95 0.005 260);
          }

          .button-icon {
            position: relative;
            z-index: 10;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .blog-button:hover .button-icon {
            color: oklch(0.12 0.01 270);
          }

          .projects-button:hover .button-icon {
            color: oklch(0.95 0.005 260);
          }

          .animated-button .arr-1 {
            right: 16px;
          }

          .animated-button .arr-2 {
            left: -25%;
          }

          .animated-button .circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .animated-button .text {
            position: relative;
            z-index: 10;
            transform: translateX(-12px);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .animated-button:hover .arr-1 {
            right: -25%;
          }

          .animated-button:hover .arr-2 {
            left: 16px;
          }

          .animated-button:hover .text {
            transform: translateX(12px);
          }

          .animated-button:hover .circle {
            width: 220px;
            height: 220px;
            opacity: 1;
          }

          /* Responsive Design */
          @media (max-width: 640px) {
            .animated-button {
              padding: 16px 32px;
              font-size: 15px;
            }
            
            .hero-button {
              padding: 18px 40px;
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AnimatedPortfolioButtons;