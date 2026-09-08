import React from 'react';

/**
 * Parses and renders text with inline HTML formatting (<i>, <b>, <em>, <strong>, <code>)
 * and markdown bold/italic (**bold**, *italic*, `code`) safely into React elements.
 * Automatically cleans up any unsupported or unescaped HTML tags so raw tags never leak into the UI.
 */
export function parseFormattedText(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  // Convert <br> to newlines and strip unsupported HTML tags (preserving i, em, b, strong, code)
  const text = rawText
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<(?!(\/?(i|em|b|strong|code)\b))[^>]+>/gi, '');

  const regex = /<b>([\s\S]*?)<\/b>|<strong>([\s\S]*?)<\/strong>|\*\*([^*]+)\*\*|<i>([\s\S]*?)<\/i>|<em>([\s\S]*?)<\/em>|(?:\*([^*]+)\*)|(?:_([^_]+)_)|<code>([\s\S]*?)<\/code>|`([^`]+)`/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    const boldContent = match[1] || match[2] || match[3];
    const italicContent = match[4] || match[5] || match[6] || match[7];
    const codeContent = match[8] || match[9];

    if (boldContent !== undefined) {
      parts.push({ type: 'bold', content: boldContent });
    } else if (italicContent !== undefined) {
      parts.push({ type: 'italic', content: italicContent });
    } else if (codeContent !== undefined) {
      parts.push({ type: 'code', content: codeContent });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

export default function FormattedText({ text, className = '' }) {
  if (!text || typeof text !== 'string') return null;

  const parts = parseFormattedText(text);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'italic') {
          return (
            <em key={index} className="italic font-medium">
              {part.content}
            </em>
          );
        }
        if (part.type === 'bold') {
          return (
            <strong key={index} className="font-bold">
              {part.content}
            </strong>
          );
        }
        if (part.type === 'code') {
          return (
            <code
              key={index}
              className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-[12px]"
            >
              {part.content}
            </code>
          );
        }
        return <React.Fragment key={index}>{part.content}</React.Fragment>;
      })}
    </span>
  );
}
