import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = false,
}: CodeBlockProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        background: isDarkMode ? '#1f2937' : '#ffffff',
        margin: '1rem 0',
        overflow: 'auto',
      }}
      className="group"
    >
      {/* ✅ Copy Icon + Tooltip (below the icon) */}
      <div
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          background: isDarkMode ? '#374151' : '#f3f4f6',
          borderRadius: '8px',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          fontSize: '0.8rem',
          fontWeight: 500,
        }}
      >
        {copied ? (
          <span
            style={{
              color: isDarkMode ? '#10B981' : '#047857',
              fontWeight: 600,
              transition: 'opacity 0.3s ease',
            }}
          >
            Copied!
          </span>
        ) : (
          <Copy
            size={16}
            color={isDarkMode ? '#e5e7eb' : '#111827'}
            style={{ transition: 'opacity 0.3s ease' }}
          />
        )}

        {/* 💬 Tooltip BELOW icon */}
        {!copied && hovered && (
          <span
            style={{
              position: 'absolute',
              bottom: '-28px', // 👈 Now appears below
              right: '0',
              background: isDarkMode ? '#374151' : '#111827',
              color: '#fff',
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              transform: hovered ? 'translateY(2px)' : 'translateY(8px)',
              pointerEvents: 'none',
            }}
          >
            Copy code
          </span>
        )}
      </div>

      {/* 💻 Syntax Highlighted Code */}
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
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
