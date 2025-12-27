import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Globe, Users, Target, Calendar, ChevronRight, MapPin, Award, TrendingUp } from 'lucide-react';

// Types
interface StateStats {
  code: string;
  name: string;
  teams: number;
  schools: number;
  status: 'active' | 'upcoming' | 'completed';
}

interface GlobalStats {
  totalTeams: number;
  totalSchools: number;
  totalStudents: number;
  activeStates: number;
  upcomingMatches: number;
}

// Mock data for World Cup style overview
const mockGlobalStats: GlobalStats = {
  totalTeams: 156,
  totalSchools: 89,
  totalStudents: 624,
  activeStates: 5,
  upcomingMatches: 12,
};

const mockStateStats: StateStats[] = [
  { code: 'MD', name: 'Maryland', teams: 24, schools: 18, status: 'active' },
  { code: 'VA', name: 'Virginia', teams: 18, schools: 12, status: 'upcoming' },
  { code: 'CA', name: 'California', teams: 32, schools: 22, status: 'upcoming' },
  { code: 'TX', name: 'Texas', teams: 28, schools: 19, status: 'upcoming' },
  { code: 'NY', name: 'New York', teams: 22, schools: 15, status: 'upcoming' },
];

const mockTopTeams = [
  { id: 1, rank: 1, name: 'Quantum Minds', school: 'Montgomery Blair HS', state: 'MD', points: 2450 },
  { id: 5, rank: 2, name: 'Neural Network', school: 'Walt Whitman HS', state: 'MD', points: 2380 },
  { id: 2, rank: 3, name: 'Binary Stars', school: 'Thomas Jefferson HS', state: 'VA', points: 2290 },
  { id: 3, rank: 4, name: 'Code Breakers', school: 'Bethesda-Chevy Chase HS', state: 'MD', points: 2180 },
  { id: 6, rank: 5, name: 'Data Dragons', school: 'Richard Montgomery HS', state: 'MD', points: 2050 },
];

const mockUpcomingMatches = [
  { id: 1, team1: 'Quantum Minds', team2: 'Binary Stars', round: 'Semifinals', time: '2:00 PM EST', date: 'Jan 15' },
  { id: 2, team1: 'Neural Network', team2: 'Code Breakers', round: 'Semifinals', time: '4:00 PM EST', date: 'Jan 15' },
  { id: 3, team1: 'Data Dragons', team2: 'Logic Lords', round: 'Quarterfinals', time: '10:00 AM EST', date: 'Jan 14' },
];

export default function WorldPage() {
  const [stats] = useState<GlobalStats>(mockGlobalStats);
  const [states] = useState<StateStats[]>(mockStateStats);

  useEffect(() => {
    // In production, fetch real data from API
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Live</span>;
      case 'upcoming':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Upcoming</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60">Completed</span>;
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
            <Link to="/world" className="px-4 py-2 rounded-lg bg-[#4361ee] text-white text-sm font-medium">
              Overview
            </Link>
            <Link to="/leaderboard" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
              Standings
            </Link>
            <Link to="/find-schools" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
              Schools
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            World STEM Cup 2025
          </h1>
          <p className="text-xl text-white/70 mb-8">
            The ultimate STEM competition for students worldwide
          </p>
          
          {/* Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-4 border border-white/10">
              <Users className="w-6 h-6 text-[#4361ee] mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalTeams}</p>
              <p className="text-white/60 text-xs">Teams</p>
            </div>
            <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-4 border border-white/10">
              <Target className="w-6 h-6 text-[#f72585] mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalSchools}</p>
              <p className="text-white/60 text-xs">Schools</p>
            </div>
            <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-4 border border-white/10">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
              <p className="text-white/60 text-xs">Students</p>
            </div>
            <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-4 border border-white/10">
              <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.activeStates}</p>
              <p className="text-white/60 text-xs">States</p>
            </div>
            <div className="bg-[#16213e]/80 backdrop-blur rounded-xl p-4 border border-white/10">
              <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.upcomingMatches}</p>
              <p className="text-white/60 text-xs">Matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* States Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#4361ee]" />
                  State Competitions
                </h2>
                <Link to="/find-schools" className="text-sm text-[#4361ee] hover:underline">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {states.map((state) => (
                  <Link
                    key={state.code}
                    to={`/state/${state.code}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-bold text-lg">
                        {state.code}
                      </div>
                      <div>
                        <p className="font-medium">{state.name}</p>
                        <p className="text-white/50 text-sm">{state.teams} teams from {state.schools} schools</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(state.status)}
                      <ChevronRight className="w-5 h-5 text-white/30" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Teams */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Top Teams
                </h2>
                <Link to="/leaderboard" className="text-sm text-[#4361ee] hover:underline">
                  Full Standings
                </Link>
              </div>
              <table className="w-full">
                <thead className="bg-[#0a0a1a]/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-white/60">#</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-white/60">Team</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-white/60 hidden md:table-cell">School</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-white/60">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockTopTeams.map((team) => (
                    <tr key={team.rank} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => window.location.href = `/team/${team.id}`}>
                      <td className="px-6 py-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          team.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                          team.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                          team.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {team.rank}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <Link to={`/team/${team.id}`} className="font-medium hover:text-[#4361ee] transition-colors">{team.name}</Link>
                        <p className="text-white/40 text-xs md:hidden">{team.school}</p>
                      </td>
                      <td className="px-6 py-3 text-white/60 text-sm hidden md:table-cell">
                        {team.school}
                        <Link to={`/state/${team.state}`} className="ml-2 text-[#4361ee] hover:underline">{team.state}</Link>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="font-bold text-[#4361ee]">{team.points.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Matches */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f72585]" />
                  Upcoming Matches
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {mockUpcomingMatches.map((match) => (
                  <Link
                    key={match.id}
                    to={`/match/${match.id}`}
                    className="block px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#f72585] font-medium">{match.round}</span>
                      <span className="text-xs text-white/40">{match.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium">{match.team1}</p>
                        <p className="text-white/50">vs</p>
                        <p className="font-medium">{match.team2}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60">{match.time}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="px-6 py-3 bg-[#0a0a1a]/50">
                <Link to="/watch" className="text-sm text-[#4361ee] hover:underline flex items-center gap-1">
                  View All Matches <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#16213e] rounded-xl border border-white/10 p-6">
              <h2 className="font-bold text-lg mb-4">Quick Links</h2>
              <div className="space-y-3">
                <Link
                  to="/state/MD"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a1a]/50 hover:bg-[#0a0a1a] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Maryland Pilot</p>
                    <p className="text-white/50 text-xs">Live Competition</p>
                  </div>
                </Link>
                <Link
                  to="/find-schools"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a1a]/50 hover:bg-[#0a0a1a] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#4361ee]/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#4361ee]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Find Schools</p>
                    <p className="text-white/50 text-xs">Browse Participating Schools</p>
                  </div>
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a1a]/50 hover:bg-[#0a0a1a] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Leaderboard</p>
                    <p className="text-white/50 text-xs">Global Rankings</p>
                  </div>
                </Link>
                <Link
                  to="/bracket"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a1a]/50 hover:bg-[#0a0a1a] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#f72585]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#f72585]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Playoff Bracket</p>
                    <p className="text-white/50 text-xs">Tournament Playoffs</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Competition Info */}
            <div className="bg-gradient-to-br from-[#4361ee]/20 to-[#f72585]/20 rounded-xl border border-white/10 p-6">
              <h2 className="font-bold text-lg mb-3">How It Works</h2>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4361ee] flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <p>Schools register and form teams of 4 students</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4361ee] flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <p>Teams compete in state-level group stages</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4361ee] flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <p>Top teams advance to playoffs and nationals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                  <p>National champions compete at World Finals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
