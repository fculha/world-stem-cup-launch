import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Play, Clock, Globe, Radio, Eye, Tv } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock live matches data - in production this would come from API
const mockLiveMatches = [
  {
    id: 'match-1',
    tournament_name: 'World STEM Cup Season 1',
    round: 'School Round',
    phase: 'Quarter Finals',
    status: 'live',
    started_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    question_number: 7,
    total_questions: 20,
    teams: [
      { name: 'Quantum Minds', school: 'MIT Academy', country: 'USA', score: 450 },
      { name: 'Neural Network', school: 'Cambridge School', country: 'UK', score: 420 },
      { name: 'Binary Stars', school: 'Tokyo Tech High', country: 'Japan', score: 380 },
      { name: 'Code Breakers', school: 'Berlin STEM Academy', country: 'Germany', score: 350 },
    ],
    viewers: 1247,
  },
  {
    id: 'match-2',
    tournament_name: 'World STEM Cup Season 1',
    round: 'Regional Round',
    phase: 'Semi Finals',
    status: 'live',
    started_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 mins ago
    question_number: 4,
    total_questions: 15,
    teams: [
      { name: 'Data Dragons', school: 'Seoul Tech', country: 'South Korea', score: 280 },
      { name: 'Algorithm Aces', school: 'Sydney STEM', country: 'Australia', score: 260 },
      { name: 'Logic Lords', school: 'Toronto Academy', country: 'Canada', score: 240 },
      { name: 'Byte Force', school: 'Paris Tech', country: 'France', score: 220 },
    ],
    viewers: 856,
  },
  {
    id: 'match-3',
    tournament_name: 'World STEM Cup Season 1',
    round: 'National Finals',
    phase: 'Finals',
    status: 'starting_soon',
    starts_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins from now
    question_number: 0,
    total_questions: 25,
    teams: [
      { name: 'Infinity Loop', school: 'Singapore Science', country: 'Singapore', score: 0 },
      { name: 'Cyber Scholars', school: 'Mumbai Science', country: 'India', score: 0 },
      { name: 'Tech Titans', school: 'Dubai Academy', country: 'UAE', score: 0 },
      { name: 'STEM Stars', school: 'Istanbul Tech', country: 'Turkey', score: 0 },
    ],
    viewers: 324,
  },
];

interface Team {
  name: string;
  school: string;
  country: string;
  score: number;
}

interface LiveMatch {
  id: string;
  tournament_name: string;
  round: string;
  phase: string;
  status: 'live' | 'starting_soon' | 'finished';
  started_at?: string;
  starts_at?: string;
  question_number: number;
  total_questions: number;
  teams: Team[];
  viewers: number;
}

export default function WatchLivePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
    const [matches, setMatches] = useState<LiveMatch[]>(mockLiveMatches as LiveMatch[]);
    const [loading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming'>('all');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live') {
          // Randomly update scores
          const updatedTeams = match.teams.map(team => ({
            ...team,
            score: team.score + (Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0)
          }));
          // Sort by score
          updatedTeams.sort((a, b) => b.score - a.score);
          return {
            ...match,
            teams: updatedTeams,
            viewers: match.viewers + Math.floor(Math.random() * 10) - 3,
          };
        }
        return match;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTimeDisplay = (match: LiveMatch) => {
    if (match.status === 'live' && match.started_at) {
      const elapsed = Math.floor((Date.now() - new Date(match.started_at).getTime()) / 60000);
      return `${elapsed} min elapsed`;
    }
    if (match.status === 'starting_soon' && match.starts_at) {
      const remaining = Math.floor((new Date(match.starts_at).getTime() - Date.now()) / 60000);
      return `Starts in ${remaining} min`;
    }
    return '';
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'live') return match.status === 'live';
    if (filter === 'upcoming') return match.status === 'starting_soon';
    return true;
  });

  const liveCount = matches.filter(m => m.status === 'live').length;
  const totalViewers = matches.reduce((sum, m) => sum + m.viewers, 0);

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
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
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
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Watch Live</h1>
          <p className="text-white/60">Follow competitions in real-time from around the world</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-medium">LIVE NOW</span>
            </div>
            <p className="text-3xl font-bold">{liveCount}</p>
            <p className="text-white/60 text-sm">Active Matches</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Eye className="w-8 h-8 text-[#4361ee] mx-auto mb-3" />
            <p className="text-3xl font-bold">{totalViewers.toLocaleString()}</p>
            <p className="text-white/60 text-sm">Total Viewers</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Globe className="w-8 h-8 text-[#f72585] mx-auto mb-3" />
            <p className="text-3xl font-bold">{new Set(matches.flatMap(m => m.teams.map(t => t.country))).size}</p>
            <p className="text-white/60 text-sm">Countries Competing</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-[#4361ee] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilter('live')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${filter === 'live' ? 'bg-red-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            Live Now
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'upcoming' ? 'bg-[#4361ee] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            Starting Soon
          </button>
        </div>

        {/* Match Cards */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading matches...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden hover:border-[#4361ee]/50 transition-colors"
              >
                {/* Match Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {match.status === 'live' ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">LIVE</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">UPCOMING</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{match.tournament_name}</h3>
                      <p className="text-white/60 text-sm">{match.round} - {match.phase}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {getTimeDisplay(match)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {match.viewers.toLocaleString()} watching
                    </div>
                    {match.status === 'live' && (
                      <div className="text-white/80">
                        Question {match.question_number}/{match.total_questions}
                      </div>
                    )}
                  </div>
                </div>

                {/* Teams Scoreboard */}
                <div className="p-4">
                  <div className="grid gap-2">
                    {match.teams.map((team, index) => (
                      <div
                        key={team.name}
                        className={`flex items-center justify-between p-3 rounded-lg ${index === 0 && match.status === 'live' ? 'bg-[#4361ee]/20 border border-[#4361ee]/30' : 'bg-white/5'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-400 text-black' : index === 2 ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{team.name}</p>
                            <p className="text-white/40 text-sm">{team.school} - {team.country}</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-[#4361ee]">
                          {team.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Watch Button */}
                <div className="p-4 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Tv className="w-4 h-4" />
                    Open on big screen for best experience
                  </div>
                  <Link
                    to={`/watch/${match.id}`}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${match.status === 'live' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#4361ee] hover:bg-[#4361ee]/80 text-white'}`}
                  >
                    <Play className="w-5 h-5" />
                    {match.status === 'live' ? 'Watch Live' : 'Set Reminder'}
                  </Link>
                </div>
              </div>
            ))}

            {filteredMatches.length === 0 && (
              <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
                <Radio className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No matches found</p>
                <p className="text-white/40 text-sm mt-2">Check back later for live competitions</p>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-[#16213e] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#4361ee]" />
            How to Watch
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-[#4361ee]">At School/Event</h4>
              <p className="text-white/60">Open this page on a projector or large TV in Chrome fullscreen mode. Parents and students can watch live scores update in real-time.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-[#f72585]">Online Streaming</h4>
              <p className="text-white/60">For finals and major events, organizers will share a YouTube/Zoom link where you can watch with live commentary.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-yellow-400">Mobile Friendly</h4>
              <p className="text-white/60">Follow matches on your phone or tablet. Scores update automatically every few seconds.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
