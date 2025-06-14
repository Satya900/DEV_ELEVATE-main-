import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { mockQuestions } from '../data/mockQuestions';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { useAuth } from '../context/AuthContext';
import { TestCaseViewer } from '../components/TestCaseViewer';
import { 
  Play, 
  RotateCcw, 
  Settings, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  BookOpen,
  Code,
  Terminal,
  Maximize2,
  Minimize2,
  Split,
  Eye,
  EyeOff,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionSolvingPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { currentUser, addSubmission, updateSolvedQuestion } = useAuth();
  const { isRunning, output, testResults, runCode } = useCodeExecution();
  
  // Find the question
  const question = mockQuestions.find(q => q.id === questionId);
  
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showTestCases, setShowTestCases] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lastSubmissionStatus, setLastSubmissionStatus] = useState<'success' | 'failed' | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const editorRef = useRef<any>();

  // Initialize code when question or language changes
  useEffect(() => {
    if (question && question.starterCode[selectedLanguage]) {
      setCode(question.starterCode[selectedLanguage]);
    }
  }, [question, selectedLanguage]);

  // Timer functionality
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Start timer when component mounts
  useEffect(() => {
    setIsTimerRunning(true);
    return () => setIsTimerRunning(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    if (!question) return;
    
    setAttempts(prev => prev + 1);
    
    const result = await runCode(
      code,
      selectedLanguage,
      customInput,
      question.testCases
    );

    if (result.allTestsPassed) {
      setLastSubmissionStatus('success');
      setIsTimerRunning(false);
      
      // Add submission record
      if (currentUser && addSubmission) {
        await addSubmission({
          questionId: question.id,
          code,
          language: selectedLanguage,
          status: 'Accepted',
          timestamp: new Date(),
          executionTime: result.executionTime,
        });
      }
      
      // Mark question as solved
      if (updateSolvedQuestion) {
        updateSolvedQuestion(question.id);
      }
    } else {
      setLastSubmissionStatus('failed');
    }
  };

  const handleResetCode = () => {
    if (question && question.starterCode[selectedLanguage]) {
      setCode(question.starterCode[selectedLanguage]);
    }
  };

  const handleNextHint = () => {
    if (question && question.hints && currentHint < question.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Question not found</h2>
          <button 
            onClick={() => navigate('/problems')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 ${isFullscreen ? 'fixed inset-0 z-50 pt-0' : ''}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {question.id}. {question.title}
              </h1>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timer)}</span>
              </div>
              
              {/* Attempts */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Target className="h-4 w-4" />
                <span>{attempts} attempts</span>
              </div>
              
              {/* Layout controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Toggle layout"
                >
                  <Split className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Toggle fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`flex-1 flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'}`}>
          {/* Left panel - Problem description */}
          <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <BookOpen className="h-4 w-4 inline mr-1" />
                Description
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'editorial'
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Lightbulb className="h-4 w-4 inline mr-1" />
                Hints & Editorial
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'submissions'
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-1" />
                Submissions
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Problem Statement</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{question.description}</p>
                  </div>

                  {question.examples && question.examples.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
                      <div className="space-y-4">
                        {question.examples.map((example, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <div className="mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Input:</span>
                              <pre className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{example.input}</pre>
                            </div>
                            <div className="mb-2">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Output:</span>
                              <pre className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{example.output}</pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Explanation:</span>
                                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {question.constraints && question.constraints.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Constraints</h3>
                      <ul className="space-y-1">
                        {question.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                            • {constraint.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'editorial' && (
                <div className="space-y-6">
                  {question.hints && question.hints.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Hints</h3>
                      <div className="space-y-3">
                        {question.hints.slice(0, currentHint + 1).map((hint, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                          >
                            <div className="flex items-start space-x-2">
                              <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                  Hint {hint.level}:
                                </span>
                                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">{hint.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {currentHint < question.hints.length - 1 && (
                          <button
                            onClick={handleNextHint}
                            className="w-full py-2 px-4 border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm"
                          >
                            Show Next Hint
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {question.walkthrough && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Solution Approach</h3>
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <p className="text-green-800 dark:text-green-200">{question.walkthrough}</p>
                      </div>
                    </div>
                  )}

                  {question.timeComplexity && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Complexity Analysis</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Complexity:</span>
                          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{question.timeComplexity}</code>
                        </div>
                        {question.spaceComplexity && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Space Complexity:</span>
                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{question.spaceComplexity}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'submissions' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Submissions</h3>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No submissions yet. Run your code to see results here.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right panel - Code editor */}
          <div className={`${layout === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col`}>
            {/* Editor header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>
                  
                  <button
                    onClick={() => setShowTestCases(!showTestCases)}
                    className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    {showTestCases ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span>Test Cases</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFormatCode}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Format code"
                  >
                    <Code className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Reset code"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-md text-sm font-medium"
                  >
                    {isRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Run Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 bg-gray-900">
              <Editor
                height="100%"
                language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  renderLineHighlight: 'line',
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Output section */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {/* Custom input */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Input
                </label>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full h-20 text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="Enter custom input here..."
                />
              </div>

              {/* Output */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</h4>
                  {lastSubmissionStatus && (
                    <div className={`flex items-center space-x-1 text-sm ${
                      lastSubmissionStatus === 'success' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {lastSubmissionStatus === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span>{lastSubmissionStatus === 'success' ? 'Accepted' : 'Failed'}</span>
                    </div>
                  )}
                </div>
                <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded-md min-h-[100px] overflow-auto">
                  {output || 'Run your code to see output here...'}
                </pre>
              </div>

              {/* Test cases */}
              {showTestCases && testResults.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <TestCaseViewer testCases={testResults} showResults={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}