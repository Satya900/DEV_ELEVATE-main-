import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockQuestions } from '../data/mockQuestions';

type DifficultyFilter = 'All' | 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
type ExperienceLevelFilter = 'All' | 'New to Coding' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
type TagFilter = string;

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState<ExperienceLevelFilter>('All');
  const [tagFilter, setTagFilter] = useState<TagFilter>('All');

  // Get unique tags from all questions
  const allTags = Array.from(
    new Set(mockQuestions.flatMap(q => q.tags))
  ).sort();

  // Filter questions based on search, difficulty, experience level, and tag
  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = 
      difficultyFilter === 'All' || 
      question.difficulty === difficultyFilter;
    
    const matchesExperienceLevel =
      experienceLevelFilter === 'All' ||
      question.experienceLevel === experienceLevelFilter;
    
    const matchesTag = 
      tagFilter === 'All' || 
      question.tags.includes(tagFilter);
    
    return matchesSearch && matchesDifficulty && matchesExperienceLevel && matchesTag;
  });

  // Count questions by difficulty
  const countByDifficulty = {
    Beginner: mockQuestions.filter(q => q.difficulty === 'Beginner').length,
    Easy: mockQuestions.filter(q => q.difficulty === 'Easy').length,
    Medium: mockQuestions.filter(q => q.difficulty === 'Medium').length,
    Hard: mockQuestions.filter(q => q.difficulty === 'Hard').length,
    Expert: mockQuestions.filter(q => q.difficulty === 'Expert').length,
  };

  // Count questions by experience level
  const countByExperienceLevel = {
    'New to Coding': mockQuestions.filter(q => q.experienceLevel === 'New to Coding').length,
    'Beginner': mockQuestions.filter(q => q.experienceLevel === 'Beginner').length,
    'Intermediate': mockQuestions.filter(q => q.experienceLevel === 'Intermediate').length,
    'Advanced': mockQuestions.filter(q => q.experienceLevel === 'Advanced').length,
    'Expert': mockQuestions.filter(q => q.experienceLevel === 'Expert').length,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Coding Problems
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Practice your coding skills with these algorithm challenges
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 bg-gray-50 dark:bg-gray-800/80 dark:border dark:border-gray-700 rounded-lg p-4">
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Beginner">Beginner ({countByDifficulty.Beginner})</option>
                  <option value="Easy">Easy ({countByDifficulty.Easy})</option>
                  <option value="Medium">Medium ({countByDifficulty.Medium})</option>
                  <option value="Hard">Hard ({countByDifficulty.Hard})</option>
                  <option value="Expert">Expert ({countByDifficulty.Expert})</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <select
                  value={experienceLevelFilter}
                  onChange={(e) => setExperienceLevelFilter(e.target.value as ExperienceLevelFilter)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="All">All Experience Levels</option>
                  <option value="New to Coding">New to Coding ({countByExperienceLevel['New to Coding']})</option>
                  <option value="Beginner">Beginner ({countByExperienceLevel.Beginner})</option>
                  <option value="Intermediate">Intermediate ({countByExperienceLevel.Intermediate})</option>
                  <option value="Advanced">Advanced ({countByExperienceLevel.Advanced})</option>
                  <option value="Expert">Expert ({countByExperienceLevel.Expert})</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Topic
                </label>
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="All">All Topics</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Problems table */}
        <div className="bg-white dark:bg-gray-800/90 dark:border dark:border-gray-700 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/80">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Acceptance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredQuestions.map(question => (
                <tr key={question.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/80">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {question.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link 
                      to={`/problems/${question.id}`} 
                      className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                    >
                      {question.title}
                    </Link>
                    {question.timeToSolve && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        ~{question.timeToSolve} min
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      question.difficulty === 'Beginner' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : question.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : question.difficulty === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                        : question.difficulty === 'Hard'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    {question.experienceLevel || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    {question.acceptanceRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {question.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredQuestions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                    No problems found matching your filters. Try changing your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 