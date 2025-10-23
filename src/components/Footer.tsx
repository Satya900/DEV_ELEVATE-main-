import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Twitter, Github, Linkedin, Instagram, Mail, ArrowRight, Star, Zap, Users, BookOpen, Sparkles, Heart } from 'lucide-react';

// Social media specific styles
const socialMediaStyles = {
  twitter: "hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600",
  github: "hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900 dark:hover:from-gray-600 dark:hover:to-gray-800",
  linkedin: "hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800",
  instagram: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500",
  mail: "hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600"
};

function SocialLink({ href, icon, label, platform }: { 
  href: string; 
  icon: React.ReactNode; 
  label?: string;
  platform: keyof typeof socialMediaStyles;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/80 text-gray-600 hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 dark:bg-neutral-900/90 dark:border-neutral-700/80 dark:text-neutral-400 ${socialMediaStyles[platform]}`}
    >
      <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg z-10 hidden sm:block">
        {label}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </span>
    </a>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex items-center py-2 text-sm sm:text-base sm:py-2.5 text-gray-600 hover:text-gray-900 transition-all duration-300 dark:text-neutral-400 dark:hover:text-white"
    >
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
      <span className="group-hover:font-medium transition-all duration-300 group-hover:translate-x-1 text-sm sm:text-base">
        {children}
      </span>
    </Link>
  );
}

function SectionHeading({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg dark:text-white flex items-center gap-2 sm:gap-3 cursor-default">
      {icon && (
        <div className="p-1 sm:p-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-md sm:rounded-lg border border-emerald-500/20">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" 
          })}
        </div>
      )}
      <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white text-sm sm:text-base">
        {children}
      </span>
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-neutral-950 border-t border-gray-200/80 dark:border-neutral-800/80 overflow-hidden">
      {/* Enhanced Background Design */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-gradient-to-tr from-teal-500/8 to-emerald-500/8 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                  <Code2 className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-black font-bold text-2xl sm:text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                  DEVELEVATE
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 dark:text-neutral-500 font-medium">Live Learning Platform</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed dark:text-neutral-300 max-w-lg">
              Empowering the next generation of developers with cutting-edge resources, real-world projects, and a thriving community.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 dark:from-neutral-900/50 dark:to-neutral-900 dark:border-neutral-700/50 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 dark:text-white flex items-center text-sm sm:text-base">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600" />
                Stay Updated
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 dark:text-neutral-300">
                Get weekly coding resources & updates
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border border-gray-300/80 focus:border-emerald-500 focus:ring-2 sm:focus:ring-3 focus:ring-emerald-500/10 outline-none transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:focus:border-emerald-400"
                />
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2">
                  Join
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2 sm:space-x-3">
              <SocialLink 
                href="https://x.com/satyatechgeek" 
                icon={<Twitter className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="Follow on Twitter"
                platform="twitter"
              />
              <SocialLink 
                href="https://github.com/Satya900/DEV_MAIN.git" 
                icon={<Github className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="Star on GitHub"
                platform="github"
              />
              <SocialLink 
                href="https://www.linkedin.com/company/dev-elevate" 
                icon={<Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="Connect on LinkedIn"
                platform="linkedin"
              />
              <SocialLink 
                href="https://instagram.com/develevate" 
                icon={<Instagram className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="Follow on Instagram"
                platform="instagram"
              />
            </div>
          </div>
          
          {/* Resources Section */}
          <div className="md:col-span-1 lg:col-span-2">
            <SectionHeading icon={<BookOpen className="w-4 h-4 text-emerald-600" />}>
              Resources
            </SectionHeading>
            <div className="space-y-0 sm:space-y-1">
              <FooterLink to="/dsa">Data Structures & Algorithms</FooterLink>
              <FooterLink to="/web-dev">Web Development</FooterLink>
              <FooterLink to="/mobile-dev">Mobile Development</FooterLink>
              <FooterLink to="/system-design">System Design</FooterLink>
              <FooterLink to="/devops">DevOps & Cloud</FooterLink>
              <FooterLink to="/projects">Project Ideas</FooterLink>
              <FooterLink to="/problems">Coding Problems</FooterLink>
            </div>
          </div>

          {/* Learning Paths Section */}
          <div className="md:col-span-1 lg:col-span-2">
            <SectionHeading icon={<Zap className="w-4 h-4 text-emerald-600" />}>
              Learning Paths
            </SectionHeading>
            <div className="space-y-0 sm:space-y-1">
              <FooterLink to="/path/frontend">Frontend Mastery</FooterLink>
              <FooterLink to="/path/backend">Backend Development</FooterLink>
              <FooterLink to="/path/fullstack">Full Stack</FooterLink>
              <FooterLink to="/path/android">Android Developer</FooterLink>
              <FooterLink to="/path/ios">iOS Developer</FooterLink>
              <FooterLink to="/path/devops">DevOps Engineer</FooterLink>
              <FooterLink to="/path/machine-learning">ML Engineer</FooterLink>
            </div>
          </div>

          {/* Company & Support Section */}
          <div className="md:col-span-2 lg:col-span-3">
            <SectionHeading icon={<Users className="w-4 h-4 text-emerald-600" />}>
              Company & Support
            </SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="space-y-0 sm:space-y-1">
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
                <FooterLink to="/blog">Blog</FooterLink>
                <FooterLink to="/testimonials">Success Stories</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </div>
              <div className="space-y-0 sm:space-y-1">
                <FooterLink to="/help">Help Center</FooterLink>
                <FooterLink to="/community">Community</FooterLink>
                <FooterLink to="/docs">Documentation</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-300/50 dark:border-neutral-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 sm:space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-600 dark:text-neutral-400 text-center sm:text-left">
              <span>© {new Date().getFullYear()} Develevate. All rights reserved.</span>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="flex items-center gap-1.5">
                Made with <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-current animate-pulse" /> for developers
              </span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-full font-medium border border-emerald-500/20 text-xs">
                Open Source
              </span>
              <span className="text-gray-600 dark:text-neutral-400 font-mono text-xs sm:text-sm">v2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}