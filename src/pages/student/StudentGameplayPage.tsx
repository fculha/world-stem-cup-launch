import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Clock, CheckCircle, XCircle, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock questions for demo (in production these would come from the API)
const mockQuestions = [
  {
    id: 1,
    text: "What is the chemical symbol for gold?",
    subject: "Chemistry",
    difficulty: "easy",
    points: 100,
    time_limit_seconds: 30,
    options: ["Au", "Ag", "Fe", "Cu"],
    correct_answer: "Au"
  },
  {
    id: 2,
    text: "What is the value of π (pi) to two decimal places?",
    subject: "Mathematics",
    difficulty: "easy",
    points: 100,
    time_limit_seconds: 20,
    options: ["3.14", "3.16", "3.12", "3.18"],
    correct_answer: "3.14"
  },
  {
    id: 3,
    text: "Which planet is known as the Red Planet?",
    subject: "Astronomy",
    difficulty: "easy",
    points: 100,
    time_limit_seconds: 20,
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct_answer: "Mars"
  },
  {
    id: 4,
    text: "What is the powerhouse of the cell?",
    subject: "Biology",
    difficulty: "easy",
    points: 100,
    time_limit_seconds: 20,
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correct_answer: "Mitochondria"
  },
  {
    id: 5,
    text: "What is the speed of light in vacuum (approximately)?",
    subject: "Physics",
    difficulty: "medium",
    points: 200,
    time_limit_seconds: 30,
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correct_answer: "300,000 km/s"
  }
];

interface Question {
  id: number;
  text: string;
  subject: string;
  difficulty: string;
  points: number;
  time_limit_seconds: number;
  options: string[];
  correct_answer: string;
}

interface AnswerResult {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  timeTaken: number;
}

export default function StudentGameplayPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tournamentId: _tournamentId } = useParams();
  
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'answered' | 'finished'>('waiting');
  const [questions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit with no answer
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleTimeUp = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const result: AnswerResult = {
      questionId: currentQuestion.id,
      selectedAnswer: '',
      isCorrect: false,
      pointsEarned: 0,
      timeTaken: currentQuestion.time_limit_seconds,
    };
    
    setResults((prev) => [...prev, result]);
    setGameState('answered');
  }, [gameState, currentQuestion]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(currentQuestion.time_limit_seconds);
    setCurrentQuestionIndex(0);
    setResults([]);
    setTotalScore(0);
    setSelectedAnswer(null);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || gameState !== 'playing') return;

    const timeTaken = currentQuestion.time_limit_seconds - timeLeft;
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    // Bonus points for fast answers
    const timeBonus = isCorrect ? Math.floor((timeLeft / currentQuestion.time_limit_seconds) * 50) : 0;
    const pointsEarned = isCorrect ? currentQuestion.points + timeBonus : 0;

    const result: AnswerResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      pointsEarned,
      timeTaken,
    };

    setResults((prev) => [...prev, result]);
    setTotalScore((prev) => prev + pointsEarned);
    setGameState('answered');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(questions[currentQuestionIndex + 1].time_limit_seconds);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / currentQuestion.time_limit_seconds) * 100;
    if (percentage > 50) return 'text-green-400';
    if (percentage > 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">World STEM Cup</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {gameState === 'playing' && (
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

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Back Button (only when not playing) */}
        {gameState === 'waiting' && (
          <Link to="/student/competitions" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Competitions
          </Link>
        )}

        {/* Waiting State */}
        {gameState === 'waiting' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Ready to Compete?</h1>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              You'll answer {questions.length} STEM questions. Answer quickly for bonus points!
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold">{questions.length}</p>
                <p className="text-white/60 text-sm">Questions</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold">~{Math.ceil(questions.reduce((sum, q) => sum + q.time_limit_seconds, 0) / 60)}</p>
                <p className="text-white/60 text-sm">Minutes</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold">{questions.reduce((sum, q) => sum + q.points, 0)}</p>
                <p className="text-white/60 text-sm">Max Points</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              Start Competition
            </button>
          </div>
        )}

        {/* Playing State */}
        {(gameState === 'playing' || gameState === 'answered') && currentQuestion && (
          <div>
            {/* Progress Bar */}
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
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-[#4361ee]/20 text-[#4361ee]">
                  {currentQuestion.subject}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                  {currentQuestion.points} pts
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-6">{currentQuestion.text}</h2>

              {/* Options */}
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correct_answer;
                  const showResult = gameState === 'answered';
                  
                  let optionClass = 'bg-[#0a0a1a] border-white/10 hover:border-[#4361ee]/50';
                  if (showResult) {
                    if (isCorrect) {
                      optionClass = 'bg-green-500/20 border-green-500';
                    } else if (isSelected && !isCorrect) {
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
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            {gameState === 'playing' ? (
              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4">
                {/* Result Feedback */}
                <div className={`p-4 rounded-xl flex items-center gap-3 ${results[results.length - 1]?.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {results[results.length - 1]?.isCorrect ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="font-semibold text-green-400">Correct!</p>
                        <p className="text-sm text-white/60">+{results[results.length - 1]?.pointsEarned} points</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-400" />
                      <div>
                        <p className="font-semibold text-red-400">
                          {results[results.length - 1]?.selectedAnswer ? 'Incorrect' : "Time's up!"}
                        </p>
                        <p className="text-sm text-white/60">The correct answer was: {currentQuestion.correct_answer}</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {gameState === 'finished' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Competition Complete!</h1>
            <p className="text-white/60 mb-8">Great job! Here's how you did:</p>

            {/* Score Summary */}
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

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-xl bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors font-semibold"
              >
                Play Again
              </button>
              <Link
                to="/student/results"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-semibold"
              >
                View Leaderboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
