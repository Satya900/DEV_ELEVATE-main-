import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { CategoryLayout } from './components/CategoryLayout';
import { categories } from './data/categories';
import Compiler from './pages/Cmpiler';
import { ThemeProvider } from './context/theme';
import useThemeManager from './hooks/useThemeManager';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import TopicsPage from './pages/TopicsPage';
import TopicDetailPage from './pages/TopicDetailPage';
import QuestionSolvingPage from './pages/QuestionSolvingPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import { Footer } from './components/Footer';
import Header from './components/Header';
import Courses from './pages/Courses';
import { PasswordRecovery } from './pages/PasswordRecovery';
import UserDashboard from './pages/UserDashboard';
import ProblemsPage from './pages/ProblemsPage';
import TechBuzz from './pages/TechBuzz';
import { GlobalChatbot } from './components/GlobalChatbot';
import NotFound from './pages/NotFound';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function AppContent() {
  const { loading, currentUser } = useAuth();
  const { themeMode, storedTheme, lightTheme, darkTheme, systemTheme } = useThemeManager();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider value={{ themeMode, storedTheme, lightTheme, darkTheme, systemTheme }}>
      <AuthProvider>
        <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={!currentUser ? <SignIn /> : <Navigate to="/profile" />} />
                <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/profile" />} />
                <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/signin" />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/techbuzz" element={<TechBuzz />} />
                <Route path="/techbuzz/:slug" element={<TechBuzz />} />
                {Object.entries(categories).map(([key, category]) => (
                  <Route
                    key={key}
                    path={`/${category.id}/*`}
                    element={<CategoryLayout category={category} />}
                  />
                ))}
                <Route path="/compiler" element={<Compiler />} />
                
                {/* Topic-based preparation routes */}
                <Route path="/topics" element={<TopicsPage />} />
                <Route path="/topics/:topicId" element={<TopicDetailPage />} />
                <Route path="/solve/:questionId" element={<QuestionSolvingPage />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="bottom-right" />
                      </div>
          </Router>
        </AuthProvider>
        <GlobalChatbot />
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
