import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, Users, School, ChevronRight, Award, Target, Calendar, MapPin } from 'lucide-react';

interface TeamMember {
  id: number;
  displayName: string; // Privacy-safe: "John D." format
  role: 'captain' | 'member';
  joinedAt: string;
}

interface TeamMatch {
  id: number;
  opponent: string;
  opponentSchool: string;
  score: number;
  opponentScore: number;
  result: 'win' | 'loss' | 'draw';
  round: string;
  date: string;
}

interface TeamData {
  id: number;
  name: string;
  school: {
    name: string;
    city: string;
    state: string;
  };
  tournament: string;
  group: string;
  groupId: number;
  stats: {
    rank: number;
    points: number;
    wins: number;
    losses: number;
    draws: number;
    totalScore: number;
    matchesPlayed: number;
  };
  members: TeamMember[];
  recentMatches: TeamMatch[];
}

// Mock data with privacy-safe student names
const mockTeamData: Record<string, TeamData> = {
  '1': {
    id: 1,
    name: 'Quantum Minds',
    school: {
      name: 'Montgomery Blair High School',
      city: 'Silver Spring',
      state: 'MD',
    },
    tournament: 'Maryland State Championship 2025',
    group: 'Group A',
    groupId: 1,
    stats: {
      rank: 1,
      points: 9,
      wins: 3,
      losses: 0,
      draws: 0,
      totalScore: 2450,
      matchesPlayed: 3,
    },
    members: [
      { id: 1, displayName: 'James W.', role: 'captain', joinedAt: 'Dec 2024' },
      { id: 2, displayName: 'Sarah M.', role: 'member', joinedAt: 'Dec 2024' },
      { id: 3, displayName: 'Michael C.', role: 'member', joinedAt: 'Dec 2024' },
      { id: 4, displayName: 'Emily R.', role: 'member', joinedAt: 'Dec 2024' },
    ],
    recentMatches: [
      { id: 5, opponent: 'Binary Stars', opponentSchool: 'Thomas Jefferson HS', score: 420, opponentScore: 370, result: 'win', round: 'Group A', date: 'Jan 14' },
      { id: 3, opponent: 'Code Breakers', opponentSchool: 'Bethesda-Chevy Chase HS', score: 480, opponentScore: 350, result: 'win', round: 'Group A', date: 'Jan 12' },
      { id: 1, opponent: 'Logic Lords', opponentSchool: 'Poolesville HS', score: 450, opponentScore: 280, result: 'win', round: 'Group A', date: 'Jan 10' },
    ],
  },
  '5': {
    id: 5,
    name: 'Neural Network',
    school: {
      name: 'Walt Whitman High School',
      city: 'Bethesda',
      state: 'MD',
    },
    tournament: 'Maryland State Championship 2025',
    group: 'Group B',
    groupId: 2,
    stats: {
      rank: 1,
      points: 9,
      wins: 3,
      losses: 0,
      draws: 0,
      totalScore: 2380,
      matchesPlayed: 3,
    },
    members: [
      { id: 5, displayName: 'Alex T.', role: 'captain', joinedAt: 'Dec 2024' },
      { id: 6, displayName: 'Jessica L.', role: 'member', joinedAt: 'Dec 2024' },
      { id: 7, displayName: 'David K.', role: 'member', joinedAt: 'Dec 2024' },
      { id: 8, displayName: 'Amanda P.', role: 'member', joinedAt: 'Dec 2024' },
    ],
    recentMatches: [
      { id: 11, opponent: 'Data Dragons', opponentSchool: 'Richard Montgomery HS', score: 450, opponentScore: 300, result: 'win', round: 'Group B', date: 'Jan 14' },
      { id: 9, opponent: 'Cyber Squad', opponentSchool: 'Winston Churchill HS', score: 450, opponentScore: 320, result: 'win', round: 'Group B', date: 'Jan 12' },
      { id: 7, opponent: 'Tech Titans', opponentSchool: 'Sherwood HS', score: 520, opponentScore: 280, result: 'win', round: 'Group B', date: 'Jan 10' },
    ],
  },
};

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = teamId || '1';
    setTeamData(mockTeamData[id] || mockTeamData['1']);
    setLoading(false);
  }, [teamId]);

  if (loading || !teamData) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">W</span>;
      case 'loss':
        return <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">L</span>;
      case 'draw':
        return <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">D</span>;
      default:
        return null;
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
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link to="/world" className="hover:text-white transition-colors">World</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/state/${teamData.school.state}`} className="hover:text-white transition-colors">{teamData.school.state}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/group/${teamData.groupId}`} className="hover:text-white transition-colors">{teamData.group}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{teamData.name}</span>
        </div>

        {/* Team Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Team Logo/Initial */}
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center text-3xl font-bold shadow-lg shadow-[#4361ee]/30">
              {teamData.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{teamData.name}</h1>
                {teamData.stats.rank <= 2 && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">
                    Qualified
                  </span>
                )}
              </div>
              
              {/* School Info */}
              <div className="flex items-center gap-2 text-white/70 mb-4">
                <School className="w-5 h-5" />
                <span>{teamData.school.name}</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{teamData.school.city}, {teamData.school.state}</span>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
                teamData.stats.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/50' :
                teamData.stats.rank === 2 ? 'bg-gray-400/20 text-gray-300 border-2 border-gray-400/50' :
                teamData.stats.rank === 3 ? 'bg-orange-500/20 text-orange-400 border-2 border-orange-500/50' :
                'bg-white/10 text-white/60 border-2 border-white/20'
              }`}>
                #{teamData.stats.rank}
              </div>
              <p className="text-white/50 text-sm mt-2">Group Rank</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#4361ee]">{teamData.stats.points}</p>
              <p className="text-white/60 text-sm">Points</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{teamData.stats.wins}</p>
              <p className="text-white/60 text-sm">Wins</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">{teamData.stats.draws}</p>
              <p className="text-white/60 text-sm">Draws</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-400">{teamData.stats.losses}</p>
              <p className="text-white/60 text-sm">Losses</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{teamData.stats.totalScore.toLocaleString()}</p>
              <p className="text-white/60 text-sm">Total Score</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Roster */}
          <div className="lg:col-span-1">
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4361ee]" />
                  Team Roster
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {teamData.members.map((member) => (
                  <div key={member.id} className="px-6 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      member.role === 'captain' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                        : 'bg-[#4361ee]/20 text-[#4361ee]'
                    }`}>
                      {member.displayName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{member.displayName}</p>
                      <p className="text-white/50 text-xs">
                        {member.role === 'captain' ? 'Team Captain' : 'Team Member'}
                      </p>
                    </div>
                    {member.role === 'captain' && (
                      <Award className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-[#0a0a1a]/30 text-xs text-white/40">
                Student names shown as first name + last initial for privacy
              </div>
            </div>

            {/* Tournament Info */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mt-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#f72585]" />
                Tournament
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Competition</span>
                  <span>{teamData.tournament}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Group</span>
                  <Link to={`/group/${teamData.groupId}`} className="text-[#4361ee] hover:underline">
                    {teamData.group}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Matches Played</span>
                  <span>{teamData.stats.matchesPlayed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Matches */}
          <div className="lg:col-span-2">
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f72585]" />
                  Recent Matches
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {teamData.recentMatches.map((match) => (
                  <Link
                    key={match.id}
                    to={`/match/${match.id}`}
                    className="block px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#f72585]">{match.round}</span>
                      <span className="text-xs text-white/40">{match.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="font-medium">{teamData.name}</p>
                            <p className="text-white/40 text-xs">{teamData.school.name}</p>
                          </div>
                          <span className={`text-xl font-bold ${match.result === 'win' ? 'text-green-400' : ''}`}>
                            {match.score}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex-1">
                            <p className="font-medium text-white/70">{match.opponent}</p>
                            <p className="text-white/40 text-xs">{match.opponentSchool}</p>
                          </div>
                          <span className={`text-xl font-bold ${match.result === 'loss' ? 'text-green-400' : 'text-white/70'}`}>
                            {match.opponentScore}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {getResultBadge(match.result)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="px-6 py-3 bg-[#0a0a1a]/30">
                <Link to={`/group/${teamData.groupId}`} className="text-sm text-[#4361ee] hover:underline flex items-center gap-1">
                  View All Group Matches <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
