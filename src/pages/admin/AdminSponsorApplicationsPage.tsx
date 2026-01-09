import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, FileText, CheckCircle, XCircle, Eye, Filter, Clock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface ApplicationData {
  id: number;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  website: string | null;
  tier_interest: string | null;
  message: string | null;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  admin_notes: string | null;
  created_at: string;
}

interface ApplicationsResponse {
  applications: ApplicationData[];
  total: number;
  limit: number;
  offset: number;
  status_counts: {
    PENDING: number;
    UNDER_REVIEW: number;
    APPROVED: number;
    REJECTED: number;
  };
}

export default function AdminSponsorApplicationsPage() {
  const { user, accessToken, logout } = useAuth();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [statusCounts, setStatusCounts] = useState({ PENDING: 0, UNDER_REVIEW: 0, APPROVED: 0, REJECTED: 0 });

  const fetchApplications = async () => {
    // Don't fetch if no access token (user not logged in yet)
    if (!accessToken) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const params = new URLSearchParams();
      if (statusFilter) params.append('status_filter', statusFilter);
      
      const response = await fetch(`${API_URL}/api/sponsors/applications?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to fetch applications');
      }
      
      const data: ApplicationsResponse = await response.json();
      setApplications(data.applications);
      setStatusCounts(data.status_counts);
      setError(null); // Clear error on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, accessToken]);

  const handleUpdateStatus = async (applicationId: number, newStatus: string) => {
    try {
      setActionLoading(true);
      
      const response = await fetch(`${API_URL}/api/sponsors/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes || null,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update application');
      }
      
      await fetchApplications();
      setSelectedApplication(null);
      setAdminNotes('');
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
      case 'UNDER_REVIEW':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Under Review</span>;
      case 'APPROVED':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Approved</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Rejected</span>;
      default:
        return null;
    }
  };

  const getTierBadge = (tier: string | null) => {
    if (!tier) return <span className="text-white/40">Not specified</span>;
    const colors: Record<string, string> = {
      PLATINUM: 'bg-gray-300/20 text-gray-300',
      GOLD: 'bg-yellow-500/20 text-yellow-400',
      SILVER: 'bg-gray-400/20 text-gray-400',
      BRONZE: 'bg-orange-500/20 text-orange-400',
      CUSTOM: 'bg-purple-500/20 text-purple-400'
    };
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[tier] || 'bg-white/10 text-white/60'}`}>{tier}</span>;
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
            <h1 className="text-3xl font-bold mb-2">Sponsor Applications</h1>
            <p className="text-white/60">Review and manage sponsor form submissions</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.PENDING} Pending
            </div>
            <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.UNDER_REVIEW} Under Review
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
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 bg-[#16213e] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
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
            <p className="text-white/60">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 bg-[#16213e] rounded-xl border border-white/10">
            <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No sponsor applications found</p>
          </div>
        ) : (
          /* Applications Table */
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Company</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Tier Interest</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <p className="font-medium">{application.company_name}</p>
                      {application.website && (
                        <a href={application.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4361ee] hover:underline">
                          {application.website}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{application.contact_name}</p>
                      <p className="text-sm text-white/60">{application.contact_email}</p>
                      {application.contact_phone && (
                        <p className="text-sm text-white/40">{application.contact_phone}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getTierBadge(application.tier_interest)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(application.status)}
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {new Date(application.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setAdminNotes(application.admin_notes || '');
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {application.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(application.id, 'UNDER_REVIEW')}
                            disabled={actionLoading}
                            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                            title="Mark Under Review"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        {(application.status === 'PENDING' || application.status === 'UNDER_REVIEW') && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(application.id, 'APPROVED')}
                              disabled={actionLoading}
                              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(application.id, 'REJECTED')}
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

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#16213e] rounded-xl border border-white/10 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Application Details</h2>
                <button onClick={() => setSelectedApplication(null)} className="text-white/60 hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Company Name</p>
                  <p className="font-medium">{selectedApplication.company_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Contact Person</p>
                    <p>{selectedApplication.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Tier Interest</p>
                    <div className="mt-1">{getTierBadge(selectedApplication.tier_interest)}</div>
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a href={`mailto:${selectedApplication.contact_email}`} className="text-[#4361ee] hover:underline flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {selectedApplication.contact_email}
                  </a>
                </div>
                {selectedApplication.contact_phone && (
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p>{selectedApplication.contact_phone}</p>
                  </div>
                )}
                {selectedApplication.website && (
                  <div>
                    <p className="text-white/60 text-sm">Website</p>
                    <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-[#4361ee] hover:underline">
                      {selectedApplication.website}
                    </a>
                  </div>
                )}
                {selectedApplication.message && (
                  <div>
                    <p className="text-white/60 text-sm">Message</p>
                    <p className="bg-[#0a0a1a] px-3 py-2 rounded text-sm">{selectedApplication.message}</p>
                  </div>
                )}
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Submitted</p>
                  <p>{new Date(selectedApplication.created_at).toLocaleString()}</p>
                </div>
              </div>

              {(selectedApplication.status === 'PENDING' || selectedApplication.status === 'UNDER_REVIEW') && (
                <>
                  <div className="mt-6">
                    <label className="block text-white/60 text-sm mb-2">Admin Notes (optional)</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes about this application..."
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4361ee]"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    {selectedApplication.status === 'PENDING' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedApplication.id, 'UNDER_REVIEW')}
                        disabled={actionLoading}
                        className="flex-1 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium transition-colors disabled:opacity-50"
                      >
                        Mark Under Review
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'APPROVED')}
                      disabled={actionLoading}
                      className="flex-1 py-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium transition-colors disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'REJECTED')}
                      disabled={actionLoading}
                      className="flex-1 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium transition-colors disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}

              {selectedApplication.admin_notes && selectedApplication.status !== 'PENDING' && selectedApplication.status !== 'UNDER_REVIEW' && (
                <div className="mt-6">
                  <p className="text-white/60 text-sm">Admin Notes</p>
                  <p className="bg-[#0a0a1a] px-3 py-2 rounded text-sm mt-1">{selectedApplication.admin_notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
