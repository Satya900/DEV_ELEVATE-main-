import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Twitter, Github, Linkedin, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-gradient-to-r dark:hover:from-emerald-500 dark:hover:to-teal-500"
      aria-label={label}
    >
      {icon}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none dark:bg-neutral-700">
        {label}
      </span>
    </a>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block text-gray-600 hover:text-emerald-600 hover:translate-x-1 mb-2.5 transition-all duration-200 text-sm dark:text-neutral-400 dark:hover:text-emerald-400"
    >
      {children}
    </Link>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-3 text-gray-600 dark:text-neutral-400 mb-3">
      <div className="flex-shrink-0 mt-0.5 text-emerald-500">
        {icon}
      </div>
      <span className="text-sm">{children}</span>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [subscribeStatus, setSubscribeStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 dark:from-black dark:to-neutral-900 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-2xl tracking-tight dark:text-white">DEVELEVATE</span>
              </Link>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed dark:text-neutral-400">
                Empowering developers worldwide with comprehensive learning resources, practical projects, and a supportive community to elevate your coding journey.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white">Stay Updated</h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                {subscribeStatus === 'success' && (
                  <p className="text-emerald-600 text-xs mt-2 dark:text-emerald-400">✓ Successfully subscribed!</p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <SocialLink href="https://x.com/satyatechgeek" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                <SocialLink href="https://github.com/Satya900/DEV_MAIN.git" icon={<Github className="h-4 w-4" />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/company/dev-elevate" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
                <SocialLink href="https://instagram.com/develevate" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
              </div>
            </div>

            {/* Resources Section */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider dark:text-white">Resources</h3>
              <nav className="space-y-1">
                <FooterLink to="/dsa">DSA</FooterLink>
                <FooterLink to="/web-dev">Web Development</FooterLink>
                <FooterLink to="/system-design">System Design</FooterLink>
                <FooterLink to="/projects">Projects</FooterLink>
                <FooterLink to="/problems">Coding Problems</FooterLink>
                <FooterLink to="/compiler">Code Compiler</FooterLink>
              </nav>
            </div>

            {/* Company Section */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider dark:text-white">Company</h3>
              <nav className="space-y-1">
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/courses">Courses</FooterLink>
                <FooterLink to="/techbuzz">Tech Buzz</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </nav>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-4">
              <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider dark:text-white">Contact Us</h3>
              <div className="space-y-1">
                <ContactItem icon={<Mail className="h-4 w-4" />}>
                  support@develevate.com
                </ContactItem>
                <ContactItem icon={<Phone className="h-4 w-4" />}>
                  +1 (555) 123-4567
                </ContactItem>
                <ContactItem icon={<MapPin className="h-4 w-4" />}>
                  123 Developer Street, Tech City, TC 12345
                </ContactItem>
              </div>

              {/* Quick Stats or Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 dark:from-emerald-950/20 dark:to-teal-950/20 dark:border-emerald-900/30">
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">Join Our Community</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">10,000+</p>
                <p className="text-xs text-gray-600 dark:text-neutral-400">Active Developers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-neutral-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 text-sm text-center sm:text-left dark:text-neutral-400">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">Develevate</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors dark:text-neutral-400 dark:hover:text-emerald-400">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors dark:text-neutral-400 dark:hover:text-emerald-400">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors dark:text-neutral-400 dark:hover:text-emerald-400">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}