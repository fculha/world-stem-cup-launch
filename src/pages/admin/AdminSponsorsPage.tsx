import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, DollarSign, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface ContributionData {
  id: number;
  sponsor_id: number | null;
  season_id: number | null;
  amount_cents: number;
  currency: string;
  tier: string | null;
  source: string;
  status: 'PLEDGED' | 'VERIFIED' | 'REJECTED';
  public_display: boolean;
  display_label: string | null;
  message: string | null;
  organization_name: string | null;
  contact_person: string | null;
  contact_email: string | null;
  country: string | null;
  verified_at: string | null;
  verification_notes: string | null;
  created_at: string;
}

interface ContributionsResponse {
  contributions: ContributionData[];
  total: number;
  limit: number;
  offset: number;
}

export default function AdminSponsorsPage() {
  const { user, accessToken, logout } = useAuth();
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedContribution, setSelectedContribution] = useState<ContributionData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [statusCounts, setStatusCounts] = useState({ PLEDGED: 0, VERIFIED: 0, REJECTED: 0 });

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status_filter', statusFilter);
      
      const response = await fetch(`${API_URL}/api/sponsors/contributions/admin?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch contributions');
      }
      
      const data: ContributionsResponse = await response.json();
      setContributions(data.contributions);
      
      const counts = { PLEDGED: 0, VERIFIED: 0, REJECTED: 0 };
      data.contributions.forEach(c => {
        if (c.status in counts) {
          counts[c.status as keyof typeof counts]++;
        }
      });
      setStatusCounts(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, [statusFilter, accessToken]);

  const handleVerify = async (contributionId: number) => {
    try {
      setActionLoading(true);
      const params = new URLSearchParams();
      if (verificationNotes) params.append('notes', verificationNotes);
      
      const response = await fetch(`${API_URL}/api/sponsors/contributions/${contributionId}/verify?${params}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify contribution');
      }
      
      await fetchContributions();
      setSelectedContribution(null);
      setVerificationNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (contributionId: number) => {
    try {
      setActionLoading(true);
      const params = new URLSearchParams();
      if (verificationNotes) params.append('notes', verificationNotes);
      
      const response = await fetch(`${API_URL}/api/sponsors/contributions/${contributionId}/reject?${params}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject contribution');
      }
      
      await fetchContributions();
      setSelectedContribution(null);
      setVerificationNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLEDGED':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Pledged</span>;
      case 'VERIFIED':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Verified</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Rejected</span>;
      default:
        return null;
    }
  };

  const getTierBadge = (tier: string | null) => {
    if (!tier) return null;
    const colors: Record<string, string> = {
      PLATINUM: 'bg-gray-300/20 text-gray-300',
      GOLD: 'bg-yellow-500/20 text-yellow-400',
      SILVER: 'bg-gray-400/20 text-gray-400',
      BRONZE: 'bg-orange-500/20 text-orange-400',
      CUSTOM: 'bg-purple-500/20 text-purple-400'
    };
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[tier] || 'bg-white/10 text-white/60'}`}>{tier}</span>;
  };

  const formatAmount = (cents: number) => {
    return `$${(cents / 100).toLocaleString()}`;
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
            <h1 className="text-3xl font-bold mb-2">Manage Sponsorships</h1>
            <p className="text-white/60">Review and verify sponsorship contributions</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.PLEDGED} Pledged
            </div>
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
              {statusCounts.VERIFIED} Verified
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
              <option value="PLEDGED">Pledged</option>
              <option value="VERIFIED">Verified</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <Link 
            to="/sponsors" 
            target="_blank"
            className="px-4 py-3 bg-[#4361ee] hover:bg-[#3451de] rounded-lg text-sm font-medium transition-colors"
          >
            View Public Transparency Page
          </Link>
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
            <p className="text-white/60">Loading contributions...</p>
          </div>
        ) : contributions.length === 0 ? (
          <div className="text-center py-12 bg-[#16213e] rounded-xl border border-white/10">
            <DollarSign className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No sponsorship contributions found</p>
          </div>
        ) : (
          /* Contributions Table */
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Organization</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Tier</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {contributions.map((contribution) => (
                  <tr key={contribution.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <p className="font-medium">{contribution.organization_name || 'Unknown'}</p>
                      <p className="text-sm text-white/60">{contribution.contact_email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#4361ee]">{formatAmount(contribution.amount_cents)}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getTierBadge(contribution.tier)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(contribution.status)}
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {new Date(contribution.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedContribution(contribution)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {contribution.status === 'PLEDGED' && (
                          <>
                            <button
                              onClick={() => handleVerify(contribution.id)}
                              disabled={actionLoading}
                              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                              title="Verify"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(contribution.id)}
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

        {/* Contribution Details Modal */}
        {selectedContribution && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#16213e] rounded-xl border border-white/10 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Contribution Details</h2>
                <button onClick={() => setSelectedContribution(null)} className="text-white/60 hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Organization</p>
                  <p className="font-medium">{selectedContribution.organization_name || 'Unknown'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Amount</p>
                    <p className="font-bold text-[#4361ee] text-xl">{formatAmount(selectedContribution.amount_cents)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Tier</p>
                    <div className="mt-1">{getTierBadge(selectedContribution.tier)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Contact Person</p>
                    <p>{selectedContribution.contact_person || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Country</p>
                    <p>{selectedContribution.country || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p>{selectedContribution.contact_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Source</p>
                  <p>{selectedContribution.source}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Public Display</p>
                  <p>{selectedContribution.public_display ? 'Yes' : 'No (Anonymous)'}</p>
                </div>
                {selectedContribution.display_label && (
                  <div>
                    <p className="text-white/60 text-sm">Display Label</p>
                    <p>{selectedContribution.display_label}</p>
                  </div>
                )}
                {selectedContribution.message && (
                  <div>
                    <p className="text-white/60 text-sm">Message</p>
                    <p className="bg-[#0a0a1a] px-3 py-2 rounded text-sm">{selectedContribution.message}</p>
                  </div>
                )}
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedContribution.status)}</div>
                </div>
                {selectedContribution.verified_at && (
                  <div>
                    <p className="text-white/60 text-sm">Verified At</p>
                    <p>{new Date(selectedContribution.verified_at).toLocaleString()}</p>
                  </div>
                )}
                {selectedContribution.verification_notes && (
                  <div>
                    <p className="text-white/60 text-sm">Verification Notes</p>
                    <p className="bg-[#0a0a1a] px-3 py-2 rounded text-sm">{selectedContribution.verification_notes}</p>
                  </div>
                )}
              </div>

              {selectedContribution.status === 'PLEDGED' && (
                <>
                  <div className="mt-6">
                    <label className="text-white/60 text-sm block mb-2">Verification Notes (optional)</label>
                    <textarea
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a1a] border border-white/10 rounded-lg focus:outline-none focus:border-[#4361ee] text-white"
                      rows={3}
                      placeholder="Add notes about this verification..."
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleVerify(selectedContribution.id)}
                      disabled={actionLoading}
                      className="flex-1 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Verify Contribution'}
                    </button>
                    <button
                      onClick={() => handleReject(selectedContribution.id)}
                      disabled={actionLoading}
                      className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
