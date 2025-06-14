import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useQuestionProgress = (questionId: string) => {
  const { userProgress } = useAuth();
  const [progress, setProgress] = useState({
    status: 'unsolved',
    lastSubmission: null,
    submissionCount: 0
  });

  useEffect(() => {
    if (!userProgress) return;

    // Check if question is solved
    let isSolved = false;
    
    // Handle both array and object formats for solvedQuestions
    if (Array.isArray(userProgress.solvedQuestions)) {
      isSolved = userProgress.solvedQuestions.includes(questionId);
    } else if (typeof userProgress.solvedQuestions === 'object' && userProgress.solvedQuestions !== null) {
      isSolved = !!userProgress.solvedQuestions[questionId];
    }

    // Find submissions for this question
    const questionSubmissions = userProgress.submissions?.filter(
      sub => sub.questionId === questionId
    ) || [];
    
    // Get last submission
    const lastSubmission = questionSubmissions.length > 0 
      ? questionSubmissions.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0]
      : null;

    setProgress({
      status: isSolved ? 'solved' : questionSubmissions.length > 0 ? 'attempted' : 'unsolved',
      lastSubmission,
      submissionCount: questionSubmissions.length
    });
  }, [userProgress, questionId]);

  return { progress };
};