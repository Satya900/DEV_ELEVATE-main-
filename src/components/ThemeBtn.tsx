import { useState, useRef, useEffect } from 'react';
import useTheme from '../context/theme';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeBtn() {
  const { themeMode, storedTheme, lightTheme, darkTheme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getThemeIcon = () => {
    if (themeMode === 'dark') return <Moon className="h-5 w-5" />;
    return <Sun className="h-5 w-5" />;
  };

  const getThemeLabel = () => {
    if (storedTheme === 'system') return 'System';
    if (themeMode === 'dark') return 'Dark';
    return 'Light';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {getThemeIcon()}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${storedTheme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              role="menuitem"
              onClick={() => {
                lightTheme();
                setIsOpen(false);
              }}
            >
              <Sun className="h-4 w-4 mr-2" />
              <span>Light</span>
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${storedTheme === 'dark' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              role="menuitem"
              onClick={() => {
                darkTheme();
                setIsOpen(false);
              }}
            >
              <Moon className="h-4 w-4 mr-2" />
              <span>Dark</span>
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${storedTheme === 'system' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              role="menuitem"
              onClick={() => {
                systemTheme?.();
                setIsOpen(false);
              }}
            >
              <Monitor className="h-4 w-4 mr-2" />
              <span>System</span>
            </button>
          </div>
        </div>
      )}
      
      <span className="sr-only">Current theme: {getThemeLabel()}</span>
    </div>
  );
}
