import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Layout, Brain, Sparkles, Github, Twitter, Linkedin, Instagram, Gift, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchModal } from '../components/SearchModal';

export function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl inline-block mb-6"
              >
                <Code2 className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight dark:text-neutral-300">
                Master Modern
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> Development</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto dark:text-neutral-300">
                Your comprehensive platform for learning programming, from data structures to system design. Build real-world projects and advance your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="inline-flex items-center px-8 py-3 rounded-full text-white bg-black hover:bg-gray-800 transition-all transform hover:scale-105 font-medium dark:hover:bg-emerald-500/90"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a
                  href="https://github.com/Satya900/DEV_MAIN.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 rounded-full text-black bg-gray-100 hover:bg-gray-200 transition-all font-medium"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-16">
              <SocialLink 
                href="https://github.com/Satya900/DEV_MAIN.git" 
                icon={<Github className="h-6 w-6" />}
                label="GitHub"
              />
              <SocialLink 
                href="https://www.linkedin.com/company/dev-elevate" 
                icon={<Linkedin className="h-6 w-6" />}
                label="LinkedIn"
              />
              <SocialLink 
                href="https://x.com/satyatechgeek" 
                icon={<Twitter className="h-6 w-6" />}
                label="X (Twitter)"
              />
              <SocialLink 
                href="https://instagram.com/dev_elevate" 
                icon={<Instagram className="h-6 w-6" />}
                label="Instagram"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200">
              Everything You Need to Excel
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Comprehensive learning paths designed to take you from beginner to expert
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              to="/web-dev"
              icon={<Layout className="h-6 w-6" />}
              title="Web Development"
              description="Master modern frameworks and build responsive applications"
            />
            <FeatureCard
              to="/dsa"
              icon={<Code2 className="h-6 w-6" />}
              title="Data Structures"
              description="Learn essential algorithms and ace technical interviews"
            />
            <FeatureCard
              to="/system-design"
              icon={<Database className="h-6 w-6" />}
              title="System Design"
              description="Design scalable systems and microservices architecture"
            />
          </div>
        </div>
      </section>

      {/* Open Source Contribution Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-neutral-200">
              Contribute & Earn Rewards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-neutral-300">
              Join our open source community and earn exciting rewards through our bounty program
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center dark:bg-black dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-neutral-200">Bronze Tier</h3>
              <p className="text-gray-600 mb-4 dark:text-neutral-400">Earn 10 points and get a limited edition Develevate T-shirt</p>
              <div className="text-emerald-500 font-semibold">10 Points</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center transform scale-105  dark:bg-black dark:border-gray-700 "
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-neutral-200">Silver Tier</h3>
              <p className="text-gray-600 mb-4 dark:text-neutral-400">Earn 20 points and receive an exclusive Develevate Swag Box</p>
              <div className="text-emerald-500 font-semibold">20 Points</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center  dark:bg-black dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-neutral-200">Gold Tier</h3>
              <p className="text-gray-600 mb-4 dark:text-neutral-400">Earn 30 points and win Rs. 2000 cash prize + Swag Box</p>
              <div className="text-emerald-500 font-semibold ">30 Points</div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/Satya900/DEV_MAIN/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 rounded-full text-white bg-black hover:bg-gray-800 transition-all transform hover:scale-105 font-medium dark:hover:bg-emerald-500/90"
            >
              Start Contributing
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}

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

function FeatureCard({ 
  icon, 
  title, 
  description, 
  to 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  to: string;
}) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-colors hover:border-emerald-500 group cursor-pointer dark:bg-black dark:border-gray-700 "
      >
        <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition-colors dark:text-neutral-200">{title}</h3>
        <p className="text-gray-600 dark:text-neutral-400">{description}</p>
      </motion.div>
    </Link>
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