import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, ChevronRight, Calendar, MapPin } from 'lucide-react';

interface BracketTeam {
  id: number;
  name: string;
  school: string;
  seed: number;
  score?: number;
  isWinner?: boolean;
}

interface BracketMatch {
  id: number;
  round: string;
  roundNumber: number;
  position: number;
  team1?: BracketTeam;
  team2?: BracketTeam;
  status: 'completed' | 'scheduled' | 'live' | 'tbd';
  date?: string;
  time?: string;
}

interface BracketData {
  tournamentId: number;
  tournamentName: string;
  state: string;
  rounds: {
    name: string;
    matches: BracketMatch[];
  }[];
}

// Mock bracket data for Maryland tournament
const mockBracketData: BracketData = {
  tournamentId: 1,
  tournamentName: 'Maryland State Championship 2025',
  state: 'MD',
  rounds: [
    {
      name: 'Semifinals',
      matches: [
        {
          id: 101,
          round: 'Semifinal 1',
          roundNumber: 1,
          position: 1,
          team1: { id: 1, name: 'Quantum Minds', school: 'Montgomery Blair HS', seed: 1, score: 480, isWinner: true },
          team2: { id: 6, name: 'Data Dragons', school: 'Richard Montgomery HS', seed: 4, score: 420 },
          status: 'completed',
          date: 'Jan 15',
          time: '2:00 PM',
        },
        {
          id: 102,
          round: 'Semifinal 2',
          roundNumber: 1,
          position: 2,
          team1: { id: 5, name: 'Neural Network', school: 'Walt Whitman HS', seed: 2, score: 510, isWinner: true },
          team2: { id: 2, name: 'Binary Stars', school: 'Thomas Jefferson HS', seed: 3, score: 450 },
          status: 'completed',
          date: 'Jan 15',
          time: '4:00 PM',
        },
      ],
    },
    {
      name: 'Final',
      matches: [
        {
          id: 103,
          round: 'Final',
          roundNumber: 2,
          position: 1,
          team1: { id: 1, name: 'Quantum Minds', school: 'Montgomery Blair HS', seed: 1 },
          team2: { id: 5, name: 'Neural Network', school: 'Walt Whitman HS', seed: 2 },
          status: 'scheduled',
          date: 'Jan 18',
          time: '3:00 PM',
        },
      ],
    },
  ],
};

// Qualified teams from group stage
const qualifiedTeams = [
  { id: 1, name: 'Quantum Minds', school: 'Montgomery Blair HS', group: 'A', rank: 1, points: 9 },
  { id: 2, name: 'Binary Stars', school: 'Thomas Jefferson HS', group: 'A', rank: 2, points: 6 },
  { id: 5, name: 'Neural Network', school: 'Walt Whitman HS', group: 'B', rank: 1, points: 9 },
  { id: 6, name: 'Data Dragons', school: 'Richard Montgomery HS', group: 'B', rank: 2, points: 4 },
];

export default function BracketPage() {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [bracketData, setBracketData] = useState<BracketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from API
    setBracketData(mockBracketData);
    setLoading(false);
  }, [tournamentId]);

  if (loading || !bracketData) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Final</span>;
      case 'live':
        return <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 animate-pulse">Live</span>;
      case 'scheduled':
        return <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">Upcoming</span>;
      default:
        return <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/40">TBD</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500 rounded-full filter blur-[150px] opacity-30"></div>
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
          <Link to={`/state/${bracketData.state}`} className="hover:text-white transition-colors">{bracketData.state}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Playoffs</span>
        </div>

        {/* Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{bracketData.tournamentName}</h1>
              <div className="flex items-center gap-4 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Playoff Bracket</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>January 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualified Teams */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Qualified Teams (Top 4)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {qualifiedTeams.map((team, idx) => (
              <Link
                key={team.id}
                to={`/team/${team.id}`}
                className="bg-[#0a0a1a]/50 rounded-lg p-4 hover:bg-[#0a0a1a] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    idx === 1 ? 'bg-gray-400/20 text-gray-300' :
                    idx === 2 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs text-white/40">Seed #{idx + 1}</span>
                </div>
                <p className="font-medium text-sm">{team.name}</p>
                <p className="text-white/50 text-xs">{team.school}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-[#4361ee]">Group {team.group}</span>
                  <span className="text-white/40">{team.points} pts</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bracket Visualization */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 overflow-x-auto">
          <h2 className="font-bold text-lg mb-6">Playoff Bracket</h2>
          
          <div className="flex gap-8 min-w-[800px]">
            {bracketData.rounds.map((round, roundIdx) => (
              <div key={round.name} className="flex-1">
                <h3 className="text-center text-sm text-white/60 mb-4 pb-2 border-b border-white/10">
                  {round.name}
                </h3>
                <div className={`flex flex-col gap-8 ${roundIdx > 0 ? 'justify-center h-full' : ''}`}>
                  {round.matches.map((match) => (
                    <Link
                      key={match.id}
                      to={`/match/${match.id}`}
                      className="bg-[#0a0a1a] rounded-lg border border-white/10 overflow-hidden hover:border-[#4361ee]/50 transition-colors"
                    >
                      {/* Match Header */}
                      <div className="px-4 py-2 bg-[#0a0a1a]/80 border-b border-white/5 flex items-center justify-between">
                        <span className="text-xs text-white/40">{match.round}</span>
                        {getStatusBadge(match.status)}
                      </div>
                      
                      {/* Teams */}
                      <div className="divide-y divide-white/5">
                        {/* Team 1 */}
                        <div className={`px-4 py-3 flex items-center justify-between ${
                          match.team1?.isWinner ? 'bg-green-500/5' : ''
                        }`}>
                          {match.team1 ? (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                  {match.team1.seed}
                                </span>
                                <div>
                                  <p className={`text-sm ${match.team1.isWinner ? 'font-bold' : ''}`}>
                                    {match.team1.name}
                                  </p>
                                  <p className="text-white/40 text-xs">{match.team1.school}</p>
                                </div>
                              </div>
                              {match.team1.score !== undefined && (
                                <span className={`text-lg font-bold ${match.team1.isWinner ? 'text-green-400' : ''}`}>
                                  {match.team1.score}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-white/30 text-sm">TBD</span>
                          )}
                        </div>
                        
                        {/* Team 2 */}
                        <div className={`px-4 py-3 flex items-center justify-between ${
                          match.team2?.isWinner ? 'bg-green-500/5' : ''
                        }`}>
                          {match.team2 ? (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                  {match.team2.seed}
                                </span>
                                <div>
                                  <p className={`text-sm ${match.team2.isWinner ? 'font-bold' : ''}`}>
                                    {match.team2.name}
                                  </p>
                                  <p className="text-white/40 text-xs">{match.team2.school}</p>
                                </div>
                              </div>
                              {match.team2.score !== undefined && (
                                <span className={`text-lg font-bold ${match.team2.isWinner ? 'text-green-400' : ''}`}>
                                  {match.team2.score}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-white/30 text-sm">TBD</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Match Info */}
                      {match.date && (
                        <div className="px-4 py-2 bg-[#0a0a1a]/50 text-xs text-white/40 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {match.date} {match.time && `at ${match.time}`}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Champion */}
            <div className="flex-1">
              <h3 className="text-center text-sm text-white/60 mb-4 pb-2 border-b border-white/10">
                Champion
              </h3>
              <div className="flex items-center justify-center h-full">
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl border border-yellow-500/30 p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-yellow-400 font-bold text-lg">TBD</p>
                  <p className="text-white/50 text-sm mt-1">State Champion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
            <span>Winner</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">Final</span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400">Upcoming</span>
            <span>Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">Live</span>
            <span>In Progress</span>
          </div>
        </div>
      </main>
    </div>
  );
}
