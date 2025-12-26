import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Calendar, Clock, Users, Play, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getTournaments, Tournament } from '../../lib/api';

export default function StudentCompetitionsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const response = await getTournaments();
      setTournaments(response.tournaments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load competitions');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400';
      case 'in_progress':
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-white/10 text-white/60';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <h1 className="text-3xl font-bold mb-2">Competitions</h1>
          <p className="text-white/60">View and join upcoming competitions</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading competitions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadTournaments}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Competitions Available</h3>
            <p className="text-white/60">Check back later for upcoming competitions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active/Live Competitions */}
            {tournaments.filter(t => t.status.toLowerCase() === 'in_progress' || t.status.toLowerCase() === 'active').length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live Now
                </h2>
                <div className="space-y-4">
                  {tournaments
                    .filter(t => t.status.toLowerCase() === 'in_progress' || t.status.toLowerCase() === 'active')
                    .map((tournament) => (
                      <div
                        key={tournament.id}
                        className="bg-gradient-to-r from-green-500/10 to-[#4361ee]/10 rounded-xl p-6 border border-green-500/30"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Started {formatDate(tournament.start_date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {tournament.max_teams || 'Unlimited'} teams
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/student/play/${tournament.id}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-500/80 transition-colors font-semibold"
                          >
                            <Play className="w-5 h-5" />
                            Join Now
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Upcoming Competitions */}
            {tournaments.filter(t => t.status.toLowerCase() === 'upcoming').length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
                <div className="space-y-4">
                  {tournaments
                    .filter(t => t.status.toLowerCase() === 'upcoming')
                    .map((tournament) => (
                      <div
                        key={tournament.id}
                        className="bg-[#16213e] rounded-xl p-6 border border-white/10 hover:border-[#4361ee]/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{tournament.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tournament.status)}`}>
                                Upcoming
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(tournament.start_date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {tournament.max_teams || 'Unlimited'} teams
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-white/40">Starts in</p>
                            <p className="text-lg font-semibold text-[#4361ee]">--</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Past Competitions */}
            {tournaments.filter(t => t.status.toLowerCase() === 'completed').length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white/60">Past Competitions</h2>
                <div className="space-y-4">
                  {tournaments
                    .filter(t => t.status.toLowerCase() === 'completed')
                    .map((tournament) => (
                      <div
                        key={tournament.id}
                        className="bg-[#16213e]/50 rounded-xl p-6 border border-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white/60">{tournament.name}</h3>
                            <p className="text-sm text-white/40">{formatDate(tournament.start_date)}</p>
                          </div>
                          <Link
                            to={`/student/results?tournament=${tournament.id}`}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                          >
                            View Results
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
