import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Users, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

interface UsersResponse {
  users: UserData[];
  total: number;
  role_counts: {
    ADMIN: number;
    TEACHER: number;
    STUDENT: number;
  };
}

export default function AdminUsersPage() {
  const { user, accessToken, logout } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleCounts, setRoleCounts] = useState({ ADMIN: 0, TEACHER: 0, STUDENT: 0 });
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (roleFilter) params.append('role', roleFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${API_URL}/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data: UsersResponse = await response.json();
      setUsers(data.users);
      setRoleCounts(data.role_counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, searchQuery, accessToken]);

  const handleActivate = async (userId: number) => {
    try {
      setActionLoading(userId);
      const response = await fetch(`${API_URL}/api/admin/users/${userId}/activate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to activate user');
      }
      
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivate = async (userId: number) => {
    try {
      setActionLoading(userId);
      const response = await fetch(`${API_URL}/api/admin/users/${userId}/deactivate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to deactivate user');
      }
      
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Admin</span>;
      case 'TEACHER':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Teacher</span>;
      case 'STUDENT':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Student</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
      : <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">Inactive</span>;
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
            <p className="text-white/60">View and manage all users in the system</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
              {roleCounts.ADMIN} Admins
            </div>
            <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm">
              {roleCounts.TEACHER} Teachers
            </div>
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
              {roleCounts.STUDENT} Students
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#16213e] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white placeholder-white/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-[#16213e] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white appearance-none cursor-pointer"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={() => setError(null)} className="ml-4 underline">Dismiss</button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 bg-[#16213e] rounded-xl border border-white/10">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No users found</p>
          </div>
        ) : (
          /* Users Table */
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Joined</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((userData) => (
                  <tr key={userData.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <p className="font-medium">{userData.first_name} {userData.last_name}</p>
                    </td>
                    <td className="px-6 py-4 text-white/60">
                      {userData.email}
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(userData.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(userData.is_active)}
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {userData.id !== user?.id && (
                          userData.is_active ? (
                            <button
                              onClick={() => handleDeactivate(userData.id)}
                              disabled={actionLoading === userData.id}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors text-sm disabled:opacity-50"
                              title="Deactivate User"
                            >
                              <UserX className="w-4 h-4" />
                              {actionLoading === userData.id ? 'Processing...' : 'Deactivate'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivate(userData.id)}
                              disabled={actionLoading === userData.id}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors text-sm disabled:opacity-50"
                              title="Activate User"
                            >
                              <UserCheck className="w-4 h-4" />
                              {actionLoading === userData.id ? 'Processing...' : 'Activate'}
                            </button>
                          )
                        )}
                        {userData.id === user?.id && (
                          <span className="text-white/40 text-sm italic">Current User</span>
                        )}
                      </div>
                    </td>
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
