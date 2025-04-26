import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CodeQuestion } from '../types/questions';
import { useQuestionProgress } from '../hooks/useQuestionProgress';
import DifficultyBadge from './DifficultyBadge';

interface QuestionListProps {
  questions: CodeQuestion[];
  className?: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, className = '' }) => {
  const { questionId } = useParams<{ questionId: string }>();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Problems</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {questions.map((question) => {
          const { progress } = useQuestionProgress(question.id);
          
          return (
            <Link
              key={question.id}
              to={`/solve/${question.id}`}
              className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                questionId === question.id ? 'bg-gray-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {question.title}
                  </h3>
                  <div className="mt-1 flex gap-2">
                    <DifficultyBadge difficulty={question.difficulty} />
                    {progress.status === 'solved' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Solved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionList;
