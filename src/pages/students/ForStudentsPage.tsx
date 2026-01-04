import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Calculator, Atom, Code, Dna, Brain, BarChart3, 
  ChevronDown, Globe, Shield, GraduationCap, Languages,
  Target, Award, CheckCircle, ArrowRight, Lightbulb
} from 'lucide-react';

// Subject domains with icons
const subjects = [
  { id: 'math', name: 'Mathematics', icon: Calculator, emoji: '🧮', description: 'Algebra, functions, geometry, logical reasoning, and foundational calculus concepts.' },
  { id: 'physics', name: 'Physics', icon: Atom, emoji: '⚛️', description: 'Mechanics, electricity, waves, energy, and core physical principles.' },
  { id: 'cs', name: 'Computer Science & Logical Thinking', icon: Code, emoji: '💻', description: 'Algorithms, logic structures, computational reasoning, and problem-solving concepts (coding experience is not required).' },
  { id: 'biology', name: 'Biology', icon: Dna, emoji: '🧬', description: 'Cell biology, genetics, ecosystems, and scientific interpretation.', optional: true },
  { id: 'reasoning', name: 'Scientific Reasoning & Problem Solving', icon: Lightbulb, emoji: '🌍', description: 'Hypothesis building, experimental thinking, cause-effect analysis.' },
  { id: 'data', name: 'Data Interpretation', icon: BarChart3, emoji: '📊', description: 'Reading charts, tables, graphs, and real-world datasets.' },
  { id: 'critical', name: 'Critical Thinking', icon: Brain, emoji: '🧠', description: 'Multi-step reasoning, inference, analytical judgment, and elimination strategies.' },
];

export default function ForStudentsPage() {
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);
  const [showStudentsDropdown, setShowStudentsDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-3 mr-8">
            <img src="/wsc-logo-full.png" alt="World STEM Cup" className="h-32 object-contain -my-8" />
          </Link>
          <div className="hidden md:flex items-center gap-8 flex-1">
            <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">About</Link>
            <Link to="/how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">How It Works</Link>
            <Link to="/parents-schools" className="text-sm text-white/70 hover:text-white transition-colors">Parents & Schools</Link>
            <Link to="/education-fund" className="text-sm text-white/70 hover:text-white transition-colors">Education Fund</Link>
            <Link to="/sponsors" className="text-sm text-white/70 hover:text-white transition-colors">Sponsors</Link>
            
            {/* Students Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowStudentsDropdown(v => !v); setShowGovernanceDropdown(false); setShowCompetitionDropdown(false); }}
                className="text-sm text-white font-medium hover:text-white transition-colors flex items-center gap-1"
              >
                <GraduationCap className="w-4 h-4" />
                Students
                <ChevronDown className={`w-3 h-3 transition-transform ${showStudentsDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showStudentsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link 
                    to="/students/for-students"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    For Students
                  </Link>
                  <Link 
                    to="/students/study-practice"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Study & Practice
                  </Link>
                </div>
              )}
            </div>
            
            {/* Governance Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowGovernanceDropdown(v => !v); setShowCompetitionDropdown(false); setShowStudentsDropdown(false); }}
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                Governance
                <ChevronDown className={`w-3 h-3 transition-transform ${showGovernanceDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showGovernanceDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link to="/governance" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Overview</Link>
                  <Link to="/governance/academic-independence" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Academic Independence</Link>
                  <Link to="/governance/conflict-of-interest" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Conflict of Interest</Link>
                  <Link to="/governance/data-protection-child-safety" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Data Protection & Child Safety</Link>
                  <Link to="/governance/organizational-structure" onClick={() => setShowGovernanceDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Organizational Structure</Link>
                </div>
              )}
            </div>
            
            {/* Competition Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowCompetitionDropdown(v => !v); setShowGovernanceDropdown(false); setShowStudentsDropdown(false); }}
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                Competition
                <ChevronDown className={`w-3 h-3 transition-transform ${showCompetitionDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCompetitionDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  <Link to="/world" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Overview</Link>
                  <Link to="/states" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">All States</Link>
                  <Link to="/state/MD" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Maryland Pilot</Link>
                  <Link to="/dodea" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">DoDEA Schools</Link>
                  <Link to="/bracket/current" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Playoff Bracket</Link>
                  <Link to="/leaderboard" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Leaderboard</Link>
                  <div className="border-t border-white/10 my-1"></div>
                  <Link to="/find-schools" onClick={() => setShowCompetitionDropdown(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Find Schools</Link>
                </div>
              )}
            </div>
          </div>
          <Link 
            to="/register/school-admin" 
            className="bg-gradient-to-r from-[#4361ee] to-[#f72585] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Register Now
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#4361ee] rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#f72585] rounded-full filter blur-[128px]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-5 h-5 text-[#4361ee]" />
            <span className="text-sm font-medium">For Students</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Prepare, Learn, Compete
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            World STEM Cup is designed not only as a competition, but as a learning pathway for students 
            who want to strengthen their scientific thinking, problem-solving skills, and global academic readiness.
          </p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Regardless of where you live or which school you attend, World STEM Cup provides a fair and transparent 
            environment where <strong className="text-white">merit, reasoning, and understanding</strong> matter most.
          </p>
          
          <div className="mt-10">
            <Link 
              to="/students/study-practice"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Competition Subjects */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-[#4361ee]" />
              Competition Subjects
            </h2>
            <p className="text-white/70">Students are evaluated across the following academic domains</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
                <div 
                  key={subject.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{subject.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        {subject.name}
                        {subject.optional && (
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded">optional</span>
                        )}
                      </h3>
                      <p className="text-sm text-white/60">{subject.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 px-6 py-3 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white/80">
                All questions are designed to measure <strong className="text-white">understanding and reasoning</strong> — not memorization.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Learn in Your Language */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-[#4361ee] to-[#f72585] rounded-2xl flex items-center justify-center">
                  <Languages className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                  <Globe className="w-8 h-8 text-[#4361ee]" />
                  Learn in Your Own Language
                </h2>
                <p className="text-white/70 mb-6">
                  World STEM Cup supports multilingual learning. Students can:
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Study concepts in their native language
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    View scientific terminology in English
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Prepare at their own pace, regardless of local educational limitations
                  </li>
                </ul>
                <p className="mt-6 text-lg font-medium text-white">
                  This ensures that language is never a disadvantage in scientific excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Learning to Competition */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-[#f72585]" />
              From Learning to Competition
            </h2>
            <p className="text-white/70">World STEM Cup provides a structured pathway to success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#4361ee] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
              <p className="text-white/60">
                Study & practice materials aligned with competition topics
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7c3aed] to-[#f72585] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Evaluation</h3>
              <p className="text-white/60">
                Clear and transparent evaluation criteria for all participants
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#f72585] to-[#4361ee] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Progression</h3>
              <p className="text-white/60">
                A structured progression from local to global stages
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 rounded-2xl p-6 border border-white/10">
              <p className="text-xl font-medium text-white">
                Your success is determined <strong>only</strong> by your academic performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calculator className="w-8 h-8 text-[#4361ee]" />
              Sample Questions
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              These are sample questions designed to demonstrate the style and level of World STEM Cup assessments. 
              They are not full exams and are provided for familiarization only.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 px-4 py-2 rounded-full mt-4">
              <GraduationCap className="w-5 h-5 text-[#4361ee]" />
              <span className="text-sm font-medium">Grade 9 - Sample Questions (Revised / Higher Level)</span>
            </div>
          </div>

          {/* Mathematics Questions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🧮</span>
              MATHEMATICS - Grade 9
            </h3>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#4361ee] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Multi-Step Linear Reasoning</h4>
                </div>
                <p className="text-white/80 mb-4">Solve for x:</p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-center text-lg mb-4">
                  2(3x - 4) - (x + 5) = 3(x - 2) + 7
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Answer: x = 7</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p><strong>Left side:</strong> 6x - 8 - x - 5 = 5x - 13</p>
                      <p><strong>Right side:</strong> 3x - 6 + 7 = 3x + 1</p>
                      <p><strong>Equation:</strong> 5x - 13 = 3x + 1</p>
                      <p>2x = 14 → x = 7</p>
                      <p className="mt-2 text-white/50">Verification: left = 2(21-4)-(7+5) = 2(17)-12 = 34-12 = 22, right = 3(7-2)+7 = 15+7 = 22</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#4361ee] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Fraction & Variable Reasoning</h4>
                </div>
                <p className="text-white/80 mb-4">If the following equation is true, find x:</p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-center text-lg mb-4">
                  x / (x + 2) = 3 / 5
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Answer: x = 3</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p><strong>Cross multiply:</strong> 5x = 3(x + 2)</p>
                      <p>5x = 3x + 6</p>
                      <p>2x = 6 → x = 3</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#4361ee] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Functional Thinking (Early Algebra)</h4>
                </div>
                <p className="text-white/80 mb-4">If f(x) = 2x² - x, what is the value of f(3)?</p>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Answer: f(3) = 15</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>f(3) = 2(3)² - 3 = 2(9) - 3 = 18 - 3 = 15</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Logical Thinking Questions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              LOGICAL THINKING - Grade 9 (Harder)
            </h3>
            
            <div className="space-y-6">
              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f72585] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Non-Obvious Pattern</h4>
                </div>
                <p className="text-white/80 mb-4">Find the next number in the sequence:</p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-center text-lg mb-4">
                  1, 4, 9, 16, 25, ?
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Answer: 36</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>These are perfect squares: 1², 2², 3², 4², 5²</p>
                      <p>Next: 6² = 36</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f72585] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Logical Elimination</h4>
                </div>
                <p className="text-white/80 mb-4">A student says:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 italic text-white/70">
                  "All students who study regularly pass the exam. Ali passed the exam."
                </div>
                <p className="text-white/80 mb-4">Which statement is logically correct?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Ali studied regularly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Ali did not study regularly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) We cannot be certain whether Ali studied regularly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) No student studied regularly</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) We cannot be certain</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Passing the exam is not a sufficient condition for studying regularly - it's only a necessary condition.</p>
                      <p>Ali could have passed for other reasons (e.g., natural talent, luck, etc.).</p>
                      <p>We only know that studying regularly guarantees passing, not that passing means someone studied regularly.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Physics Questions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">⚛️</span>
              PHYSICS - Grade 9
            </h3>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#7c3aed] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Motion & Reasoning</h4>
                </div>
                <p className="text-white/80 mb-4">
                  A car moves at a constant speed of 10 m/s for 5 seconds, then instantly increases its speed to 20 m/s and continues for another 5 seconds.
                </p>
                <p className="text-white/80 mb-4">What is the total distance traveled?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 100 m</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 125 m</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 150 m</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 200 m</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) 150 m</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p><strong>First part:</strong> 10 m/s × 5 s = 50 m</p>
                      <p><strong>Second part:</strong> 20 m/s × 5 s = 100 m</p>
                      <p><strong>Total distance:</strong> 50 + 100 = 150 m</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#7c3aed] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Forces & Equilibrium</h4>
                </div>
                <p className="text-white/80 mb-4">A book is resting on a table and is not moving.</p>
                <p className="text-white/80 mb-4">Which statement is correct?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) No forces act on the book</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Gravity acts, but there is no opposing force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gravity and an equal upward force act on the book</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The book has no mass</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Gravity and an equal upward force act on the book</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Gravity pulls the book downward.</p>
                      <p>The table provides an equal upward normal force.</p>
                      <p>Forces are balanced → no motion.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#7c3aed] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Energy Transformation</h4>
                </div>
                <p className="text-white/80 mb-4">A ball is dropped from a height and falls freely to the ground.</p>
                <p className="text-white/80 mb-4">Which energy transformation occurs during the fall?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Kinetic → potential</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Potential → kinetic</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Thermal → kinetic</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Electrical → mechanical</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Potential → kinetic</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>At the top: gravitational potential energy</p>
                      <p>As it falls: energy becomes kinetic energy</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#7c3aed] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Density & Floating</h4>
                </div>
                <p className="text-white/80 mb-4">Two objects have the same volume but different masses.</p>
                <p className="text-white/80 mb-2">Object A sinks in water.</p>
                <p className="text-white/80 mb-4">Object B floats.</p>
                <p className="text-white/80 mb-4">What can be concluded?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Object A has lower density than water</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Object B has higher density than water</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Object A has higher density than water</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Both objects have the same density</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Object A has higher density than water</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Objects sink if their density is greater than water.</p>
                      <p>Floating means lower density.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#7c3aed] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Simple Circuits</h4>
                </div>
                <p className="text-white/80 mb-4">A circuit contains a battery, a bulb, and a switch.</p>
                <p className="text-white/80 mb-4">When the switch is open, the bulb is off. Why?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The battery stops working</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electric current cannot complete the circuit</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The bulb has no resistance</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The wires lose electrons</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Electric current cannot complete the circuit</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Electric current requires a closed path.</p>
                      <p>Open switch = broken circuit = no current.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Logical & Scientific Reasoning Questions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              LOGICAL & SCIENTIFIC REASONING - Grade 9
            </h3>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Cause & Effect</h4>
                </div>
                <p className="text-white/80 mb-4">
                  A student performs an experiment and notices that when the temperature increases, the reaction happens faster.
                </p>
                <p className="text-white/80 mb-4">Which conclusion is most reasonable?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Temperature causes the reaction to stop</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Temperature has no effect on reactions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Higher temperature increases reaction rate</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Reactions only depend on time</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Higher temperature increases reaction rate</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Increasing temperature generally increases particle motion, leading to more frequent and energetic collisions.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Controlled Experiments</h4>
                </div>
                <p className="text-white/80 mb-4">
                  In an experiment testing plant growth, a student changes only the amount of sunlight while keeping all other conditions the same.
                </p>
                <p className="text-white/80 mb-4">Why is this important?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) To make the experiment faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) To reduce the number of plants</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) To isolate the effect of sunlight</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) To increase randomness</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) To isolate the effect of sunlight</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Changing only one variable allows the student to determine its direct effect.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Logical Consistency</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement is logically valid?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) If it rains, the ground is wet. The ground is wet, so it rained.</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) If it rains, the ground is wet. It rained, so the ground is wet.</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The ground is wet only when it rains.</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Wet ground causes rain.</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) If it rains, the ground is wet. It rained, so the ground is wet.</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This follows correct if-then logic.</p>
                      <p>Option A is a common logical fallacy (affirming the consequent).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Hypothesis Evaluation</h4>
                </div>
                <p className="text-white/80 mb-4">A hypothesis states:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 italic text-white/70">
                  "Students who sleep at least 8 hours perform better on tests."
                </div>
                <p className="text-white/80 mb-4">Which evidence best supports this hypothesis?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A survey of favorite subjects</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Test scores compared with sleep duration</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Teacher opinions about sleep</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Number of students in each class</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Test scores compared with sleep duration</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Data directly linking sleep duration and test performance is required.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Error Detection</h4>
                </div>
                <p className="text-white/80 mb-4">
                  A student concludes that a new fertilizer improves plant growth after testing it on only one plant.
                </p>
                <p className="text-white/80 mb-4">What is the main flaw?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The fertilizer was expensive</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The experiment lacked repetition</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The plant was too small</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The soil type was unknown</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The experiment lacked repetition</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>A single trial is not sufficient to draw reliable conclusions.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Data Interpretation Questions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              DATA INTERPRETATION - Grade 9
            </h3>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Table Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">A table shows the number of books read by students in one month:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 overflow-x-auto">
                  <table className="w-full text-white/80 text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 px-3">Student</th>
                        <th className="text-left py-2 px-3">Books Read</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10"><td className="py-2 px-3">A</td><td className="py-2 px-3">2</td></tr>
                      <tr className="border-b border-white/10"><td className="py-2 px-3">B</td><td className="py-2 px-3">5</td></tr>
                      <tr className="border-b border-white/10"><td className="py-2 px-3">C</td><td className="py-2 px-3">3</td></tr>
                      <tr><td className="py-2 px-3">D</td><td className="py-2 px-3">10</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/80 mb-4">Which statement is correct?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Student B read the most books</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Student D read more than the average</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Student A read more than Student C</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The average number of books is 10</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Student D read more than the average</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Total books = 2 + 5 + 3 + 10 = 20</p>
                      <p>Average = 20 / 4 = 5</p>
                      <p>Student D read 10, which is more than the average (5).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Graph Reasoning (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">
                  A line graph shows that the temperature increases steadily from morning to noon, then decreases in the afternoon.
                </p>
                <p className="text-white/80 mb-4">What is the best interpretation?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Temperature is random</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Temperature only increases</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Temperature reaches a peak around noon</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Temperature is highest in the morning</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Temperature reaches a peak around noon</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>A steady increase followed by a decrease indicates a maximum point around noon.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Percentage Change</h4>
                </div>
                <p className="text-white/80 mb-4">A class has 40 students. 10 students are absent one day.</p>
                <p className="text-white/80 mb-4">What percentage of students are present?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 20%</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 25%</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 75%</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 80%</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) 75%</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Present students = 40 - 10 = 30</p>
                      <p>Percentage = 30 / 40 = 0.75 = 75%</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Comparing Data Sets</h4>
                </div>
                <p className="text-white/80 mb-4">Two classes take the same test.</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 text-sm">
                  <p>Class A average score: 70</p>
                  <p>Class B average score: 70</p>
                </div>
                <p className="text-white/80 mb-4">Which conclusion is correct?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Both classes performed identically</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Class A had no low scores</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Class B had no high scores</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) More information is needed</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) More information is needed</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Same average does not mean same distribution.</p>
                      <p>We need information about score spread (variance, range, etc.).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Real-Life Data Reasoning</h4>
                </div>
                <p className="text-white/80 mb-4">
                  A survey shows that students who exercise regularly report higher concentration levels.
                </p>
                <p className="text-white/80 mb-4">Which conclusion is most reasonable?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Exercise guarantees academic success</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Concentration causes exercise</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Exercise may be associated with concentration</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Students should stop studying</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Exercise may be associated with concentration</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The data suggests a relationship (correlation), not absolute causation.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Mathematics - Derivatives */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📐</span>
              MATHEMATICS (Derivatives) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Conceptual Understanding, Graphical Interpretation, Optimization, Motion & Rate of Change, Chain Rule</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#3b82f6] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Conceptual Understanding</h4>
                </div>
                <p className="text-white/80 mb-4">A function f(x) is continuous on an interval.</p>
                <p className="text-white/80 mb-4">Which of the following statements is always true?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) If f'(x) = 0 at a point, the function has a maximum there</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) If f'(x) &gt; 0, the function is increasing at that point</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) If f'(x) does not exist, the function is discontinuous</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) If f'(x) is constant, the function must be quadratic</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) If f'(x) &gt; 0, the function is increasing at that point</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Positive derivative means the function is increasing locally.</p>
                      <p>A is false: f'(x) = 0 could be an inflection point.</p>
                      <p>C is false: |x| has no derivative at x=0 but is continuous.</p>
                      <p>D is false: constant derivative means linear function.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#3b82f6] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Graphical Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">The graph of f(x) is shown (imagine a smooth curve).</p>
                <p className="text-white/80 mb-4">At which point does the function change from concave up to concave down?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Where f'(x) = 0</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Where f''(x) = 0 and changes sign</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Where the function crosses the x-axis</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Where the slope is maximum</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Where f''(x) = 0 and changes sign</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This is the definition of an inflection point.</p>
                      <p>The second derivative determines concavity, and a sign change indicates the transition.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#3b82f6] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Chain Rule</h4>
                </div>
                <p className="text-white/80 mb-4">Let f(x) = (3x² - 5)⁴</p>
                <p className="text-white/80 mb-4">Find f'(x).</p>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Answer: f'(x) = 24x(3x² - 5)³</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Using the chain rule:</p>
                      <p>f'(x) = 4(3x² - 5)³ · 6x = 24x(3x² - 5)³</p>
                      <p className="mt-2 italic">Why this matters: Chain rule is fundamental in AI, physics, optimization, and neural networks.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#3b82f6] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Rate of Change</h4>
                </div>
                <p className="text-white/80 mb-4">The position of a particle is given by:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  s(t) = t³ - 6t² + 9t
                </div>
                <p className="text-white/80 mb-4">What is the velocity at t = 2?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 1</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 3</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 9</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 12</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: -3</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Velocity is the derivative of position:</p>
                      <p>v(t) = s'(t) = 3t² - 12t + 9</p>
                      <p>v(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#3b82f6] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Optimization</h4>
                </div>
                <p className="text-white/80 mb-4">A rectangle has a perimeter of 40 units.</p>
                <p className="text-white/80 mb-4">What dimensions maximize its area?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 5 × 15</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 8 × 12</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 10 × 10</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 12 × 8</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) 10 × 10</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>For a fixed perimeter, maximum area occurs when the rectangle is a square.</p>
                      <p>Perimeter = 40, so each side = 40/4 = 10</p>
                      <p>Area = 10 × 10 = 100 (maximum)</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Mathematics - Integrals */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">∫</span>
              MATHEMATICS (Integrals) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Definite vs Indefinite Integrals, Area Under a Curve, Accumulation & Physical Meaning, Applications</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Conceptual Understanding</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best describes the definite integral ∫ₐᵇ f(x) dx?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The slope of the function between a and b</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The total accumulated value of f(x) over the interval</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The maximum value of the function</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The average of the function values</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The total accumulated value of f(x) over the interval</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Definite integral represents net accumulation (area with sign).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Area Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">The function f(x) = x² is defined on the interval [0, 2].</p>
                <p className="text-white/80 mb-4">What does ∫₀² x² dx represent?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The slope of the curve at x = 2</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The area under the curve from 0 to 2</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The maximum value of f(x)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The length of the curve</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The area under the curve from 0 to 2</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>∫₀² x² dx = [x³/3]₀² = 8/3 - 0 = 8/3</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Physics Connection</h4>
                </div>
                <p className="text-white/80 mb-4">The velocity of an object is given by:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  v(t) = 4t - 2
                </div>
                <p className="text-white/80 mb-4">What does ∫₁³ (4t - 2) dt represent?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The acceleration at t = 3</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The total distance traveled between t = 1 and t = 3</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The average velocity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The maximum velocity</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The total distance traveled between t = 1 and t = 3</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Velocity integrated over time = displacement.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Area + Negative Region</h4>
                </div>
                <p className="text-white/80 mb-4">The function f(x) is positive on [0, 2] and negative on [2, 4].</p>
                <p className="text-white/80 mb-4">What does ∫₀⁴ f(x) dx represent?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The total area ignoring sign</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The difference between positive and negative areas</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Only the positive area</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Always zero</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The difference between positive and negative areas</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Integral ≠ "absolute area"</p>
                      <p>Integral = net effect (positive area minus negative area)</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Geometry + Integral (Global Finals Style)</h4>
                </div>
                <p className="text-white/80 mb-4">A region is bounded by:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  y = x and y = x²
                </div>
                <p className="text-white/80 mb-4">Which integral gives the area of the region?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) ∫₀¹ (x - x²) dx</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) ∫₀¹ (x² - x) dx</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) ∫₁⁰ (x - x²) dx</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) ∫₀¹ (x + x²) dx</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) ∫₀¹ (x - x²) dx</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Upper curve − lower curve → correct order matters.</p>
                      <p>On [0, 1]: y = x is above y = x², so area = ∫₀¹ (x - x²) dx</p>
                      <p className="mt-2 italic">Global competition logic: interpretation + modeling</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Mathematics - Differential Equations */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">dy/dx</span>
              MATHEMATICS (Differential Equations) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Conceptual Understanding, First-Order Equations, Initial Value Problems, Real-World Applications, Separation of Variables</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Conceptual Understanding</h4>
                </div>
                <p className="text-white/80 mb-4">What does a differential equation describe?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A fixed numerical relationship</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) A relationship between a function and its rate of change</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Only algebraic expressions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A graphical approximation method</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) A relationship between a function and its rate of change</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>A differential equation relates a function to one or more of its derivatives, describing how a quantity changes over time or space.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Solving a First-Order Differential Equation</h4>
                </div>
                <p className="text-white/80 mb-4">Solve the differential equation:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  dy/dx = 3x²
                </div>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) y = x³ + C</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) y = x² + C</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) y = 3x³ + C</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) y = (3/2)x² + C</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) y = x³ + C</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>y = ∫3x² dx = x³ + C</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Initial Value Problem</h4>
                </div>
                <p className="text-white/80 mb-4">Given:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  dy/dx = 2x and y(1) = 5
                </div>
                <p className="text-white/80 mb-4">Find y(x).</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) y = x² + 4</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) y = x² + 5</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) y = 2x² + 3</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) y = x² + 6</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) y = x² + 4</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>y = ∫2x dx = x² + C</p>
                      <p>Using y(1) = 5: 1 + C = 5, so C = 4</p>
                      <p>Therefore y = x² + 4</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Real-World Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">A population grows according to:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  dP/dt = kP
                </div>
                <p className="text-white/80 mb-4">What does this model imply?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Population grows linearly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Growth rate is constant</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Growth rate is proportional to population size</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Population decreases over time</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Growth rate is proportional to population size</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This is the standard exponential growth model, used in biology, economics, and physics.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Separation of Variables</h4>
                </div>
                <p className="text-white/80 mb-4">Solve:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  dy/dx = xy
                </div>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) y = x² + C</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) y = Ce^(x²/2)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) y = Ce^x</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) y = Cx²</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) y = Ce^(x²/2)</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Separating variables: (1/y) dy = x dx</p>
                      <p>Integrating: ln|y| = x²/2 + C</p>
                      <p>Therefore: y = Ce^(x²/2)</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Mathematics - Vectors */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">→</span>
              MATHEMATICS (Vectors) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Vector Representation, Vector Addition, Dot Product, Angle Between Vectors, Vector Projection, Physics Applications</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Basic Vector Representation</h4>
                </div>
                <p className="text-white/80 mb-4">Given the vector:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  v⃗ = 3i − 4j
                </div>
                <p className="text-white/80 mb-4">What is its magnitude?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 5</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 7</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 1</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) √7</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) 5</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>|v⃗| = √(3² + (-4)²) = √(9 + 16) = √25 = 5</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Vector Addition</h4>
                </div>
                <p className="text-white/80 mb-4">Let:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  a⃗ = (2, 1), b⃗ = (−1, 3)
                </div>
                <p className="text-white/80 mb-4">What is a⃗ + b⃗?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) (1, 4)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) (3, 2)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) (1, 2)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) (-1, 4)</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) (1, 4)</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>(2 − 1, 1 + 3) = (1, 4)</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Dot Product (Conceptual + Calculation)</h4>
                </div>
                <p className="text-white/80 mb-4">Given:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  u⃗ = (1, 2), v⃗ = (2, −1)
                </div>
                <p className="text-white/80 mb-4">Find u⃗ · v⃗.</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 0</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 4</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) -2</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 1</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) 0</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>(1)(2) + (2)(−1) = 2 − 2 = 0</p>
                      <p className="mt-2 italic">Dot product = 0 means vectors are perpendicular</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Angle Between Vectors</h4>
                </div>
                <p className="text-white/80 mb-4">Two vectors have dot product 0. What is the angle between them?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 0°</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 45°</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 90°</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 180°</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) 90°</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>A zero dot product means vectors are orthogonal (right angle).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Vector Projection (Advanced)</h4>
                </div>
                <p className="text-white/80 mb-4">Let:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  a⃗ = (3, 4), b⃗ = (1, 0)
                </div>
                <p className="text-white/80 mb-4">What is the projection of a⃗ onto b⃗?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) (3, 0)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) (4, 0)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) (0, 4)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) (1, 0)</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) (3, 0)</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>proj_b⃗ a⃗ = (a⃗ · b⃗ / |b⃗|²) b⃗</p>
                      <p>= (3/1)(1, 0) = (3, 0)</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ec4899] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Physics Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">A force vector F⃗ acts at an angle to the direction of motion. Which vector operation determines the work done?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Vector magnitude</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Cross product</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Dot product</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Vector subtraction</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Dot product</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Work = F⃗ · d⃗</p>
                      <p>This directly connects vectors to physics and engineering.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Mathematics - Matrices */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">[M]</span>
              MATHEMATICS (Matrices) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Matrix Addition, Matrix Multiplication, Determinants, Invertibility, Systems of Equations, Real-World Applications</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Matrix Addition</h4>
                </div>
                <p className="text-white/80 mb-4">Given:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  A = [2 1; 3 4], B = [1 0; -1 2]
                </div>
                <p className="text-white/80 mb-4">What is A + B?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) [3 1; 2 6]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) [1 1; 4 6]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) [3 0; 2 2]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) [2 0; 3 8]</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) [3 1; 2 6]</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Matrix addition is element-wise:</p>
                      <p>(2+1, 1+0; 3-1, 4+2) = [3 1; 2 6]</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Matrix Multiplication (Concept Check)</h4>
                </div>
                <p className="text-white/80 mb-4">Which condition must be satisfied for the product AB to exist?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A and B must be square</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Number of rows of A = number of rows of B</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Number of columns of A = number of rows of B</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A must be invertible</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Number of columns of A = number of rows of B</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This is a core conceptual discriminator in matrix reasoning.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Matrix Multiplication (Calculation)</h4>
                </div>
                <p className="text-white/80 mb-4">Given:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  A = [1 2; 0 1], B = [3; 4]
                </div>
                <p className="text-white/80 mb-4">Find AB.</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) [11; 4]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) [10; 4]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) [3; 8]</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) [7; 4]</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) [11; 4]</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>(1×3 + 2×4; 0×3 + 1×4) = [11; 4]</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Determinant (Key Skill)</h4>
                </div>
                <p className="text-white/80 mb-4">Find the determinant of:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  A = [2 5; 1 3]
                </div>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 1</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 6</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) -1</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 11</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) 1</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>det(A) = (2)(3) − (5)(1) = 6 − 5 = 1</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Invertibility (Conceptual Depth)</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement is true?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A matrix with determinant 0 is invertible</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Only diagonal matrices are invertible</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A matrix is invertible if and only if its determinant ≠ 0</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) All square matrices have inverses</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) A matrix is invertible if and only if its determinant ≠ 0</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This is central to linear algebra, AI, and physics.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Systems of Equations (Application)</h4>
                </div>
                <p className="text-white/80 mb-4">A system of linear equations has: a unique solution, infinite solutions, or no solution. Which matrix property determines this?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Trace</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Determinant</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Transpose</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Rank only</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Determinant</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>det ≠ 0 → unique solution</p>
                      <p>det = 0 → no or infinite solutions</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#14b8a6] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Real-World Interpretation (Advanced)</h4>
                </div>
                <p className="text-white/80 mb-4">Matrices are most directly used to model which of the following?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Growth rates only</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Geometric transformations</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Random guessing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Arithmetic sequences</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Geometric transformations</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Rotations, scaling, reflections → matrices</p>
                      <p>This bridges to graphics, robotics, and AI.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 px-6 py-3 rounded-xl">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80">
                More sample questions and practice materials are available in the <Link to="/students/study-practice" className="text-[#4361ee] hover:text-[#f72585] font-medium">Study & Practice</Link> section.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-white/70 mb-8">
            Begin your preparation today with our comprehensive study materials.
          </p>
          <Link 
            to="/students/study-practice"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee] to-[#f72585] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Go to Study & Practice
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/50 text-sm">
          <p>&copy; 2025 World STEM Cup. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {' | '}
            <Link to="/governance" className="hover:text-white transition-colors">Governance</Link>
            {' | '}
            <Link to="/governance/data-protection-child-safety" className="hover:text-white transition-colors">Data Protection & Child Safety</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
