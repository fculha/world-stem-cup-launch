import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, BarChart3, Medal, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock results for demo
const mockResults = [
  { id: 1, tournament: 'Spring Championship 2025', date: '2025-03-15', rank: 3, points: 850, totalTeams: 24 },
  { id: 2, tournament: 'Regional Qualifier', date: '2025-02-20', rank: 1, points: 920, totalTeams: 16 },
  { id: 3, tournament: 'Practice Round', date: '2025-01-10', rank: 5, points: 720, totalTeams: 12 },
];

interface Result {
  id: number;
  tournament: string;
  date: string;
  rank: number;
  points: number;
  totalTeams: number;
}

export default function StudentResultsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 500);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (rank === 2) return { icon: '🥈', color: 'text-gray-300', bg: 'bg-gray-500/20' };
    if (rank === 3) return { icon: '🥉', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { icon: `#${rank}`, color: 'text-white/60', bg: 'bg-white/10' };
  };

  const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
  const bestRank = results.length > 0 ? Math.min(...results.map(r => r.rank)) : 0;
  const wins = results.filter(r => r.rank === 1).length;

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
            <div className="text-right">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              Student
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
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Results</h1>
          <p className="text-white/60">View your competition history and achievements</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading results...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
            <p className="text-white/60 mb-6">Compete in tournaments to see your results here</p>
            <Link
              to="/student/competitions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors"
            >
              View Competitions
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-2xl font-bold">{wins}</p>
                <p className="text-white/60 text-sm">Wins</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Medal className="w-8 h-8 text-[#4361ee] mb-3" />
                <p className="text-2xl font-bold">#{bestRank}</p>
                <p className="text-white/60 text-sm">Best Rank</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <p className="text-2xl font-bold">{totalPoints.toLocaleString()}</p>
                <p className="text-white/60 text-sm">Total Points</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-[#f72585] mb-3" />
                <p className="text-2xl font-bold">{results.length}</p>
                <p className="text-white/60 text-sm">Competitions</p>
              </div>
            </div>

            {/* Results List */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Competition History</h2>
              </div>
              <div className="divide-y divide-white/5">
                {results.map((result) => {
                  const badge = getRankBadge(result.rank);
                  return (
                    <div key={result.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className={`w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center text-xl`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{result.tournament}</h3>
                        <p className="text-white/60 text-sm">
                          {new Date(result.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${badge.color}`}>
                          Rank #{result.rank}
                        </p>
                        <p className="text-white/60 text-sm">of {result.totalTeams} teams</p>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-[#4361ee]">{result.points}</p>
                        <p className="text-white/60 text-sm">points</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* View Leaderboard Link */}
            <div className="text-center">
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 text-[#4361ee] hover:text-[#4361ee]/80 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                View Global Leaderboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
