import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, ArrowLeft, Users, Target, Award, Calendar, ChevronRight } from 'lucide-react';

// Types
interface GroupTeam {
  id: number;
  team_name: string;
  school_name: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  total_score: number;
}

interface Group {
  id: number;
  name: string;
  teams: GroupTeam[];
}

interface StateInfo {
  code: string;
  name: string;
  teams: number;
  schools: number;
  students: number;
  status: 'active' | 'upcoming' | 'completed';
}

// Mock data
const stateData: Record<string, StateInfo> = {
  'MD': { code: 'MD', name: 'Maryland', teams: 24, schools: 18, students: 96, status: 'active' },
  'VA': { code: 'VA', name: 'Virginia', teams: 18, schools: 12, students: 72, status: 'upcoming' },
  'CA': { code: 'CA', name: 'California', teams: 32, schools: 22, students: 128, status: 'upcoming' },
  'TX': { code: 'TX', name: 'Texas', teams: 28, schools: 19, students: 112, status: 'upcoming' },
  'NY': { code: 'NY', name: 'New York', teams: 22, schools: 15, students: 88, status: 'upcoming' },
};

const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Group A',
    teams: [
      { id: 1, team_name: 'Quantum Minds', school_name: 'Montgomery Blair HS', points: 9, wins: 3, losses: 0, draws: 0, total_score: 2450 },
      { id: 2, team_name: 'Binary Stars', school_name: 'Thomas Jefferson HS', points: 6, wins: 2, losses: 1, draws: 0, total_score: 2180 },
      { id: 3, team_name: 'Code Breakers', school_name: 'Bethesda-Chevy Chase HS', points: 3, wins: 1, losses: 2, draws: 0, total_score: 1890 },
      { id: 4, team_name: 'Logic Lords', school_name: 'Poolesville HS', points: 0, wins: 0, losses: 3, draws: 0, total_score: 1520 },
    ],
  },
  {
    id: 2,
    name: 'Group B',
    teams: [
      { id: 5, team_name: 'Neural Network', school_name: 'Walt Whitman HS', points: 9, wins: 3, losses: 0, draws: 0, total_score: 2380 },
      { id: 6, team_name: 'Data Dragons', school_name: 'Richard Montgomery HS', points: 4, wins: 1, losses: 1, draws: 1, total_score: 2050 },
      { id: 7, team_name: 'Cyber Squad', school_name: 'Winston Churchill HS', points: 4, wins: 1, losses: 1, draws: 1, total_score: 1980 },
      { id: 8, team_name: 'Tech Titans', school_name: 'Sherwood HS', points: 0, wins: 0, losses: 3, draws: 0, total_score: 1450 },
    ],
  },
];

const mockMatches = [
  { id: 1, team1: 'Quantum Minds', team2: 'Binary Stars', score1: 450, score2: 380, status: 'completed', round: 'Group A' },
  { id: 2, team1: 'Neural Network', team2: 'Data Dragons', score1: 520, score2: 490, status: 'completed', round: 'Group B' },
  { id: 3, team1: 'Quantum Minds', team2: 'Neural Network', status: 'scheduled', round: 'Semifinals', time: '2:00 PM EST' },
  { id: 4, team1: 'Binary Stars', team2: 'Data Dragons', status: 'scheduled', round: 'Semifinals', time: '4:00 PM EST' },
];

export default function StatePage() {
  const { stateCode } = useParams<{ stateCode: string }>();
  const [stateInfo, setStateInfo] = useState<StateInfo | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'matches' | 'teams'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load state data
    const code = stateCode?.toUpperCase() || 'MD';
    setStateInfo(stateData[code] || stateData['MD']);
    setGroups(mockGroups);
    setLoading(false);
  }, [stateCode]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">Live Competition</span>;
      case 'upcoming':
        return <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">Coming Soon</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/60 border border-white/20">Completed</span>;
      default:
        return null;
    }
  };

  if (loading || !stateInfo) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full"></div>
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

      {/* Navigation */}
      <nav className="relative z-10 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">World STEM Cup</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/world" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
              Overview
            </Link>
            <Link to="/leaderboard" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
              Standings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/world" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to World Overview
        </Link>

        {/* State Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center text-3xl font-bold shadow-lg">
              {stateInfo.code}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{stateInfo.name}</h1>
                {getStatusBadge(stateInfo.status)}
              </div>
              <p className="text-white/60">State-level STEM Competition - Top teams advance to Nationals</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-[#4361ee] mx-auto mb-2" />
              <p className="text-2xl font-bold">{stateInfo.teams}</p>
              <p className="text-white/60 text-sm">Teams</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-[#f72585] mx-auto mb-2" />
              <p className="text-2xl font-bold">{stateInfo.schools}</p>
              <p className="text-white/60 text-sm">Schools</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stateInfo.students}</p>
              <p className="text-white/60 text-sm">Students</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{groups.length}</p>
              <p className="text-white/60 text-sm">Groups</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['overview', 'groups', 'matches', 'teams'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#4361ee] text-white'
                  : 'bg-[#16213e] text-white/60 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Groups Preview */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-lg">Group Standings</h2>
                <button onClick={() => setActiveTab('groups')} className="text-sm text-[#4361ee] hover:underline">
                  View All
                </button>
              </div>
              <div className="p-4 space-y-4">
                {groups.slice(0, 2).map((group) => (
                  <Link
                    key={group.id}
                    to={`/group/${group.id}`}
                    className="block bg-[#0a0a1a]/50 rounded-lg p-4 hover:bg-[#0a0a1a] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{group.name}</h3>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="space-y-2">
                      {group.teams.slice(0, 2).map((team, idx) => (
                        <div key={team.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              idx === 0 ? 'bg-green-500/20 text-green-400' : 'bg-green-500/10 text-green-400/70'
                            }`}>
                              {idx + 1}
                            </span>
                            <span>{team.team_name}</span>
                          </div>
                          <span className="text-white/60">{team.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-lg">Recent Matches</h2>
                <button onClick={() => setActiveTab('matches')} className="text-sm text-[#4361ee] hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {mockMatches.slice(0, 4).map((match) => (
                  <Link
                    key={match.id}
                    to={`/match/${match.id}`}
                    className="block px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#f72585]">{match.round}</span>
                      {match.status === 'completed' ? (
                        <span className="text-xs text-green-400">Final</span>
                      ) : (
                        <span className="text-xs text-blue-400">{match.time}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{match.team1}</span>
                          {match.score1 !== undefined && (
                            <span className={`font-bold ${match.score1 > (match.score2 || 0) ? 'text-green-400' : ''}`}>
                              {match.score1}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-medium">{match.team2}</span>
                          {match.score2 !== undefined && (
                            <span className={`font-bold ${match.score2 > (match.score1 || 0) ? 'text-green-400' : ''}`}>
                              {match.score2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
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
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">D</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">L</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">Pts</th>
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
                        <td className="px-4 py-3 text-center text-yellow-400 text-sm">{team.draws}</td>
                        <td className="px-4 py-3 text-center text-red-400 text-sm">{team.losses}</td>
                        <td className="px-4 py-3 text-center font-bold text-sm">{team.points}</td>
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
        )}

        {activeTab === 'matches' && (
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <div className="divide-y divide-white/5">
              {mockMatches.map((match) => (
                <Link
                  key={match.id}
                  to={`/match/${match.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[80px]">
                      <span className="text-xs text-[#f72585] font-medium">{match.round}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="font-medium min-w-[150px]">{match.team1}</span>
                        {match.score1 !== undefined ? (
                          <span className={`font-bold text-lg ${match.score1 > (match.score2 || 0) ? 'text-green-400' : ''}`}>
                            {match.score1}
                          </span>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="font-medium min-w-[150px]">{match.team2}</span>
                        {match.score2 !== undefined ? (
                          <span className={`font-bold text-lg ${match.score2 > (match.score1 || 0) ? 'text-green-400' : ''}`}>
                            {match.score2}
                          </span>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {match.status === 'completed' ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Final</span>
                    ) : (
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Scheduled</span>
                        <p className="text-xs text-white/40 mt-1">{match.time}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/60">#</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/60">Team</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/60">School</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-white/60">Group</th>
                  <th className="text-center px-6 py-4 text-xs font-medium text-white/60">W-D-L</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-white/60">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {groups.flatMap((group) => 
                  group.teams.map((team) => ({
                    ...team,
                    groupName: group.name,
                    globalRank: groups.flatMap(g => g.teams).sort((a, b) => b.points - a.points).findIndex(t => t.id === team.id) + 1
                  }))
                ).sort((a, b) => b.points - a.points).map((team) => (
                  <tr key={team.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        team.globalRank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                        team.globalRank === 2 ? 'bg-gray-400/20 text-gray-300' :
                        team.globalRank === 3 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-white/10 text-white/60'
                      }`}>
                        {team.globalRank}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{team.team_name}</td>
                    <td className="px-6 py-4 text-white/60">{team.school_name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 rounded bg-[#4361ee]/20 text-[#4361ee] text-xs">{team.groupName}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span className="text-green-400">{team.wins}</span>
                      <span className="text-white/40">-</span>
                      <span className="text-yellow-400">{team.draws}</span>
                      <span className="text-white/40">-</span>
                      <span className="text-red-400">{team.losses}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[#4361ee]">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
