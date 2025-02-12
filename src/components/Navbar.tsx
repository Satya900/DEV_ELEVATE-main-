import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Menu, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeBtn from './ThemeBtn';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full  bg-white/90 backdrop-blur-sm z-50 dark:bg-black/80 dark:text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <span className="text-black font-bold text-xl tracking-tight dark:text-neutral-100">DEVELEVATE</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div>
            <NavLink to="/dsa">DSA</NavLink>
            <NavLink to="/web-dev">Web Dev</NavLink>
            <NavLink to="/system-design">System Design</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
            </div>
            <ThemeBtn />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/dsa" onClick={() => setIsOpen(false)}>DSA</MobileNavLink>
            <MobileNavLink to="/web-dev" onClick={() => setIsOpen(false)}>Web Dev</MobileNavLink>
            <MobileNavLink to="/system-design" onClick={() => setIsOpen(false)}>System Design</MobileNavLink>
            <MobileNavLink to="/projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Github className="h-5 w-5 mr-3" />
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-gray-700 hover:text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-medium dark:text-gray-300 dark:hover:bg-gradient-to-r from-emerald-500 to-teal-500 dark:hover:bg-black"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}