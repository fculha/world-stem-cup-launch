import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Search, MapPin, Globe, School, Filter, Users } from 'lucide-react';
import { searchSchools, getSchools, getSchoolCountries, getSchoolStates, School as SchoolType } from '../lib/api';

// Demo schools data for when API returns empty
const demoSchools: SchoolType[] = [
  { id: 1, name: 'Montgomery Blair High School', country_code: 'USA', state_code: 'MD', city: 'Silver Spring', is_dodea: false },
  { id: 2, name: 'Thomas Jefferson High School for Science and Technology', country_code: 'USA', state_code: 'VA', city: 'Alexandria', is_dodea: false },
  { id: 3, name: 'Stuyvesant High School', country_code: 'USA', state_code: 'NY', city: 'New York', is_dodea: false },
  { id: 4, name: 'Phillips Exeter Academy', country_code: 'USA', state_code: 'NH', city: 'Exeter', is_dodea: false },
  { id: 5, name: 'Illinois Mathematics and Science Academy', country_code: 'USA', state_code: 'IL', city: 'Aurora', is_dodea: false },
  { id: 6, name: 'North Carolina School of Science and Mathematics', country_code: 'USA', state_code: 'NC', city: 'Durham', is_dodea: false },
  { id: 7, name: 'Massachusetts Academy of Math and Science', country_code: 'USA', state_code: 'MA', city: 'Worcester', is_dodea: false },
  { id: 8, name: 'Texas Academy of Mathematics and Science', country_code: 'USA', state_code: 'TX', city: 'Denton', is_dodea: false },
  { id: 9, name: 'Ramstein High School', country_code: 'USA', state_code: 'DODEA-EU', city: 'Ramstein', is_dodea: true, dodea_region: 'EUROPE' },
  { id: 10, name: 'Yokota High School', country_code: 'USA', state_code: 'DODEA-PAC', city: 'Tokyo', is_dodea: true, dodea_region: 'PACIFIC' },
  { id: 11, name: 'Eton College', country_code: 'GBR', state_code: 'England', city: 'Windsor', is_dodea: false },
  { id: 12, name: 'Lycee Louis-le-Grand', country_code: 'FRA', state_code: 'Ile-de-France', city: 'Paris', is_dodea: false },
  { id: 13, name: 'Gymnasium Marienthal', country_code: 'DEU', state_code: 'Hamburg', city: 'Hamburg', is_dodea: false },
  { id: 14, name: 'Tokyo Metropolitan Hibiya High School', country_code: 'JPN', state_code: 'Tokyo', city: 'Tokyo', is_dodea: false },
  { id: 15, name: 'Seoul Science High School', country_code: 'KOR', state_code: 'Seoul', city: 'Seoul', is_dodea: false },
];

const demoCountries = ['USA', 'GBR', 'FRA', 'DEU', 'JPN', 'KOR'];
const demoStates: Record<string, string[]> = {
  'USA': ['MD', 'VA', 'NY', 'NH', 'IL', 'NC', 'MA', 'TX', 'DODEA-EU', 'DODEA-PAC'],
  'GBR': ['England', 'Scotland', 'Wales'],
  'FRA': ['Ile-de-France', 'Provence'],
  'DEU': ['Hamburg', 'Berlin', 'Bavaria'],
  'JPN': ['Tokyo', 'Osaka'],
  'KOR': ['Seoul', 'Busan'],
};

export default function FindSchoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [useDemo, setUseDemo] = useState(true);

  useEffect(() => {
    loadCountries();
    // Load demo data initially
    setSchools(demoSchools);
    setCountries(demoCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      loadStates(selectedCountry);
    } else {
      setStates([]);
      setSelectedState('');
    }
  }, [selectedCountry]);

  const loadCountries = async () => {
    try {
      const response = await getSchoolCountries();
      if (response.countries && response.countries.length > 0) {
        setCountries(response.countries);
        setUseDemo(false);
      } else {
        setCountries(demoCountries);
        setUseDemo(true);
      }
    } catch {
      setCountries(demoCountries);
      setUseDemo(true);
    }
  };

  const loadStates = async (country: string) => {
    if (useDemo) {
      setStates(demoStates[country] || []);
      return;
    }
    try {
      const response = await getSchoolStates(country);
      if (response.states && response.states.length > 0) {
        setStates(response.states);
      } else {
        setStates(demoStates[country] || []);
      }
    } catch {
      setStates(demoStates[country] || []);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (useDemo) {
        // Filter demo data
        let filtered = demoSchools;
        if (searchQuery) {
          filtered = filtered.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.city?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (selectedCountry) {
          filtered = filtered.filter(s => s.country_code === selectedCountry);
        }
        if (selectedState) {
          filtered = filtered.filter(s => s.state_code === selectedState);
        }
        setSchools(filtered);
      } else {
        if (searchQuery) {
          const response = await searchSchools(searchQuery);
          setSchools(response.schools || []);
        } else if (selectedCountry) {
          const response = await getSchools({ 
            country: selectedCountry, 
            state: selectedState || undefined 
          });
          setSchools(response.schools || []);
        } else {
          setSchools(demoSchools);
        }
      }
    } catch {
      // Fall back to demo data on error
      setSchools(demoSchools);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, selectedCountry, selectedState]);

  const getCountryName = (code: string) => {
    const names: Record<string, string> = {
      'USA': 'United States',
      'GBR': 'United Kingdom',
      'FRA': 'France',
      'DEU': 'Germany',
      'JPN': 'Japan',
      'KOR': 'South Korea',
    };
    return names[code] || code;
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
            to="/register/school-admin"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4361ee] to-[#f72585] hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            Register Your School
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center mx-auto mb-6">
            <School className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Find Your School</h1>
          <p className="text-white/60">Search for participating schools or browse by country and state</p>
          {useDemo && (
            <p className="text-yellow-400/80 text-sm mt-2">(Showing demo data - real schools coming soon!)</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Globe className="w-8 h-8 text-[#4361ee] mx-auto mb-3" />
            <p className="text-2xl font-bold">{countries.length}</p>
            <p className="text-white/60 text-sm">Countries</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <School className="w-8 h-8 text-[#f72585] mx-auto mb-3" />
            <p className="text-2xl font-bold">{schools.length}</p>
            <p className="text-white/60 text-sm">Schools Found</p>
          </div>
          <div className="bg-[#16213e] rounded-xl p-6 border border-white/10 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <p className="text-2xl font-bold">50,000+</p>
            <p className="text-white/60 text-sm">Students Competing</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search schools by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 focus:border-[#4361ee] focus:outline-none"
              />
            </div>

            {/* Country Filter */}
            <div className="relative min-w-[200px]">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 focus:border-[#4361ee] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{getCountryName(country)}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>

            {/* State Filter */}
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 focus:border-[#4361ee] focus:outline-none appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="">All States/Regions</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>

        {/* Schools List */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Searching schools...</p>
          </div>
        ) : schools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => (
              <div 
                key={school.id} 
                className="bg-[#16213e] rounded-xl border border-white/10 p-6 hover:border-[#4361ee]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center flex-shrink-0">
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{school.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-white/60">
                      <MapPin className="w-4 h-4" />
                      <span>{school.city}, {school.state_code}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-white/10">
                        {getCountryName(school.country_code)}
                      </span>
                      {school.is_dodea && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400">
                          DoDEA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No schools found matching your search</p>
            <p className="text-white/40 text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-xl border border-white/10 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see your school?</h2>
          <p className="text-white/60 mb-6">Register your school to join the World STEM Cup and compete against students from around the world!</p>
          <Link
            to="/register/school-admin"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Register Your School
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </main>
    </div>
  );
}
