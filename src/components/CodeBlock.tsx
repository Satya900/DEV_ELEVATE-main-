import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  showLineNumbers = false // Hide line numbers for a cleaner look
}) => {
  return (
    <div style={{
      border: '6px solid #e5e7eb', // Tailwind gray-200
      borderRadius: '12px',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      background: '#232323',
      margin: '0.5rem 0',
      overflow: 'auto',
    }}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '8px',
          fontSize: '1rem',
          background: 'transparent',
          padding: '1.25rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
