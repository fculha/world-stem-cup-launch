import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, MapPin, Users, Target, ChevronRight, Search } from 'lucide-react';

interface StateInfo {
  code: string;
  name: string;
  teams: number;
  schools: number;
  students: number;
  status: 'active' | 'upcoming' | 'completed';
  region: string;
}

const allStates: StateInfo[] = [
  { code: 'MD', name: 'Maryland', teams: 24, schools: 18, students: 96, status: 'active', region: 'Mid-Atlantic' },
  { code: 'VA', name: 'Virginia', teams: 18, schools: 12, students: 72, status: 'upcoming', region: 'Mid-Atlantic' },
  { code: 'CA', name: 'California', teams: 32, schools: 22, students: 128, status: 'upcoming', region: 'West' },
  { code: 'TX', name: 'Texas', teams: 28, schools: 19, students: 112, status: 'upcoming', region: 'South' },
  { code: 'NY', name: 'New York', teams: 22, schools: 15, students: 88, status: 'upcoming', region: 'Northeast' },
  { code: 'FL', name: 'Florida', teams: 20, schools: 14, students: 80, status: 'upcoming', region: 'South' },
  { code: 'IL', name: 'Illinois', teams: 16, schools: 11, students: 64, status: 'upcoming', region: 'Midwest' },
  { code: 'PA', name: 'Pennsylvania', teams: 14, schools: 10, students: 56, status: 'upcoming', region: 'Northeast' },
  { code: 'OH', name: 'Ohio', teams: 12, schools: 8, students: 48, status: 'upcoming', region: 'Midwest' },
  { code: 'GA', name: 'Georgia', teams: 15, schools: 10, students: 60, status: 'upcoming', region: 'South' },
  { code: 'NC', name: 'North Carolina', teams: 13, schools: 9, students: 52, status: 'upcoming', region: 'South' },
  { code: 'MI', name: 'Michigan', teams: 11, schools: 7, students: 44, status: 'upcoming', region: 'Midwest' },
  { code: 'NJ', name: 'New Jersey', teams: 10, schools: 7, students: 40, status: 'upcoming', region: 'Northeast' },
  { code: 'WA', name: 'Washington', teams: 9, schools: 6, students: 36, status: 'upcoming', region: 'West' },
  { code: 'MA', name: 'Massachusetts', teams: 12, schools: 8, students: 48, status: 'upcoming', region: 'Northeast' },
  { code: 'AZ', name: 'Arizona', teams: 8, schools: 5, students: 32, status: 'upcoming', region: 'West' },
  { code: 'CO', name: 'Colorado', teams: 7, schools: 5, students: 28, status: 'upcoming', region: 'West' },
  { code: 'TN', name: 'Tennessee', teams: 6, schools: 4, students: 24, status: 'upcoming', region: 'South' },
];

export default function StatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', 'Mid-Atlantic', 'Northeast', 'South', 'Midwest', 'West'];

  const filteredStates = allStates.filter((state) => {
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         state.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || state.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">Live</span>;
      case 'upcoming':
        return <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">Coming Soon</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/60 border border-white/20">Completed</span>;
      default:
        return null;
    }
  };

  const totalTeams = filteredStates.reduce((sum, s) => sum + s.teams, 0);
  const totalSchools = filteredStates.reduce((sum, s) => sum + s.schools, 0);

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
            <Link to="/states" className="px-4 py-2 rounded-lg bg-[#4361ee] text-white text-sm font-medium">
              States
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
          <span className="text-white">All States</span>
        </div>

        {/* Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center shadow-lg">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">State Competitions</h1>
              <p className="text-white/60">Browse all participating states in the World STEM Cup</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-[#4361ee] mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalTeams}</p>
              <p className="text-white/60 text-sm">Teams</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-[#f72585] mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalSchools}</p>
              <p className="text-white/60 text-sm">Schools</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{filteredStates.length}</p>
              <p className="text-white/60 text-sm">States</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#16213e] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#4361ee]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedRegion === region
                    ? 'bg-[#4361ee] text-white'
                    : 'bg-[#16213e] text-white/60 hover:text-white'
                }`}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </div>

        {/* States Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStates.map((state) => (
            <Link
              key={state.code}
              to={`/state/${state.code}`}
              className="bg-[#16213e] rounded-xl border border-white/10 p-6 hover:border-[#4361ee]/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  {state.code}
                </div>
                {getStatusBadge(state.status)}
              </div>
              <h3 className="text-xl font-bold mb-1">{state.name}</h3>
              <p className="text-white/50 text-sm mb-4">{state.region}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#0a0a1a]/50 rounded-lg p-2">
                  <p className="font-bold text-[#4361ee]">{state.teams}</p>
                  <p className="text-white/40 text-xs">Teams</p>
                </div>
                <div className="bg-[#0a0a1a]/50 rounded-lg p-2">
                  <p className="font-bold text-[#f72585]">{state.schools}</p>
                  <p className="text-white/40 text-xs">Schools</p>
                </div>
                <div className="bg-[#0a0a1a]/50 rounded-lg p-2">
                  <p className="font-bold text-green-400">{state.students}</p>
                  <p className="text-white/40 text-xs">Students</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredStates.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No states found matching your search</p>
          </div>
        )}
      </main>
    </div>
  );
}
