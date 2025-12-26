import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, Users, ArrowLeft, Plus, Award, Calendar, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getTeams, getSeasons, createTeam, Team, Season } from '../../lib/api';

export default function TeacherTeamsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Filter teams by the teacher's school
      const teamParams: { school_id?: number } = {};
      if (user?.school_id) {
        teamParams.school_id = user.school_id;
      }
      const [teamsResponse, seasonsResponse] = await Promise.all([
        getTeams(teamParams),
        getSeasons(),
      ]);
      setTeams(teamsResponse.teams || []);
      setSeasons(seasonsResponse.seasons || []);
      if (seasonsResponse.seasons?.length > 0) {
        const activeSeason = seasonsResponse.seasons.find(s => s.is_active);
        setSelectedSeason(activeSeason?.id || seasonsResponse.seasons[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim() || !selectedSeason || !user?.school_id) return;
    
    try {
      setCreating(true);
      await createTeam({
        name: newTeamName,
        school_id: user.school_id,
        season_id: selectedSeason,
      });
      setNewTeamName('');
      setShowCreateModal(false);
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
    } finally {
      setCreating(false);
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Teams</h1>
            <p className="text-white/60">Create and manage your competition teams</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Team
          </button>
        </div>

        {/* Teams Grid */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading teams...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : teams.length === 0 ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <Award className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Teams Yet</h3>
            <p className="text-white/60 mb-6">Create your first team to start competing</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Team
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-[#16213e] rounded-xl p-6 border border-white/10 hover:border-[#4361ee]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${team.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                    {team.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>0 members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Season {team.season_id}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to={`/teacher/teams/${team.id}`}
                    className="text-[#4361ee] hover:text-[#4361ee]/80 text-sm font-medium"
                  >
                    Manage Team →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#16213e] rounded-xl p-6 w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4">Create New Team</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Team Name</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full px-4 py-2 rounded-lg bg-[#0a0a1a] border border-white/10 focus:border-[#4361ee] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Season</label>
                <select
                  value={selectedSeason || ''}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-[#0a0a1a] border border-white/10 focus:border-[#4361ee] focus:outline-none"
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name} ({season.year})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                disabled={creating || !newTeamName.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Team'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
