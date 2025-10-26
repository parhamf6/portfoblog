"use client"
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Copy, Code2, Terminal } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Mermaid component to avoid SSR issues
const Mermaid = dynamic(() => import('./MermaidComponent'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8 bg-card "><div className="text-muted-foreground">Loading diagram...</div></div>
});

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Create a memoized CodeBlock component to prevent unnecessary re-renders
const CodeBlock = React.memo(({ 
  code, 
  language 
}: { 
  code: string; 
  language: string; 
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'bash':
      case 'sh':
      case 'shell':
        return <Terminal size={14} />;
      default:
        return <Code2 size={14} />;
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'typescript': 'bg-[oklch(0.55_0.18_240)] text-white',
      'javascript': 'bg-[oklch(0.65_0.2_60)] text-black',
      'react': 'bg-[oklch(0.65_0.18_200)] text-white',
      'tsx': 'bg-[oklch(0.55_0.18_240)] text-white',
      'jsx': 'bg-[oklch(0.65_0.18_200)] text-white',
      'python': 'bg-[oklch(0.55_0.18_240)] text-white',
      'rust': 'bg-[oklch(0.55_0.18_25)] text-white',
      'go': 'bg-[oklch(0.65_0.15_210)] text-white',
      'bash': 'bg-[oklch(0.3_0.02_260)] text-[oklch(0.85_0.19_100)]',
      'shell': 'bg-[oklch(0.3_0.02_260)] text-[oklch(0.85_0.19_100)]',
      'css': 'bg-[oklch(0.6_0.2_270)] text-white',
      'html': 'bg-[oklch(0.6_0.18_15)] text-white',
      'json': 'bg-[oklch(0.4_0.02_260)] text-[oklch(0.85_0.19_100)]',
      'yaml': 'bg-[oklch(0.4_0.02_260)] text-[oklch(0.85_0.19_100)]',
      'sql': 'bg-[oklch(0.5_0.15_300)] text-white',
    };
    return colors[language.toLowerCase()] || 'bg-[oklch(0.3_0.02_260)] text-[oklch(0.85_0.19_100)]';
  };

  return (
    <div className="relative group my-8">
      {/* Header with language badge and copy button */}
      <div className="flex items-center justify-between bg-[oklch(0.18_0.02_260)] border border-[oklch(0.25_0.01_260)] px-4 py-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          {getLanguageIcon(language)}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(language)}`}>
            {language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 border ${
            isCopied 
              ? 'bg-green-500/20 border-green-500/50 text-green-400' 
              : 'bg-[oklch(0.25_0.01_260)] hover:bg-[oklch(0.3_0.01_260)] text-[oklch(0.8_0.01_260)] hover:text-[oklch(0.95_0.005_260)] border-[oklch(0.3_0.01_260)]'
          }`}
        >
          {isCopied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span className="text-xs font-medium">Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content with enhanced styling */}
      <div className="relative overflow-hidden rounded-b-lg border-x border-b border-[oklch(0.25_0.01_260)]">
        <SyntaxHighlighter
          style={nightOwl}
          language={language}
          PreTag="div"
          className="!mt-0 !rounded-none !bg-[oklch(0.16_0.02_260)]"
          showLineNumbers
          wrapLines
          lineNumberStyle={{
            color: 'oklch(0.5 0.01 260)',
            backgroundColor: 'oklch(0.14 0.02 260)',
            paddingLeft: '12px',
            paddingRight: '12px',
            borderRight: '1px solid oklch(0.25 0.01 260)',
            minWidth: '3rem',
            textAlign: 'right'
          }}
          customStyle={{
            margin: 0,
            padding: 0,
            backgroundColor: 'oklch(0.16 0.02 260)',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
});

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const components = {
    // Enhanced code block component
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeString = String(children).replace(/\n$/, '');
      
      if (!inline && language) {
        // Handle Mermaid diagrams
        if (language === 'mermaid') {
          return (
            <div className="my-8">
              <Mermaid chart={codeString} />
            </div>
          );
        }
        
        // Use the isolated CodeBlock component
        return <CodeBlock code={codeString} language={language} />;
      }
      
      return (
        <code
          className="px-2 py-1 rounded-md text-sm font-mono bg-[oklch(0.25_0.01_260)] text-[oklch(0.85_0.19_100)] border border-[oklch(0.3_0.01_260)]"
          {...props}
        >
          {children}
        </code>
      );
    },
    // Enhanced heading components with better styling
    h1: ({ children }: any) => {
      const text = typeof children === 'string' ? children : children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      return (
        <div className="mb-8 mt-12">
          <h1 
            id={id}
            className="text-4xl font-bold text-[oklch(0.95_0.005_260)] mb-4 scroll-mt-24 tracking-tight"
          >
            {children}
          </h1>
          {/* Enhanced underline with gradient */}
          <div className="h-1 bg-gradient-to-r from-[oklch(0.85_0.19_100)] via-[oklch(65.065%_0.2302_27.077)] to-transparent rounded-full w-24"></div>
        </div>
      );
    },
    h2: ({ children }: any) => {
      const text = typeof children === 'string' ? children : children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      return (
        <div className="mb-6 mt-10">
          <h2 
            id={id} 
            className="text-3xl font-semibold text-[oklch(0.95_0.005_260)] mb-3 scroll-mt-24 tracking-tight"
          >
            {children}
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-[oklch(0.85_0.19_100)] to-transparent rounded-full w-16"></div>
        </div>
      );
    },
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-[oklch(0.9_0.005_260)] mb-4 mt-8 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-[oklch(0.85_0.005_260)] mb-3 mt-6 tracking-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg font-semibold text-[oklch(0.8_0.005_260)] mb-2 mt-5 tracking-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base font-semibold text-[oklch(0.75_0.005_260)] mb-2 mt-4 tracking-tight">
        {children}
      </h6>
    ),
    // Enhanced paragraph styling
    p: ({ children }: any) => (
      <p className="text-[oklch(0.8_0.01_260)] mb-6 leading-relaxed text-base tracking-wide">
        {children}
      </p>
    ),
    // Enhanced link styling
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-[oklch(0.85_0.19_100)] hover:text-[oklch(65.065%_0.2302_27.077)] underline decoration-[oklch(0.85_0.19_100)] decoration-1 underline-offset-2 hover:decoration-[oklch(65.065%_0.2302_27.077)] transition-all duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    // Enhanced list styling
    ul: ({ children }: any) => (
      <ul className="list-none mb-6 text-[oklch(0.8_0.01_260)] space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-none counter-reset-list mb-6 text-[oklch(0.8_0.01_260)] space-y-2">
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => {
      const isOrdered = props.node?.parent?.tagName === 'ol';
      
      return (
        <li className={`ml-6 relative ${isOrdered ? 'counter-increment-list' : ''}`}>
          {isOrdered ? (
            <span className="absolute -left-6 top-0 text-[oklch(0.85_0.19_100)] font-semibold text-sm counter-content"></span>
          ) : (
            <span className="absolute -left-6 top-1 w-2 h-2 bg-[oklch(0.85_0.19_100)] rounded-full"></span>
          )}
          {children}
        </li>
      );
    },
    // Enhanced blockquote styling
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[oklch(0.85_0.19_100)] pl-6 py-4 mb-6 bg-[oklch(0.18_0.02_260)] text-[oklch(0.85_0.01_260)] italic rounded-r-lg relative">
        <div className="absolute top-2 left-2 text-[oklch(0.85_0.19_100)] text-4xl leading-none opacity-30">"</div>
        <div className="relative z-10">
          {children}
        </div>
      </blockquote>
    ),
    // Enhanced table styling
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-8 rounded-lg border border-[oklch(0.25_0.01_260)]">
        <table className="min-w-full">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-[oklch(0.18_0.02_260)]">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-[oklch(0.25_0.01_260)] bg-[oklch(0.16_0.02_260)]">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => (
      <tr className="hover:bg-[oklch(0.2_0.02_260)] transition-colors">{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="px-6 py-4 text-left text-xs font-semibold text-[oklch(0.9_0.005_260)] uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 text-sm text-[oklch(0.8_0.01_260)]">
        {children}
      </td>
    ),
    // Enhanced horizontal rule
    hr: () => (
      <div className="my-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.3_0.01_260)] to-transparent"></div>
      </div>
    ),
    // Enhanced image styling
    img: ({ src, alt }: any) => (
      <div className="my-8">
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded-lg shadow-2xl border border-[oklch(0.25_0.01_260)]"
        />
        {alt && (
          <p className="text-center text-sm text-[oklch(0.6_0.01_260)] mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    ),
    // Enhanced emphasis styling
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[oklch(0.9_0.005_260)]">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[oklch(0.85_0.01_260)]">{children}</em>
    ),
  };

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <style jsx>{`
        .counter-reset-list {
          counter-reset: list-counter;
        }
        .counter-increment-list {
          counter-increment: list-counter;
        }
        .counter-content:before {
          content: counter(list-counter) ".";
        }
      `}</style>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;