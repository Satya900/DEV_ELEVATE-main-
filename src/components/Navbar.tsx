import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Menu, X, Github, User, ChevronDown } from 'lucide-react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeBtn from './ThemeBtn';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
        setCoursesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 dark:bg-black/80 dark:text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <span className="text-black font-bold text-xl tracking-tight dark:text-neutral-100">
              DEVELEVATE
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <span>Courses</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {coursesOpen && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                  {[
                    { name: 'DSA', to: '/dsa' },
                    { name: 'Web Dev', to: '/web-dev' },
                    { name: 'System Design', to: '/system-design' },
                    { name: 'Projects', to: '/projects' },
                    { name: 'Prepare', to: '/topics' },
                    { name: 'DevCompiler', to: '/compiler' },
                    { name: 'TechBuzz', to: '/techbuzz' },
                  ].map((link) => (
                    <RouterNavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`
                      }
                      onClick={() => setCoursesOpen(false)}
                    >
                      {link.name}
                    </RouterNavLink>
                  ))}
                </div>
              )}
            </div>

            {/* GitHub & Theme */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
            <ThemeBtn />

            {/* User Auth */}
            {currentUser ? (
              <div className="ml-3 relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="hidden sm:inline-block">{currentUser.email?.split('@')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className=" whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className=" whitespace-nowrap bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-black dark:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['DSA', 'Web Dev', 'System Design', 'Projects', 'Prepare', 'DevCompiler', 'TechBuzz'].map(
              (name) => (
                <MobileNavLink
                  key={name}
                  to={`/${name.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </MobileNavLink>
              )
            )}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Github className="h-5 w-5 mr-3" />
              GitHub
            </a>
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
              >
                Sign out
              </button>
            ) : (
              <>
                <MobileNavLink to="/signin" onClick={() => setIsOpen(false)}>
                  Sign In
                </MobileNavLink>
                <MobileNavLink to="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <RouterNavLink
      to={to}
      className="flex items-center px-4 py-3 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
}
