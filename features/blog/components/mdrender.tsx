// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypePrism from "rehype-prism-plus";
// import clsx from "clsx";
// import { CodeBlock } from "./code-block";
// import { MarkdownImage } from "./mdimage";
// import { Table, TableHead, TableRow, TableCell, TableHeaderCell } from "./md-table";
// import { Heading } from "./md-heading";

// export default function MarkdownRenderer({ content }: { content: string }) {
//   return (
//     <article className="max-w-4xl mx-auto prose prose-zinc dark:prose-invert prose-lg ">
//       <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings, rehypePrism]}
//           components={{
//             code({ node, inline, className, children, ...props }) {
//               const match = /language-(\w+)/.exec(className || "");
//               const language = match ? match[1] : "";
//               if (inline) {
//                 return (
//                   <code className=" px-1.5 py-0.5 rounded-md text-sm" {...props}>
//                     {children}
//                   </code>
//                 );
//               }
//               return (
//                 <CodeBlock language={language}>
//                   {children}
//                 </CodeBlock>
//               );
//             },
//             img: ({ src, alt }) => <MarkdownImage src={String(src)} alt={alt} />,
//             h1: ({ children, ...props }) => <Heading level={1} {...props}>{children}</Heading>,
//             h2: ({ children, ...props }) => <Heading level={2} {...props}>{children}</Heading>,
//             h3: ({ children, ...props }) => <Heading level={3} {...props}>{children}</Heading>,
//             h4: ({ children, ...props }) => <Heading level={4} {...props}>{children}</Heading>,
//             h5: ({ children, ...props }) => <Heading level={5} {...props}>{children}</Heading>,
//             h6: ({ children, ...props }) => <Heading level={6} {...props}>{children}</Heading>,
//             a: ({ href, children, ...props }) => {
//               const isLocal = href && href.startsWith("/");
//               const isAnchor = href && href.startsWith("#");
//               return (
//                 <a
//                   href={href}
//                   {...props}
//                   className={clsx(
//                     "relative font-medium transition-all duration-200",
//                     "text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300",
//                     "underline decoration-yellow-400/50 decoration-2 underline-offset-2",
//                     "hover:decoration-yellow-500 hover:decoration-[3px]",
//                     isAnchor && "scroll-smooth"
//                   )}
//                   target={isLocal || isAnchor ? undefined : "_blank"}
//                   rel={isLocal || isAnchor ? undefined : "noopener noreferrer"}
//                 >
//                   {children}
//                   {!isLocal && !isAnchor && (
//                     <svg className="inline w-3 h-3 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                     </svg>
//                   )}
//                 </a>
//               );
//             },
//             blockquote: ({ children }) => (
//               <blockquote className="my-6 pl-6 py-4 border-l-4 border-secondary bg-muted-foreground text-background rounded-r-xl italic relative">
//                 <div className="absolute left-2 top-2 text-4xl leading-none">"</div>
//                 <div className="relative z-10">{children}</div>
//               </blockquote>
//             ),
//             p: ({ children }) => (
//               <p className="mb-6 leading-relaxed tracking-wide">{children}</p>
//             ),
//             ul: ({ children }) => (
//               <ul className="my-6 space-y-2">{children}</ul>
//             ),
//             ol: ({ children }) => (
//               <ol className="my-6 space-y-2">{children}</ol>
//             ),
//             li: ({ children }) => (
//               <li className="flex items-start gap-3 leading-relaxed">
//                 <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2.5"></span>
//                 <span className="flex-1">{children}</span>
//               </li>
//             ),
//             table: Table,
//             thead: TableHead,
//             tr: TableRow,
//             td: TableCell,
//             th: TableHeaderCell,
//             hr: () => (
//               <div className="my-12 flex items-center justify-center">
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
//                 <div className="mx-4 text-zinc-400 dark:text-zinc-500">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-300 dark:via-zinc-600 to-transparent"></div>
//               </div>
//             ),
//             strong: ({ children }) => (
//               <strong className="font-bold px-1 py-0.5 rounded">{children}</strong>
//             ),
//             em: ({ children }) => (
//               <em className="italic text-zinc-800 dark:text-zinc-200 border-b border-dotted border-zinc-400/50">{children}</em>
//             ),
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </article>
//   );
// }


"use client"
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const [copiedCode, setCopiedCode] = React.useState<string>('');

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(language);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const components = {
    // Custom code block component with syntax highlighting
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeString = String(children).replace(/\n$/, '');

      if (!inline && language) {
        return (
          <div className="relative group">
            <div className="flex items-center justify-between bg-card px-4 py-2 rounded-t-lg">
              <span className="text-sm text-gray-300 font-mono">{language}</span>
              <button
                onClick={() => copyToClipboard(codeString, language)}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === language ? (
                  <>
                    <Check size={16} />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              style={nightOwl}
              language={language}
              PreTag="div"
              className="!mt-0 !rounded-t-none"
              showLineNumbers
              wrapLines
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono "
          {...props}
        >
          {children}
        </code>
      );
    },

    // Custom heading components
    h1: ({ children }: any) => {
      const text = typeof children === 'string' ? children : children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      return (
        <h1 
          id={id}
          className="text-4xl font-bold  mb-6 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2 scroll-mt-24"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) =>{
      const text = typeof children === 'string' ? children : children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return(
      <h2 id={id} className="text-3xl font-semibold  mb-4 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
        {children}
      </h2>
    )},
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold  mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold  mb-2 mt-4">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg font-semibold  mb-2 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base font-semibold  mb-2 mt-4">
        {children}
      </h6>
    ),

    // Paragraph styling
    p: ({ children }: any) => (
      <p className=" mb-4 leading-relaxed">
        {children}
      </p>
    ),

    // Link styling
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="hover:text-secondary underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // List styling
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4  space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4  space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),

    // Blockquote styling
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 bg-card text-foreground italic ">
        {children}
      </blockquote>
    ),

    // Table styling
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border ">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-card">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => <tr>{children}</tr>,
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider border-b border-gray-200">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 text-sm  border-b border-gray-200 ">
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
    ),

    // Image styling
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-md mb-4"
      />
    ),

    // Strong and emphasis
    strong: ({ children }: any) => (
      <strong className="font-bold ">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic ">{children}</em>
    ),
  };

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
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