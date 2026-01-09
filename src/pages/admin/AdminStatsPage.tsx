import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Users, School, GraduationCap, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface StatsData {
  users: {
    total: number;
    by_role: {
      ADMIN: number;
      TEACHER: number;
      STUDENT: number;
    };
  };
  schools: {
    total: number;
    by_status: {
      PENDING: number;
      APPROVED: number;
      REJECTED: number;
    };
  };
  teachers: number;
  students: number;
}

export default function AdminStatsPage() {
  const { user, accessToken, logout } = useAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data: StatsData = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [accessToken]);

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
            <div className="text-right">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Statistics</h1>
          <p className="text-white/60">Overview of all system metrics</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading statistics...</p>
          </div>
        ) : stats && (
          <>
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 text-[#4361ee]" />
                  <span className="text-3xl font-bold">{stats.users.total}</span>
                </div>
                <p className="text-white/60">Total Users</p>
              </div>
              
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <School className="w-10 h-10 text-[#f72585]" />
                  <span className="text-3xl font-bold">{stats.schools.total}</span>
                </div>
                <p className="text-white/60">Total Schools</p>
              </div>
              
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <UserCheck className="w-10 h-10 text-blue-400" />
                  <span className="text-3xl font-bold">{stats.teachers}</span>
                </div>
                <p className="text-white/60">Teachers</p>
              </div>
              
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="w-10 h-10 text-green-400" />
                  <span className="text-3xl font-bold">{stats.students}</span>
                </div>
                <p className="text-white/60">Students</p>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Users by Role */}
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4361ee]" />
                  Users by Role
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Administrators</span>
                    </div>
                    <span className="font-semibold">{stats.users.by_role.ADMIN}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${stats.users.total > 0 ? (stats.users.by_role.ADMIN / stats.users.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Teachers</span>
                    </div>
                    <span className="font-semibold">{stats.users.by_role.TEACHER}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${stats.users.total > 0 ? (stats.users.by_role.TEACHER / stats.users.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Students</span>
                    </div>
                    <span className="font-semibold">{stats.users.by_role.STUDENT}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.users.total > 0 ? (stats.users.by_role.STUDENT / stats.users.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Schools by Status */}
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <School className="w-5 h-5 text-[#f72585]" />
                  Schools by Status
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Pending Approval</span>
                    </div>
                    <span className="font-semibold">{stats.schools.by_status.PENDING}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${stats.schools.total > 0 ? (stats.schools.by_status.PENDING / stats.schools.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Approved</span>
                    </div>
                    <span className="font-semibold">{stats.schools.by_status.APPROVED}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.schools.total > 0 ? (stats.schools.by_status.APPROVED / stats.schools.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Rejected</span>
                    </div>
                    <span className="font-semibold">{stats.schools.by_status.REJECTED}</span>
                  </div>
                  <div className="w-full bg-[#0a0a1a] rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${stats.schools.total > 0 ? (stats.schools.by_status.REJECTED / stats.schools.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Link 
                to="/admin/schools" 
                className="bg-[#16213e] rounded-xl p-6 border border-white/10 hover:border-[#4361ee]/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <School className="w-8 h-8 text-[#4361ee] group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold">Manage Schools</h3>
                    <p className="text-white/60 text-sm">{stats.schools.by_status.PENDING} pending approvals</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/admin/users" 
                className="bg-[#16213e] rounded-xl p-6 border border-white/10 hover:border-[#f72585]/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-[#f72585] group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold">Manage Users</h3>
                    <p className="text-white/60 text-sm">{stats.users.total} total users</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
