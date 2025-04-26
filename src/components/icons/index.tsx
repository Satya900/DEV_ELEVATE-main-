import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const Algorithm = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 5h5"></path>
    <path d="M5 2v5"></path>
    <path d="M2 12h10"></path>
    <path d="M12 19h9"></path>
    <path d="M19 16v6"></path>
    <circle cx="15" cy="7" r="3"></circle>
    <circle cx="6" cy="15" r="3"></circle>
  </svg>
);

export const DataStructure = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5v14"></path>
    <path d="M18 12H6"></path>
    <circle cx="12" cy="12" r="7"></circle>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const Math = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
    <text x="6" y="10" fontSize="6" fill="currentColor">x²</text>
    <text x="14" y="16" fontSize="6" fill="currentColor">∑</text>
  </svg>
);

export const Java = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 12c0 4.418 4.536 8 10 8s10-3.582 10-8-4.536-8-10-8M2 12c0 4.418 4.536 8 10 8"></path>
    <path d="M4 20a6 6 0 0 0 10-4"></path>
    <line x1="8" y1="8" x2="8" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="16" y1="8" x2="16" y2="12"></line>
  </svg>
);

export const Python = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 7.5c-1.466 0-2.917.256-4.066.59C7.076 8.249 6 9.094 6 10.286v.571c0 1.165 1.074 1.99 1.934 2.144C9.083 13.345 10.535 13.5 12 13.5c1.466 0 2.917-.255 4.066-.499.858-.154 1.934-.979 1.934-2.145v-.571c0-1.192-1.076-2.037-1.934-2.196C14.917 7.756 13.467 7.5 12 7.5z"></path>
    <path d="M6 11v3.518c0 1.139.644 2.356 1.934 2.637C9.066 17.482 10.535 17.5 12 17.5c1.466 0 2.917-.1 4.066-.345C17.36 16.872 18 15.636 18 14.518V11"></path>
    <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
  </svg>
);

export const JavaScript = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <path d="M9 9v8"></path>
    <path d="M9 13h4"></path>
    <path d="M17 9l-4 4 4 4"></path>
  </svg>
);

export const Cpp = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <path d="M10 9v6"></path>
    <path d="M7 12h6"></path>
    <path d="M17 9v6"></path>
    <path d="M14 9v6"></path>
  </svg>
);

export const Database = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

export const ProblemSolving = ({ className, size = 24 }: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2v4.5a2 2 0 0 0 2 2h4.5"></path>
    <path d="M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h8l6 6v8a2 2 0 0 1-2 2h-4.5"></path>
    <circle cx="7" cy="17" r="1"></circle>
    <circle cx="7" cy="13" r="1"></circle>
    <circle cx="7" cy="9" r="1"></circle>
  </svg>
);

export const IconMap: Record<string, React.FC<IconProps>> = {
  'Algorithm': Algorithm,
  'DataStructure': DataStructure,
  'Math': Math,
  'Java': Java,
  'Python': Python,
  'JavaScript': JavaScript,
  'Cpp': Cpp,
  'Database': Database,
  'ProblemSolving': ProblemSolving,
};

export const TopicIcon = ({ name, className, size = 24 }: IconProps & { name: string }) => {
  const Icon = IconMap[name] || ProblemSolving;
  return <Icon className={className} size={size} />;
}; 