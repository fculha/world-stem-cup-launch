import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, ArrowLeft, Users, Target, Award, ChevronRight, AlertTriangle, Settings, RefreshCw } from 'lucide-react';
import { getTournamentGroups, getTournamentBracket, getTournament, TournamentGroup, PlayoffRound, generateGroups, generatePlayoffs, resetTournament } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

// Mock data for when API returns empty
const mockGroups: TournamentGroup[] = [
  {
    id: 1,
    tournament_id: 1,
    name: 'Group A',
    group_number: 1,
    teams: [
      { id: 1, group_id: 1, team_id: 1, team_name: 'Quantum Minds', school_name: 'Montgomery Blair HS', seed: 1, points: 6, wins: 2, losses: 0, draws: 0, total_score: 850 },
      { id: 2, group_id: 1, team_id: 2, team_name: 'Binary Stars', school_name: 'Thomas Jefferson HS', seed: 2, points: 3, wins: 1, losses: 1, draws: 0, total_score: 720 },
      { id: 3, group_id: 1, team_id: 3, team_name: 'Code Breakers', school_name: 'Bethesda-Chevy Chase HS', seed: 3, points: 0, wins: 0, losses: 2, draws: 0, total_score: 580 },
    ],
  },
  {
    id: 2,
    tournament_id: 1,
    name: 'Group B',
    group_number: 2,
    teams: [
      { id: 4, group_id: 2, team_id: 4, team_name: 'Neural Network', school_name: 'Walt Whitman HS', seed: 1, points: 6, wins: 2, losses: 0, draws: 0, total_score: 890 },
      { id: 5, group_id: 2, team_id: 5, team_name: 'Data Dragons', school_name: 'Richard Montgomery HS', seed: 2, points: 3, wins: 1, losses: 1, draws: 0, total_score: 680 },
      { id: 6, group_id: 2, team_id: 6, team_name: 'Logic Lords', school_name: 'Poolesville HS', seed: 3, points: 0, wins: 0, losses: 2, draws: 0, total_score: 520 },
    ],
  },
];

const mockBracket: PlayoffRound[] = [
  {
    round_name: 'Quarterfinals',
    matches: [
      { id: 1, round_name: 'Quarterfinals', match_number: 1, team1_name: 'Quantum Minds', team2_name: 'Data Dragons', team1_score: 450, team2_score: 380, winner_name: 'Quantum Minds', status: 'COMPLETED' },
      { id: 2, round_name: 'Quarterfinals', match_number: 2, team1_name: 'Neural Network', team2_name: 'Binary Stars', team1_score: 520, team2_score: 490, winner_name: 'Neural Network', status: 'COMPLETED' },
    ],
  },
  {
    round_name: 'Semifinals',
    matches: [
      { id: 3, round_name: 'Semifinals', match_number: 1, team1_name: 'Quantum Minds', team2_name: 'Neural Network', status: 'SCHEDULED' },
    ],
  },
  {
    round_name: 'Final',
    matches: [
      { id: 4, round_name: 'Final', match_number: 1, status: 'PENDING' },
    ],
  },
];

export default function StateQualifierPage() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'groups' | 'bracket'>('groups');
  const [groups, setGroups] = useState<TournamentGroup[]>([]);
  const [bracket, setBracket] = useState<PlayoffRound[]>([]);
  const [tournamentName, setTournamentName] = useState('Maryland State Qualifier');
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Check if user is admin or NSC
  const isAdminOrNSC = user?.role === 'ADMIN' || user?.role === 'NSC';
  const isDemoMode = tournamentName.toLowerCase().includes('maryland');

  useEffect(() => {
    loadData();
  }, [tournamentId]);

  const handleGenerateGroups = async () => {
    try {
      setAdminLoading(true);
      setAdminMessage(null);
      const id = parseInt(tournamentId || '1');
      const result = await generateGroups(id, 2, 2);
      setAdminMessage({ 
        type: 'success', 
        text: result.already_existed 
          ? 'Groups already exist (idempotent)' 
          : `Created ${result.groups_created} groups with ${result.matches_created} matches`
      });
      await loadData();
    } catch (error) {
      setAdminMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to generate groups' });
    } finally {
      setAdminLoading(false);
    }
  };

  const handleGeneratePlayoffs = async () => {
    try {
      setAdminLoading(true);
      setAdminMessage(null);
      const id = parseInt(tournamentId || '1');
      const result = await generatePlayoffs(id, 2);
      setAdminMessage({ 
        type: 'success', 
        text: result.already_existed 
          ? 'Playoffs already exist (idempotent)' 
          : `Created ${result.playoff_rounds} playoff rounds with ${result.playoff_matches} matches`
      });
      await loadData();
    } catch (error) {
      setAdminMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to generate playoffs' });
    } finally {
      setAdminLoading(false);
    }
  };

  const handleResetTournament = async () => {
    if (!confirm('Are you sure you want to reset this tournament? This will delete all groups, matches, and scores.')) {
      return;
    }
    try {
      setAdminLoading(true);
      setAdminMessage(null);
      const id = parseInt(tournamentId || '1');
      const result = await resetTournament(id, true, true);
      setAdminMessage({ 
        type: 'success', 
        text: `Reset complete: ${result.deleted.groups} groups, ${result.deleted.matches} matches, ${result.deleted.scores} scores deleted`
      });
      await loadData();
    } catch (error) {
      setAdminMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to reset tournament' });
    } finally {
      setAdminLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const id = parseInt(tournamentId || '1');
      
      // Load tournament info
      try {
        const tournament = await getTournament(id);
        setTournamentName(tournament.name);
      } catch {
        // Use default name
      }

      // Load groups
      try {
        const groupsResponse = await getTournamentGroups(id);
        if (groupsResponse.groups && groupsResponse.groups.length > 0) {
          setGroups(groupsResponse.groups);
        } else {
          setGroups(mockGroups);
        }
      } catch {
        setGroups(mockGroups);
      }

      // Load bracket
      try {
        const bracketResponse = await getTournamentBracket(id);
        if (bracketResponse.rounds && bracketResponse.rounds.length > 0) {
          setBracket(bracketResponse.rounds);
        } else {
          setBracket(mockBracket);
        }
      } catch {
        setBracket(mockBracket);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Completed</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Live</span>;
      case 'SCHEDULED':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Scheduled</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60">Pending</span>;
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
          <Link
            to="/leaderboard"
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            Global Leaderboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Maryland Demo Mode Banner */}
        {isDemoMode && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-yellow-400 font-medium">Maryland Pilot Demo Mode</p>
              <p className="text-yellow-400/70 text-sm">This is a demonstration of the Maryland State Pilot Competition system with sample data.</p>
            </div>
          </div>
        )}

        {/* Admin Controls (ADMIN/NSC only) */}
        {isAdminOrNSC && (
          <div className="mb-6 bg-[#16213e] border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-[#4361ee]" />
              <span className="font-medium">Tournament Admin Controls</span>
              <span className="text-xs text-white/40 ml-2">(ADMIN/NSC only)</span>
            </div>
            
            {adminMessage && (
              <div className={`mb-3 p-3 rounded-lg text-sm ${
                adminMessage.type === 'success' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                {adminMessage.text}
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerateGroups}
                disabled={adminLoading}
                className="px-4 py-2 bg-[#4361ee] hover:bg-[#4361ee]/80 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {adminLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                Generate Groups
              </button>
              <button
                onClick={handleGeneratePlayoffs}
                disabled={adminLoading}
                className="px-4 py-2 bg-[#f72585] hover:bg-[#f72585]/80 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {adminLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                Generate Playoffs
              </button>
              <button
                onClick={handleResetTournament}
                disabled={adminLoading}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {adminLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Reset Tournament
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{tournamentName}</h1>
          <p className="text-white/60">State-level competition - Top 4 teams advance to Nationals</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Users className="w-8 h-8 text-[#4361ee] mx-auto mb-3" />
            <p className="text-2xl font-bold">{groups.reduce((sum, g) => sum + g.teams.length, 0)}</p>
            <p className="text-white/60 text-sm">Teams Competing</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Target className="w-8 h-8 text-[#f72585] mx-auto mb-3" />
            <p className="text-2xl font-bold">{groups.length}</p>
            <p className="text-white/60 text-sm">Groups</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-white/60 text-sm">Advancing to Nationals</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'groups'
                ? 'bg-[#4361ee] text-white'
                : 'bg-[#16213e] text-white/60 hover:text-white'
            }`}
          >
            Group Stage
          </button>
          <button
            onClick={() => setActiveTab('bracket')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'bracket'
                ? 'bg-[#4361ee] text-white'
                : 'bg-[#16213e] text-white/60 hover:text-white'
            }`}
          >
            Playoff Bracket
          </button>
        </div>

        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading tournament data...</p>
          </div>
        ) : activeTab === 'groups' ? (
          /* Group Stage View */
          <div className="grid md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-[#0a0a1a]/50">
                  <h3 className="font-bold text-lg">{group.name}</h3>
                </div>
                <table className="w-full">
                  <thead className="bg-[#0a0a1a]/30">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">#</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">Team</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">W</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">L</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">Pts</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-white/60">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {group.teams.map((team, index) => (
                      <tr 
                        key={team.id} 
                        className={`hover:bg-white/5 transition-colors ${index < 2 ? 'bg-green-500/5' : ''}`}
                      >
                        <td className="px-4 py-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < 2 ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">{team.team_name}</p>
                            <p className="text-white/40 text-xs">{team.school_name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-green-400 text-sm">{team.wins}</td>
                        <td className="px-4 py-3 text-center text-red-400 text-sm">{team.losses}</td>
                        <td className="px-4 py-3 text-center font-bold text-sm">{team.points}</td>
                        <td className="px-4 py-3 text-right text-[#4361ee] text-sm">{team.total_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 bg-[#0a0a1a]/30 text-xs text-white/40">
                  Top 2 teams (highlighted) advance to playoffs
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Playoff Bracket View */
          <div className="bg-[#16213e] rounded-xl border border-white/10 p-6">
            <div className="flex gap-8 overflow-x-auto pb-4">
              {bracket.map((round, roundIndex) => (
                <div key={round.round_name} className="flex-shrink-0 min-w-[280px]">
                  <h3 className="font-bold text-lg mb-4 text-center">{round.round_name}</h3>
                  <div className="space-y-4">
                    {round.matches.map((match) => (
                      <div key={match.id} className="bg-[#0a0a1a] rounded-xl border border-white/10 overflow-hidden">
                        <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                          <span className="text-xs text-white/40">Match {match.match_number}</span>
                          {getStatusBadge(match.status)}
                        </div>
                        <div className="divide-y divide-white/5">
                          <div className={`px-4 py-3 flex items-center justify-between ${
                            match.winner_name === match.team1_name ? 'bg-green-500/10' : ''
                          }`}>
                            <div className="flex items-center gap-2">
                              {match.winner_name === match.team1_name && (
                                <ChevronRight className="w-4 h-4 text-green-400" />
                              )}
                              <span className={`text-sm ${match.team1_name ? '' : 'text-white/40'}`}>
                                {match.team1_name || 'TBD'}
                              </span>
                            </div>
                            {match.team1_score !== undefined && (
                              <span className="font-bold">{match.team1_score}</span>
                            )}
                          </div>
                          <div className={`px-4 py-3 flex items-center justify-between ${
                            match.winner_name === match.team2_name ? 'bg-green-500/10' : ''
                          }`}>
                            <div className="flex items-center gap-2">
                              {match.winner_name === match.team2_name && (
                                <ChevronRight className="w-4 h-4 text-green-400" />
                              )}
                              <span className={`text-sm ${match.team2_name ? '' : 'text-white/40'}`}>
                                {match.team2_name || 'TBD'}
                              </span>
                            </div>
                            {match.team2_score !== undefined && (
                              <span className="font-bold">{match.team2_score}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {roundIndex < bracket.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ChevronRight className="w-6 h-6 text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-[#16213e] rounded-xl border border-white/10 p-6">
          <h3 className="font-bold text-lg mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-white/70">
            <div>
              <h4 className="font-semibold text-white mb-2">1. Group Stage</h4>
              <p>Teams are divided into groups. Each team plays 2 matches within their group. Points: Win = 3, Draw = 1, Loss = 0.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">2. Playoffs</h4>
              <p>Top 2 teams from each group advance to single-elimination playoffs. Higher seeds get byes in preliminary rounds.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">3. Nationals</h4>
              <p>Top 4 teams from the state qualifier advance to represent their state at the National Championship.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
