import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, ArrowLeft, Radio, Clock, Eye, Maximize, Volume2, VolumeX } from 'lucide-react';

// Mock match data - in production this would come from API
const mockMatchData = {
  'match-1': {
    id: 'match-1',
    tournament_name: 'World STEM Cup Season 1',
    round: 'School Round',
    phase: 'Quarter Finals',
    status: 'live' as const,
    started_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    question_number: 7,
    total_questions: 20,
    current_subject: 'Mathematics',
    current_difficulty: 'Medium',
    time_remaining: 45,
    teams: [
      { name: 'Quantum Minds', school: 'MIT Academy', country: 'USA', flag: '🇺🇸', score: 450, correct: 6, streak: 3 },
      { name: 'Neural Network', school: 'Cambridge School', country: 'UK', flag: '🇬🇧', score: 420, correct: 5, streak: 2 },
      { name: 'Binary Stars', school: 'Tokyo Tech High', country: 'Japan', flag: '🇯🇵', score: 380, correct: 5, streak: 0 },
      { name: 'Code Breakers', school: 'Berlin STEM Academy', country: 'Germany', flag: '🇩🇪', score: 350, correct: 4, streak: 1 },
    ],
    viewers: 1247,
  },
  'match-2': {
    id: 'match-2',
    tournament_name: 'World STEM Cup Season 1',
    round: 'Regional Round',
    phase: 'Semi Finals',
    status: 'live' as const,
    started_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    question_number: 4,
    total_questions: 15,
    current_subject: 'Science',
    current_difficulty: 'Hard',
    time_remaining: 30,
    teams: [
      { name: 'Data Dragons', school: 'Seoul Tech', country: 'South Korea', flag: '🇰🇷', score: 280, correct: 3, streak: 2 },
      { name: 'Algorithm Aces', school: 'Sydney STEM', country: 'Australia', flag: '🇦🇺', score: 260, correct: 3, streak: 1 },
      { name: 'Logic Lords', school: 'Toronto Academy', country: 'Canada', flag: '🇨🇦', score: 240, correct: 2, streak: 0 },
      { name: 'Byte Force', school: 'Paris Tech', country: 'France', flag: '🇫🇷', score: 220, correct: 2, streak: 0 },
    ],
    viewers: 856,
  },
  'match-3': {
    id: 'match-3',
    tournament_name: 'World STEM Cup Season 1',
    round: 'National Finals',
    phase: 'Finals',
    status: 'starting_soon' as const,
    starts_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    question_number: 0,
    total_questions: 25,
    current_subject: 'Technology',
    current_difficulty: 'Expert',
    time_remaining: 0,
    teams: [
      { name: 'Infinity Loop', school: 'Singapore Science', country: 'Singapore', flag: '🇸🇬', score: 0, correct: 0, streak: 0 },
      { name: 'Cyber Scholars', school: 'Mumbai Science', country: 'India', flag: '🇮🇳', score: 0, correct: 0, streak: 0 },
      { name: 'Tech Titans', school: 'Dubai Academy', country: 'UAE', flag: '🇦🇪', score: 0, correct: 0, streak: 0 },
      { name: 'STEM Stars', school: 'Istanbul Tech', country: 'Turkey', flag: '🇹🇷', score: 0, correct: 0, streak: 0 },
    ],
    viewers: 324,
  },
};

interface Team {
  name: string;
  school: string;
  country: string;
  flag: string;
  score: number;
  correct: number;
  streak: number;
}

interface MatchData {
  id: string;
  tournament_name: string;
  round: string;
  phase: string;
  status: 'live' | 'starting_soon' | 'finished';
  started_at?: string;
  starts_at?: string;
  question_number: number;
  total_questions: number;
  current_subject: string;
  current_difficulty: string;
  time_remaining: number;
  teams: Team[];
  viewers: number;
}

export default function LiveMatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45);

  useEffect(() => {
    // Load match data
    if (matchId && mockMatchData[matchId as keyof typeof mockMatchData]) {
      setMatch(mockMatchData[matchId as keyof typeof mockMatchData]);
      setTimeRemaining(mockMatchData[matchId as keyof typeof mockMatchData].time_remaining);
    }
    setLoading(false);
  }, [matchId]);

  // Simulate live updates
  useEffect(() => {
    if (!match || match.status !== 'live') return;

    const interval = setInterval(() => {
      setMatch(prev => {
        if (!prev) return prev;
        
        // Randomly update scores
        const updatedTeams = prev.teams.map(team => ({
          ...team,
          score: team.score + (Math.random() > 0.8 ? Math.floor(Math.random() * 30) : 0),
          streak: Math.random() > 0.9 ? team.streak + 1 : team.streak,
        }));
        
        // Sort by score
        updatedTeams.sort((a, b) => b.score - a.score);
        
        return {
          ...prev,
          teams: updatedTeams,
          viewers: prev.viewers + Math.floor(Math.random() * 10) - 3,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [match?.status]);

  // Countdown timer
  useEffect(() => {
    if (!match || match.status !== 'live') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) return 45; // Reset for demo
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [match?.status]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getElapsedTime = () => {
    if (!match?.started_at) return '00:00';
    const elapsed = Math.floor((Date.now() - new Date(match.started_at).getTime()) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCountdown = () => {
    if (!match?.starts_at) return '00:00';
    const remaining = Math.max(0, Math.floor((new Date(match.starts_at).getTime() - Date.now()) / 1000));
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/60">Loading match...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <Radio className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Match Not Found</h2>
          <p className="text-white/60 mb-6">This match may have ended or doesn't exist.</p>
          <Link to="/watch" className="px-6 py-3 bg-[#4361ee] rounded-lg hover:bg-[#4361ee]/80 transition-colors">
            Back to Live Matches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4361ee]/20 rounded-full filter blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f72585]/20 rounded-full filter blur-[150px] animate-pulse"></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/watch" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="font-bold">World STEM Cup</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60">
              <Eye className="w-4 h-4" />
              <span>{match.viewers.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-white/40" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Match Header */}
        <div className="text-center mb-8">
          {match.status === 'live' ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-bold">LIVE</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 mb-4">
              <Clock className="w-4 h-4" />
              <span className="font-bold">STARTING SOON</span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{match.tournament_name}</h1>
          <p className="text-xl text-white/60">{match.round} - {match.phase}</p>
        </div>

        {/* Timer and Question Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-6 border border-white/10 text-center">
            <p className="text-white/40 text-sm mb-2">
              {match.status === 'live' ? 'ELAPSED TIME' : 'STARTS IN'}
            </p>
            <p className="text-4xl font-mono font-bold text-[#4361ee]">
              {match.status === 'live' ? getElapsedTime() : getCountdown()}
            </p>
          </div>
          
          {match.status === 'live' && (
            <>
              <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-6 border border-white/10 text-center">
                <p className="text-white/40 text-sm mb-2">QUESTION</p>
                <p className="text-4xl font-bold">
                  <span className="text-[#f72585]">{match.question_number}</span>
                  <span className="text-white/40 text-2xl"> / {match.total_questions}</span>
                </p>
              </div>
              
              <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-6 border border-white/10 text-center">
                <p className="text-white/40 text-sm mb-2">TIME REMAINING</p>
                <p className={`text-4xl font-mono font-bold ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                  {timeRemaining}s
                </p>
              </div>
            </>
          )}
        </div>

        {/* Current Question Info (without revealing the question) */}
        {match.status === 'live' && (
          <div className="bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-xl p-4 border border-white/10 mb-8 text-center">
            <div className="flex items-center justify-center gap-6">
              <div>
                <span className="text-white/40 text-sm">Subject: </span>
                <span className="font-semibold text-[#4361ee]">{match.current_subject}</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div>
                <span className="text-white/40 text-sm">Difficulty: </span>
                <span className={`font-semibold ${match.current_difficulty === 'Hard' || match.current_difficulty === 'Expert' ? 'text-red-400' : match.current_difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {match.current_difficulty}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scoreboard */}
        <div className="bg-[#16213e]/80 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-[#0a0a1a]/50">
            <h2 className="text-xl font-bold text-center">Live Scoreboard</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {match.teams.map((team, index) => (
                <div
                  key={team.name}
                  className={`relative flex items-center justify-between p-4 md:p-6 rounded-xl transition-all duration-500 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-2 border-yellow-500/30 scale-[1.02]' 
                      : index === 1 
                        ? 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border border-gray-400/30'
                        : index === 2
                          ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/30'
                          : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' : 
                      index === 1 ? 'bg-gray-400 text-black' : 
                      index === 2 ? 'bg-orange-500 text-black' : 
                      'bg-white/10 text-white/60'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Team Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{team.flag}</span>
                        <h3 className="text-lg md:text-xl font-bold">{team.name}</h3>
                        {team.streak >= 2 && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                            {team.streak} streak
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-sm md:text-base">{team.school}</p>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="text-right">
                    <p className={`text-3xl md:text-5xl font-bold ${index === 0 ? 'text-yellow-400' : 'text-[#4361ee]'}`}>
                      {team.score}
                    </p>
                    <p className="text-white/40 text-sm">
                      {team.correct} correct
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>Scores update automatically every few seconds</p>
          <p className="mt-1">Press F11 or click fullscreen button for best viewing experience</p>
        </div>
      </main>
    </div>
  );
}
