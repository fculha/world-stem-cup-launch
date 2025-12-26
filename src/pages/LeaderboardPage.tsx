import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, TrendingUp, Users, Globe, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getLeaderboard } from '../lib/api';

// Fallback mock data when API returns empty
const mockLeaderboard = [
  { rank: 1, team_name: 'Quantum Minds', school_name: 'MIT Academy', country: 'USA', total_points: 4850, matches_played: 12, wins: 10 },
  { rank: 2, team_name: 'Neural Network', school_name: 'Cambridge School', country: 'UK', total_points: 4720, matches_played: 12, wins: 9 },
  { rank: 3, team_name: 'Binary Stars', school_name: 'Tokyo Tech High', country: 'Japan', total_points: 4680, matches_played: 12, wins: 9 },
  { rank: 4, team_name: 'Code Breakers', school_name: 'Berlin STEM Academy', country: 'Germany', total_points: 4520, matches_played: 12, wins: 8 },
  { rank: 5, team_name: 'Infinity Loop', school_name: 'Singapore Science', country: 'Singapore', total_points: 4480, matches_played: 12, wins: 8 },
  { rank: 6, team_name: 'Data Dragons', school_name: 'Seoul Tech', country: 'South Korea', total_points: 4350, matches_played: 12, wins: 7 },
  { rank: 7, team_name: 'Algorithm Aces', school_name: 'Sydney STEM', country: 'Australia', total_points: 4280, matches_played: 12, wins: 7 },
  { rank: 8, team_name: 'Logic Lords', school_name: 'Toronto Academy', country: 'Canada', total_points: 4150, matches_played: 12, wins: 6 },
  { rank: 9, team_name: 'Byte Force', school_name: 'Paris Tech', country: 'France', total_points: 4080, matches_played: 12, wins: 6 },
  { rank: 10, team_name: 'Cyber Scholars', school_name: 'Mumbai Science', country: 'India', total_points: 3950, matches_played: 12, wins: 5 },
];

interface LeaderboardEntry {
  rank: number;
  team_name: string;
  school_name: string;
  country: string;
  total_points: number;
  matches_played: number;
  wins: number;
}

export default function LeaderboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await getLeaderboard();
      // If API returns data, use it; otherwise fall back to mock data
      if (response.leaderboard && response.leaderboard.length > 0) {
        const entries: LeaderboardEntry[] = response.leaderboard.map((entry, index) => ({
          rank: entry.rank || index + 1,
          team_name: entry.team_name,
          school_name: entry.school_name,
          country: 'Global', // API may not have country, default to Global
          total_points: entry.total_points,
          matches_played: entry.matches_played,
          wins: entry.wins,
        }));
        setLeaderboard(entries);
      } else {
        // Use mock data if no real data available
        setLeaderboard(mockLeaderboard);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
      // Fall back to mock data on error
      setLeaderboard(mockLeaderboard);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600', text: 'text-white' };
    if (rank === 2) return { bg: 'bg-gradient-to-br from-gray-300 to-gray-500', text: 'text-white' };
    if (rank === 3) return { bg: 'bg-gradient-to-br from-orange-400 to-orange-600', text: 'text-white' };
    return { bg: 'bg-white/10', text: 'text-white/60' };
  };

  const countries = ['all', ...new Set(mockLeaderboard.map(e => e.country))];

  const filteredLeaderboard = leaderboard.filter(entry => {
    const matchesSearch = entry.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.school_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || entry.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

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
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {isAuthenticated ? 'Back to Dashboard' : 'Back to Home'}
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-white/60">Top performing teams from around the world</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Globe className="w-8 h-8 text-[#4361ee] mx-auto mb-3" />
            <p className="text-2xl font-bold">{countries.length - 1}</p>
            <p className="text-white/60 text-sm">Countries</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Users className="w-8 h-8 text-[#f72585] mx-auto mb-3" />
            <p className="text-2xl font-bold">{leaderboard.length}</p>
            <p className="text-white/60 text-sm">Teams Competing</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">{leaderboard.reduce((sum, e) => sum + e.matches_played, 0)}</p>
            <p className="text-white/60 text-sm">Matches Played</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search teams or schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#16213e] border border-white/10 focus:border-[#4361ee] focus:outline-none"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-3 rounded-xl bg-[#16213e] border border-white/10 focus:border-[#4361ee] focus:outline-none min-w-[200px]"
          >
            <option value="all">All Countries</option>
            {countries.filter(c => c !== 'all').map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            {/* Top 3 Podium */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-end justify-center gap-4">
                {/* 2nd Place */}
                {filteredLeaderboard[1] && (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <p className="font-semibold text-sm">{filteredLeaderboard[1].team_name}</p>
                    <p className="text-white/40 text-xs">{filteredLeaderboard[1].total_points} pts</p>
                  </div>
                )}
                {/* 1st Place */}
                {filteredLeaderboard[0] && (
                  <div className="text-center -mt-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-2 ring-4 ring-yellow-400/30">
                      <span className="text-3xl">🥇</span>
                    </div>
                    <p className="font-bold">{filteredLeaderboard[0].team_name}</p>
                    <p className="text-yellow-400 text-sm">{filteredLeaderboard[0].total_points} pts</p>
                  </div>
                )}
                {/* 3rd Place */}
                {filteredLeaderboard[2] && (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🥉</span>
                    </div>
                    <p className="font-semibold text-sm">{filteredLeaderboard[2].team_name}</p>
                    <p className="text-white/40 text-xs">{filteredLeaderboard[2].total_points} pts</p>
                  </div>
                )}
              </div>
            </div>

            {/* Full Table */}
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Rank</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Team</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">School</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Country</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Matches</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-white/60">Wins</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeaderboard.map((entry) => {
                  const badge = getRankBadge(entry.rank);
                  return (
                    <tr key={entry.rank} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-lg ${badge.bg} flex items-center justify-center font-bold ${badge.text}`}>
                          {entry.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-semibold">
                            {entry.team_name[0]}
                          </div>
                          <span className="font-medium">{entry.team_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/60">{entry.school_name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-white/10">
                          {entry.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">{entry.matches_played}</td>
                      <td className="px-6 py-4 text-center text-green-400">{entry.wins}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-[#4361ee]">{entry.total_points.toLocaleString()}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredLeaderboard.length === 0 && (
              <div className="p-12 text-center">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No teams found matching your search</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
