import { Link, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, User, School, Users, Settings, BarChart3, Calendar, Award, Play, Eye, FileQuestion } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleDisplay = () => {
    switch (user?.role) {
      case 'ADMIN':
        return { label: 'System Administrator', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'TEACHER':
        return { label: 'Teacher', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
      case 'STUDENT':
        return { label: 'Student', color: 'text-green-400', bgColor: 'bg-green-500/20' };
      default:
        return { label: 'User', color: 'text-white', bgColor: 'bg-white/20' };
    }
  };

  const roleInfo = getRoleDisplay();

  const getQuickActions = () => {
    switch (user?.role) {
            case 'ADMIN':
              return [
                { icon: School, label: 'Manage Schools', description: 'Review and approve school registrations', href: '/admin/schools' },
                { icon: Users, label: 'Manage Users', description: 'View and manage all users', href: '/admin/users' },
                { icon: FileQuestion, label: 'Question Bank', description: 'Manage and review STEM questions', href: '/admin/questions' },
                { icon: BarChart3, label: 'Statistics', description: 'View system statistics', href: '/admin/stats' },
                { icon: Settings, label: 'Settings', description: 'System configuration', href: '/admin/settings' },
                { icon: Play, label: 'Gameplay Preview', description: 'Preview match gameplay UI', href: '/play/match/5', highlight: true },
              ];
      case 'TEACHER':
        return [
          { icon: Users, label: 'My Students', description: 'View and manage your students', href: '/teacher/students' },
          { icon: Award, label: 'Teams', description: 'Create and manage teams', href: '/teacher/teams' },
          { icon: Calendar, label: 'Competitions', description: 'View upcoming competitions', href: '/teacher/competitions' },
          { icon: BarChart3, label: 'Results', description: 'View competition results', href: '/teacher/results' },
        ];
      case 'STUDENT':
        return [
          { icon: Award, label: 'My Team', description: 'View your team details', href: '/student/team' },
          { icon: Calendar, label: 'Competitions', description: 'View upcoming competitions', href: '/student/competitions' },
          { icon: BarChart3, label: 'My Results', description: 'View your competition results', href: '/student/results' },
          { icon: User, label: 'Profile', description: 'Update your profile', href: '/student/profile' },
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

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
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${roleInfo.bgColor} ${roleInfo.color}`}>
              {roleInfo.label}
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
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-white/60 text-lg">
            Here's your World STEM Cup dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {user?.role === 'ADMIN' && (
            <>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <School className="w-8 h-8 text-[#4361ee] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Registered Schools</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Users className="w-8 h-8 text-[#f72585] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Total Users</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Active Teams</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Calendar className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Competitions</p>
              </div>
            </>
          )}
          {user?.role === 'TEACHER' && (
            <>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Users className="w-8 h-8 text-[#4361ee] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">My Students</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-[#f72585] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">My Teams</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Calendar className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Upcoming Events</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <BarChart3 className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Competitions Won</p>
              </div>
            </>
          )}
          {user?.role === 'STUDENT' && (
            <>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-[#4361ee] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Team Rank</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Calendar className="w-8 h-8 text-[#f72585] mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Competitions Joined</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <BarChart3 className="w-8 h-8 text-yellow-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Total Points</p>
              </div>
              <div className="bg-[#16213e] rounded-xl p-6 border border-white/10">
                <Trophy className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-3xl font-bold">--</p>
                <p className="text-white/60 text-sm">Achievements</p>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`rounded-xl p-6 border transition-colors group ${
                  action.highlight 
                    ? 'bg-gradient-to-br from-[#4361ee]/20 to-[#f72585]/20 border-[#f72585]/50 hover:border-[#f72585]' 
                    : 'bg-[#16213e] border-white/10 hover:border-[#4361ee]/50'
                }`}
              >
                <action.icon className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform ${action.highlight ? 'text-[#f72585]' : 'text-[#4361ee]'}`} />
                <h3 className="font-semibold mb-1">{action.label}</h3>
                <p className="text-white/60 text-sm">{action.description}</p>
                {action.highlight && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-[#f72585]">
                    <Eye className="w-3 h-3" />
                    <span>Preview Mode</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="bg-[#16213e] rounded-xl p-8 border border-white/10 text-center">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No recent activity to display</p>
            <p className="text-white/40 text-sm mt-2">Your activity will appear here once you start participating</p>
          </div>
        </div>
      </main>
    </div>
  );
}
