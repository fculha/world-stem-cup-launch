import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, LogOut, Clock, CheckCircle, Zap, AlertTriangle, 
  Loader2, Play, Pause, RotateCcw, Settings, Bug, Globe,
  ChevronDown, ChevronRight, Eye, Calendar, Timer, Search,
  User, Users, Plus, X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface Tournament {
  id: number;
  name: string;
  status: string;
}

interface TournamentRound {
  id: number;
  tournament_id: number;
  round_no: number;
  name: string | null;
}

interface Match {
  id: number;
  tournament_id: number;
  status: string;
  round_number: number;
  started_at: string | null;
}

interface StudentSearchResult {
  user_id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  school_name: string | null;
}

interface StudentContext {
  user_id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  student_profile_id: number | null;
  grade: string | null;
  age_band: string | null;
  school_id: number | null;
  school_name: string | null;
  school_country: string | null;
  school_city: string | null;
  country_code: string | null;
  default_language_code: string;
  teams: TeamInfo[];
  primary_team_id: number | null;
}

interface TeamInfo {
  team_id: number;
  team_name: string;
  status: string;
  role: string;
  school_id: number;
}

interface TeamSearchResult {
  team_id: number;
  team_name: string;
  status: string;
  school_id: number;
  school_name: string | null;
  school_country: string | null;
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
  used_language_code?: string;
  is_fallback_to_english?: boolean;
}

interface QuestionsResponse {
  questions: Question[];
  requested_language_code: string;
  translations_available_count: number;
  fallback_to_english_count: number;
}

interface LanguageOption {
  code: string;
  name: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ha', name: 'Hausa' },
  { code: 'am', name: 'Amharic' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'ig', name: 'Igbo' },
  { code: 'zu', name: 'Zulu' },
  { code: 'xh', name: 'Xhosa' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'so', name: 'Somali' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'wo', name: 'Wolof' },
  { code: 'tr', name: 'Turkish' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' },
];

type SimulationState = 'idle' | 'countdown' | 'playing' | 'paused' | 'answered' | 'finished';

export default function AdminTestArenaPage() {
  const { user, accessToken, logout } = useAuth();
  const navigate = useNavigate();
  
  // Student Simulation State (Feature A)
  const [studentSearch, setStudentSearch] = useState('');
  const [studentSearchResults, setStudentSearchResults] = useState<StudentSearchResult[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentContext | null>(null);
  const [useStudentDefaultLanguage, setUseStudentDefaultLanguage] = useState(true);
  const [studentSearchLoading, setStudentSearchLoading] = useState(false);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  
  // Test Controls State
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentRounds, setTournamentRounds] = useState<TournamentRound[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [forceFallback, setForceFallback] = useState(false);
  const [matchStartTime, setMatchStartTime] = useState<Date>(new Date());
  const [countdownToStart, setCountdownToStart] = useState<number | null>(null);
  
  // Create Test Match State (Feature C)
  const [showCreateMatchModal, setShowCreateMatchModal] = useState(false);
  const [teamASearch, setTeamASearch] = useState('');
  const [teamBSearch, setTeamBSearch] = useState('');
  const [teamSearchResults, setTeamSearchResults] = useState<TeamSearchResult[]>([]);
  const [selectedTeamA, setSelectedTeamA] = useState<TeamSearchResult | null>(null);
  const [selectedTeamB, setSelectedTeamB] = useState<TeamSearchResult | null>(null);
  const [creatingMatch, setCreatingMatch] = useState(false);
  const [activeTeamSearch, setActiveTeamSearch] = useState<'A' | 'B' | null>(null);
  
  // Simulation State
  const [simulationState, setSimulationState] = useState<SimulationState>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [transitionCountdown, setTransitionCountdown] = useState(3);
  
  // Debug State
  const [apiResponse, setApiResponse] = useState<QuestionsResponse | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(true);
  const [showApiResponse, setShowApiResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const startTimeRef = useRef<number>(0);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion = questions[currentQuestionIndex];

  // Fetch tournaments
  useEffect(() => {
    const fetchTournaments = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch(`${API_URL}/api/competitions/tournaments`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setTournaments(data.tournaments || data || []);
        }
      } catch (err) {
        console.error('Failed to fetch tournaments:', err);
      }
    };
    fetchTournaments();
  }, [accessToken]);

  // Fetch matches when tournament selected
  useEffect(() => {
    const fetchMatches = async () => {
      if (!accessToken || !selectedTournamentId) {
        setMatches([]);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/competitions/tournaments/${selectedTournamentId}/matches`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setMatches(data.matches || data || []);
        }
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      }
    };
    fetchMatches();
  }, [accessToken, selectedTournamentId]);

  // Fetch questions for simulation
  const fetchQuestions = useCallback(async () => {
    if (!selectedMatchId || !accessToken) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use a bogus language code if forcing fallback
      const langParam = forceFallback ? 'xx-force-fallback' : selectedLanguage;
      
      const response = await fetch(
        `${API_URL}/api/gameplay/match/${selectedMatchId}/questions?team_id=1&lang=${langParam}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch questions');
      }
      
      const data: QuestionsResponse = await response.json();
      setApiResponse(data);
      setQuestions(data.questions);
      setCurrentQuestionIndex(0);
      setTotalScore(0);
      setSelectedAnswer(null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, [selectedMatchId, accessToken, selectedLanguage, forceFallback]);

  // Countdown timer effect
  useEffect(() => {
    if (countdownToStart === null || countdownToStart <= 0) return;
    
    const timer = setInterval(() => {
      setCountdownToStart(prev => {
        if (prev === null || prev <= 1) {
          startSimulation();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdownToStart]);

  // Question timer effect
  useEffect(() => {
    if (simulationState !== 'playing' || timeLeft <= 0) return;

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
  }, [simulationState, timeLeft]);

  // Transition countdown effect
  useEffect(() => {
    if (simulationState !== 'countdown') return;

    const timer = setInterval(() => {
      setTransitionCountdown((prev) => {
        if (prev <= 1) {
          startQuestion();
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [simulationState]);

  // Student search with debounce (Feature A)
  useEffect(() => {
    if (studentSearch.length < 2) {
      setStudentSearchResults([]);
      setShowStudentDropdown(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setStudentSearchLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/admin/test-arena/students/search?search=${encodeURIComponent(studentSearch)}&limit=10`,
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );
        if (response.ok) {
          const data = await response.json();
          setStudentSearchResults(data.students || []);
          setShowStudentDropdown(true);
        }
      } catch (err) {
        console.error('Failed to search students:', err);
      } finally {
        setStudentSearchLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [studentSearch, accessToken]);

  // Load student context when selected (Feature A)
  const loadStudentContext = useCallback(async (userId: number) => {
    if (!accessToken) return;
    
    try {
      const tournamentParam = selectedTournamentId ? `?tournament_id=${selectedTournamentId}` : '';
      const response = await fetch(
        `${API_URL}/api/admin/test-arena/students/${userId}/context${tournamentParam}`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      
      if (response.ok) {
        const context: StudentContext = await response.json();
        setSelectedStudent(context);
        
        // Auto-populate language if toggle is on
        if (useStudentDefaultLanguage && context.default_language_code) {
          setSelectedLanguage(context.default_language_code);
        }
        
        setStudentSearch('');
        setShowStudentDropdown(false);
      }
    } catch (err) {
      console.error('Failed to load student context:', err);
    }
  }, [accessToken, selectedTournamentId, useStudentDefaultLanguage]);

  // Team search for Create Test Match (Feature C)
  const searchTeams = useCallback(async (search: string) => {
    if (!accessToken || search.length < 1) {
      setTeamSearchResults([]);
      return;
    }
    
    try {
      const tournamentParam = selectedTournamentId ? `&tournament_id=${selectedTournamentId}` : '';
      const response = await fetch(
        `${API_URL}/api/admin/test-arena/teams/search?search=${encodeURIComponent(search)}${tournamentParam}&limit=10`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      
      if (response.ok) {
        const data = await response.json();
        setTeamSearchResults(data.teams || []);
      }
    } catch (err) {
      console.error('Failed to search teams:', err);
    }
  }, [accessToken, selectedTournamentId]);

  // Create test match (Feature C)
  const createTestMatch = useCallback(async () => {
    if (!accessToken || !selectedRoundId || !selectedTeamA || !selectedTeamB) {
      setError('Please select a tournament round and both teams');
      return;
    }
    
    setCreatingMatch(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/admin/test-arena/create-test-match`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tournament_round_id: selectedRoundId,
          team_a_id: selectedTeamA.team_id,
          team_b_id: selectedTeamB.team_id,
          question_count: 10
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to create test match');
      }
      
      const data = await response.json();
      setSelectedMatchId(data.match_id);
      setShowCreateMatchModal(false);
      setSelectedTeamA(null);
      setSelectedTeamB(null);
      setTeamASearch('');
      setTeamBSearch('');
      
      // Auto-load the match questions
      await fetchQuestions();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test match');
    } finally {
      setCreatingMatch(false);
    }
  }, [accessToken, selectedRoundId, selectedTeamA, selectedTeamB, fetchQuestions]);

  // Fetch tournament rounds when tournament selected
  useEffect(() => {
    const fetchRounds = async () => {
      if (!accessToken || !selectedTournamentId) {
        setTournamentRounds([]);
        return;
      }
      try {
        const response = await fetch(
          `${API_URL}/api/competitions/tournaments/${selectedTournamentId}/rounds`,
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );
        if (response.ok) {
          const data = await response.json();
          setTournamentRounds(data.rounds || data || []);
        }
      } catch (err) {
        console.error('Failed to fetch rounds:', err);
      }
    };
    fetchRounds();
  }, [accessToken, selectedTournamentId]);

  const handleTimeUp = useCallback(() => {
    if (simulationState !== 'playing' || !currentQuestion) return;
    setSimulationState('answered');
  }, [simulationState, currentQuestion]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const loadMatch = async () => {
    await fetchQuestions();
    setSimulationState('idle');
  };

  const startCountdown = () => {
    const now = new Date();
    const startTime = matchStartTime;
    const diffMs = startTime.getTime() - now.getTime();
    
    if (diffMs > 0) {
      setCountdownToStart(Math.ceil(diffMs / 1000));
    } else {
      startSimulation();
    }
  };

  const startSimulation = () => {
    if (questions.length === 0) return;
    setTransitionCountdown(3);
    setSimulationState('countdown');
  };

  const startQuestion = () => {
    if (!currentQuestion) return;
    setSimulationState('playing');
    setTimeLeft(Math.floor(currentQuestion.time_limit_ms / 1000));
    setSelectedAnswer(null);
    startTimeRef.current = Date.now();
  };

  const submitAnswer = () => {
    if (!selectedAnswer || simulationState !== 'playing') return;
    
    // In simulation mode, we don't actually submit to the server
    // Just show the result locally
    const isCorrect = selectedAnswer.includes(')') ? 
      selectedAnswer.split(')')[0].trim() === 'A' : // Mock: A is always correct for demo
      false;
    
    const timeBonus = isCorrect ? Math.floor((timeLeft / (currentQuestion?.time_limit_ms || 60000) * 1000) * 50) : 0;
    const pointsEarned = isCorrect ? 100 + timeBonus : 0;
    
    setTotalScore(prev => prev + pointsEarned);
    setSimulationState('answered');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTransitionCountdown(3);
      setSimulationState('countdown');
    } else {
      setSimulationState('finished');
    }
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    setSelectedAnswer(null);
    setTimeLeft(0);
  };

  const pauseSimulation = () => {
    if (simulationState === 'playing') {
      setSimulationState('paused');
    } else if (simulationState === 'paused') {
      setSimulationState('playing');
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
      'S': 'Science', 'T': 'Technology', 'E': 'Engineering', 'M': 'Mathematics',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'S': 'bg-green-500/20 text-green-400 border-green-500/30',
      'T': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'E': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'M': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[category] || 'bg-white/10 text-white/60 border-white/10';
  };

  const getMatchTimeStatus = (): { status: 'UPCOMING' | 'LIVE' | 'ENDED'; color: string; icon: string } => {
    const now = new Date();
    const startTime = matchStartTime;
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Assume 1 hour match duration
    
    if (now < startTime) {
      return { status: 'UPCOMING', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: 'clock' };
    } else if (now >= startTime && now <= endTime) {
      return { status: 'LIVE', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: 'play' };
    } else {
      return { status: 'ENDED', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: 'check' };
    }
  };

  // Check if user is admin
  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-white/60 mb-6">Admin Test Arena is only available to administrators.</p>
          <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-[#4361ee] text-white">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-lg font-bold">World STEM Cup</span>
              </Link>
              <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium">
                Admin Test Arena
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {simulationState !== 'idle' && (
                <div className="flex items-center gap-2 bg-[#16213e] px-3 py-1.5 rounded-lg">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-sm">{totalScore} pts</span>
                </div>
              )}
              <button
                onClick={() => setShowDebugPanel(!showDebugPanel)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                  showDebugPanel ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/60'
                }`}
              >
                <Bug className="w-4 h-4" />
                Debug
              </button>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-white/60">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Three Panel Layout */}
      <main className="relative z-10 flex h-[calc(100vh-60px)]">
        
        {/* Left Panel - Test Controls */}
        <div className="w-80 bg-[#0a0a1a]/80 border-r border-white/10 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Test Controls
          </h2>
          
          {/* Student Search (Feature A) */}
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Simulate As Student
            </label>
            {selectedStudent ? (
              <div className="bg-[#16213e] border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedStudent.first_name} {selectedStudent.last_name}
                      </p>
                      <p className="text-xs text-white/60">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>
                </div>
                <div className="text-xs text-white/40 space-y-1">
                  <p>School: {selectedStudent.school_name || 'N/A'}</p>
                  <p>Country: {selectedStudent.school_country || 'N/A'}</p>
                  <p>Team: {selectedStudent.teams[0]?.team_name || 'No team'}</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by email or name..."
                    className="w-full bg-[#16213e] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm"
                  />
                  {studentSearchLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-white/40" />
                  )}
                </div>
                {showStudentDropdown && studentSearchResults.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-[#16213e] border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {studentSearchResults.map(student => (
                      <button
                        key={student.user_id}
                        onClick={() => loadStudentContext(student.user_id)}
                        className="w-full px-3 py-2 text-left hover:bg-white/10 text-sm border-b border-white/5 last:border-0"
                      >
                        <p className="font-medium">{student.first_name} {student.last_name}</p>
                        <p className="text-xs text-white/60">{student.email}</p>
                        {student.school_name && (
                          <p className="text-xs text-white/40">{student.school_name}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Use Student Default Language Toggle */}
          {selectedStudent && (
            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div 
                  className={`w-10 h-6 rounded-full transition-colors ${
                    useStudentDefaultLanguage ? 'bg-green-500' : 'bg-white/20'
                  }`}
                  onClick={() => {
                    setUseStudentDefaultLanguage(!useStudentDefaultLanguage);
                    if (!useStudentDefaultLanguage && selectedStudent.default_language_code) {
                      setSelectedLanguage(selectedStudent.default_language_code);
                    }
                  }}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-0.5 ${
                      useStudentDefaultLanguage ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <span className="text-sm">Use student default language</span>
              </label>
              <p className="text-xs text-white/40 mt-1 ml-13">
                Default: {selectedStudent.default_language_code?.toUpperCase() || 'EN'}
              </p>
            </div>
          )}
          
          {/* Tournament Selector */}
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2">Tournament</label>
            <select
              value={selectedTournamentId || ''}
              onChange={(e) => {
                setSelectedTournamentId(e.target.value ? Number(e.target.value) : null);
                setSelectedMatchId(null);
                setSelectedRoundId(null);
              }}
              className="w-full bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select tournament...</option>
              {tournaments.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          
          {/* Match Selector with Create Test Match Button */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-white/60">Match</label>
              <button
                onClick={() => setShowCreateMatchModal(true)}
                disabled={!selectedTournamentId}
                className="flex items-center gap-1 text-xs text-[#4361ee] hover:text-[#4361ee]/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-3 h-3" />
                Create Test Match
              </button>
            </div>
            <select
              value={selectedMatchId || ''}
              onChange={(e) => setSelectedMatchId(e.target.value ? Number(e.target.value) : null)}
              disabled={!selectedTournamentId}
              className="w-full bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
            >
              <option value="">Select match...</option>
              {matches.map(m => (
                <option key={m.id} value={m.id}>Match #{m.id} - Round {m.round_number}</option>
              ))}
            </select>
          </div>
          
          {/* Or enter Match ID directly */}
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2">Or enter Match ID</label>
            <input
              type="number"
              value={selectedMatchId || ''}
              onChange={(e) => setSelectedMatchId(e.target.value ? Number(e.target.value) : null)}
              placeholder="Enter match ID..."
              className="w-full bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          
          {/* Match Start Time */}
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Match Start Time
            </label>
            <input
              type="datetime-local"
              value={matchStartTime.toISOString().slice(0, 16)}
              onChange={(e) => setMatchStartTime(new Date(e.target.value))}
              className="w-full bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
            {/* Match Status Badge */}
            <div className="mt-2">
              {(() => {
                const matchStatus = getMatchTimeStatus();
                return (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${matchStatus.color}`}>
                    {matchStatus.status === 'UPCOMING' && <Clock className="w-3 h-3" />}
                    {matchStatus.status === 'LIVE' && <Play className="w-3 h-3" />}
                    {matchStatus.status === 'ENDED' && <CheckCircle className="w-3 h-3" />}
                    {matchStatus.status}
                  </span>
                );
              })()}
            </div>
          </div>
          
          {/* Countdown Display */}
          {countdownToStart !== null && (
            <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400">
                <Timer className="w-5 h-5" />
                <span className="font-bold">Starting in {countdownToStart}s</span>
              </div>
            </div>
          )}
          
          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Simulate Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              disabled={!!selectedStudent && useStudentDefaultLanguage}
              className="w-full bg-[#16213e] border border-white/10 rounded-lg px-3 py-2 text-sm disabled:opacity-50"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name} ({lang.code})</option>
              ))}
            </select>
          </div>
          
          {/* Force Fallback Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div 
                className={`w-10 h-6 rounded-full transition-colors ${
                  forceFallback ? 'bg-red-500' : 'bg-white/20'
                }`}
                onClick={() => setForceFallback(!forceFallback)}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mt-0.5 ${
                    forceFallback ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-sm">Force fallback to English</span>
            </label>
            <p className="text-xs text-white/40 mt-1 ml-13">
              Test what happens when translation is unavailable
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={loadMatch}
              disabled={!selectedMatchId || loading}
              className="w-full py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              Load Match
            </button>
            
            <button
              onClick={startCountdown}
              disabled={questions.length === 0 || simulationState !== 'idle'}
              className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-500/80 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Simulation
            </button>
            
            <button
              onClick={pauseSimulation}
              disabled={simulationState !== 'playing' && simulationState !== 'paused'}
              className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-500/80 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {simulationState === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {simulationState === 'paused' ? 'Resume' : 'Pause'}
            </button>
            
            <button
              onClick={resetSimulation}
              disabled={simulationState === 'idle'}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
        
        {/* Center Panel - Live Simulation */}
        <div className="flex-1 p-6 overflow-y-auto">
          {simulationState === 'idle' && questions.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white/60 mb-2">No Match Loaded</h2>
                <p className="text-white/40">Select a tournament and match, then click "Load Match" to begin.</p>
              </div>
            </div>
          )}
          
          {simulationState === 'idle' && questions.length > 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                {/* Language Fallback Banner */}
                {apiResponse && apiResponse.fallback_to_english_count > 0 && (
                  <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-xl text-left">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-400 mb-1">Language Fallback Active</p>
                        <p className="text-sm text-white/70">
                          {apiResponse.fallback_to_english_count} of {questions.length} questions fell back to English 
                          because {selectedLanguage.toUpperCase()} translations are not available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Match #{selectedMatchId}</h1>
                <p className="text-white/60 mb-6">
                  {questions.length} questions loaded. Ready to simulate.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{questions.length}</p>
                    <p className="text-white/60 text-sm">Questions</p>
                  </div>
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{selectedLanguage.toUpperCase()}</p>
                    <p className="text-white/60 text-sm">Language</p>
                  </div>
                  <div className="bg-[#16213e] rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold">{apiResponse?.fallback_to_english_count || 0}</p>
                    <p className="text-white/60 text-sm">Fallbacks</p>
                  </div>
                </div>
                <button
                  onClick={startSimulation}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity text-lg font-semibold"
                >
                  Start Simulation
                </button>
              </div>
            </div>
          )}
          
          {simulationState === 'countdown' && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent">
                  {transitionCountdown}
                </div>
                <p className="text-white/60">Get ready for question {currentQuestionIndex + 1}...</p>
              </div>
            </div>
          )}
          
          {(simulationState === 'playing' || simulationState === 'paused' || simulationState === 'answered') && currentQuestion && (
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className={`flex items-center gap-1 font-mono text-lg ${getTimerColor()}`}>
                    <Clock className="w-4 h-4" />
                    {timeLeft}s
                    {simulationState === 'paused' && <span className="text-yellow-400 ml-2">(PAUSED)</span>}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4361ee] to-[#f72585] transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(currentQuestion.category)}`}>
                    {getCategoryLabel(currentQuestion.category)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/60">
                    Difficulty: {currentQuestion.difficulty}
                  </span>
                  {currentQuestion.used_language_code && (
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      currentQuestion.is_fallback_to_english 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {currentQuestion.is_fallback_to_english ? 'Fallback: EN' : `Lang: ${currentQuestion.used_language_code.toUpperCase()}`}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-semibold mb-6">{currentQuestion.prompt}</h2>

                {/* Options */}
                {currentQuestion.choices && (
                  <div className="grid gap-3">
                    {currentQuestion.choices.map((choice, index) => {
                      const isSelected = selectedAnswer === choice;
                      const showResult = simulationState === 'answered';
                      
                      let optionClass = 'bg-[#0a0a1a] border-white/10 hover:border-[#4361ee]/50';
                      if (showResult && isSelected) {
                        optionClass = 'bg-blue-500/20 border-blue-500';
                      } else if (isSelected) {
                        optionClass = 'bg-[#4361ee]/20 border-[#4361ee]';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => simulationState === 'playing' && setSelectedAnswer(choice)}
                          disabled={simulationState !== 'playing'}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass} ${
                            simulationState === 'playing' ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1">{choice}</span>
                            {showResult && isSelected && <CheckCircle className="w-5 h-5 text-blue-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {/* Numeric/Short answer input */}
                {!currentQuestion.choices && (
                  <input
                    type="text"
                    value={selectedAnswer || ''}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={simulationState !== 'playing'}
                    placeholder="Enter your answer..."
                    className="w-full bg-[#0a0a1a] border-2 border-white/10 rounded-xl px-4 py-3 text-lg focus:border-[#4361ee] outline-none"
                  />
                )}
              </div>

              {/* Action Buttons */}
              {simulationState === 'playing' && (
                <button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold disabled:opacity-50"
                >
                  Submit Answer (Simulation)
                </button>
              )}
              
              {simulationState === 'answered' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-500/20 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="font-semibold text-blue-400">Answer Recorded (Simulation)</p>
                      <p className="text-sm text-white/60">In real match, this would be submitted to server</p>
                    </div>
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity font-semibold"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Simulation'}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {simulationState === 'finished' && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Simulation Complete!</h1>
                <p className="text-white/60 mb-6">All {questions.length} questions reviewed.</p>
                <div className="bg-[#16213e] rounded-2xl p-6 border border-white/10 mb-6">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] bg-clip-text text-transparent">
                    {totalScore}
                  </div>
                  <p className="text-white/60">Simulated Points</p>
                </div>
                <button
                  onClick={resetSimulation}
                  className="px-8 py-3 rounded-xl bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors font-semibold"
                >
                  Run Again
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Context Summary + Debug Info */}
        {showDebugPanel && (
          <div className="w-96 bg-[#0a0a1a]/80 border-l border-white/10 p-4 overflow-y-auto">
            
            {/* Context Summary Panel (Feature B) */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Context Summary
              </h2>
              
              <div className="space-y-3">
                {/* Student Info */}
                <div className="bg-[#16213e] rounded-lg p-3 border border-white/10">
                  <h3 className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Student</h3>
                  {selectedStudent ? (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Name</span>
                        <span className="font-medium">{selectedStudent.first_name} {selectedStudent.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">User ID</span>
                        <span className="font-mono text-[#4361ee]">{selectedStudent.user_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Grade</span>
                        <span>{selectedStudent.grade || 'N/A'}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm italic">No student selected</p>
                  )}
                </div>
                
                {/* School & Country Info */}
                <div className="bg-[#16213e] rounded-lg p-3 border border-white/10">
                  <h3 className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">School & Location</h3>
                  {selectedStudent ? (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">School</span>
                        <span className="text-right max-w-[150px] truncate">{selectedStudent.school_name || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Country</span>
                        <span>{selectedStudent.school_country || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">City</span>
                        <span>{selectedStudent.school_city || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Country Code</span>
                        <span className="font-mono">{selectedStudent.country_code || 'N/A'}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm italic">Select a student to see location</p>
                  )}
                </div>
                
                {/* Team Info */}
                <div className="bg-[#16213e] rounded-lg p-3 border border-white/10">
                  <h3 className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Team</h3>
                  {selectedStudent && selectedStudent.teams.length > 0 ? (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Team Name</span>
                        <span>{selectedStudent.teams[0].team_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Team ID</span>
                        <span className="font-mono text-[#4361ee]">{selectedStudent.teams[0].team_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Status</span>
                        <span className={`${selectedStudent.teams[0].status === 'APPROVED' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {selectedStudent.teams[0].status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Role</span>
                        <span>{selectedStudent.teams[0].role}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm italic">No team assigned</p>
                  )}
                </div>
                
                {/* Tournament & Match Info */}
                <div className="bg-[#16213e] rounded-lg p-3 border border-white/10">
                  <h3 className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Tournament & Match</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Tournament ID</span>
                      <span className="font-mono">{selectedTournamentId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Match ID</span>
                      <span className="font-mono text-[#4361ee]">{selectedMatchId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Start Time</span>
                      <span className="text-xs">{matchStartTime.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Language Info */}
                <div className="bg-[#16213e] rounded-lg p-3 border border-white/10">
                  <h3 className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Language</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Requested</span>
                      <span className="font-mono text-yellow-400">{selectedLanguage.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Student Default</span>
                      <span className="font-mono">{selectedStudent?.default_language_code?.toUpperCase() || 'EN'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Using Default</span>
                      <span className={useStudentDefaultLanguage ? 'text-green-400' : 'text-white/60'}>
                        {useStudentDefaultLanguage ? 'Yes' : 'No (Override)'}
                      </span>
                    </div>
                    {apiResponse && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/60">Fallbacks</span>
                          <span className={`font-mono ${(apiResponse.fallback_to_english_count || 0) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {apiResponse.fallback_to_english_count || 0}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Debug Panel */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Bug className="w-5 h-5 text-purple-400" />
                Debug Panel
              </h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                TEST MODE
              </span>
            </div>
            
            {/* Mode Indicator */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-300 font-medium">Admin Test Arena Simulation</span>
              </div>
              <p className="text-xs text-white/50 mt-1">
                Test matches are marked with is_test=true and excluded from leaderboards
              </p>
            </div>
            
            {currentQuestion && (
              <div className="space-y-4">
                {/* Question Info */}
                <div className="bg-[#16213e] rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Current Question</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">question_id</span>
                      <span className="font-mono text-[#4361ee]">{currentQuestion.question_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">order_no</span>
                      <span className="font-mono">{currentQuestion.order_no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">category</span>
                      <span className="font-mono">{currentQuestion.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">difficulty</span>
                      <span className="font-mono">{currentQuestion.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">type</span>
                      <span className="font-mono">{currentQuestion.type}</span>
                    </div>
                  </div>
                </div>
                
                {/* Language Info */}
                <div className="bg-[#16213e] rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Language Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">requested_language</span>
                      <span className="font-mono text-yellow-400">{apiResponse?.requested_language_code || selectedLanguage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">used_language_code</span>
                      <span className={`font-mono ${currentQuestion.used_language_code === 'en' && selectedLanguage !== 'en' ? 'text-red-400' : 'text-green-400'}`}>
                        {currentQuestion.used_language_code || 'en'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">is_fallback_to_english</span>
                      <span className={`font-mono ${currentQuestion.is_fallback_to_english ? 'text-red-400' : 'text-green-400'}`}>
                        {currentQuestion.is_fallback_to_english ? 'true' : 'false'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">translations_available</span>
                      <span className="font-mono">{apiResponse?.translations_available_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">fallback_count</span>
                      <span className={`font-mono ${(apiResponse?.fallback_to_english_count || 0) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {apiResponse?.fallback_to_english_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Simulation State */}
                <div className="bg-[#16213e] rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Simulation State</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">state</span>
                      <span className="font-mono text-purple-400">{simulationState}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">question_index</span>
                      <span className="font-mono">{currentQuestionIndex + 1} / {questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">time_left</span>
                      <span className={`font-mono ${getTimerColor()}`}>{timeLeft}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">total_score</span>
                      <span className="font-mono text-yellow-400">{totalScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* API Response */}
            <div className="mt-4">
              <button
                onClick={() => setShowApiResponse(!showApiResponse)}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-2"
              >
                {showApiResponse ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                API Response Snapshot
              </button>
              {showApiResponse && apiResponse && (
                <pre className="bg-[#0a0a1a] rounded-lg p-3 text-xs font-mono overflow-x-auto border border-white/10 max-h-64 overflow-y-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </main>
      
      {/* Create Test Match Modal (Feature C) */}
      {showCreateMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#16213e] rounded-2xl border border-white/10 w-full max-w-lg mx-4 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#4361ee]" />
                Create Test Match
              </h3>
              <button
                onClick={() => {
                  setShowCreateMatchModal(false);
                  setSelectedTeamA(null);
                  setSelectedTeamB(null);
                  setTeamASearch('');
                  setTeamBSearch('');
                  setTeamSearchResults([]);
                }}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Tournament Round Selector */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Tournament Round</label>
                <select
                  value={selectedRoundId || ''}
                  onChange={(e) => setSelectedRoundId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select round...</option>
                  {tournamentRounds.map(r => (
                    <option key={r.id} value={r.id}>Round {r.round_no}{r.name ? ` - ${r.name}` : ''}</option>
                  ))}
                </select>
              </div>
              
              {/* Team A Selector */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Team A</label>
                {selectedTeamA ? (
                  <div className="bg-[#0a0a1a] border border-green-500/30 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedTeamA.team_name}</p>
                      <p className="text-xs text-white/60">{selectedTeamA.school_name || 'No school'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTeamA(null)}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={teamASearch}
                      onChange={(e) => {
                        setTeamASearch(e.target.value);
                        setActiveTeamSearch('A');
                        searchTeams(e.target.value);
                      }}
                      placeholder="Search team..."
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm"
                    />
                    {activeTeamSearch === 'A' && teamSearchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-[#0a0a1a] border border-white/10 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                        {teamSearchResults.map(team => (
                          <button
                            key={team.team_id}
                            onClick={() => {
                              setSelectedTeamA(team);
                              setTeamASearch('');
                              setTeamSearchResults([]);
                              setActiveTeamSearch(null);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-white/10 text-sm border-b border-white/5 last:border-0"
                          >
                            <p className="font-medium">{team.team_name}</p>
                            <p className="text-xs text-white/60">{team.school_name || 'No school'}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Team B Selector */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Team B</label>
                {selectedTeamB ? (
                  <div className="bg-[#0a0a1a] border border-blue-500/30 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedTeamB.team_name}</p>
                      <p className="text-xs text-white/60">{selectedTeamB.school_name || 'No school'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTeamB(null)}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={teamBSearch}
                      onChange={(e) => {
                        setTeamBSearch(e.target.value);
                        setActiveTeamSearch('B');
                        searchTeams(e.target.value);
                      }}
                      placeholder="Search team..."
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm"
                    />
                    {activeTeamSearch === 'B' && teamSearchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-[#0a0a1a] border border-white/10 rounded-lg shadow-xl max-h-40 overflow-y-auto">
                        {teamSearchResults.map(team => (
                          <button
                            key={team.team_id}
                            onClick={() => {
                              setSelectedTeamB(team);
                              setTeamBSearch('');
                              setTeamSearchResults([]);
                              setActiveTeamSearch(null);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-white/10 text-sm border-b border-white/5 last:border-0"
                          >
                            <p className="font-medium">{team.team_name}</p>
                            <p className="text-xs text-white/60">{team.school_name || 'No school'}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Info */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-300">
                <p>This will create a new match with 10 auto-assigned questions based on the tournament settings.</p>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
            
            <div className="flex gap-3 p-4 border-t border-white/10">
              <button
                onClick={() => {
                  setShowCreateMatchModal(false);
                  setSelectedTeamA(null);
                  setSelectedTeamB(null);
                  setTeamASearch('');
                  setTeamBSearch('');
                }}
                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={createTestMatch}
                disabled={!selectedRoundId || !selectedTeamA || !selectedTeamB || creatingMatch}
                className="flex-1 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creatingMatch ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Match
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
