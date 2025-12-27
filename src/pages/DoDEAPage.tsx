import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Globe, Users, Target, ChevronRight, Search, Shield, MapPin } from 'lucide-react';

interface DoDEASchool {
  id: number;
  name: string;
  location: string;
  region: string;
  teams: number;
  students: number;
  status: 'active' | 'upcoming' | 'registered';
}

const dodeaSchools: DoDEASchool[] = [
  { id: 1, name: 'Ramstein High School', location: 'Germany', region: 'Europe', teams: 3, students: 12, status: 'active' },
  { id: 2, name: 'Kadena High School', location: 'Japan', region: 'Pacific', teams: 2, students: 8, status: 'active' },
  { id: 3, name: 'Yokota High School', location: 'Japan', region: 'Pacific', teams: 2, students: 8, status: 'upcoming' },
  { id: 4, name: 'Vilseck High School', location: 'Germany', region: 'Europe', teams: 2, students: 8, status: 'upcoming' },
  { id: 5, name: 'Humphreys High School', location: 'South Korea', region: 'Pacific', teams: 3, students: 12, status: 'upcoming' },
  { id: 6, name: 'Lakenheath High School', location: 'United Kingdom', region: 'Europe', teams: 2, students: 8, status: 'registered' },
  { id: 7, name: 'Aviano High School', location: 'Italy', region: 'Europe', teams: 1, students: 4, status: 'registered' },
  { id: 8, name: 'Kubasaki High School', location: 'Japan', region: 'Pacific', teams: 2, students: 8, status: 'registered' },
  { id: 9, name: 'Stuttgart High School', location: 'Germany', region: 'Europe', teams: 2, students: 8, status: 'upcoming' },
  { id: 10, name: 'Wiesbaden High School', location: 'Germany', region: 'Europe', teams: 1, students: 4, status: 'registered' },
  { id: 11, name: 'Osan American High School', location: 'South Korea', region: 'Pacific', teams: 2, students: 8, status: 'upcoming' },
  { id: 12, name: 'Bahrain School', location: 'Bahrain', region: 'Middle East', teams: 1, students: 4, status: 'registered' },
];

export default function DoDEAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = ['all', 'Europe', 'Pacific', 'Middle East'];

  const filteredSchools = dodeaSchools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">Active</span>;
      case 'upcoming':
        return <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">Coming Soon</span>;
      case 'registered':
        return <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">Registered</span>;
      default:
        return null;
    }
  };

  const totalTeams = filteredSchools.reduce((sum, s) => sum + s.teams, 0);
  const totalStudents = filteredSchools.reduce((sum, s) => sum + s.students, 0);

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
            <Link to="/states" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
              States
            </Link>
            <Link to="/dodea" className="px-4 py-2 rounded-lg bg-[#4361ee] text-white text-sm font-medium">
              DoDEA
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
          <span className="text-white">DoDEA Schools</span>
        </div>

        {/* Header */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">DoDEA Schools</h1>
              <p className="text-white/60">Department of Defense Education Activity schools competing worldwide</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{filteredSchools.length}</p>
              <p className="text-white/60 text-sm">Schools</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-[#4361ee] mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalTeams}</p>
              <p className="text-white/60 text-sm">Teams</p>
            </div>
            <div className="bg-[#0a0a1a]/50 rounded-lg p-4 text-center">
              <Globe className="w-6 h-6 text-[#f72585] mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalStudents}</p>
              <p className="text-white/60 text-sm">Students</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">About DoDEA Competition</h3>
              <p className="text-white/70">
                DoDEA schools from around the world compete in their own division, with top teams advancing to compete 
                against state champions in the National Finals. Military-connected students represent their schools 
                from bases in Europe, the Pacific, and the Middle East.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search schools..."
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

        {/* Schools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchools.map((school) => (
            <Link
              key={school.id}
              to={`/team/${school.id}`}
              className="bg-[#16213e] rounded-xl border border-white/10 p-6 hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                {getStatusBadge(school.status)}
              </div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">{school.name}</h3>
              <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{school.location}</span>
                <span className="text-white/30">|</span>
                <span>{school.region}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#0a0a1a]/50 rounded-lg p-2">
                  <p className="font-bold text-[#4361ee]">{school.teams}</p>
                  <p className="text-white/40 text-xs">Teams</p>
                </div>
                <div className="bg-[#0a0a1a]/50 rounded-lg p-2">
                  <p className="font-bold text-[#f72585]">{school.students}</p>
                  <p className="text-white/40 text-xs">Students</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No schools found matching your search</p>
          </div>
        )}

        {/* Back to World */}
        <div className="mt-8 text-center">
          <Link
            to="/world"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#16213e] border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to World Overview
          </Link>
        </div>
      </main>
    </div>
  );
}
