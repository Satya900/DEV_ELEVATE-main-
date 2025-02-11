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

function App() {
  const { themeMode, lightTheme, darkTheme } = useThemeManager();

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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

export default App;
