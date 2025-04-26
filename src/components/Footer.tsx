import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Twitter, Github, Linkedin, Instagram } from 'lucide-react';

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors group dark:bg-black dark:text-neutral-400 dark:hover:bg-emerald-500/90 dark:hover:text-white p-2"
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      {label && (
        <span className="absolute invisible group-hover:visible bg-black text-white text-sm py-1 px-2 rounded -bottom-8 whitespace-nowrap">
          {label}
        </span>
      )}
    </a>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block text-gray-600 hover:text-gray-900 mb-3 transition-colors dark:text-neutral-400 dark:hover:text-neutral-200"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-black font-bold text-xl">DEVELEVATE</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md dark:text-neutral-300">
              Empowering developers with comprehensive learning resources and practical projects.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://x.com/satyatechgeek" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="https://github.com/Satya900/DEV_MAIN.git" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="https://www.linkedin.com/company/dev-elevate" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="https://instagram.com/develevate" icon={<Instagram className="h-5 w-5" />} />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 dark:text-neutral-200">Resources</h3>
            <FooterLink to="/dsa">DSA</FooterLink>
            <FooterLink to="/web-dev">Web Development</FooterLink>
            <FooterLink to="/system-design">System Design</FooterLink>
            <FooterLink to="/projects">Projects</FooterLink>
            <FooterLink to="/problems">Coding Problems</FooterLink>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 dark:text-neutral-200">Company</h3>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-600 text-center dark:text-neutral-200">
            © {new Date().getFullYear()} Develevate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 