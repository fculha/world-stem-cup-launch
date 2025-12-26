import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, BarChart3, Medal, TrendingUp, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getTeams, getMatches, Team, Match } from '../../lib/api';

interface TeamResult {
  team: Team;
  matches: Match[];
  wins: number;
  losses: number;
  totalPoints: number;
}

export default function TeacherResultsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<TeamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      const teamsResponse = await getTeams();
      const teams = teamsResponse.teams || [];
      
      // For each team, get their matches and calculate results
      const teamResults: TeamResult[] = await Promise.all(
        teams.map(async (team) => {
          try {
            const matchesResponse = await getMatches({ team_id: team.id });
            const matches = matchesResponse.matches || [];
            
            const wins = matches.filter(m => m.winner_id === team.id).length;
            const losses = matches.filter(m => m.winner_id && m.winner_id !== team.id).length;
            const totalPoints = matches.reduce((sum, m) => {
              if (m.team1_id === team.id) return sum + (m.team1_score || 0);
              if (m.team2_id === team.id) return sum + (m.team2_score || 0);
              return sum;
            }, 0);
            
            return { team, matches, wins, losses, totalPoints };
          } catch {
            return { team, matches: [], wins: 0, losses: 0, totalPoints: 0 };
          }
        })
      );
      
      setResults(teamResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <div className="text-right">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              Teacher
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
          <h1 className="text-3xl font-bold mb-2">Competition Results</h1>
          <p className="text-white/60">View your teams' performance and rankings</p>
        </div>

        {/* Results */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading results...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadResults}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
            <p className="text-white/60">Results will appear here after your teams compete</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-white/60">Total Wins</span>
                </div>
                <p className="text-3xl font-bold">{results.reduce((sum, r) => sum + r.wins, 0)}</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <span className="text-white/60">Total Points</span>
                </div>
                <p className="text-3xl font-bold">{results.reduce((sum, r) => sum + r.totalPoints, 0)}</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Medal className="w-6 h-6 text-[#4361ee]" />
                  <span className="text-white/60">Matches Played</span>
                </div>
                <p className="text-3xl font-bold">{results.reduce((sum, r) => sum + r.matches.length, 0)}</p>
              </div>
            </div>

            {/* Team Results Table */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Team Performance</h2>
              </div>
              <table className="w-full">
                <thead className="bg-[#0a0a1a]/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Team</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Matches</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Wins</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Losses</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Points</th>
                    <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map((result) => {
                    const winRate = result.matches.length > 0 
                      ? Math.round((result.wins / result.matches.length) * 100) 
                      : 0;
                    return (
                      <tr key={result.team.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-semibold">
                              {result.team.name[0]}
                            </div>
                            <span className="font-medium">{result.team.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">{result.matches.length}</td>
                        <td className="px-6 py-4 text-center text-green-400">{result.wins}</td>
                        <td className="px-6 py-4 text-center text-red-400">{result.losses}</td>
                        <td className="px-6 py-4 text-center font-semibold">{result.totalPoints}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#4361ee] to-[#f72585]"
                                style={{ width: `${winRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-white/60">{winRate}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
