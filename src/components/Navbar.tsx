import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Menu, X, Github, User, ChevronDown } from 'lucide-react';
import { Link, NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { nav_links, NavLink as NavLinkType, SubNavItem } from '../../lib/utils';
import ThemeBtn from './ThemeBtn';

export function Navbar() {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);
	const [userMenuOpen, setUserMenuOpen] = React.useState(false);
	const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
	const userMenuRef = React.useRef<HTMLDivElement>(null);
	const dropdownRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setUserMenuOpen(false);
			}
			
			// Check if click is outside any dropdown
			const clickedOutsideDropdown = Object.values(dropdownRefs.current).every(
				ref => !ref || !ref.contains(event.target as Node)
			);
			
			if (clickedOutsideDropdown) {
				setActiveDropdown(null);
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

	// Modal open handlers
	const openSignInModal = () => {
		navigate('/signin', { 
			state: { 
				isModal: true, 
				backgroundLocation: location 
			} 
		});
	};

	const openSignUpModal = () => {
		navigate('/signup', { 
			state: { 
				isModal: true, 
				backgroundLocation: location 
			} 
		});
	};

	return (
		<nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 dark:bg-black/80 dark:text-neutral-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo - Left Corner (No Space) */}
					<Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
						<div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform">
							<Code2 className="h-6 w-6 text-white" />
						</div>
						<span className="text-black font-bold text-lg tracking-tight dark:text-neutral-100">DEVELEVATE</span>
					</Link>

					{/* Navigation Links - Center */}
					<div className="hidden md:flex items-center justify-center flex-1">
						<div className="flex items-center gap-4">
							{nav_links.map((link) => (
								<div key={link.name} className="relative">
									{link.hasDropdown ? (
										<DropdownNavLink 
											link={link}
											isActive={activeDropdown === link.name}
											onToggle={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
											ref={(el) => dropdownRefs.current[link.name] = el}
										/>
									) : (
										<NavLink to={link.path}>
											{link.name}
										</NavLink>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Theme Button and Auth Section - Right Corner */}
					<div className="hidden md:flex items-center gap-3 flex-shrink-0">
						<ThemeBtn />
						{currentUser ? (
							<div className="relative" ref={userMenuRef}>
								<button
									onClick={() => setUserMenuOpen(!userMenuOpen)}
									className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
								>
									<div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
										<User className="h-4 w-4" />
									</div>
									<span className="hidden lg:inline-block text-sm">{currentUser.email?.split('@')[0]}</span>
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
							<div className="flex items-center gap-2">
								<button
									onClick={openSignInModal}
									className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium transition-colors"
								>
									Sign In
								</button>
								<button
									onClick={openSignUpModal}
									className="whitespace-nowrap bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
								>
									Sign Up
								</button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-lg transition-colors duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
					<div className="px-2 pt-2 pb-3 space-y-1">
						{nav_links.map((link) => (
							<MobileDropdownNavLink 
								key={link.name}
								link={link}
								onClose={() => setIsOpen(false)}
							/>
						))}
						
						{!currentUser && (
							<>
								<button
									onClick={() => {
										openSignInModal();
										setIsOpen(false);
									}}
									className="flex items-center w-full px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
								>
									Sign In
								</button>
								<button
									onClick={() => {
										openSignUpModal();
										setIsOpen(false);
									}}
									className="flex items-center w-full px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
								>
									Sign Up
								</button>
							</>
						)}
						
						{currentUser && (
							<MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>Profile</MobileNavLink>
						)}
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
						>
							<Github className="h-4 w-4 mr-2" />
							GitHub
						</a>

						{currentUser && (
							<button
								onClick={() => {
									handleLogout();
									setIsOpen(false);
								}}
								className="flex items-center w-full px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
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

// Dropdown Navigation Link Component
const DropdownNavLink = React.forwardRef<HTMLDivElement, {
	link: NavLinkType;
	isActive: boolean;
	onToggle: () => void;
}>(({ link, isActive, onToggle }, ref) => {
	return (
		<div ref={ref} className="relative">
			<button
				onClick={onToggle}
				className="flex items-center space-x-1 whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
			>
				<span>{link.name}</span>
				<ChevronDown className={`h-3 w-3 transition-transform ${isActive ? 'rotate-180' : ''}`} />
			</button>
			
			{isActive && (
				<motion.div
					initial={{ opacity: 0, y: -10, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -10, scale: 0.95 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg dropdown-shadow border border-gray-200 dark:border-gray-700 py-1 z-50 backdrop-blur-sm"
				>
					{link.subItems?.map((subItem: SubNavItem) => (
						<Link
							key={subItem.name}
							to={subItem.path}
							className="block px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-150 rounded mx-1"
							onClick={() => onToggle()}
						>
							{subItem.name}
						</Link>
					))}
				</motion.div>
			)}
		</div>
	);
});

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<RouterNavLink
			to={to}
			className={({ isActive }) =>
				`whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isActive
					? 'bg-emerald-600 text-white'
					: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
				}`
			}
		>
			{children}
		</RouterNavLink>
	);
}

// Mobile Dropdown Navigation Component
function MobileDropdownNavLink({ link, onClose }: { link: NavLinkType; onClose: () => void }) {
	const [isExpanded, setIsExpanded] = React.useState(false);

	if (!link.hasDropdown) {
		return (
			<MobileNavLink to={link.path} onClick={onClose}>
				{link.name}
			</MobileNavLink>
		);
	}

	return (
		<div className="space-y-1">
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex items-center justify-between w-full px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
			>
				<span>{link.name}</span>
				<ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
			</button>
			
			{isExpanded && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className="ml-3 space-y-1"
				>
					{link.subItems?.map((subItem: SubNavItem) => (
						<Link
							key={subItem.name}
							to={subItem.path}
							className="block px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg transition-all duration-150"
							onClick={onClose}
						>
							{subItem.name}
						</Link>
					))}
				</motion.div>
			)}
		</div>
	);
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
	return (
		<RouterNavLink
			to={to}
			className="flex items-center px-3 py-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm"
			onClick={onClick}
		>
			{children}
		</RouterNavLink>
	);
}