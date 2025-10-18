import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return <p>No content available.</p>;
  try {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  } catch (err) {
    console.error("Markdown render error:", err);
    return <p>Unable to render markdown content.</p>;
  }
};
