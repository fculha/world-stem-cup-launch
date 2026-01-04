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
