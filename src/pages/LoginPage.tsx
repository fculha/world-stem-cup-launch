import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Mail, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      const from = (location.state as { from?: { pathname: string; search?: string; hash?: string } })?.from;
      if (from && typeof from === 'object' && 'pathname' in from) {
        const path = from.pathname + (from.search || '') + (from.hash || '');
        navigate(path, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-yellow-400" />
              <span className="text-2xl font-bold">World STEM Cup</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/60">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-[#16213e] rounded-2xl p-8 border border-white/10">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="your.email@school.edu"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Links */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <Link to="/register/school-admin" className="text-[#4361ee] hover:underline">
                  Register your school
                </Link>
              </p>
              <p className="text-white/60 text-sm">
                Have an invite code?{' '}
                <Link to="/register/teacher" className="text-[#4361ee] hover:underline">
                  Join as Teacher
                </Link>
                {' or '}
                <Link to="/register/student" className="text-[#4361ee] hover:underline">
                  Join as Student
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
