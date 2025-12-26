import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Users, Award, Calendar, XCircle, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getTeam, Team } from '../../lib/api';

export default function StudentTeamPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [teammates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      // In production, this would get the team from the user's team_id
      // For now, we'll show a placeholder if no team is assigned
      if (user?.team_id) {
        const teamData = await getTeam(user.team_id);
        setTeam(teamData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team');
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
          <h1 className="text-3xl font-bold mb-2">My Team</h1>
          <p className="text-white/60">View your team details and teammates</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading team...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadTeamData}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : !team ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Not Assigned to a Team</h3>
            <p className="text-white/60 mb-6">Ask your teacher to add you to a team to start competing</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Team Card */}
            <div className="bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-xl p-8 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center">
                  <Award className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
                  <div className="flex items-center gap-4 text-white/60">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Season {team.season_id}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${team.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                      {team.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-white/60 text-sm">Team Rank</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Users className="w-8 h-8 text-[#4361ee] mb-3" />
                <p className="text-2xl font-bold">{teammates.length || '--'}</p>
                <p className="text-white/60 text-sm">Teammates</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-[#f72585] mb-3" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-white/60 text-sm">Total Points</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Calendar className="w-8 h-8 text-green-400 mb-3" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-white/60 text-sm">Matches Played</p>
              </div>
            </div>

            {/* Teammates */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Teammates</h2>
              </div>
              {teammates.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No teammates yet</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {teammates.map((teammate, index) => (
                    <div key={index} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-semibold">
                        {teammate.first_name?.[0]}{teammate.last_name?.[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{teammate.first_name} {teammate.last_name}</p>
                        <p className="text-white/60 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {teammate.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
