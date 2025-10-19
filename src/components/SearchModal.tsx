import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Book, Code2, Layout, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { projects } from '../data/projects';

interface SearchResult {
	type: 'article' | 'project';
	title: string;
	description: string;
	category: string;
	url: string;
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}

		const query = searchQuery.toLowerCase();
		const searchResults: SearchResult[] = [];

		// Search through articles
		Object.values(categories).forEach(category => {
			category.subcategories.forEach((subcategory : { id: string; articles: { title: string; description: string; slug: string; }[]; }) => {
				subcategory.articles.forEach(article => {
					if (
						article.title.toLowerCase().includes(query) ||
						article.description.toLowerCase().includes(query)
					) {
						searchResults.push({
							type: 'article',
							title: article.title,
							description: article.description,
							category: category.title,
							url: `/${category.id}/${subcategory.id}/${article.slug}`
						});
					}
				});
			});
		});

		// Search through projects
		projects.forEach(project => {
			if (
				project.title.toLowerCase().includes(query) ||
				project.description.toLowerCase().includes(query) ||
				project.technologies.some(tech => tech.toLowerCase().includes(query))
			) {
				searchResults.push({
					type: 'project',
					title: project.title,
					description: project.description,
					category: 'Projects',
					url: `/projects/${project.id}`
				});
			}
		});

		setResults(searchResults);
	}, [searchQuery]);

	const handleSelect = (url: string) => {
  onClose();
  setTimeout(() => navigate(url), 150);
};


	// Handle keyboard events
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
						onClick={onClose}
					/>
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -20 }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							className="w-full max-w-2xl"
						>
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
								{/* Header with Close Button */}
								<div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
									<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search</h2>
									<button
										onClick={onClose}
										className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
										aria-label="Close search"
									>
										<X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
									</button>
								</div>

								{/* Search Input */}
								<div className="p-4 border-b border-gray-100 dark:border-gray-700">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="text"
											placeholder="Search for tutorials, projects, or topics..."
											className="w-full pl-10 pr-10 py-3 text-lg rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 outline-none transition-all dark:text-white"
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											autoFocus
										/>
										{searchQuery && (
											<button
												onClick={() => setSearchQuery('')}
												className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
											>
												<X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
											</button>
										)}
									</div>
								</div>

								{/* Results */}
								<div className="max-h-[60vh] overflow-y-auto">
									{results.length > 0 ? (
										<div className="p-2">
											{results.map((result, index) => (
												<button
													key={index}
													className="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-left transition-colors group flex items-start gap-3"
													onClick={() => handleSelect(result.url)}
												>
													<div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
														{result.type === 'article' ? (
															<Book className="h-5 w-5" />
														) : (
															<Code2 className="h-5 w-5" />
														)}
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex items-center justify-between gap-2">
															<h3 className="font-medium text-gray-900 dark:text-white truncate">
																{result.title}
															</h3>
															<span className="text-sm text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
																{result.category}
															</span>
														</div>
														<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
															{result.description}
														</p>
													</div>
													<ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" />
												</button>
											))}
										</div>
									) : searchQuery ? (
										<div className="p-8 text-center">
											<Layout className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
											<p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
											<p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try different keywords or browse categories below</p>
										</div>
									) : (
										<div className="p-8 text-center">
											<Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
											<p className="text-gray-500 dark:text-gray-400">Start typing to search...</p>
											<p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Search across all tutorials, projects, and topics</p>
										</div>
									)}
								</div>

								{/* Quick Links */}
								<div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
									<div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Quick Links</div>
									<div className="flex flex-wrap gap-2">
										<QuickLink to="/dsa" label="DSA" onClose={onClose} />
										<QuickLink to="/web-dev" label="Web Dev" onClose={onClose} />
										<QuickLink to="/system-design" label="System Design" onClose={onClose} />
										<QuickLink to="/projects" label="Projects" onClose={onClose} />
										<QuickLink to="/topics" label="Topics" onClose={onClose} />
										<QuickLink to="/problems" label="Problems" onClose={onClose} />
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}

function QuickLink({ to, label, onClose }: { to: string; label: string; onClose: () => void }) {
	const navigate = useNavigate();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onClose(); // Close modal before navigation
		navigate(to);
	};

	return (
		<button
			onClick={handleClick}
			className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 transition-colors"
		>
			{label}
		</button>
	);
}