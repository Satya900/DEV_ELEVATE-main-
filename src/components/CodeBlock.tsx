import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  showLineNumbers = false 
}) => {
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      background: isDarkMode ? '#1e1e1e' : '#ffffff',
      margin: '1rem 0',
      overflow: 'auto',
    }}>
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? vscDarkPlus : vs}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '12px',
          fontSize: '14px',
          background: 'transparent',
          padding: '1.25rem',
          color: isDarkMode ? '#d4d4d4' : '#24292e',
        }}
        codeTagProps={{
          style: {
            color: isDarkMode ? '#d4d4d4' : '#24292e',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};