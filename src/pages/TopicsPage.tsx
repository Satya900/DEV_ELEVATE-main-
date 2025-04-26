import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import topics, { calculateTopicProgress } from '../data/topics';
import { useAuth } from '../context/AuthContext';
import '../styles/topics.css';
import { mockQuestions } from '../data/mockQuestions';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { userProgress } = useAuth();

  // Group topics by category
  const topicsByCategory = useMemo(() => {
    const programming = topics.filter(t => ['java-basics', 'python-basics', 'javascript-basics', 'cpp-basics', 'c-basics'].includes(t.id));
    const conceptual = topics.filter(t => ['arrays-hashing', 'binary-search', 'pointers-references'].includes(t.id));
    const specialization = topics.filter(t => ['async-programming'].includes(t.id));
    return { programming, conceptual, specialization };
  }, []);

  // Filter topics based on search query
  const filteredTopicsByCategory = useMemo(() => {
    if (!searchQuery.trim()) return topicsByCategory;
    const query = searchQuery.toLowerCase();
    const filter = arr => arr.filter(topic => topic.name.toLowerCase().includes(query) || topic.description.toLowerCase().includes(query));
    return {
      programming: filter(topicsByCategory.programming),
      conceptual: filter(topicsByCategory.conceptual),
      specialization: filter(topicsByCategory.specialization)
    };
  }, [searchQuery, topicsByCategory]);

  // Get solved questions for the user
  const solvedQuestions = useMemo(() => {
    if (!userProgress) return [];
    if (Array.isArray(userProgress.solvedQuestions)) return userProgress.solvedQuestions;
    if (typeof userProgress.solvedQuestions === 'object' && userProgress.solvedQuestions !== null) {
      return Object.keys(userProgress.solvedQuestions).filter(id => userProgress.solvedQuestions[id]);
    }
    return [];
  }, [userProgress]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prepare By Topics</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Focus your learning by topic and track your progress
            </p>
          </div>
          <div className="mt-4 md:mt-0 relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:text-white sm:text-sm"
              placeholder="Search topics..."
            />
          </div>
        </div>
        {/* Programming Languages */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Programming Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTopicsByCategory.programming.map(topic => (
              <TopicCard key={topic.id} topic={topic} solvedQuestions={solvedQuestions} />
            ))}
          </div>
        </div>
        {/* Concepts */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopicsByCategory.conceptual.map(topic => (
              <TopicCard key={topic.id} topic={topic} solvedQuestions={solvedQuestions} />
            ))}
          </div>
        </div>
        {/* Specializations */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTopicsByCategory.specialization.map(topic => (
              <TopicCard key={topic.id} topic={topic} solvedQuestions={solvedQuestions} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({ topic, solvedQuestions }) {
  const progress = calculateTopicProgress(topic, solvedQuestions);
  const badgeIcons = {
    none: null,
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇'
  };
  const badgeColorClasses = {
    none: '',
    bronze: 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
    silver: 'bg-slate-100 text-slate-800 dark:bg-slate-800/40 dark:text-slate-300',
    gold: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
  };

  // New: Problem solving state
  const [selectedQuestionId, setSelectedQuestionId] = React.useState('');
  const [code, setCode] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const [testResults, setTestResults] = React.useState([]);
  const [points, setPoints] = React.useState(progress.points);

  // Filter questions for this topic and language
  const topicQuestions = mockQuestions.filter(q => topic.questions.includes(q.id) && q.language === topic.language);
  const selectedQuestion = topicQuestions.find(q => q.id === selectedQuestionId);

  // When question changes, set starter code and restrict editor language
  React.useEffect(() => {
    if (selectedQuestion) {
      setCode(selectedQuestion.starterCode[selectedQuestion.language] || '');
      setOutput('');
      setTestResults([]);
    }
  }, [selectedQuestionId]);

  // Run code against all test cases
  const handleRunCode = async () => {
    if (!selectedQuestion) return;
    setIsRunning(true);
    setOutput('Running test cases...');
    const results = [];
    let allPassed = true;
    for (const testCase of selectedQuestion.testCases) {
      try {
        const response = await axios.post(
          'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false',
          {
            source_code: code,
            language_id: selectedQuestion.languageId,
            stdin: testCase.input,
          },
          {
            headers: {
              'X-RapidAPI-Key': '2b22ea0cb6msh7e3e865ff03f1eep11be06jsn4247dfad1f34',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );
        const { token } = response.data;
        let result = null;
        do {
          const pollResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            {
              headers: {
                'X-RapidAPI-Key': '2b22ea0cb6msh7e3e865ff03f1eep11be06jsn4247dfad1f34',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
              },
            }
          );
          result = pollResponse.data;
        } while (result.status.description === 'In Queue' || result.status.description === 'Processing');
        const passed = (result.stdout || '').trim() === testCase.expectedOutput.trim();
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: result.stdout,
          passed,
        });
        if (!passed) allPassed = false;
      } catch (err) {
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: 'Error',
          passed: false,
        });
        allPassed = false;
      }
    }
    setTestResults(results);
    setIsRunning(false);
    if (allPassed) {
      setOutput('All test cases passed! +10 points');
      setPoints(points + 10);
    } else {
      setOutput('Some test cases failed. See details below.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow mb-8">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: `${topic.color}20`, color: topic.color }}>
              <span>{topic.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{topic.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {progress.solvedQuestions.length} of {topic.questions.length} solved
              </p>
            </div>
          </div>
          {progress.badgeLevel !== 'none' && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColorClasses[progress.badgeLevel]}`}>
              {badgeIcons[progress.badgeLevel]} {progress.badgeLevel.charAt(0).toUpperCase() + progress.badgeLevel.slice(1)}
            </span>
          )}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {progress.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress.percentage}%`, backgroundColor: topic.color }}
            />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="mr-1">🏆</span>
            <span>{progress.points} / {topic.questions.length * 10} pts</span>
          </div>
          <Link to={`/topics/${topic.id}`} className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/50">Continue</Link>
        </div>
        {/* Problem Solving Section */}
        {topicQuestions.length > 0 && (
          <div className="mt-6">
            <label className="block font-semibold mb-2">Solve a Problem:</label>
            <select
              value={selectedQuestionId}
              onChange={e => setSelectedQuestionId(e.target.value)}
              className="mb-4 p-2 rounded border dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select a question</option>
              {topicQuestions.map(q => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>
            {selectedQuestion && (
              <div className="mb-4">
                <div className="font-bold mb-2">{selectedQuestion.title}</div>
                <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">{selectedQuestion.description}</div>
                <Editor
                  height="200px"
                  language={selectedQuestion.language}
                  value={code}
                  onChange={v => setCode(v || '')}
                  theme="vs-dark"
                  options={{ fontSize: 14, minimap: { enabled: false } }}
                />
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  {isRunning ? 'Running...' : 'Run & Test'}
                </button>
                <div className="mt-2 text-sm">
                  <strong>Output:</strong> {output}
                </div>
                {testResults.length > 0 && (
                  <div className="mt-2">
                    <strong>Test Results:</strong>
                    <ul className="list-disc ml-6">
                      {testResults.map((tr, i) => (
                        <li key={i} className={tr.passed ? 'text-green-600' : 'text-red-600'}>
                          Input: <code>{tr.input}</code> | Expected: <code>{tr.expected}</code> | Got: <code>{tr.actual}</code> | {tr.passed ? 'Passed' : 'Failed'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 text-sm font-bold">Points: {points}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 