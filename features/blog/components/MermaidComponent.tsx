"use client"
import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw, Download, Code, Eye, HelpCircle, Copy, Check } from 'lucide-react';

interface MermaidComponentProps {
  chart: string;
}

type TabType = 'diagram' | 'code' | 'help';

const MermaidComponent: React.FC<MermaidComponentProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchDistance, setTouchDistance] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('diagram');
  const [fitToScreen, setFitToScreen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [savedDiagramState, setSavedDiagramState] = useState({ scale: 1, position: { x: 0, y: 0 }, fitToScreen: true });
  const [shouldRenderDiagram, setShouldRenderDiagram] = useState(true);
  const [initialFitApplied, setInitialFitApplied] = useState(false);
  const [shouldRecalculateFit, setShouldRecalculateFit] = useState(false);

  // Function to calculate and apply the fit
  const calculateAndApplyFit = () => {
    if (!svgContainerRef.current || !containerRef.current) return;
    
    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Get container dimensions (subtracting padding and tab bar height)
    const containerWidth = containerRef.current.clientWidth - 64; // 32px padding on each side
    const containerHeight = containerRef.current.clientHeight - 100; // 48px tab bar + some margin
    
    // Get SVG dimensions
    const svgRect = svgElement.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    
    // Check if we have valid dimensions
    if (svgWidth > 0 && svgHeight > 0 && containerWidth > 0 && containerHeight > 0) {
      // Calculate scale for both dimensions
      const scaleX = containerWidth / svgWidth;
      const scaleY = containerHeight / svgHeight;
      
      // Use the smaller scale to ensure entire diagram fits
      let initialScale = Math.min(scaleX, scaleY);
      
      // Apply a small padding (5%) so the diagram doesn't touch the edges
      initialScale *= 0.95;
      
      // Ensure the scale is at least 0.5 (50%) to avoid very small diagrams
      initialScale = Math.max(initialScale, 0.5);
      
      // Only update if the scale has changed significantly
      if (Math.abs(scale - initialScale) > 0.01) {
        setScale(initialScale);
      }
      setPosition({ x: 0, y: 0 });
      setInitialFitApplied(true);
      setShouldRecalculateFit(false);
    }
  };

  useEffect(() => {
    const renderMermaid = async () => {
      if (!svgContainerRef.current || !shouldRenderDiagram) return;

      try {
        setIsLoading(true);
        setError(null);

        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            // Using your theme colors
            primaryColor: '#f8df0b',          // Vibrant yellow
            primaryTextColor: '#1a1a2e',       // Very dark for contrast
            primaryBorderColor: '#f8df0b',     // Vibrant yellow
            lineColor: '#4a5568',             // Border color
            secondaryColor: '#2d3748',         // Muted
            tertiaryColor: '#1a202c',          // Card
            background: '#1a202c',            // Background
            mainBkg: '#2d3748',               // Card
            secondBkg: '#4a5568',             // Muted
            tertiaryBkg: '#f8df0b',           // Accent
            clusterBkg: '#4a5568',             // Muted
            defaultLinkColor: '#4a5568',       // Border
            titleColor: '#f7fafc',            // Foreground
            edgeLabelBackground: '#1a202c',   // Background
            actorBorder: '#4a5568',           // Border
            actorBkg: '#2d3748',              // Card
            actorTextColor: '#f7fafc',        // Foreground
            actorLine: '#4a5568',             // Border
            signalColor: '#4a5568',           // Border
            signalTextColor: '#f7fafc',       // Foreground
            labelBoxBkgColor: '#2d3748',      // Card
            labelBoxBorderColor: '#4a5568',   // Border
            labelTextColor: '#f7fafc',        // Foreground
            loopTextColor: '#f7fafc',         // Foreground
            noteBorderColor: '#4a5568',       // Border
            noteBkgColor: '#4a5568',          // Muted
            noteTextColor: '#f7fafc',         // Foreground
            activationBorderColor: '#f8df0b', // Primary
            activationBkgColor: '#f8df0b',    // Primary
            gridColor: '#4a5568',             // Border
            sectionBkgColor: '#4a5568',       // Muted
            altSectionBkgColor: '#2d3748',    // Card
            sectionTextColor: '#f7fafc',      // Foreground
            taskBorderColor: '#4a5568',       // Border
            taskBkgColor: '#2d3748',          // Card
            taskTextLightColor: '#f7fafc',    // Foreground
            taskTextColor: '#f7fafc',         // Foreground
            taskTextOutsideColor: '#f7fafc',  // Foreground
            activeTaskBorderColor: '#f8df0b', // Primary
            activeTaskBkgColor: '#f8df0b',    // Primary
            doneTaskBkgColor: '#f82e0b',      // Secondary
            doneTaskBorderColor: '#f82e0b',   // Secondary
            critBorderColor: '#f82e0b',       // Destructive
            critBkgColor: '#f82e0b',          // Destructive
            todayLineColor: '#f8df0b',       // Primary
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            nodeSpacing: 50,
            rankSpacing: 50,
          },
          sequence: {
            useMaxWidth: true,
            boxMargin: 8,
            mirrorActors: true,
            actorFontFamily: 'Raleway, Lora, sans-serif',
          },
          fontFamily: 'Raleway, Lora, sans-serif',
        });

        svgContainerRef.current.innerHTML = '';
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svg;
          
          const svgElement = svgContainerRef.current.querySelector('svg');
          if (svgElement && containerRef.current) {
            svgElement.style.maxWidth = 'none';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';

            // Calculate initial zoom to fit if enabled
            if (fitToScreen && !initialFitApplied) {
              // Use a timeout to ensure the SVG is fully rendered and measured
              setTimeout(() => {
                calculateAndApplyFit();
              }, 100);
            }
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
  }, [chart, fitToScreen, shouldRenderDiagram]);

  // Save diagram state when switching away from diagram tab
  useEffect(() => {
    if (activeTab !== 'diagram') {
      setSavedDiagramState({ scale, position, fitToScreen });
    }
  }, [activeTab, scale, position, fitToScreen]);

  // Restore diagram state when switching back to diagram tab
  useEffect(() => {
    if (activeTab === 'diagram') {
      // If fitToScreen was enabled, we need to recalculate the fit
      if (savedDiagramState.fitToScreen) {
        setFitToScreen(true);
        setInitialFitApplied(false);
        setShouldRecalculateFit(true);
        setShouldRenderDiagram(false);
        setTimeout(() => setShouldRenderDiagram(true), 50);
      } else {
        // If fitToScreen was disabled, restore the saved state
        setScale(savedDiagramState.scale);
        setPosition(savedDiagramState.position);
        setFitToScreen(false);
      }
    }
  }, [activeTab]);

  // Recalculate fit when shouldRecalculateFit is true
  useEffect(() => {
    if (shouldRecalculateFit && fitToScreen && activeTab === 'diagram' && !isLoading) {
      // Use a more robust way to ensure the SVG is fully rendered
      const checkAndApplyFit = () => {
        if (!svgContainerRef.current || !containerRef.current) {
          return false;
        }
        
        const svgElement = svgContainerRef.current.querySelector('svg');
        if (!svgElement) {
          return false;
        }
        
        // Check if the SVG has valid dimensions
        const svgWidth = svgElement.getBoundingClientRect().width;
        const svgHeight = svgElement.getBoundingClientRect().height;
        
        if (svgWidth <= 0 || svgHeight <= 0) {
          return false;
        }
        
        // If we get here, the SVG is ready
        calculateAndApplyFit();
        return true;
      };
      
      // Try immediately first
      if (!checkAndApplyFit()) {
        // If that fails, try multiple times with increasing delays
        let attempts = 0;
        const maxAttempts = 10;
        const tryApplyFit = () => {
          attempts++;
          if (checkAndApplyFit() || attempts >= maxAttempts) {
            return;
          }
          setTimeout(tryApplyFit, 50 * attempts); // Increasing delay
        };
        
        setTimeout(tryApplyFit, 100);
      }
    }
  }, [shouldRecalculateFit, fitToScreen, activeTab, isLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        handleZoomIn();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        handleZoomOut();
      } else if (((e.ctrlKey || e.metaKey) && e.key === '0') || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        handleFitToScreen();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleDownload();
      } else if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setActiveTab('help');
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && activeTab === 'diagram') {
        e.preventDefault();
        const step = e.shiftKey ? 50 : 20;
        setPosition(prev => ({
          x: prev.x + (e.key === 'ArrowLeft' ? step : e.key === 'ArrowRight' ? -step : 0),
          y: prev.y + (e.key === 'ArrowUp' ? step : e.key === 'ArrowDown' ? -step : 0),
        }));
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [scale, fitToScreen, activeTab]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.2, Math.min(5, prev + delta)));
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.2));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setFitToScreen(false);
    setInitialFitApplied(false);
    setShouldRecalculateFit(false);
    setSavedDiagramState({ scale: 1, position: { x: 0, y: 0 }, fitToScreen: false });
  };

  const handleFitToScreen = () => {
    const newFitToScreen = !fitToScreen;
    setFitToScreen(newFitToScreen);
    setPosition({ x: 0, y: 0 });
    
    // If we're enabling fit to screen, we need to recalculate the scale
    if (newFitToScreen) {
      setInitialFitApplied(false);
      setShouldRecalculateFit(true);
      setShouldRenderDiagram(false);
      setTimeout(() => setShouldRenderDiagram(true), 50);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDistance = getTouchDistance(e.touches);
      if (touchDistance > 0) {
        const scaleDelta = (newDistance - touchDistance) * 0.01;
        setScale(prev => Math.max(0.2, Math.min(5, prev + scaleDelta)));
      }
      setTouchDistance(newDistance);
    } else if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(0);
  };

  const handleDownload = () => {
    const svgElement = svgContainerRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTabChange = (tab: TabType) => {
    // Save current diagram state before switching tabs
    if (activeTab === 'diagram') {
      setSavedDiagramState({ scale, position, fitToScreen });
    }
    setActiveTab(tab);
  };

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
    <div 
      ref={containerRef}
      className="relative  overflow-hidden"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '600px',
        ...(isFullscreen && { 
          position: 'fixed', 
          inset: 0, 
          zIndex: 50,
          borderRadius: 0,
          height: '100vh'
        })
      }}
    >
      {/* Tab Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 backdrop-blur-sm border-b" 
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)'
            }}>
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center">
            <button
              onClick={() => handleTabChange('diagram')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'diagram'
                  ? 'text-yellow-400 border-yellow-500'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
              style={{ 
                backgroundColor: activeTab === 'diagram' ? 'var(--muted)' : 'transparent'
              }}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Diagram</span>
            </button>
            <button
              onClick={() => handleTabChange('code')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'code'
                  ? 'text-yellow-400 border-yellow-500'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
              style={{ 
                backgroundColor: activeTab === 'code' ? 'var(--muted)' : 'transparent'
              }}
            >
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
            </button>
            <button
              onClick={() => handleTabChange('help')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'help'
                  ? 'text-yellow-400 border-yellow-500'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
              style={{ 
                backgroundColor: activeTab === 'help' ? 'var(--muted)' : 'transparent'
              }}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>
          </div>

          {/* Controls (only show on diagram tab) */}
          {activeTab === 'diagram' && (
            <div className="flex items-center gap-1 px-2">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.2}
                className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ backgroundColor: 'var(--muted)' }}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
              </button>
              <span className="px-2 py-1 text-xs min-w-[50px] text-center font-mono" style={{ color: 'var(--foreground)' }}>
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 5}
                className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ backgroundColor: 'var(--muted)' }}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded transition-colors"
                style={{ backgroundColor: 'var(--muted)' }}
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
              </button>
              <button
                onClick={handleFitToScreen}
                className="p-2 rounded transition-colors"
                style={{ 
                  backgroundColor: fitToScreen ? 'var(--primary)' : 'var(--muted)',
                  color: fitToScreen ? 'var(--primary-foreground)' : 'var(--foreground)'
                }}
                title="Fit"
              >
                <span className="text-xs font-semibold px-1">FIT</span>
              </button>
              <div className="hidden sm:flex items-center gap-1 ml-1 pl-1" style={{ borderLeftColor: 'var(--border)', borderLeftWidth: '1px', borderLeftStyle: 'solid' }}>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded transition-colors"
                  style={{ backgroundColor: 'var(--muted)' }}
                  title="Download"
                >
                  <Download className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded transition-colors"
                  style={{ backgroundColor: 'var(--muted)' }}
                  title="Fullscreen"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                  ) : (
                    <Maximize2 className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && activeTab === 'diagram' && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-20" 
              style={{ 
                marginTop: '48px',
                backgroundColor: 'var(--background)'
              }}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm" style={{ color: 'var(--foreground)' }}>Rendering diagram...</p>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="w-full" style={{ height: 'calc(100% - 48px)', marginTop: '48px' }}>
        {/* Diagram Tab */}
        {activeTab === 'diagram' && (
          <div
            className="w-full h-full overflow-hidden touch-none"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <div
              className="flex items-center justify-center w-full h-full p-8"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
              <div 
                ref={svgContainerRef}
                className={`mermaid-diagram ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              />
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="w-full h-full overflow-auto p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Mermaid Code</h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors"
                  style={{ 
                    backgroundColor: copied 
                      ? 'rgba(34, 197, 94, 0.2)'  // Green background with 20% opacity
                      : 'var(--card)',
                    color: copied 
                      ? 'rgb(74, 222, 128)'       // Green text
                      : 'var(--foreground)',
                    border: copied 
                      ? '1px solid rgba(34, 197, 94, 0.5)'  // Green border with 50% opacity
                      : '1px solid var(--border)',
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg p-4 overflow-x-auto" style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}>
                <pre className="text-sm font-mono whitespace-pre-wrap break-words" style={{ color: 'var(--foreground)' }}>
                  {chart}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Help Tab */}
        {activeTab === 'help' && (
          <div className="w-full h-full overflow-auto p-4">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Keyboard Shortcuts</h3>
                <div className="rounded-lg p-4 space-y-3" style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  {[
                    { key: 'Ctrl + +', desc: 'Zoom In' },
                    { key: 'Ctrl + -', desc: 'Zoom Out' },
                    { key: 'Ctrl + Scroll', desc: 'Zoom with Mouse Wheel' },
                    { key: 'R', desc: 'Reset View' },
                    { key: 'Ctrl + F', desc: 'Fit to Screen' },
                    { key: 'F', desc: 'Fullscreen' },
                    { key: 'Ctrl + S', desc: 'Download SVG' },
                    { key: 'Arrow Keys', desc: 'Pan Diagram' },
                    { key: 'Shift + Arrow', desc: 'Pan Faster' },
                    { key: '?', desc: 'Show Help' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--foreground)' }}>{item.desc}</span>
                      <kbd className="px-3 py-1 rounded text-sm font-mono" style={{ 
                        backgroundColor: 'var(--muted)',
                        color: 'var(--foreground)'
                      }}>
                        {item.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Mouse & Touch Controls</h3>
                <div className="rounded-lg p-4 space-y-3" style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  {[
                    { icon: '🖱️', title: 'Click and Drag', desc: 'Pan around the diagram' },
                    { icon: '⚙️', title: 'Ctrl + Scroll Wheel', desc: 'Smooth zoom in and out' },
                    { icon: '🤏', title: 'Pinch Gesture', desc: 'Zoom on touch devices' },
                    { icon: '👆', title: 'Touch and Drag', desc: 'Pan on mobile devices' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5" style={{ color: 'var(--primary)' }}>{item.icon}</div>
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>{item.title}</div>
                        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Tips</h3>
                <div className="rounded-lg p-4 space-y-2 text-sm" style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: 'var(--foreground)'
                }}>
                  <p>💡 Use the <strong className="font-semibold">FIT</strong> button to automatically scale the diagram to fit your screen</p>
                  <p>💡 Switch to the <strong className="font-semibold">Code</strong> tab to view and copy the Mermaid source</p>
                  <p>💡 On mobile, use two fingers to pinch zoom for precise control</p>
                  <p>💡 Press <kbd className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--muted)' }}>F</kbd> for distraction-free fullscreen mode</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MermaidComponent;