import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Lock, Key, Phone, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth, TeacherRegisterData } from '../contexts/AuthContext';

export default function RegisterTeacherPage() {
  const [formData, setFormData] = useState<TeacherRegisterData>({
    invite_code: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { registerTeacher } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    const result = await registerTeacher(formData);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
        </div>

        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md text-center">
            <div className="bg-[#16213e] rounded-2xl p-8 border border-green-500/30">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-green-400">Registration Successful!</h2>
              <p className="text-white/70 mb-6">
                Your teacher account has been created. You can now log in and start managing your students.
              </p>
              <Link
                to="/login"
                className="inline-block bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold mb-2">Join as Teacher</h1>
            <p className="text-white/60">Use your school's invite code to register</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-[#16213e] rounded-2xl p-8 border border-white/10">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Invite Code */}
              <div>
                <label className="block text-sm text-white/70 mb-2">School Invite Code *</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="invite_code"
                    value={formData.invite_code}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors uppercase"
                    placeholder="Enter invite code"
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">Get this code from your school administrator</p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="your.email@school.edu"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="+1 234 567 8900 (optional)"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                  placeholder="e.g., Science, Math (optional)"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="Min. 8 characters"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-white/70 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
                    placeholder="Confirm your password"
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
                  Registering...
                </>
              ) : (
                'Register as Teacher'
              )}
            </button>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-[#4361ee] hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="text-white/60 text-sm">
                Don't have an invite code?{' '}
                <Link to="/register/school-admin" className="text-[#4361ee] hover:underline">
                  Register your school first
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
