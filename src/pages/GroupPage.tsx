import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, ArrowLeft, Users, Calendar, ChevronRight } from 'lucide-react';

interface GroupTeam {
  id: number;
  team_name: string;
  school_name: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  total_score: number;
  goals_for: number;
  goals_against: number;
}

interface GroupMatch {
  id: number;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  status: 'completed' | 'scheduled' | 'live';
  date: string;
  time?: string;
}

interface GroupData {
  id: number;
  name: string;
  tournament: string;
  state: string;
  teams: GroupTeam[];
  matches: GroupMatch[];
}

const mockGroupData: Record<string, GroupData> = {
  '1': {
    id: 1,
    name: 'Group A',
    tournament: 'Maryland State Qualifier',
    state: 'MD',
    teams: [
      { id: 1, team_name: 'Quantum Minds', school_name: 'Montgomery Blair HS', points: 9, wins: 3, losses: 0, draws: 0, total_score: 2450, goals_for: 1350, goals_against: 980 },
      { id: 2, team_name: 'Binary Stars', school_name: 'Thomas Jefferson HS', points: 6, wins: 2, losses: 1, draws: 0, total_score: 2180, goals_for: 1180, goals_against: 1050 },
      { id: 3, team_name: 'Code Breakers', school_name: 'Bethesda-Chevy Chase HS', points: 3, wins: 1, losses: 2, draws: 0, total_score: 1890, goals_for: 1020, goals_against: 1150 },
      { id: 4, team_name: 'Logic Lords', school_name: 'Poolesville HS', points: 0, wins: 0, losses: 3, draws: 0, total_score: 1520, goals_for: 850, goals_against: 1220 },
    ],
    matches: [
      { id: 1, team1: 'Quantum Minds', team2: 'Logic Lords', score1: 450, score2: 280, status: 'completed', date: 'Jan 10' },
      { id: 2, team1: 'Binary Stars', team2: 'Code Breakers', score1: 420, score2: 380, status: 'completed', date: 'Jan 10' },
      { id: 3, team1: 'Quantum Minds', team2: 'Code Breakers', score1: 480, score2: 350, status: 'completed', date: 'Jan 12' },
      { id: 4, team1: 'Binary Stars', team2: 'Logic Lords', score1: 390, score2: 310, status: 'completed', date: 'Jan 12' },
      { id: 5, team1: 'Quantum Minds', team2: 'Binary Stars', score1: 420, score2: 370, status: 'completed', date: 'Jan 14' },
      { id: 6, team1: 'Code Breakers', team2: 'Logic Lords', score1: 290, score2: 260, status: 'completed', date: 'Jan 14' },
    ],
  },
  '2': {
    id: 2,
    name: 'Group B',
    tournament: 'Maryland State Qualifier',
    state: 'MD',
    teams: [
      { id: 5, team_name: 'Neural Network', school_name: 'Walt Whitman HS', points: 9, wins: 3, losses: 0, draws: 0, total_score: 2380, goals_for: 1420, goals_against: 920 },
      { id: 6, team_name: 'Data Dragons', school_name: 'Richard Montgomery HS', points: 4, wins: 1, losses: 1, draws: 1, total_score: 2050, goals_for: 1100, goals_against: 1080 },
      { id: 7, team_name: 'Cyber Squad', school_name: 'Winston Churchill HS', points: 4, wins: 1, losses: 1, draws: 1, total_score: 1980, goals_for: 1050, goals_against: 1100 },
      { id: 8, team_name: 'Tech Titans', school_name: 'Sherwood HS', points: 0, wins: 0, losses: 3, draws: 0, total_score: 1450, goals_for: 780, goals_against: 1250 },
    ],
    matches: [
      { id: 7, team1: 'Neural Network', team2: 'Tech Titans', score1: 520, score2: 280, status: 'completed', date: 'Jan 10' },
      { id: 8, team1: 'Data Dragons', team2: 'Cyber Squad', score1: 380, score2: 380, status: 'completed', date: 'Jan 10' },
      { id: 9, team1: 'Neural Network', team2: 'Cyber Squad', score1: 450, score2: 320, status: 'completed', date: 'Jan 12' },
      { id: 10, team1: 'Data Dragons', team2: 'Tech Titans', score1: 420, score2: 250, status: 'completed', date: 'Jan 12' },
      { id: 11, team1: 'Neural Network', team2: 'Data Dragons', score1: 450, score2: 300, status: 'completed', date: 'Jan 14' },
      { id: 12, team1: 'Cyber Squad', team2: 'Tech Titans', score1: 350, score2: 250, status: 'completed', date: 'Jan 14' },
    ],
  },
};

export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = groupId || '1';
    setGroupData(mockGroupData[id] || mockGroupData['1']);
    setLoading(false);
  }, [groupId]);

  if (loading || !groupData) {
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link to="/world" className="hover:text-white transition-colors">World</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/state/${groupData.state}`} className="hover:text-white transition-colors">{groupData.state}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{groupData.name}</span>
        </div>

        {/* Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center text-xl font-bold">
              {groupData.name.split(' ')[1]}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{groupData.name}</h1>
              <p className="text-white/60">{groupData.tournament}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Standings */}
          <div className="lg:col-span-2">
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4361ee]" />
                  Standings
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0a0a1a]/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">#</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">Team</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">P</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">W</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">D</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">L</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">GF</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">GA</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">GD</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {groupData.teams.map((team, index) => (
                      <tr 
                        key={team.id} 
                        className={`hover:bg-white/5 transition-colors ${index < 2 ? 'bg-green-500/5' : ''}`}
                      >
                        <td className="px-4 py-4">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < 2 ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">{team.team_name}</p>
                            <p className="text-white/40 text-xs">{team.school_name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm">{team.wins + team.draws + team.losses}</td>
                        <td className="px-4 py-4 text-center text-green-400 text-sm">{team.wins}</td>
                        <td className="px-4 py-4 text-center text-yellow-400 text-sm">{team.draws}</td>
                        <td className="px-4 py-4 text-center text-red-400 text-sm">{team.losses}</td>
                        <td className="px-4 py-4 text-center text-sm">{team.goals_for}</td>
                        <td className="px-4 py-4 text-center text-sm">{team.goals_against}</td>
                        <td className="px-4 py-4 text-center text-sm">
                          <span className={team.goals_for - team.goals_against > 0 ? 'text-green-400' : team.goals_for - team.goals_against < 0 ? 'text-red-400' : ''}>
                            {team.goals_for - team.goals_against > 0 ? '+' : ''}{team.goals_for - team.goals_against}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center font-bold">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-[#0a0a1a]/30 text-xs text-white/40 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                  <span>Advances to Playoffs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Matches */}
          <div>
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f72585]" />
                  Matches
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {groupData.matches.map((match) => (
                  <Link
                    key={match.id}
                    to={`/match/${match.id}`}
                    className="block px-4 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/40">{match.date}</span>
                      {match.status === 'completed' && (
                        <span className="text-xs text-green-400">FT</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${match.score1 !== undefined && match.score2 !== undefined && match.score1 > match.score2 ? 'font-bold' : ''}`}>
                          {match.team1}
                        </span>
                        <span className={`font-bold ${match.score1 !== undefined && match.score2 !== undefined && match.score1 > match.score2 ? 'text-green-400' : ''}`}>
                          {match.score1}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${match.score1 !== undefined && match.score2 !== undefined && match.score2 > match.score1 ? 'font-bold' : ''}`}>
                          {match.team2}
                        </span>
                        <span className={`font-bold ${match.score1 !== undefined && match.score2 !== undefined && match.score2 > match.score1 ? 'text-green-400' : ''}`}>
                          {match.score2}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
