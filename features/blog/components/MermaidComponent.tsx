"use client"
import React, { useEffect, useRef, useState } from 'react';

interface MermaidComponentProps {
  chart: string;
}

const MermaidComponent: React.FC<MermaidComponentProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!ref.current) return;

      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import mermaid to avoid SSR issues
        const mermaid = (await import('mermaid')).default;
        
        // Initialize mermaid with theme settings that match your blog
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark', // Change to 'default' if you prefer light theme
          themeVariables: {
            primaryColor: '#4f46e5',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#6366f1',
            lineColor: '#6b7280',
            secondaryColor: '#374151',
            tertiaryColor: '#1f2937',
            background: '#111827',
            mainBkg: '#1f2937',
            secondBkg: '#374151',
            tertiaryBkg: '#4b5563',
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            // curve: 'basis',
            nodeSpacing: 30,
            rankSpacing: 40,
          },
          sequence: {
            useMaxWidth: true,
            boxMargin: 8,
            boxTextMargin: 4,
            noteMargin: 10,
            mirrorActors: true,
            bottomMarginAdj: 1,
            height: 60,
            width: 150,
            actorFontFamily: 'Raleway, Lora, sans-serif',
            noteFontFamily: 'Raleway, Lora, sans-serif',
            messageFontFamily: 'Raleway, Lora, sans-serif',
          },
          gantt: {
            useMaxWidth: true,
            leftPadding: 75,
            gridLineStartPadding: 35,
            fontSize: 14,
          },
          fontFamily: 'Raleway, Lora, sans-serif',
        });

        // Clear the container
        ref.current.innerHTML = '';

        // Generate a unique ID for this diagram
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg } = await mermaid.render(id, chart);
        
        if (ref.current) {
          ref.current.innerHTML = svg;
          
          // Apply custom styling to the rendered SVG
          const svgElement = ref.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      } finally {
        setIsLoading(false);
      }
    };

    renderMermaid();
  }, [chart]);

  if (error) {
    return (
      <div className="border border-red-300 dark:border-red-700 rounded-lg p-4 bg-red-50 dark:bg-red-950/50">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Diagram Rendering Error
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid-container bg-card rounded-lg border border-gray-200 dark:border-gray-700 p-6 overflow-auto">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-muted-foreground">Rendering diagram...</div>
        </div>
      )}
      <div 
        ref={ref} 
        className={`mermaid-diagram ${isLoading ? 'hidden' : ''}`}
        style={{ textAlign: 'center' }}
      />
    </div>
  );
};

export default MermaidComponent;