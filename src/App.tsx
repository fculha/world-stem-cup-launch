import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Globe, School, Users, Shield, Gift, ChevronRight, ChevronDown,
  Star, Award, Target, Zap, CheckCircle, ArrowRight, Play,
  Medal, TrendingUp, Lock, Eye, MapPin, Loader2, AlertCircle, LogIn, X, Radio
} from 'lucide-react';

// API Configuration - Set VITE_API_URL in .env file for production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Registration Form Component
function RegistrationForm() {
  const [formData, setFormData] = useState({
    school_name: '',
    country: '',
    city: '',
    address: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_role: '',
    estimated_students: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const countries = [
    'Turkey', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy',
    'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland', 'Czech Republic',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Russia', 'Ukraine', 'Greece',
    'Portugal', 'Ireland', 'Canada', 'Australia', 'New Zealand', 'Japan', 'South Korea',
    'China', 'India', 'Singapore', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam',
    'Philippines', 'Brazil', 'Argentina', 'Mexico', 'Chile', 'Colombia', 'Peru',
    'South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Morocco', 'UAE', 'Saudi Arabia',
    'Israel', 'Pakistan', 'Bangladesh', 'Other'
  ].sort();

  const roles = [
    'Teacher',
    'Principal',
    'Vice Principal',
    'Department Head',
    'STEM Coordinator',
    'School Administrator',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/registration/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimated_students: formData.estimated_students ? parseInt(formData.estimated_students) : null,
          captcha_token: 'test-token' // Using test token for development
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      setSubmitStatus('success');
      setRegistrationId(data.registration_id);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-[#16213e] rounded-2xl p-8 border border-green-500/30 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4 text-green-400">Registration Submitted!</h3>
        <p className="text-white/70 mb-4">
          Thank you for registering your school. Please check your email ({formData.contact_email}) 
          to verify your email address.
        </p>
        <p className="text-white/50 text-sm mb-6">
          Registration ID: <span className="font-mono text-white/70">{registrationId}</span>
        </p>
        <div className="bg-white/5 rounded-lg p-4 text-left">
          <h4 className="font-semibold mb-2">Next Steps:</h4>
          <ol className="list-decimal list-inside text-white/60 space-y-2 text-sm">
            <li>Check your email inbox for a verification link</li>
            <li>Click the link to verify your email address</li>
            <li>Our team will review your registration</li>
            <li>You'll receive an approval notification within 48 hours</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#16213e] rounded-2xl p-8 border border-white/10">
      <h3 className="text-xl font-bold mb-6 text-center">School Registration Form</h3>
      
      {submitStatus === 'error' && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* School Name */}
        <div className="md:col-span-2">
          <label className="block text-sm text-white/70 mb-2">School Name *</label>
          <input
            type="text"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="Enter your school name"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4361ee] transition-colors"
          >
            <option value="" className="bg-[#16213e]">Select country</option>
            {countries.map(country => (
              <option key={country} value={country} className="bg-[#16213e]">{country}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm text-white/70 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="Enter city"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm text-white/70 mb-2">School Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="Enter full address (optional)"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Contact Person Name *</label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="Your full name"
          />
        </div>

        {/* Contact Role */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Your Role *</label>
          <select
            name="contact_role"
            value={formData.contact_role}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4361ee] transition-colors"
          >
            <option value="" className="bg-[#16213e]">Select your role</option>
            {roles.map(role => (
              <option key={role} value={role} className="bg-[#16213e]">{role}</option>
            ))}
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Email Address *</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="your.email@school.edu"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Phone Number</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="+1 234 567 8900 (optional)"
          />
        </div>

        {/* Estimated Students */}
        <div>
          <label className="block text-sm text-white/70 mb-2">Estimated Participating Students</label>
          <input
            type="number"
            name="estimated_students"
            value={formData.estimated_students}
            onChange={handleChange}
            min="1"
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="e.g., 50 (optional)"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm text-white/70 mb-2">School Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4361ee] transition-colors"
            placeholder="https://www.school.edu (optional)"
          />
        </div>
      </div>

      {/* reCAPTCHA placeholder */}
      <div ref={recaptchaRef} className="flex justify-center mb-6">
        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
          <Shield className="w-8 h-8 text-[#4361ee] mx-auto mb-2" />
          <p className="text-xs text-white/50">Protected by reCAPTCHA</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Register Your School
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-xs text-white/40 text-center mt-4">
        By registering, you agree to our Terms of Service and Privacy Policy.
        Your information will be reviewed by our team before approval.
      </p>
    </form>
  );
}

// Countdown component
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' },
      ].map((item, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-20">
          <div className="text-4xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
          <div className="text-sm text-white/70">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// Sponsor tier data
const sponsorTiers = [
  { tier: 'PLATINUM', price: '$50,000', color: 'from-purple-600 to-purple-800', companies: ['TechCorp Global'] },
  { tier: 'GOLD', price: '$25,000', color: 'from-yellow-500 to-yellow-700', companies: ['EduLearn Foundation', 'ScienceFirst Labs'] },
  { tier: 'SILVER', price: '$10,000', color: 'from-gray-400 to-gray-600', companies: ['MathGenius Inc', 'CodeAcademy Pro'] },
  { tier: 'BRONZE', price: '$5,000', color: 'from-orange-600 to-orange-800', companies: ['RoboTech Startup'] },
];

// Stats data
const stats = [
  { value: '100+', label: 'Countries', icon: Globe },
  { value: '5,000+', label: 'Schools', icon: School },
  { value: '50,000+', label: 'Students', icon: Users },
  { value: '$1M+', label: 'In Prizes', icon: Gift },
];

function App() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);

  // Scroll to section with offset for fixed navbar
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80; // approximate nav height
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'how-it-works', 'rewards', 'integrity', 'leaderboards', 'sponsors', 'coordinator'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/wsc-logo-full.png" alt="World STEM Cup" className="h-32 object-contain -my-8" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/about"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              to="/how-it-works"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/parents-schools"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Parents & Schools
            </Link>
            <Link 
              to="/education-fund"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Education Fund
            </Link>
            {['Rewards', 'Integrity', 'Sponsors'].map((item) => {
              const id = item.toLowerCase().replace(' ', '-');
              return (
                <button 
                  key={item}
                  onClick={() => scrollToSection(id)}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </button>
              );
            })}
            {/* Competition Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCompetitionDropdown(true)}
              onMouseLeave={() => setShowCompetitionDropdown(false)}
            >
              <button className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Competition
                <ChevronDown className={`w-3 h-3 transition-transform ${showCompetitionDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCompetitionDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link 
                    to="/world"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Overview
                  </Link>
                  <Link 
                    to="/states"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    All States
                  </Link>
                  <Link 
                    to="/state/MD"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Maryland Pilot
                  </Link>
                  <Link 
                    to="/dodea"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    DoDEA Schools
                  </Link>
                  <Link 
                    to="/bracket/current"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Playoff Bracket
                  </Link>
                  <Link 
                    to="/leaderboard"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Leaderboard
                  </Link>
                  <div className="border-t border-white/10 my-1"></div>
                  <Link 
                    to="/find-schools"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Find Schools
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/watch"
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              <div className="relative">
                <Radio className="w-4 h-4 text-red-400" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              Watch Live
            </Link>
            <Link 
              to="/login"
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>
          <Link 
            to="/register/school-admin" 
            className="bg-gradient-to-r from-[#4361ee] to-[#f72585] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Register Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0a0a1a] to-[#1a0a2e]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Season 1 Launching Soon</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The World's Premier
            <span className="block bg-gradient-to-r from-[#4361ee] via-[#7c3aed] to-[#f72585] bg-clip-text text-transparent">
              STEM Championship
            </span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Compete in Science, Technology, Engineering, and Math against students from 100+ countries. 
            Win scholarships, prizes, and global recognition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#register" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Register Your School
              <ArrowRight className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </button>
          </div>
          
          {/* Countdown */}
          <div className="mb-12">
            <p className="text-white/50 mb-4">Season 1 Starts In</p>
            <Countdown />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <stat.icon className="w-8 h-8 text-[#4361ee] mx-auto mb-3" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 rotate-90 text-white/50" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From your school to the world stage in four exciting rounds
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'School Round', desc: 'Form a team of 4 students + 1 mentor. Compete against other teams in your school.', icon: School, color: '#4361ee' },
              { step: 2, title: 'State/Regional', desc: 'Top teams advance to compete against schools in your state or region.', icon: MapPin, color: '#7c3aed' },
              { step: 3, title: 'National Finals', desc: 'Represent your state at the national championship. Win prizes and recognition.', icon: Award, color: '#f72585' },
              { step: 4, title: 'World Finals', desc: 'The best teams from each country compete for the World STEM Cup title.', icon: Trophy, color: '#ffd700' },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0"></div>
                )}
                <div className="relative z-10 bg-[#16213e] rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-colors">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <div className="text-sm text-white/40 mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-24 px-6 bg-gradient-to-b from-[#0a0a1a] to-[#1a1a3e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Rewards & Marketplace</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Earn points through competition and redeem them for amazing prizes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Earn Points</h3>
              <div className="space-y-4">
                {[
                  { event: 'Practice Streak', points: '+10', icon: Zap },
                  { event: 'Participation', points: '+30', icon: CheckCircle },
                  { event: 'Podium Finish', points: '+100', icon: Medal },
                  { event: 'National Champion', points: '+200', icon: Award },
                  { event: 'World Champion', points: '+300', icon: Trophy },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#4361ee]" />
                      <span>{item.event}</span>
                    </div>
                    <span className="text-green-400 font-bold">{item.points}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Redeem Rewards</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'STEM T-Shirt', points: 500, img: '👕' },
                  { name: 'Science Kit', points: 1500, img: '🔬' },
                  { name: 'Coding Course', points: 2000, img: '💻' },
                  { name: 'Robotics Kit', points: 3000, img: '🤖' },
                  { name: 'VIP Event Pass', points: 5000, img: '🎫' },
                  { name: 'Scholarship Entry', points: 10000, img: '🎓' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#16213e] rounded-xl p-4 border border-white/10 text-center hover:border-[#4361ee]/50 transition-colors">
                    <div className="text-4xl mb-2">{item.img}</div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-[#4361ee]">{item.points.toLocaleString()} pts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrity Section */}
      <section id="integrity" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fair Play & Integrity</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Advanced anti-cheat technology ensures every competition is fair
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'AI Proctoring', desc: 'Real-time monitoring with computer vision to detect suspicious behavior during matches.', icon: Eye },
              { title: 'Secure Environment', desc: 'Locked browser mode prevents access to external resources during competition.', icon: Lock },
              { title: 'Risk Scoring', desc: 'Machine learning algorithms flag anomalies for human review before results are finalized.', icon: Shield },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#16213e] to-[#1a1a3e] rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-[#f72585]/20 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-[#f72585]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboards Section */}
      <section id="leaderboards" className="py-24 px-6 bg-gradient-to-b from-[#0a0a1a] to-[#1a1a3e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Live Leaderboards</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Track rankings in real-time across all competition levels
            </p>
          </div>
          
          <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Top Teams - Global</h3>
              <div className="flex gap-2">
                {['Global', 'USA', 'Europe', 'Asia'].map((region) => (
                  <button key={region} className={`px-4 py-1 rounded-full text-sm ${region === 'Global' ? 'bg-[#4361ee]' : 'bg-white/10'}`}>
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { rank: 1, team: 'Team Atlas', school: 'Lincoln High School', country: '🇺🇸', score: 2450 },
                { rank: 2, team: 'Team Orion', school: 'Tokyo Tech High', country: '🇯🇵', score: 2380 },
                { rank: 3, team: 'Team Nova', school: 'Berlin Science Gymnasium', country: '🇩🇪', score: 2310 },
                { rank: 4, team: 'Team Phoenix', school: 'Sydney STEM Academy', country: '🇦🇺', score: 2250 },
                { rank: 5, team: 'Team Titan', school: 'Toronto Science School', country: '🇨🇦', score: 2180 },
              ].map((team, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-lg ${i === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold w-8 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-white/50'}`}>
                      {team.rank}
                    </span>
                    <span className="text-2xl">{team.country}</span>
                    <div>
                      <div className="font-bold">{team.team}</div>
                      <div className="text-sm text-white/50">{team.school}</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{team.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <a href="#" className="text-[#4361ee] hover:underline inline-flex items-center gap-1">
                View Full Leaderboard <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Sponsors</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Partnering with leading organizations to empower STEM education worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorTiers.map((tier, i) => (
              <div key={i} className="bg-[#16213e] rounded-2xl p-6 border border-white/10">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${tier.color}`}>
                  {tier.tier}
                </div>
                <div className="text-2xl font-bold mb-2">{tier.price}</div>
                <div className="text-sm text-white/50 mb-4">per season</div>
                <div className="space-y-2">
                  {tier.companies.map((company, j) => (
                    <div key={j} className="bg-white/5 rounded-lg p-3 text-sm text-center">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="mailto:sponsors@worldstemcup.com" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#7c3aed] px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Become a Sponsor
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* National Coordinator Section */}
      <section id="coordinator" className="py-24 px-6 bg-gradient-to-b from-[#1a1a3e] to-[#0a0a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#f72585]/20 px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4 text-[#f72585]" />
            <span className="text-sm text-[#f72585]">Opportunity</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">Become a National Coordinator</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Lead the World STEM Cup in your country. Recruit schools, organize national finals, 
            and earn commission on every registration. Join our global network of education leaders.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Recruit Schools', desc: 'Build your network of participating schools', icon: School },
              { title: 'Earn Commission', desc: '5% → 10% → 15% tiered earnings', icon: TrendingUp },
              { title: 'Make Impact', desc: 'Empower STEM education in your country', icon: Target },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <item.icon className="w-8 h-8 text-[#f72585] mx-auto mb-4" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <a 
            href="mailto:coordinators@worldstemcup.com" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f72585] to-[#7c3aed] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 px-6 bg-gradient-to-b from-[#1a1a3e] to-[#0a0a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#4361ee]/20 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 text-[#4361ee]" />
              <span className="text-sm text-[#4361ee]">Registration Now Open</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">Register Your School</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Join the World STEM Cup Season 1 and compete against schools from 100+ countries. 
              Fill out the form below to register your school.
            </p>
          </div>
          
          <RegistrationForm />
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Free to Participate', desc: 'No registration fees for schools', icon: Gift },
              { title: 'Global Competition', desc: 'Compete with 100+ countries', icon: Globe },
              { title: 'Win Prizes', desc: 'Scholarships and rewards', icon: Trophy },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                <item.icon className="w-8 h-8 text-[#4361ee] mx-auto mb-4" />
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/wsc-trophy.png" alt="World STEM Cup" className="w-6 h-6 object-contain" />
                <span className="font-bold">World STEM Cup</span>
              </div>
              <p className="text-sm text-white/50">
                The world's premier STEM championship for students aged 13-18.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Competition</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link to="/parents-schools" className="hover:text-white">Parents & Schools</Link></li>
                <li><Link to="/education-fund" className="hover:text-white">Education Fund</Link></li>
                <li><Link to="/world" className="hover:text-white">World Cup</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white">Leaderboards</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white">Teacher Handbook</a></li>
                <li><a href="#" className="hover:text-white">Press Kit</a></li>
                <li><a href="#" className="hover:text-white">Brand Guidelines</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li>support@worldstemcup.com</li>
                <li>sponsors@worldstemcup.com</li>
                <li>press@worldstemcup.com</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <p className="text-sm text-white/50">© 2025 World STEM Cup. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-white/50 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-white/50 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-white/50 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4">
            {/* Close button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="text-sm">Close</span>
              <X className="w-6 h-6" />
            </button>
            
            {/* Video container */}
            <div className="bg-[#0a0a1a] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <video
                controls
                autoPlay
                playsInline
                className="w-full aspect-video"
                src="/videos/world_stem_cup_explainer.mp4"
                poster="/videos/poster.png"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Video info */}
              <div className="p-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-2">World STEM Cup - Official Introduction</h3>
                <p className="text-white/60 text-sm">
                  Learn how the World STEM Cup works, from school rounds to the world finals. 
                  Created by Fatih Culha.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
