import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, School, CheckCircle, XCircle, Eye, Search, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface SchoolData {
  id: number;
  name: string;
  country: string;
  city: string;
  address?: string;
  website?: string;
  phone?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  teacher_invite_code?: string;
  student_invite_code?: string;
  created_at: string;
  approved_at?: string;
}

interface SchoolsResponse {
  schools: SchoolData[];
  total: number;
  status_counts: {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
  };
}

export default function AdminSchoolsPage() {
  const { user, accessToken, logout } = useAuth();
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusCounts, setStatusCounts] = useState({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${API_URL}/api/admin/schools?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }
      
      const data: SchoolsResponse = await response.json();
      setSchools(data.schools);
      setStatusCounts(data.status_counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [statusFilter, searchQuery, accessToken]);

  const handleApprove = async (schoolId: number) => {
    try {
      setActionLoading(true);
      const response = await fetch(`${API_URL}/api/admin/schools/${schoolId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve school');
      }
      
      await fetchSchools();
      setSelectedSchool(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (schoolId: number) => {
    try {
      setActionLoading(true);
      const response = await fetch(`${API_URL}/api/admin/schools/${schoolId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject school');
      }
      
      await fetchSchools();
      setSelectedSchool(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Pending</span>;
      case 'APPROVED':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Approved</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Rejected</span>;
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
            <h1 className="text-3xl font-bold mb-2">Manage Schools</h1>
            <p className="text-white/60">Review and approve school registrations</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.PENDING} Pending
            </div>
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.APPROVED} Approved
            </div>
            <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.REJECTED} Rejected
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#16213e] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white placeholder-white/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-[#16213e] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
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
            <p className="text-white/60">Loading schools...</p>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-12 bg-[#16213e] rounded-xl border border-white/10">
            <School className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No schools found</p>
          </div>
        ) : (
          /* Schools Table */
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">School</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Location</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Registered</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {schools.map((school) => (
                  <tr key={school.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <p className="font-medium">{school.name}</p>
                      {school.website && (
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4361ee] hover:underline">
                          {school.website}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p>{school.city}, {school.country}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(school.status)}
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {new Date(school.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedSchool(school)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {school.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(school.id)}
                              disabled={actionLoading}
                              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(school.id)}
                              disabled={actionLoading}
                              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* School Details Modal */}
        {selectedSchool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#16213e] rounded-xl border border-white/10 max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">School Details</h2>
                <button onClick={() => setSelectedSchool(null)} className="text-white/60 hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">School Name</p>
                  <p className="font-medium">{selectedSchool.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Country</p>
                    <p>{selectedSchool.country}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">City</p>
                    <p>{selectedSchool.city}</p>
                  </div>
                </div>
                {selectedSchool.address && (
                  <div>
                    <p className="text-white/60 text-sm">Address</p>
                    <p>{selectedSchool.address}</p>
                  </div>
                )}
                {selectedSchool.website && (
                  <div>
                    <p className="text-white/60 text-sm">Website</p>
                    <a href={selectedSchool.website} target="_blank" rel="noopener noreferrer" className="text-[#4361ee] hover:underline">
                      {selectedSchool.website}
                    </a>
                  </div>
                )}
                {selectedSchool.phone && (
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p>{selectedSchool.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  {getStatusBadge(selectedSchool.status)}
                </div>
                {selectedSchool.status === 'APPROVED' && (
                  <>
                    <div>
                      <p className="text-white/60 text-sm">Teacher Invite Code</p>
                      <p className="font-mono bg-[#0a0a1a] px-3 py-2 rounded">{selectedSchool.teacher_invite_code || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Student Invite Code</p>
                      <p className="font-mono bg-[#0a0a1a] px-3 py-2 rounded">{selectedSchool.student_invite_code || 'N/A'}</p>
                    </div>
                  </>
                )}
              </div>

              {selectedSchool.status === 'PENDING' && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleApprove(selectedSchool.id)}
                    disabled={actionLoading}
                    className="flex-1 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? 'Processing...' : 'Approve School'}
                  </button>
                  <button
                    onClick={() => handleReject(selectedSchool.id)}
                    disabled={actionLoading}
                    className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? 'Processing...' : 'Reject School'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
