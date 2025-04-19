import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function AppContent() {
  const { loading } = useAuth();
  const { themeMode, storedTheme, lightTheme, darkTheme, systemTheme } = useThemeManager();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider value={{ themeMode, storedTheme, lightTheme, darkTheme, systemTheme }}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            {Object.entries(categories).map(([key, category]) => (
              <Route
                key={key}
                path={`/${category.id}/*`}
                element={<CategoryLayout category={category} />}
              />
            ))}
            <Route path="/compiler" element={<Compiler />} />
          </Routes>
        </div>
      </Router>
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
