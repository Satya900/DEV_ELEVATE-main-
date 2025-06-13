import React, { useEffect, useState } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check current theme
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
    };

    // Check initial theme
    checkTheme();

    // Create observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    // Observe changes to the html element's class attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);
  
  return (
    <div style={{
      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      background: isDarkMode ? '#1f2937' : '#ffffff',
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
          color: isDarkMode ? '#e5e7eb' : '#374151',
        }}
        codeTagProps={{
          style: {
            color: isDarkMode ? '#e5e7eb' : '#374151',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            background: 'transparent',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};