import { useState, useEffect } from 'react';
import { 
  Trophy, Globe, School, Users, Shield, Gift, ChevronRight, 
  Star, Award, Target, Zap, CheckCircle, ArrowRight, Play,
  Medal, TrendingUp, Lock, Eye, MapPin
} from 'lucide-react';

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
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">World STEM Cup</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['How It Works', 'Rewards', 'Integrity', 'Sponsors'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a 
            href="#register" 
            className="bg-gradient-to-r from-[#4361ee] to-[#f72585] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Register Now
          </a>
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
            <a 
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </a>
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#4361ee]/20 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#4361ee]" />
            <span className="text-sm text-[#4361ee]">Registration Opening Soon</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">Register Your School</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Be among the first schools to join the World STEM Cup Season 1. 
            Registration will open soon. Contact us to express your interest and get early access.
          </p>
          
          <div className="bg-[#16213e] rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-xl font-bold mb-4">Express Your Interest</h3>
            <p className="text-white/50 mb-6">
              Send us an email with your school name, country, and contact details. 
              We'll notify you as soon as registration opens.
            </p>
            <a 
              href="mailto:register@worldstemcup.com?subject=School%20Registration%20Interest&body=School%20Name:%0ACountry:%0AContact%20Person:%0AEmail:%0APhone:" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Contact Us to Register
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Free to Participate', desc: 'No registration fees for schools', icon: Gift },
              { title: 'Global Competition', desc: 'Compete with 100+ countries', icon: Globe },
              { title: 'Win Prizes', desc: 'Scholarships and rewards', icon: Trophy },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
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
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="font-bold">World STEM Cup</span>
              </div>
              <p className="text-sm text-white/50">
                The world's premier STEM championship for students aged 13-18.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Competition</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Rules & Regulations</a></li>
                <li><a href="#" className="hover:text-white">Practice Mode</a></li>
                <li><a href="#" className="hover:text-white">Leaderboards</a></li>
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
    </div>
  );
}

export default App;
