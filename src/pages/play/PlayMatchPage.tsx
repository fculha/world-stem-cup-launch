import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Clock, CheckCircle, XCircle, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface MatchState {
  match_id: number;
  status: string;
  total_questions: number;
  time_limit_ms: number;
  teams: Array<{
    id: number;
    name: string;
    questions_answered: number;
  }>;
}

interface Question {
  order_no: number;
  question_id: number;
  category: string;
  difficulty: number;
  type: string;
  prompt: string;
  choices: string[] | null;
  time_limit_ms: number;
  answered: boolean;
}

interface AnswerResult {
  is_correct: boolean;
  points_earned: number;
  correct_answer: string | null;
  explanation: string | null;
}

interface SubmissionResult {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
  correctAnswer?: string;
}

export default function PlayMatchPage() {
  const { user, accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<'loading' | 'waiting' | 'playing' | 'answered' | 'finished'>('loading');
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<SubmissionResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  
  const startTimeRef = useRef<number>(0);

  const currentQuestion = questions[currentQuestionIndex];

  const fetchMatchState = useCallback(async () => {
    if (!matchId || !accessToken) return;
    
    try {
      const response = await fetch(`${API_URL}/api/gameplay/match/${matchId}/state`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch match state');
      }
      
      const data = await response.json();
      setMatchState(data);
      
      if (user?.team_id) {
        const userTeam = data.teams.find((t: { id: number }) => t.id === user.team_id);
        if (userTeam) {
          setTeamId(user.team_id);
        } else {
          throw new Error('Your team is not participating in this match');
        }
      } else {
        throw new Error('You are not assigned to a team');
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load match');
      return null;
    }
  }, [matchId, accessToken, user?.team_id]);

  const fetchQuestions = useCallback(async () => {
    if (!matchId || !accessToken || !teamId) return;
    
    try {
      const response = await fetch(`${API_URL}/api/gameplay/match/${matchId}/questions?team_id=${teamId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch questions');
      }
      
      const data = await response.json();
      setQuestions(data.questions);
      
      const firstUnanswered = data.questions.findIndex((q: Question) => !q.answered);
      if (firstUnanswered >= 0) {
        setCurrentQuestionIndex(firstUnanswered);
      } else if (data.questions.length > 0) {
        setGameState('finished');
      }
      
      return data.questions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      return null;
    }
  }, [matchId, accessToken, teamId]);

  useEffect(() => {
    const initMatch = async () => {
      setLoading(true);
      const state = await fetchMatchState();
      
      if (state) {
        if (state.status === 'IN_PROGRESS') {
          setGameState('waiting');
        } else if (state.status === 'COMPLETED') {
          setGameState('finished');
        } else if (state.status === 'SCHEDULED') {
          setError('This match has not started yet');
        }
      }
      
      setLoading(false);
    };
    
    initMatch();
  }, [fetchMatchState]);

  useEffect(() => {
    if (teamId && matchState?.status === 'IN_PROGRESS') {
      fetchQuestions();
    }
  }, [teamId, matchState?.status, fetchQuestions]);

  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleTimeUp = useCallback(async () => {
    if (gameState !== 'playing' || !currentQuestion) return;
    
    const timeTaken = Date.now() - startTimeRef.current;
    await submitAnswerToServer('', timeTaken);
  }, [gameState, currentQuestion]);

  const submitAnswerToServer = async (answer: string, timeMs: number) => {
    if (!matchId || !accessToken || !teamId || !currentQuestion) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/gameplay/match/${matchId}/submit?team_id=${teamId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: currentQuestion.question_id,
          answer: answer,
          time_ms: timeMs,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to submit answer');
      }
      
      const data = await response.json();
      const result: AnswerResult = data.result;
      
      setLastResult(result);
      
      const submissionResult: SubmissionResult = {
        questionId: currentQuestion.question_id,
        selectedAnswer: answer,
        isCorrect: result.is_correct,
        pointsEarned: result.points_earned,
        timeTaken: timeMs,
        correctAnswer: result.correct_answer || undefined,
      };
      
      setResults((prev) => [...prev, submissionResult]);
      setTotalScore((prev) => prev + result.points_earned);
      setGameState('answered');
      
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        answered: true,
      };
      setQuestions(updatedQuestions);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startPlaying = () => {
    if (!currentQuestion) return;
    setGameState('playing');
    setTimeLeft(Math.floor(currentQuestion.time_limit_ms / 1000));
    setSelectedAnswer(null);
    setLastResult(null);
    startTimeRef.current = Date.now();
  };

  const submitAnswer = async () => {
    if (!selectedAnswer || gameState !== 'playing') return;
    
    const timeTaken = Date.now() - startTimeRef.current;
    await submitAnswerToServer(selectedAnswer, timeTaken);
  };

  const nextQuestion = () => {
    const nextUnanswered = questions.findIndex((q, idx) => idx > currentQuestionIndex && !q.answered);
    
    if (nextUnanswered >= 0) {
      setCurrentQuestionIndex(nextUnanswered);
      setSelectedAnswer(null);
      setLastResult(null);
      setGameState('waiting');
    } else {
      const anyUnanswered = questions.findIndex((q) => !q.answered);
      if (anyUnanswered >= 0) {
        setCurrentQuestionIndex(anyUnanswered);
        setSelectedAnswer(null);
        setLastResult(null);
        setGameState('waiting');
      } else {
        setGameState('finished');
      }
    }
  };

  const getTimerColor = () => {
    if (!currentQuestion) return 'text-white';
    const percentage = (timeLeft / (currentQuestion.time_limit_ms / 1000)) * 100;
    if (percentage > 50) return 'text-green-400';
    if (percentage > 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'S': 'Science',
      'T': 'Technology',
      'E': 'Engineering',
      'M': 'Mathematics',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'S': 'bg-green-500/20 text-green-400',
      'T': 'bg-blue-500/20 text-blue-400',
      'E': 'bg-orange-500/20 text-orange-400',
      'M': 'bg-purple-500/20 text-purple-400',
    };
    return colors[category] || 'bg-white/10 text-white/60';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 4) return 'Medium';
    return 'Hard';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-500/20 text-green-400';
    if (difficulty <= 4) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#4361ee] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading match...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <Link 
            to="/student/competitions" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Competitions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
      </div>

      <nav className="relative z-10 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">World STEM Cup</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {(gameState === 'playing' || gameState === 'answered') && (
              <div className="flex items-center gap-2 bg-[#16213e] px-4 py-2 rounded-lg">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{totalScore} pts</span>
              </div>
            )}
            <div className="text-right">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {gameState === 'waiting' && (
          <>
            <Link to="/student/competitions" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Competitions
            </Link>

            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {currentQuestionIndex === 0 && results.length === 0 ? 'Ready to Compete?' : 'Next Question'}
              </h1>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                {currentQuestionIndex === 0 && results.length === 0 
                  ? `You'll answer ${questions.length} STEM questions. Answer quickly for bonus points!`
                  : `Question ${currentQuestionIndex + 1} of ${questions.length}`
                }
              </p>
              
              {currentQuestionIndex === 0 && results.length === 0 && (
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{questions.length}</p>
                    <p className="text-white/60 text-sm">Questions</p>
                  </div>
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{Math.ceil((questions[0]?.time_limit_ms || 60000) / 1000)}</p>
                    <p className="text-white/60 text-sm">Sec/Question</p>
                  </div>
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{questions.filter(q => !q.answered).length}</p>
                    <p className="text-white/60 text-sm">Remaining</p>
                  </div>
                </div>
              )}
              
              <button
                onClick={startPlaying}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity text-lg font-semibold"
              >
                {currentQuestionIndex === 0 && results.length === 0 ? 'Start Competition' : 'Continue'}
              </button>
            </div>
          </>
        )}

        {(gameState === 'playing' || gameState === 'answered') && currentQuestion && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className={`flex items-center gap-1 font-mono text-lg ${getTimerColor()}`}>
                  <Clock className="w-4 h-4" />
                  {timeLeft}s
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#4361ee] to-[#f72585] transition-all duration-300"
                  style={{ width: `${((results.length + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {getDifficultyLabel(currentQuestion.difficulty)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(currentQuestion.category)}`}>
                  {getCategoryLabel(currentQuestion.category)}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                  100+ pts
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-6">{currentQuestion.prompt}</h2>

              {currentQuestion.choices && currentQuestion.choices.length > 0 ? (
                <div className="grid gap-3">
                  {currentQuestion.choices.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = lastResult?.correct_answer === option;
                    const showResult = gameState === 'answered';
                    
                    let optionClass = 'bg-[#0a0a1a] border-white/10 hover:border-[#4361ee]/50';
                    if (showResult) {
                      if (isCorrect) {
                        optionClass = 'bg-green-500/20 border-green-500';
                      } else if (isSelected && !lastResult?.is_correct) {
                        optionClass = 'bg-red-500/20 border-red-500';
                      }
                    } else if (isSelected) {
                      optionClass = 'bg-[#4361ee]/20 border-[#4361ee]';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => gameState === 'playing' && setSelectedAnswer(option)}
                        disabled={gameState !== 'playing'}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass} ${gameState === 'playing' ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                          {showResult && isSelected && !lastResult?.is_correct && <XCircle className="w-5 h-5 text-red-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={selectedAnswer || ''}
                    onChange={(e) => gameState === 'playing' && setSelectedAnswer(e.target.value)}
                    disabled={gameState !== 'playing'}
                    placeholder="Type your answer..."
                    className="w-full p-4 rounded-xl bg-[#0a0a1a] border-2 border-white/10 focus:border-[#4361ee] outline-none transition-colors"
                  />
                  {gameState === 'answered' && lastResult && (
                    <div className={`p-4 rounded-xl ${lastResult.is_correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {lastResult.is_correct ? (
                        <p className="text-green-400">Correct!</p>
                      ) : (
                        <p className="text-red-400">
                          Incorrect. {lastResult.correct_answer && `The answer was: ${lastResult.correct_answer}`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {gameState === 'playing' ? (
              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer || submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Answer'
                )}
              </button>
            ) : (
              <div className="space-y-4">
                {lastResult && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 ${lastResult.is_correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {lastResult.is_correct ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="font-semibold text-green-400">Correct!</p>
                          <p className="text-sm text-white/60">+{lastResult.points_earned} points</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="font-semibold text-red-400">
                            {selectedAnswer ? 'Incorrect' : "Time's up!"}
                          </p>
                          {lastResult.correct_answer && (
                            <p className="text-sm text-white/60">The correct answer was: {lastResult.correct_answer}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold"
                >
                  {questions.filter(q => !q.answered).length > 0 ? 'Next Question' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Match Complete!</h1>
            <p className="text-white/60 mb-8">Great job! Here's how you did:</p>

            <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10 max-w-md mx-auto mb-8">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent">
                {totalScore}
              </div>
              <p className="text-white/60 mb-6">Total Points</p>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-[#0a0a1a] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">{results.filter(r => r.isCorrect).length}</span>
                  </div>
                  <p className="text-white/60 text-sm">Correct</p>
                </div>
                <div className="bg-[#0a0a1a] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-400 mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="font-semibold">{results.filter(r => !r.isCorrect).length}</span>
                  </div>
                  <p className="text-white/60 text-sm">Incorrect</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/match/${matchId}`}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold"
              >
                View Match Results
              </Link>
              <Link
                to="/student/competitions"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-semibold"
              >
                Back to Competitions
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
