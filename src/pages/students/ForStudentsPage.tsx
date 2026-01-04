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

          {/* Grade 12 Physics - Modern Physics */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">⚛</span>
              PHYSICS (Modern Physics) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Photoelectric Effect, Photon Energy, de Broglie Wavelength, Wave-Particle Duality, Atomic Energy Levels, Nuclear Physics, Mass-Energy Equivalence</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Photoelectric Effect (Core Concept)</h4>
                </div>
                <p className="text-white/80 mb-4">According to the photoelectric effect, electrons are emitted from a metal surface when:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The intensity of light is increased</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The frequency of light exceeds a minimum threshold</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The temperature of the metal increases</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The wavelength of light is increased</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The frequency of light exceeds a minimum threshold</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Energy depends on frequency, not intensity. This disproved classical wave-only models.</p>
                      <p>Key relation: E = hf</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Energy of a Photon</h4>
                </div>
                <p className="text-white/80 mb-4">The energy of a photon is directly proportional to:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Its wavelength</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Its speed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Its frequency</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Its mass</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Its frequency</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>E = hf</p>
                      <p>Higher frequency → higher photon energy.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Increasing Light Intensity</h4>
                </div>
                <p className="text-white/80 mb-4">In a photoelectric experiment, if the intensity of light is increased while the frequency remains below the threshold, what happens?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) More electrons are emitted</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electrons are emitted with greater kinetic energy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) No electrons are emitted</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The metal heats up and emits electrons</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) No electrons are emitted</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Below threshold frequency → no photoelectric effect, regardless of intensity.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">de Broglie Wavelength</h4>
                </div>
                <p className="text-white/80 mb-4">According to de Broglie, the wavelength of a particle is given by:</p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 text-white/70 font-mono">
                  λ = h/p
                </div>
                <p className="text-white/80 mb-4">Which particle would have the shortest wavelength?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A slow-moving electron</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) A fast-moving electron</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A slow-moving proton</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A fast-moving proton</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) A fast-moving proton</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Larger momentum → shorter wavelength</p>
                      <p>Proton has much larger mass, fast proton → maximum momentum</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Wave–Particle Duality</h4>
                </div>
                <p className="text-white/80 mb-4">Which phenomenon best demonstrates the wave nature of electrons?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Photoelectric effect</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electron diffraction</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Nuclear fusion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Radioactive decay</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Electron diffraction</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Diffraction and interference are wave behaviors, even for particles.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Atomic Energy Levels</h4>
                </div>
                <p className="text-white/80 mb-4">Why do atoms emit discrete (line) spectra instead of continuous spectra?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Electrons move randomly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Atoms vibrate at fixed frequencies</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Electrons occupy quantized energy levels</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Photons lose energy over time</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Electrons occupy quantized energy levels</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Electron transitions occur only between allowed energy states.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Nuclear Physics (Stability)</h4>
                </div>
                <p className="text-white/80 mb-4">Which force is primarily responsible for holding the nucleus together?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Gravitational force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electromagnetic force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Strong nuclear force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Weak nuclear force</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Strong nuclear force</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The strong nuclear force overcomes proton–proton repulsion at short distances.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Mass–Energy Equivalence</h4>
                </div>
                <p className="text-white/80 mb-4">Einstein's equation E = mc² implies that:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Mass can be destroyed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Energy has mass</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Mass and energy are interchangeable</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Energy always travels at speed c</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Mass and energy are interchangeable</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Small amounts of mass can convert into enormous energy → nuclear reactions.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Nuclear Reactions</h4>
                </div>
                <p className="text-white/80 mb-4">Which process powers the Sun?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Nuclear fission</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Chemical combustion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Nuclear fusion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Radioactive decay</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Nuclear fusion</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Hydrogen nuclei fuse to form helium, releasing energy.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#a855f7] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Modern Physics Big Picture</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best summarizes modern physics?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Energy is continuous</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Matter behaves only as particles</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Classical physics explains all phenomena</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Nature behaves discretely at microscopic scales</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) Nature behaves discretely at microscopic scales</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Modern physics introduced quantization, probability, and duality.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Physics - Introduction to Quantum Physics */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">ℏ</span>
              PHYSICS (Introduction to Quantum Physics) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Quantum vs Classical, Quantization of Energy, Planck's Constant, Wave-Particle Duality, Heisenberg Uncertainty, Wavefunction, Probability</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Quantum World vs Classical World</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best describes the quantum world?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Objects have exact positions and velocities at all times</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Energy is always continuous</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Outcomes can only be predicted probabilistically</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Measurement does not affect the system</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Outcomes can only be predicted probabilistically</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Quantum physics replaces certainty with probability.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Quantization of Energy</h4>
                </div>
                <p className="text-white/80 mb-4">What does it mean that energy is "quantized"?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Energy can be infinitely divided</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Energy exists only in discrete packets</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Energy depends only on mass</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Energy is always conserved</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Energy exists only in discrete packets</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Atoms absorb and emit energy in fixed amounts (quanta).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Planck's Constant</h4>
                </div>
                <p className="text-white/80 mb-4">Why is Planck's constant h important in quantum physics?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It determines the speed of light</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It connects energy with frequency</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It explains gravity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It measures mass</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) It connects energy with frequency</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>E = hf</p>
                      <p>This equation started the quantum revolution.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Wave–Particle Duality</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best explains wave–particle duality?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Particles sometimes disappear</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Waves sometimes gain mass</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Matter and light can behave as both waves and particles</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Only photons show wave behavior</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Matter and light can behave as both waves and particles</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Electrons can diffract like waves and collide like particles.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Electron Diffraction</h4>
                </div>
                <p className="text-white/80 mb-4">Electron diffraction is strong evidence that:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Electrons are charged</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electrons have mass</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Electrons behave like waves</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Electrons travel at speed of light</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Electrons behave like waves</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Diffraction is a wave phenomenon.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Heisenberg Uncertainty Principle (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">The uncertainty principle states that:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) We can measure position and momentum exactly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Measurement errors cause uncertainty</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Nature fundamentally limits what can be known</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Instruments are not precise enough</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Nature fundamentally limits what can be known</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Uncertainty is not due to poor instruments—it is fundamental.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Measurement in Quantum Physics</h4>
                </div>
                <p className="text-white/80 mb-4">What happens when a quantum system is measured?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Nothing changes</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The wavefunction collapses</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Energy is destroyed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The particle disappears</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The wavefunction collapses</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Before measurement → probability</p>
                      <p>After measurement → definite outcome</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Probability Interpretation</h4>
                </div>
                <p className="text-white/80 mb-4">In quantum mechanics, the square of the wavefunction represents:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Energy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Velocity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Probability density</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Force</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Probability density</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>|ψ|² = probability</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Quantum vs Classical Prediction</h4>
                </div>
                <p className="text-white/80 mb-4">Which is a key difference between classical and quantum predictions?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Classical physics is faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Quantum physics ignores forces</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Quantum predictions are statistical</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Classical physics is incorrect</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Quantum predictions are statistical</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Quantum mechanics predicts likelihoods, not certainties.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#6366f1] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Big Picture Question</h4>
                </div>
                <p className="text-white/80 mb-4">Why is quantum physics essential to modern technology?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It explains gravity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It replaces classical physics completely</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It enables semiconductors, lasers, and quantum computing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It only applies to space</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) It enables semiconductors, lasers, and quantum computing</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>No quantum physics → no computers, no internet, no MRI.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Physics - Introduction to Relativity */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">c</span>
              PHYSICS (Introduction to Relativity) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Core Idea of Relativity, Speed of Light, Time Dilation, Length Contraction, Simultaneity, Mass-Energy Equivalence, GPS Applications</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Core Idea of Relativity</h4>
                </div>
                <p className="text-white/80 mb-4">Einstein's theory of relativity is based on which fundamental idea?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Time flows at the same rate everywhere</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Space and time are absolute</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The laws of physics are the same in all inertial frames</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Gravity only affects massive objects</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) The laws of physics are the same in all inertial frames</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Relativity begins with the idea that physics does not depend on the observer's constant motion.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Speed of Light</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement about the speed of light in vacuum is correct?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It depends on the observer's motion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It changes with distance</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It is constant for all observers</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It increases with energy</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) It is constant for all observers</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The speed of light c is constant, regardless of how fast the observer is moving.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Time Dilation (Concept)</h4>
                </div>
                <p className="text-white/80 mb-4">Time dilation means that:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Time stops at high speeds</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Moving clocks run slower compared to stationary ones</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) All clocks always agree</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Time only depends on gravity</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Moving clocks run slower compared to stationary ones</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>At speeds close to light speed, time passes more slowly for the moving observer.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Thought Experiment (Light Clock)</h4>
                </div>
                <p className="text-white/80 mb-4">Why did Einstein use thought experiments like the "light clock"?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) To avoid mathematics</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) To test laboratory equipment</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) To explain complex ideas using logic and imagination</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) To prove classical physics wrong</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) To explain complex ideas using logic and imagination</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Relativity was developed using reasoning, not experiments alone.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Length Contraction</h4>
                </div>
                <p className="text-white/80 mb-4">Length contraction occurs when:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) An object heats up</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) An object moves close to the speed of light</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gravity increases</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Time stops</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) An object moves close to the speed of light</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Objects shrink in the direction of motion at relativistic speeds.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Simultaneity</h4>
                </div>
                <p className="text-white/80 mb-4">Two events that are simultaneous for one observer may not be simultaneous for another observer because:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Clocks are inaccurate</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Light travels at finite speed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gravity bends space</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Energy is quantized</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Light travels at finite speed</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Relativity shows that simultaneity is not absolute.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Mass–Energy Equivalence</h4>
                </div>
                <p className="text-white/80 mb-4">Einstein's equation E = mc² implies that:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Mass increases with speed only</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Energy has mass-like properties</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Mass and energy are fundamentally equivalent</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Energy travels at speed c</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Mass and energy are fundamentally equivalent</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This explains nuclear energy and stellar processes.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Relativity vs Classical Physics</h4>
                </div>
                <p className="text-white/80 mb-4">Which situation requires relativistic physics instead of classical physics?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A car moving at 100 km/h</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) A ball thrown upward</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A spacecraft moving at 0.9c</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A pendulum swinging</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) A spacecraft moving at 0.9c</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Relativity becomes important near light speed.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">GPS and Relativity</h4>
                </div>
                <p className="text-white/80 mb-4">Why must relativity be considered in GPS satellite systems?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Satellites are very large</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Gravity and speed affect satellite clocks</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) GPS uses quantum mechanics</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Earth rotates</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Gravity and speed affect satellite clocks</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Both special and general relativity affect time measurement in satellites.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f97316] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Big Picture Question</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best summarizes Einstein's relativity?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Space and time are separate</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Time is absolute</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Space and time form a unified spacetime</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Gravity is a force only</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Space and time form a unified spacetime</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Relativity unifies space and time into spacetime.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Physics - Nuclear Physics */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">☢</span>
              PHYSICS (Nuclear Physics) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Atomic Nucleus, Strong Nuclear Force, Nuclear Stability, Radioactive Decay, Radiation Types, Half-Life, Fission, Fusion, Mass Defect, Binding Energy</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Atomic Nucleus Basics</h4>
                </div>
                <p className="text-white/80 mb-4">The nucleus of an atom consists of:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Protons and electrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electrons and neutrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Protons and neutrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Only protons</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Protons and neutrons</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Electrons orbit outside the nucleus; the nucleus contains protons + neutrons.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Strong Nuclear Force</h4>
                </div>
                <p className="text-white/80 mb-4">What force is primarily responsible for holding the nucleus together?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Gravitational force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Electromagnetic force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Strong nuclear force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Weak nuclear force</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Strong nuclear force</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The strong nuclear force overcomes the electrostatic repulsion between protons at very short distances.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Nuclear Stability</h4>
                </div>
                <p className="text-white/80 mb-4">Why do heavy nuclei tend to be unstable?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) They contain too many electrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The strong nuclear force becomes weaker at large distances</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gravity dominates inside the nucleus</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) They move too fast</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The strong nuclear force becomes weaker at large distances</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>As nuclei grow larger, the strong force cannot fully counteract proton–proton repulsion.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Radioactive Decay</h4>
                </div>
                <p className="text-white/80 mb-4">Radioactive decay occurs because:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Nuclei absorb energy from the environment</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Nuclei seek a more stable configuration</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Atoms lose electrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Gravity breaks the nucleus</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Nuclei seek a more stable configuration</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Unstable nuclei decay to reach greater stability.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Types of Radiation</h4>
                </div>
                <p className="text-white/80 mb-4">Which type of radiation has the greatest penetrating power?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Alpha (α)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Beta (β)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gamma (γ)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Neutron</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Gamma (γ)</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Gamma rays have no mass or charge, allowing deep penetration.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Half-Life (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">The half-life of a radioactive substance is the time required for:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) All nuclei to decay</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Half of the original nuclei to decay</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) One nucleus to decay</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Radiation to stop</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Half of the original nuclei to decay</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Half-life is a statistical property, not a prediction of individual atoms.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Half-Life (Reasoning)</h4>
                </div>
                <p className="text-white/80 mb-4">If a sample has a half-life of 5 years, what fraction remains after 10 years?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) 1</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) 1/2</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) 1/4</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) 1/8</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) 1/4</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Two half-lives → (1/2)² = 1/4</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Nuclear Fission</h4>
                </div>
                <p className="text-white/80 mb-4">Nuclear fission is best described as:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Combining light nuclei into heavier ones</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Splitting a heavy nucleus into smaller nuclei</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Emission of electrons</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Loss of photons</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Splitting a heavy nucleus into smaller nuclei</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Fission releases energy by splitting heavy nuclei (e.g., Uranium).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Nuclear Fusion</h4>
                </div>
                <p className="text-white/80 mb-4">Which process powers the Sun?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Nuclear fission</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Chemical combustion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Nuclear fusion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Radioactive decay</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Nuclear fusion</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Fusion combines light nuclei (hydrogen) into heavier ones, releasing energy.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Mass Defect</h4>
                </div>
                <p className="text-white/80 mb-4">The mass of a nucleus is slightly less than the total mass of its individual nucleons because:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Protons lose mass over time</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Energy is released during nucleus formation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Neutrons decay inside the nucleus</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Gravity compresses the nucleus</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Energy is released during nucleus formation</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The missing mass is converted into binding energy: E = mc²</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Binding Energy</h4>
                </div>
                <p className="text-white/80 mb-4">A high binding energy per nucleon indicates that a nucleus is:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Large</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Radioactive</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Very stable</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Electrically neutral</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Very stable</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>More energy is required to break the nucleus → greater stability.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Nuclear Physics in Society</h4>
                </div>
                <p className="text-white/80 mb-4">Which application uses nuclear physics?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) MRI scanning</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Nuclear power plants</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Carbon dating</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) All of the above</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) All of the above</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Nuclear physics impacts energy, medicine, archaeology, and space science.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Computer Science - Dynamic Programming */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">💻</span>
              COMPUTER SCIENCE (Dynamic Programming) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Core DP Concepts, Overlapping Subproblems, Memoization vs Tabulation, Optimal Substructure, Classic DP Problems, Space Optimization</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Core Idea of Dynamic Programming</h4>
                </div>
                <p className="text-white/80 mb-4">What is the main idea behind Dynamic Programming?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Solving problems by brute force</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Dividing problems into independent subproblems</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Solving overlapping subproblems and storing their results</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Using recursion only</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Solving overlapping subproblems and storing their results</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Dynamic Programming avoids repeated work by saving solutions to subproblems.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Overlapping Subproblems</h4>
                </div>
                <p className="text-white/80 mb-4">Which situation best indicates that a problem is suitable for Dynamic Programming?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The problem has a single solution</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The problem can be solved greedily</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The problem has overlapping subproblems</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The problem uses sorting</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) The problem has overlapping subproblems</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>DP is powerful when the same subproblem appears many times.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Fibonacci Numbers (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">Why is Dynamic Programming preferred over simple recursion when computing Fibonacci numbers?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Recursion cannot compute Fibonacci</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) DP reduces repeated calculations</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DP uses less memory</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) DP avoids base cases</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) DP reduces repeated calculations</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Recursive Fibonacci recalculates the same values repeatedly → inefficient.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Time Complexity Insight</h4>
                </div>
                <p className="text-white/80 mb-4">The naive recursive Fibonacci algorithm has approximately:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Linear time complexity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Quadratic time complexity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Exponential time complexity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Constant time complexity</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Exponential time complexity</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Without DP, Fibonacci grows exponentially in time.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Memoization vs Tabulation</h4>
                </div>
                <p className="text-white/80 mb-4">What is the key difference between memoization and tabulation?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Memoization uses arrays, tabulation does not</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Memoization is bottom-up, tabulation is top-down</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Memoization is top-down, tabulation is bottom-up</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) They are identical</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Memoization is top-down, tabulation is bottom-up</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Memoization: recursion + cache</p>
                      <p>Tabulation: iterative table building</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Optimal Substructure</h4>
                </div>
                <p className="text-white/80 mb-4">A problem has optimal substructure if:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It has many solutions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It can be divided into independent tasks</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) An optimal solution can be built from optimal subsolutions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It requires sorting</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) An optimal solution can be built from optimal subsolutions</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This property is essential for DP.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Classic DP Problem Recognition</h4>
                </div>
                <p className="text-white/80 mb-4">Which of the following is a classic Dynamic Programming problem?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Binary search</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Shortest path in a weighted graph</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Finding the maximum element in an array</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Sorting numbers</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Shortest path in a weighted graph</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Shortest paths (e.g., Bellman-Ford) rely on DP principles.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Knapsack Problem (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">Why is the Knapsack problem suited for Dynamic Programming?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Items are sorted</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Choices are binary and overlapping</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Greedy always works</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) There is only one constraint</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Choices are binary and overlapping</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Each decision (take or skip) creates overlapping subproblems.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Space Optimization</h4>
                </div>
                <p className="text-white/80 mb-4">Why can Dynamic Programming often be optimized to use less memory?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) DP always uses recursion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Only the previous states are needed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DP problems are small</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Memory is unlimited</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Only the previous states are needed</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Many DP tables only depend on recent rows or states.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Real-World Application</h4>
                </div>
                <p className="text-white/80 mb-4">Dynamic Programming is commonly used in:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Image compression</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) DNA sequence alignment</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) AI decision-making</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) All of the above</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) All of the above</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>DP is foundational in bioinformatics, AI, NLP, and optimization.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Strategy Choice</h4>
                </div>
                <p className="text-white/80 mb-4">When should Dynamic Programming be preferred over a greedy algorithm?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) When greedy is faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) When greedy fails to guarantee optimality</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) When the problem is small</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Always</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) When greedy fails to guarantee optimality</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Greedy works only when local choices guarantee global optimum.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Big Picture Thinking</h4>
                </div>
                <p className="text-white/80 mb-4">What skill does Dynamic Programming primarily test?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Syntax memorization</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Fast typing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Breaking complex problems into structured steps</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Hardware knowledge</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Breaking complex problems into structured steps</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>DP measures algorithmic thinking, not coding speed.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Computer Science - Advanced Algorithms */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              COMPUTER SCIENCE (Advanced Algorithms) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Algorithm Efficiency, Big-O Notation, Divide and Conquer, Sorting, Greedy Algorithms, Graph Algorithms, NP Problems, Backtracking</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Algorithm Efficiency</h4>
                </div>
                <p className="text-white/80 mb-4">What does the time complexity of an algorithm describe?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The exact time an algorithm takes</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The number of lines of code</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) How execution time grows with input size</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The speed of the computer</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) How execution time grows with input size</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Time complexity measures scalability, not actual seconds.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Big-O Notation</h4>
                </div>
                <p className="text-white/80 mb-4">Which algorithm grows the slowest as input size increases?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) O(n²)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) O(n log n)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) O(n)</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) O(2ⁿ)</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) O(n)</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Linear time is more efficient than quadratic or exponential growth.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Divide and Conquer</h4>
                </div>
                <p className="text-white/80 mb-4">Which strategy breaks a problem into smaller independent parts, solves them, and combines the results?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Greedy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Dynamic Programming</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Divide and Conquer</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Backtracking</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Divide and Conquer</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Classic examples: Merge Sort, Quick Sort.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Sorting Algorithms</h4>
                </div>
                <p className="text-white/80 mb-4">Which sorting algorithm has an average-case time complexity of O(n log n)?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Bubble Sort</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Insertion Sort</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Merge Sort</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Selection Sort</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Merge Sort</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Merge Sort guarantees O(n log n) in all cases.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Greedy Algorithms</h4>
                </div>
                <p className="text-white/80 mb-4">Why do greedy algorithms sometimes fail?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) They are too slow</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) They do not consider all possibilities</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) They always use recursion</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) They require extra memory</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) They do not consider all possibilities</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Greedy makes locally optimal choices that may not lead to a global optimum.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Graph Algorithms</h4>
                </div>
                <p className="text-white/80 mb-4">Which algorithm is commonly used to find the shortest path in a graph with non-negative edge weights?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Depth-First Search</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Breadth-First Search</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Dijkstra's Algorithm</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Binary Search</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Dijkstra's Algorithm</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Dijkstra's algorithm efficiently computes shortest paths.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">BFS vs DFS</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement is true?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) DFS always finds the shortest path</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) BFS uses a stack</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) BFS explores nodes level by level</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) DFS is always faster than BFS</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) BFS explores nodes level by level</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>BFS: queue, level-by-level</p>
                      <p>DFS: stack/recursion, depth-first</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">NP Problems (Conceptual)</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement best describes NP problems?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) They can be solved quickly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) They have no solutions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Solutions can be verified quickly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) They require quantum computers</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Solutions can be verified quickly</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>NP problems are hard to solve, but easy to verify.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Backtracking</h4>
                </div>
                <p className="text-white/80 mb-4">Backtracking is best described as:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Always choosing the best option</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Trying all possibilities efficiently by undoing choices</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Using tables to store results</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Sorting data repeatedly</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Trying all possibilities efficiently by undoing choices</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Used in puzzles like N-Queens, Sudoku.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Algorithm Design Choice</h4>
                </div>
                <p className="text-white/80 mb-4">Which algorithmic technique is most suitable for problems with overlapping subproblems and optimal substructure?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Greedy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Divide and Conquer</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Dynamic Programming</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Backtracking</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Dynamic Programming</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>This is the core condition for Dynamic Programming.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Real-World Algorithms</h4>
                </div>
                <p className="text-white/80 mb-4">Which area heavily relies on advanced algorithms?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Search engines</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Cryptography</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Artificial Intelligence</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) All of the above</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) All of the above</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Algorithms power modern technology.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#8b5cf6] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Algorithmic Thinking</h4>
                </div>
                <p className="text-white/80 mb-4">Which skill best represents algorithmic thinking?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Memorizing code</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Writing fast programs</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Structuring problems into clear logical steps</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Using powerful computers</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Structuring problems into clear logical steps</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Algorithms test how you think, not how fast you type.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Computer Science - Artificial Intelligence Basics */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              COMPUTER SCIENCE (Artificial Intelligence - Basics) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: AI Definition, Narrow vs General AI, Machine Learning, Supervised/Unsupervised Learning, Training Data, AI Bias, Ethics in AI</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">What Is Artificial Intelligence?</h4>
                </div>
                <p className="text-white/80 mb-4">Which definition best describes Artificial Intelligence?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Computers that work faster than humans</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Machines that can perform tasks requiring human-like intelligence</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Robots that look like humans</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Computers that store large amounts of data</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Machines that can perform tasks requiring human-like intelligence</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI focuses on intelligent behavior, not appearance or speed.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Narrow AI vs General AI</h4>
                </div>
                <p className="text-white/80 mb-4">Which of the following is an example of Narrow AI?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A robot that can perform any human task</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) A system that understands and learns all subjects</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A chess-playing program</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A conscious machine</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) A chess-playing program</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Current AI systems are task-specific (narrow AI).</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Core Components of AI</h4>
                </div>
                <p className="text-white/80 mb-4">Which field is NOT a core component of Artificial Intelligence?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Machine Learning</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Data Science</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Human Psychology</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Logic and Algorithms</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Human Psychology</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI draws inspiration from psychology, but it is not a core technical component.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Machine Learning Concept</h4>
                </div>
                <p className="text-white/80 mb-4">What is Machine Learning?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Programming computers with fixed rules</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Allowing machines to learn patterns from data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Storing data in databases</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Teaching computers human emotions</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Allowing machines to learn patterns from data</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>ML systems learn from data, rather than following explicit instructions.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Supervised Learning</h4>
                </div>
                <p className="text-white/80 mb-4">Which best describes supervised learning?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Learning without any data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Learning from labeled examples</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Learning by trial and error only</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Learning with no human involvement</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Learning from labeled examples</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Supervised learning uses input–output pairs.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Unsupervised Learning</h4>
                </div>
                <p className="text-white/80 mb-4">Unsupervised learning is mainly used to:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Predict exact outcomes</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Find hidden patterns in data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Control robots</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Generate random numbers</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Find hidden patterns in data</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Clustering and pattern discovery are key unsupervised tasks.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Training Data</h4>
                </div>
                <p className="text-white/80 mb-4">Why is training data important in AI systems?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It makes computers faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It defines how the system behaves</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It replaces algorithms</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It removes errors completely</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) It defines how the system behaves</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI systems reflect the data they are trained on.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Bias in AI</h4>
                </div>
                <p className="text-white/80 mb-4">AI bias occurs when:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The algorithm is too slow</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The model is trained on unbalanced or biased data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The computer overheats</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The system uses mathematics</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The model is trained on unbalanced or biased data</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Biased data leads to biased decisions.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">AI Decision-Making</h4>
                </div>
                <p className="text-white/80 mb-4">How do most AI systems make decisions?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) By random guessing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) By following human emotions</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) By optimizing mathematical objectives</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) By copying humans directly</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) By optimizing mathematical objectives</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI optimizes objective functions based on data.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Real-World AI Applications</h4>
                </div>
                <p className="text-white/80 mb-4">Which of the following uses AI?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Voice assistants</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Recommendation systems</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Medical image analysis</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) All of the above</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) All of the above</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI is deeply embedded in daily life and science.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">AI Limitations</h4>
                </div>
                <p className="text-white/80 mb-4">Which is a limitation of current AI systems?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) They can think like humans</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) They understand context perfectly</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) They depend heavily on data quality</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) They are always unbiased</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) They depend heavily on data quality</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI is only as good as the data and objectives it is given.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#ef4444] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Ethical AI</h4>
                </div>
                <p className="text-white/80 mb-4">Why is ethics important in Artificial Intelligence?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) AI systems are conscious</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) AI decisions can affect human lives</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Ethics improves processing speed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Ethics replaces algorithms</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) AI decisions can affect human lives</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>AI impacts privacy, fairness, and opportunity, especially in education.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Computer Science - Introduction to Cryptography */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              COMPUTER SCIENCE (Introduction to Cryptography) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Cryptography Purpose, Plaintext/Ciphertext, Symmetric/Asymmetric Encryption, Hash Functions, Digital Signatures, HTTPS, Security</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Purpose of Cryptography</h4>
                </div>
                <p className="text-white/80 mb-4">What is the primary purpose of cryptography?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Making computers faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Hiding information permanently</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Securing communication and data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Compressing files</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Securing communication and data</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Cryptography ensures confidentiality, integrity, and authenticity of information.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Plaintext vs Ciphertext</h4>
                </div>
                <p className="text-white/80 mb-4">What is the correct relationship between plaintext and ciphertext?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Ciphertext is readable text</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Plaintext is encrypted text</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Ciphertext is encrypted plaintext</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Plaintext and ciphertext are identical</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Ciphertext is encrypted plaintext</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Plaintext → encryption → ciphertext → decryption → plaintext.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Symmetric Encryption</h4>
                </div>
                <p className="text-white/80 mb-4">In symmetric-key cryptography:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Two different keys are used</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The same key is used for encryption and decryption</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) No key is required</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Only public keys are used</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The same key is used for encryption and decryption</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Sender and receiver share one secret key.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Asymmetric Encryption</h4>
                </div>
                <p className="text-white/80 mb-4">Which feature distinguishes asymmetric cryptography from symmetric cryptography?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It is faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It uses one key only</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It uses a public–private key pair</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It does not use mathematics</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) It uses a public–private key pair</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Asymmetric systems (e.g., RSA) use two mathematically linked keys.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">Public Key Concept</h4>
                </div>
                <p className="text-white/80 mb-4">What can be safely shared with anyone?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Private key</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Symmetric key</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Public key</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Password</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Public key</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Public keys are designed to be openly distributed.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Hash Functions</h4>
                </div>
                <p className="text-white/80 mb-4">What is the main property of a cryptographic hash function?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It can be reversed easily</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It always produces different outputs</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It produces a fixed-size output</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It encrypts data</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) It produces a fixed-size output</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Hashes map input data to a fixed-length "fingerprint".</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Password Storage</h4>
                </div>
                <p className="text-white/80 mb-4">Why are passwords stored as hashes instead of plaintext?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Hashes use less memory</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Hashes are faster</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Hashes protect passwords even if data is leaked</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Hashes can be decrypted easily</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Hashes protect passwords even if data is leaked</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Even if a database is compromised, hashed passwords remain protected.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Digital Signatures</h4>
                </div>
                <p className="text-white/80 mb-4">What is the main purpose of a digital signature?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Encrypt data</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Compress messages</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Verify authenticity and integrity</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Hide sender identity</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Verify authenticity and integrity</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Digital signatures confirm who sent the message and that it wasn't altered.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Man-in-the-Middle Attack</h4>
                </div>
                <p className="text-white/80 mb-4">A man-in-the-middle attack occurs when:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A computer overheats</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) An attacker intercepts communication between two parties</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A password is forgotten</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) A system crashes</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) An attacker intercepts communication between two parties</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The attacker secretly listens or alters communication.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">HTTPS and Cryptography</h4>
                </div>
                <p className="text-white/80 mb-4">Why is HTTPS important?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It speeds up websites</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It encrypts communication between browser and server</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It blocks ads</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It hides the website</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) It encrypts communication between browser and server</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>HTTPS uses cryptography to ensure secure web communication.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Cryptography and Trust</h4>
                </div>
                <p className="text-white/80 mb-4">Which problem does cryptography help solve on the internet?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Network speed</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Trust between unknown parties</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Hardware failures</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Software updates</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Trust between unknown parties</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Cryptography enables secure interaction without prior trust.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#f59e0b] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Big Picture Question</h4>
                </div>
                <p className="text-white/80 mb-4">Why is cryptography essential in the modern digital world?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It makes computers smarter</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It protects privacy, security, and digital economies</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It replaces passwords</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It only applies to governments</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) It protects privacy, security, and digital economies</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Cryptography underpins banking, messaging, blockchain, and national security.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Biology - Molecular Biology */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              BIOLOGY (Molecular Biology) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Central Dogma, DNA Structure, Base Pairing, DNA Replication, RNA Types, Transcription, Translation, Genetic Code, Mutations, Gene Regulation, Biotechnology</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Central Dogma</h4>
                </div>
                <p className="text-white/80 mb-4">The central dogma of molecular biology describes the flow of genetic information as:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Protein → DNA → RNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) RNA → DNA → Protein</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DNA → RNA → Protein</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) DNA → Protein → RNA</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) DNA → RNA → Protein</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Genetic information is transcribed from DNA to RNA and translated into protein.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">DNA Structure</h4>
                </div>
                <p className="text-white/80 mb-4">Which statement correctly describes DNA structure?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Single-stranded helix</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Double helix with antiparallel strands</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Circular protein chain</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Triple helix</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Double helix with antiparallel strands</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>DNA consists of two antiparallel strands forming a double helix.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Base Pairing</h4>
                </div>
                <p className="text-white/80 mb-4">Which base pairing is correct in DNA?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) A–G</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) C–T</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A–T</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) G–T</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) A–T</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Adenine pairs with Thymine via hydrogen bonds; Cytosine pairs with Guanine.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">DNA Replication</h4>
                </div>
                <p className="text-white/80 mb-4">Which enzyme is responsible for synthesizing the new DNA strand?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Helicase</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) DNA ligase</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DNA polymerase</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) RNA polymerase</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) DNA polymerase</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>DNA polymerase adds nucleotides in the 5′ → 3′ direction.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">RNA Types</h4>
                </div>
                <p className="text-white/80 mb-4">Which type of RNA carries amino acids to the ribosome?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) mRNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) rRNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) tRNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) snRNA</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) tRNA</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>tRNA matches codons with the correct amino acids during translation.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Transcription vs Translation</h4>
                </div>
                <p className="text-white/80 mb-4">Which process converts genetic information into a functional protein?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Replication</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Transcription</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Translation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Mutation</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Translation</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Translation reads mRNA codons to build a polypeptide.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">Genetic Code</h4>
                </div>
                <p className="text-white/80 mb-4">Why is the genetic code described as "universal"?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) All organisms have identical DNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Most organisms use the same codons for the same amino acids</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) All proteins are identical</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) DNA does not mutate</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Most organisms use the same codons for the same amino acids</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>With few exceptions, codons specify the same amino acids across life.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">Mutation Effects</h4>
                </div>
                <p className="text-white/80 mb-4">Which mutation is most likely to have no effect on the protein?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Frameshift mutation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Nonsense mutation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Silent mutation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Large deletion</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Silent mutation</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>A silent mutation does not change the amino acid due to codon redundancy.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Gene Regulation</h4>
                </div>
                <p className="text-white/80 mb-4">Gene expression is regulated primarily to:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Increase mutation rates</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Save cellular energy and resources</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Eliminate DNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Change species</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Save cellular energy and resources</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Cells express genes only when needed to maintain efficiency.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Operon Model (Prokaryotes)</h4>
                </div>
                <p className="text-white/80 mb-4">In the lac operon, genes involved in lactose metabolism are:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Always active</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Always inactive</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Activated only when lactose is present</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Controlled by ribosomes</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Activated only when lactose is present</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>The lac operon is an inducible system—turned on by lactose.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Biotechnology Application</h4>
                </div>
                <p className="text-white/80 mb-4">Which technique is used to amplify a specific DNA segment?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Gel electrophoresis</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) DNA sequencing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) PCR</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Cloning</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) PCR</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>PCR (Polymerase Chain Reaction) rapidly copies DNA segments.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#10b981] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Big Picture</h4>
                </div>
                <p className="text-white/80 mb-4">Why is molecular biology fundamental to modern medicine?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It explains ecosystems</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) It enables gene therapy, diagnostics, and vaccines</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) It replaces chemistry</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) It studies fossils</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) It enables gene therapy, diagnostics, and vaccines</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Molecular biology underpins genomics, cancer research, and personalized medicine.</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Grade 12 Biology - Biotechnology */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🧪</span>
              BIOLOGY (Biotechnology) - Grade 12
            </h3>
            <p className="text-white/60 text-sm mb-6">Topics: Biotechnology Definition, Recombinant DNA, Plasmids, Insulin Production, PCR, Gel Electrophoresis, CRISPR-Cas9, GMOs, Gene Therapy, Stem Cells, Ethics, Bioremediation</p>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q1</span>
                  <h4 className="font-semibold text-lg">Biotechnology Definition</h4>
                </div>
                <p className="text-white/80 mb-4">Biotechnology is best defined as:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) The study of ecosystems</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) The use of living organisms or biological systems to develop useful products</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) The classification of organisms</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) The study of fossils</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) The use of living organisms or biological systems to develop useful products</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Biotechnology applies biology to technology, from medicine to agriculture.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q2</span>
                  <h4 className="font-semibold text-lg">Recombinant DNA</h4>
                </div>
                <p className="text-white/80 mb-4">Recombinant DNA technology involves:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Destroying DNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Mixing proteins</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Combining DNA from different sources</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Cloning whole organisms</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Combining DNA from different sources</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Genes from different organisms are combined to produce new traits or products.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 3 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q3</span>
                  <h4 className="font-semibold text-lg">Plasmids</h4>
                </div>
                <p className="text-white/80 mb-4">Plasmids are primarily used in biotechnology because they:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Produce energy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Act as vectors to transfer genes</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Control mutations</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Are part of the nucleus</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Act as vectors to transfer genes</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Plasmids are circular DNA molecules used as gene carriers, especially in bacteria.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 4 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q4</span>
                  <h4 className="font-semibold text-lg">Insulin Production</h4>
                </div>
                <p className="text-white/80 mb-4">Why is genetically engineered bacteria used to produce human insulin?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) It is cheaper and safer than animal insulin</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Humans cannot produce insulin</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Bacteria naturally produce insulin</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Insulin does not work in humans</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: A) It is cheaper and safer than animal insulin</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Recombinant insulin is identical to human insulin, reducing allergic reactions.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 5 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q5</span>
                  <h4 className="font-semibold text-lg">PCR Function</h4>
                </div>
                <p className="text-white/80 mb-4">The main purpose of PCR is to:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Separate DNA fragments</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Cut DNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Amplify DNA</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Sequence DNA</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Amplify DNA</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>PCR makes millions of copies of a specific DNA segment.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 6 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q6</span>
                  <h4 className="font-semibold text-lg">Gel Electrophoresis</h4>
                </div>
                <p className="text-white/80 mb-4">Gel electrophoresis separates DNA fragments based on:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Color</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Shape</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Electrical charge only</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Size</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: D) Size</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Smaller DNA fragments move faster through the gel.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 7 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q7</span>
                  <h4 className="font-semibold text-lg">CRISPR-Cas9</h4>
                </div>
                <p className="text-white/80 mb-4">CRISPR-Cas9 technology is primarily used for:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) DNA replication</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) DNA sequencing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Precise gene editing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Protein folding</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Precise gene editing</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>CRISPR allows targeted modification of specific genes.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 8 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q8</span>
                  <h4 className="font-semibold text-lg">GMOs</h4>
                </div>
                <p className="text-white/80 mb-4">A genetically modified organism (GMO) is:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) An organism exposed to radiation</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) An organism with DNA altered using biotechnology</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) A cloned organism</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) An extinct species</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) An organism with DNA altered using biotechnology</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>GMOs contain introduced or modified genes for desired traits.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 9 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q9</span>
                  <h4 className="font-semibold text-lg">Medical Biotechnology</h4>
                </div>
                <p className="text-white/80 mb-4">Which application is an example of medical biotechnology?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Biofuels</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Pest-resistant crops</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Gene therapy</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Composting</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Gene therapy</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Gene therapy aims to treat diseases at the genetic level.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 10 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q10</span>
                  <h4 className="font-semibold text-lg">Stem Cells</h4>
                </div>
                <p className="text-white/80 mb-4">Stem cells are important because they:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Cannot divide</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Can differentiate into specialized cell types</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Only exist in plants</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Cause mutations</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Can differentiate into specialized cell types</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Stem cells have self-renewal and differentiation abilities.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 11 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q11</span>
                  <h4 className="font-semibold text-lg">Ethical Considerations</h4>
                </div>
                <p className="text-white/80 mb-4">Which is a major ethical concern in biotechnology?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Speed of computers</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Gene editing in humans</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DNA size</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Bacterial growth</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Gene editing in humans</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Human gene editing raises concerns about equity, consent, and long-term effects.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 12 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q12</span>
                  <h4 className="font-semibold text-lg">Environmental Biotechnology</h4>
                </div>
                <p className="text-white/80 mb-4">Bioremediation refers to:</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Medical treatment</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Cleaning pollutants using organisms</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) DNA sequencing</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Crop breeding</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: B) Cleaning pollutants using organisms</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Microorganisms are used to break down environmental pollutants.</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Question 13 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-[#06b6d4] text-white text-sm font-bold px-3 py-1 rounded-full">Q13</span>
                  <h4 className="font-semibold text-lg">Competition-Level Reasoning</h4>
                </div>
                <p className="text-white/80 mb-4">Which biotechnology advancement has the greatest potential to impact global health equity?</p>
                <div className="space-y-2 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">A) Designer pets</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">B) Gene editing for cosmetic traits</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">C) Affordable vaccine production</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">D) Luxury pharmaceuticals</div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-[#4361ee] hover:text-[#f72585] transition-colors font-medium">
                    Show Answer & Explanation
                  </summary>
                  <div className="mt-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <p className="font-bold text-green-400 mb-3">Correct Answer: C) Affordable vaccine production</p>
                    <div className="text-white/70 space-y-2 text-sm">
                      <p>Low-cost vaccines can save millions of lives globally.</p>
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
