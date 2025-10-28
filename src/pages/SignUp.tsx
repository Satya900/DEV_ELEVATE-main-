import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { FirebaseError } from 'firebase/app';

interface SignUpProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function SignUp({ onSuccess, isModal = false }: SignUpProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { signUp } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError('Passwords do not match');
		}

		if (password.length < 6) {
			return setError('Password should be at least 6 characters');
		}

		try {
			setError('');
			setLoading(true);
			await signUp(email, password);
			
			// ✅ CHANGE: Redirect to profile page after successful signup
			if (onSuccess) {
				onSuccess();
			} else {
				navigate('/profile'); // Profile page par redirect
			}
		} catch (err) {
			console.error('Sign up error:', err);
			if (typeof err === 'string') {
				setError(err);
			} else if (err instanceof FirebaseError) {
				switch (err.code) {
					case 'auth/email-already-in-use':
						setError('An account with this email already exists');
						break;
					case 'auth/invalid-email':
						setError('Invalid email address format');
						break;
					case 'auth/weak-password':
						setError('Password is too weak');
						break;
					case 'auth/operation-not-allowed':
						setError('Email/password accounts are not enabled');
						break;
					case 'auth/network-request-failed':
						setError('Network error. Please check your connection');
						break;
					default:
						setError('Failed to create an account');
				}
			} else {
				setError('Failed to create an account');
			}
		} finally {
			setLoading(false);
		}
	}

	// Close modal function
	const handleClose = () => {
		if (onSuccess) {
			onSuccess();
		} else {
			navigate(-1);
		}
	};

	// Modal overlay click handler
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	// Modal version
	if (isModal) {
		return (
			<div 
				className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
				onClick={handleOverlayClick}
			>
				<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
					<div className="p-6">
						{/* Close button for modal */}
						<button
							onClick={handleClose}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 transition-colors"
						>
							<X className="w-6 h-6" />
						</button>
						
						<div className="text-center">
							<h2 className="text-2xl font-bold text-black dark:text-white">
								Create Your Account
							</h2>
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								Join our learning community today
							</p>
						</div>
						
						{error && (
							<div className="mt-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">
								<span className="block sm:inline">{error}</span>
							</div>
						)}
						
						<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
							<div className="space-y-3">
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Mail className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
										placeholder="Email address"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="password"
										name="password"
										type={showPassword ? 'text' : 'password'}
										autoComplete="new-password"
										required
										className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => setShowPassword((prev) => !prev)}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
										tabIndex={-1}
									>
										{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
									</button>
								</div>

								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="confirm-password"
										name="confirm-password"
										type={showConfirmPassword ? 'text' : 'password'}
										autoComplete="new-password"
										required
										className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
										placeholder="Confirm Password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword((prev) => !prev)}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
										tabIndex={-1}
									>
										{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
									</button>
								</div>
							</div>

							<div className="flex items-center">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									required
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									I agree to the{' '}
									<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
										Terms of Service
									</a>{' '}
									and{' '}
									<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
										Privacy Policy
									</a>
								</label>
							</div>

							<div>
								<button
									type="submit"
									disabled={loading}
									className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-900 dark:hover:bg-gray-800"
								>
									{loading ? (
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
										</span>
									) : null}
									{loading ? 'Creating account...' : 'Sign up'}
								</button>
							</div>
						</form>

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white rounded-full dark:bg-gray-800 text-gray-500 dark:text-gray-400">
										Or sign up with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-2 gap-3">
								<button
									type="button"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
								>
									<span className="sr-only">Sign up with Google</span>
									<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
									</svg>
								</button>
								<button
									type="button"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
								>
									<span className="sr-only">Sign up with GitHub</span>
									<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
										<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
									</svg>
								</button>
							</div>
						</div>
						
						<div className="text-center mt-4">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Already have an account?{' '}
								<Link 
									to="/signin" 
									className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
									onClick={(e) => {
										if (isModal) {
											e.preventDefault();
											handleClose();
											// Navigate to signin with modal state
											navigate('/signin', { 
												state: { 
													isModal: true, 
													backgroundLocation: window.location 
												} 
											});
										}
									}}
								>
									Sign in now
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Full page version (fallback)
	return (
		<div className="min-h-screen flex items-center justify-center bg-black dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold text-black dark:text-white">
						Create Your Account
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Join our learning community today
					</p>
				</div>
				{error && (
					<div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-200 px-4 py-3 rounded-lg relative" role="alert">
						<span className="block sm:inline">{error}</span>
					</div>
				)}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="new-password"
								required
								className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="confirm-password"
								name="confirm-password"
								type={showConfirmPassword ? 'text' : 'password'}
								autoComplete="new-password"
								required
								className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full placeholder-gray-500 bg-white/80 dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								tabIndex={-1}
							>
								{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>

					<div className="flex items-center">
						<input
							id="terms"
							name="terms"
							type="checkbox"
							required
							className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
						/>
						<label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
							I agree to the{' '}
							<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
								Terms of Service
							</a>{' '}
							and{' '}
							<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
								Privacy Policy
							</a>
						</label>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-900 dark:hover:bg-gray-800"
						>
							{loading ? (
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								</span>
							) : null}
							{loading ? 'Creating account...' : 'Sign up'}
						</button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white rounded-full dark:bg-gray-800 text-gray-500 dark:text-gray-400">
								Or sign up with
							</span>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3">
						<button
							type="button"
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<span className="sr-only">Sign up with Google</span>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
							</svg>
						</button>
						<button
							type="button"
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<span className="sr-only">Sign up with GitHub</span>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
								<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
							</svg>
						</button>
					</div>
				</div>
				<div className="text-center mt-4">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Already have an account?{' '}
						<Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
							Sign in now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}