import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, Clock, Calendar, ChevronRight, Users, Target } from 'lucide-react';

interface TeamStats {
  id: number;
  name: string;
  school: string;
  score: number;
  accuracy: number;
  avgTime: number;
  questionsAnswered: number;
}

interface QuestionResult {
  id: number;
  category: string;
  team1Correct: boolean;
  team2Correct: boolean;
  team1Time: number;
  team2Time: number;
  team1Points: number;
  team2Points: number;
}

interface MatchData {
  id: number;
  round: string;
  tournament: string;
  state: string;
  date: string;
  time: string;
  status: 'completed' | 'scheduled' | 'live';
  team1: TeamStats;
  team2: TeamStats;
  questions: QuestionResult[];
}

const mockMatchData: Record<string, MatchData> = {
  '1': {
    id: 1,
    round: 'Group A - Match 5',
    tournament: 'Maryland State Qualifier',
    state: 'MD',
    date: 'January 14, 2025',
    time: '2:00 PM EST',
    status: 'completed',
    team1: {
      id: 1,
      name: 'Quantum Minds',
      school: 'Montgomery Blair HS',
      score: 420,
      accuracy: 85,
      avgTime: 28,
      questionsAnswered: 10,
    },
    team2: {
      id: 2,
      name: 'Binary Stars',
      school: 'Thomas Jefferson HS',
      score: 370,
      accuracy: 75,
      avgTime: 32,
      questionsAnswered: 10,
    },
    questions: [
      { id: 1, category: 'Math', team1Correct: true, team2Correct: true, team1Time: 25, team2Time: 30, team1Points: 45, team2Points: 40 },
      { id: 2, category: 'Science', team1Correct: true, team2Correct: false, team1Time: 28, team2Time: 45, team1Points: 42, team2Points: 0 },
      { id: 3, category: 'Technology', team1Correct: true, team2Correct: true, team1Time: 22, team2Time: 28, team1Points: 48, team2Points: 42 },
      { id: 4, category: 'Engineering', team1Correct: false, team2Correct: true, team1Time: 50, team2Time: 35, team1Points: 0, team2Points: 35 },
      { id: 5, category: 'Math', team1Correct: true, team2Correct: true, team1Time: 30, team2Time: 32, team1Points: 40, team2Points: 38 },
      { id: 6, category: 'Science', team1Correct: true, team2Correct: true, team1Time: 26, team2Time: 29, team1Points: 44, team2Points: 41 },
      { id: 7, category: 'Technology', team1Correct: true, team2Correct: false, team1Time: 24, team2Time: 48, team1Points: 46, team2Points: 0 },
      { id: 8, category: 'Engineering', team1Correct: true, team2Correct: true, team1Time: 32, team2Time: 30, team1Points: 38, team2Points: 40 },
      { id: 9, category: 'Math', team1Correct: false, team2Correct: true, team1Time: 55, team2Time: 28, team1Points: 0, team2Points: 42 },
      { id: 10, category: 'Science', team1Correct: true, team2Correct: true, team1Time: 28, team2Time: 35, team1Points: 42, team2Points: 35 },
    ],
  },
  '3': {
    id: 3,
    round: 'Semifinals',
    tournament: 'Maryland State Qualifier',
    state: 'MD',
    date: 'January 15, 2025',
    time: '2:00 PM EST',
    status: 'scheduled',
    team1: {
      id: 1,
      name: 'Quantum Minds',
      school: 'Montgomery Blair HS',
      score: 0,
      accuracy: 0,
      avgTime: 0,
      questionsAnswered: 0,
    },
    team2: {
      id: 5,
      name: 'Neural Network',
      school: 'Walt Whitman HS',
      score: 0,
      accuracy: 0,
      avgTime: 0,
      questionsAnswered: 0,
    },
    questions: [],
  },
};

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = matchId || '1';
    setMatchData(mockMatchData[id] || mockMatchData['1']);
    setLoading(false);
  }, [matchId]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Math': return 'bg-blue-500/20 text-blue-400';
      case 'Science': return 'bg-green-500/20 text-green-400';
      case 'Technology': return 'bg-purple-500/20 text-purple-400';
      case 'Engineering': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  if (loading || !matchData) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const isCompleted = matchData.status === 'completed';
  const team1Won = matchData.team1.score > matchData.team2.score;
  const team2Won = matchData.team2.score > matchData.team1.score;

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
          <Link to={`/state/${matchData.state}`} className="hover:text-white transition-colors">{matchData.state}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Match {matchData.id}</span>
        </div>

        {/* Match Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden mb-8">
          {/* Match Info */}
          <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[#f72585] font-medium">{matchData.round}</span>
              <p className="text-white/60 text-sm">{matchData.tournament}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {matchData.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {matchData.time}
              </div>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="p-8">
            <div className="flex items-center justify-center gap-8">
              {/* Team 1 */}
              <Link to={`/team/${matchData.team1.id}`} className={`flex-1 text-center hover:opacity-100 transition-opacity ${team1Won ? '' : 'opacity-70'}`}>
                <div className={`w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${
                  team1Won ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-[#4361ee]'
                }`}>
                  {matchData.team1.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold mb-1 hover:text-[#4361ee] transition-colors">{matchData.team1.name}</h2>
                <p className="text-white/60 text-sm">{matchData.team1.school}</p>
              </Link>

              {/* Score */}
              <div className="text-center px-8">
                {isCompleted ? (
                  <>
                    <div className="flex items-center gap-4 text-5xl font-bold">
                      <span className={team1Won ? 'text-green-400' : ''}>{matchData.team1.score}</span>
                      <span className="text-white/30">-</span>
                      <span className={team2Won ? 'text-green-400' : ''}>{matchData.team2.score}</span>
                    </div>
                    <span className="inline-block mt-4 px-4 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">
                      Final
                    </span>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-white/40">VS</div>
                    <span className="inline-block mt-4 px-4 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Upcoming
                    </span>
                  </>
                )}
              </div>

              {/* Team 2 */}
              <Link to={`/team/${matchData.team2.id}`} className={`flex-1 text-center hover:opacity-100 transition-opacity ${team2Won ? '' : 'opacity-70'}`}>
                <div className={`w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${
                  team2Won ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-[#f72585]'
                }`}>
                  {matchData.team2.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold mb-1 hover:text-[#f72585] transition-colors">{matchData.team2.name}</h2>
                <p className="text-white/60 text-sm">{matchData.team2.school}</p>
              </Link>
            </div>
          </div>
        </div>

        {isCompleted && (
          <>
            {/* Team Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Team 1 Stats */}
              <div className="bg-[#16213e] rounded-xl border border-white/10 p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4361ee]" />
                  {matchData.team1.name} Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#4361ee]">{matchData.team1.accuracy}%</p>
                    <p className="text-white/60 text-sm">Accuracy</p>
                  </div>
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold">{matchData.team1.avgTime}s</p>
                    <p className="text-white/60 text-sm">Avg Time</p>
                  </div>
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center col-span-2">
                    <p className="text-2xl font-bold">{matchData.team1.questionsAnswered}</p>
                    <p className="text-white/60 text-sm">Questions Answered</p>
                  </div>
                </div>
              </div>

              {/* Team 2 Stats */}
              <div className="bg-[#16213e] rounded-xl border border-white/10 p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#f72585]" />
                  {matchData.team2.name} Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#f72585]">{matchData.team2.accuracy}%</p>
                    <p className="text-white/60 text-sm">Accuracy</p>
                  </div>
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold">{matchData.team2.avgTime}s</p>
                    <p className="text-white/60 text-sm">Avg Time</p>
                  </div>
                  <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center col-span-2">
                    <p className="text-2xl font-bold">{matchData.team2.questionsAnswered}</p>
                    <p className="text-white/60 text-sm">Questions Answered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Question by Question */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-400" />
                  Question by Question
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0a0a1a]/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">Q#</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-white/60">Category</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">{matchData.team1.name}</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-white/60">{matchData.team2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {matchData.questions.map((q, idx) => (
                      <tr key={q.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-medium">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(q.category)}`}>
                            {q.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              q.team1Correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {q.team1Correct ? '✓' : '✗'}
                            </span>
                            <span className="text-sm">{q.team1Points} pts</span>
                            <span className="text-white/40 text-xs">({q.team1Time}s)</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              q.team2Correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {q.team2Correct ? '✓' : '✗'}
                            </span>
                            <span className="text-sm">{q.team2Points} pts</span>
                            <span className="text-white/40 text-xs">({q.team2Time}s)</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-[#0a0a1a]/30">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 font-bold">Total</td>
                      <td className="px-4 py-3 text-center font-bold text-[#4361ee]">{matchData.team1.score}</td>
                      <td className="px-4 py-3 text-center font-bold text-[#f72585]">{matchData.team2.score}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}

        {!isCompleted && (
          <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 text-center">
            <Clock className="w-12 h-12 text-[#4361ee] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Match Not Started</h3>
            <p className="text-white/60 mb-4">This match is scheduled for {matchData.date} at {matchData.time}</p>
            <Link
              to={`/state/${matchData.state}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4361ee] rounded-lg font-medium hover:bg-[#4361ee]/80 transition-colors"
            >
              View Tournament
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
