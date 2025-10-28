import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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

// Modal versions of SignIn and SignUp
function ModalSignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const handleClose = () => {
    navigate(backgroundLocation?.pathname || '/', { replace: true });
  };

  return (
    <SignIn onSuccess={handleClose} isModal={true} />
  );
}

function ModalSignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const handleClose = () => {
    navigate(backgroundLocation?.pathname || '/', { replace: true });
  };

  return (
    <SignUp onSuccess={handleClose} isModal={true} />
  );
}

function AppContent() {
  const { loading, currentUser } = useAuth();
  const { themeMode, storedTheme, lightTheme, darkTheme, systemTheme } = useThemeManager();
  const location = useLocation();
  
  // Check if current route is a modal route
  const state = location.state as { backgroundLocation?: Location; isModal?: boolean };
  const isModalRoute = state?.isModal;
  const backgroundLocation = state?.backgroundLocation;
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Show navbar only if not in modal */}
        {!isModalRoute && <Navbar />}
        
        {/* Main Routes */}
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          
          {/* Full page auth routes - only accessible directly */}
          <Route path="/signin" element={
            !currentUser ? 
              <SignIn isModal={false} /> 
              : <Navigate to="/profile" replace />
          } />
          <Route path="/signup" element={
            !currentUser ? 
              <SignUp isModal={false} /> 
              : <Navigate to="/profile" replace />
          } />
          
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/" replace />} />
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
        
        {/* Modal Routes - only show when there's a background location */}
        {backgroundLocation && (
          <Routes>
            <Route 
              path="/signin" 
              element={<ModalSignIn />} 
            />
            <Route 
              path="/signup" 
              element={<ModalSignUp />} 
            />
          </Routes>
        )}
      </main>
      
      {/* Show footer only if not in modal */}
      {!isModalRoute && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  const { themeMode, storedTheme, lightTheme, darkTheme, systemTheme } = useThemeManager();
  
  return (
    <ThemeProvider value={{ themeMode, storedTheme, lightTheme, darkTheme, systemTheme }}>
      <AuthProvider>
        <Router>
          <AppContent />
          <GlobalChatbot />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;