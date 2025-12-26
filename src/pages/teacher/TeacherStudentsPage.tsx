import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, Users, ArrowLeft, Mail, CheckCircle, XCircle, UserPlus, Copy, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUsers, User } from '../../lib/api';

export default function TeacherStudentsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Generate a mock invite code (in production this would come from the backend)
  const inviteCode = `STEM-${user?.id || '000'}-2025`;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await getUsers({ role: 'STUDENT' });
      setStudents(response.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              Teacher
            </div>
            <button
              onClick={handleLogout}
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
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Students</h1>
            <p className="text-white/60">Manage and view your registered students</p>
          </div>
        </div>

        {/* Invite Code Card */}
        <div className="bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#4361ee]" />
                Student Invite Code
              </h3>
              <p className="text-white/60 text-sm">Share this code with students to let them join your class</p>
            </div>
            <div className="flex items-center gap-3">
              <code className="bg-[#0a0a1a] px-4 py-2 rounded-lg font-mono text-lg">{inviteCode}</code>
              <button
                onClick={copyInviteCode}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Students List */}
        {loading ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60">Loading students...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/20 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={loadStudents}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-[#16213e] rounded-xl p-12 border border-white/10 text-center">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Students Yet</h3>
            <p className="text-white/60 mb-6">Share your invite code with students to get started</p>
            <div className="inline-flex items-center gap-2 bg-[#0a0a1a] px-6 py-3 rounded-lg">
              <code className="font-mono text-lg">{inviteCode}</code>
              <button onClick={copyInviteCode} className="text-[#4361ee] hover:text-[#4361ee]/80">
                {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4361ee] to-[#f72585] flex items-center justify-center font-semibold">
                          {student.first_name[0]}{student.last_name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{student.first_name} {student.last_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {student.is_verified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {student.team_id ? (
                        <span className="text-[#4361ee]">Team #{student.team_id}</span>
                      ) : (
                        <span className="text-white/40">Not assigned</span>
                      )}
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
