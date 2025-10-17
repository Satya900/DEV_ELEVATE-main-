import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Menu, X, Github, User } from 'lucide-react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { nav_links } from '../../lib/utils';
import ThemeBtn from './ThemeBtn';

export function Navbar() {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);
	const [userMenuOpen, setUserMenuOpen] = React.useState(false);
	const userMenuRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setUserMenuOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
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
					<Link to="/" className="flex items-center space-x-3 group">
						<div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
							<Code2 className="h-8 w-8 text-white" />
						</div>
						<span className="text-black font-bold text-xl tracking-tight dark:text-neutral-100">DEVELEVATE</span>
					</Link>

					<div className="hidden md:flex items-center justify-between space-x-8">
						<div className="flex items-center justify-between gap-6">
							{
								nav_links.map((link) => (
								<NavLink key={link.name} to={link.path}>
									{link.name}
								</NavLink>
							))}
						</div>
						<ThemeBtn />
						{currentUser ? (
							<div className="ml-3 relative" ref={userMenuRef}>
								<button
									onClick={() => setUserMenuOpen(!userMenuOpen)}
									className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
								>
									<div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
										<User className="h-5 w-5" />
									</div>
									<span className="hidden lg:inline-block">{currentUser.email?.split('@')[0]}</span>
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
									className=" whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-lg transition-colors duration-300 text-white hover:text-white-400 focus:outline-none focus:ring-2 focus:ring-white-400"
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
						<MobileNavLink to="/topics" onClick={() => setIsOpen(false)}>Prepare</MobileNavLink>
						<MobileNavLink to="/compiler" onClick={() => setIsOpen(false)}>Compiler</MobileNavLink>
						{currentUser && (
							<MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>Profile</MobileNavLink>
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

						{currentUser && (
							<button
								onClick={() => {
									handleLogout();
									setIsOpen(false);
								}}
								className="flex items-center w-full px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
							>
								Sign out
							</button>
						)}
					</div>
				</motion.div>
			)}
		</nav>
	);
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<RouterNavLink
			to={to}
			className={({ isActive }) =>
				`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
					? 'bg-emerald-600 text-white'
					: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
				}`
			}
		>
			{children}
		</RouterNavLink>
	);
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
	return (
		<RouterNavLink
			to={to}
			className="flex items-center px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors"
			onClick={onClick}
		>
			{children}
		</RouterNavLink>
	);
}