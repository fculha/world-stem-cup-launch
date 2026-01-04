import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
  BookOpen, Calculator, Atom, Code, Dna, Brain, BarChart3, 
  ChevronDown, ChevronLeft, ChevronRight, Globe, Shield, GraduationCap,
  CheckCircle, Play, FileText, Lightbulb, Languages, X, Check
} from 'lucide-react';

// Subject metadata
const subjectMeta: Record<string, { name: string; icon: typeof Calculator; color: string }> = {
  math: { name: 'Mathematics', icon: Calculator, color: 'from-blue-500 to-blue-700' },
  physics: { name: 'Physics', icon: Atom, color: 'from-purple-500 to-purple-700' },
  cs: { name: 'Computer Science', icon: Code, color: 'from-green-500 to-green-700' },
  biology: { name: 'Biology', icon: Dna, color: 'from-pink-500 to-pink-700' },
  reasoning: { name: 'Scientific Reasoning', icon: Lightbulb, color: 'from-yellow-500 to-yellow-700' },
  data: { name: 'Data Interpretation', icon: BarChart3, color: 'from-cyan-500 to-cyan-700' },
  critical: { name: 'Critical Thinking', icon: Brain, color: 'from-orange-500 to-orange-700' },
};

// Sample topic content (in a real app, this would come from an API)
const topicContent: Record<string, {
  title: string;
  titleEn: string;
  concept: { native: string; english: string };
  examples: { problem: string; solution: string; explanation: string }[];
  practiceQuestions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}> = {
  'linear-equations': {
    title: 'Doğrusal Denklemler',
    titleEn: 'Linear Equations',
    concept: {
      native: `Doğrusal denklemler, değişkenlerin birinci dereceden olduğu denklemlerdir. Genel formu ax + b = c şeklindedir, burada a, b ve c sabitlerdir ve x bilinmeyendir.

Doğrusal denklemlerin temel özellikleri:
• Değişkenin üssü her zaman 1'dir
• Grafiği bir doğrudur
• Tek bir çözümü vardır (a ≠ 0 ise)

Çözüm yöntemi:
1. Denklemi sadeleştirin
2. Bilinmeyeni bir tarafa toplayın
3. Sabitleri diğer tarafa toplayın
4. Katsayıya bölün`,
      english: `Linear equations are equations where variables are of the first degree. The general form is ax + b = c, where a, b, and c are constants and x is the unknown.

Key properties of linear equations:
• The exponent of the variable is always 1
• The graph is a straight line
• Has a single solution (if a ≠ 0)

Solution method:
1. Simplify the equation
2. Collect unknowns on one side
3. Collect constants on the other side
4. Divide by the coefficient`
    },
    examples: [
      {
        problem: '2x + 5 = 13',
        solution: 'x = 4',
        explanation: `Adım 1: Her iki taraftan 5 çıkarın
2x + 5 - 5 = 13 - 5
2x = 8

Adım 2: Her iki tarafı 2'ye bölün
2x ÷ 2 = 8 ÷ 2
x = 4

Doğrulama: 2(4) + 5 = 8 + 5 = 13 ✓`
      },
      {
        problem: '3x - 7 = 2x + 4',
        solution: 'x = 11',
        explanation: `Adım 1: x terimlerini bir tarafa toplayın
3x - 2x - 7 = 4
x - 7 = 4

Adım 2: Her iki tarafa 7 ekleyin
x - 7 + 7 = 4 + 7
x = 11

Doğrulama: 3(11) - 7 = 33 - 7 = 26
2(11) + 4 = 22 + 4 = 26 ✓`
      }
    ],
    practiceQuestions: [
      {
        question: '4x - 3 = 17 denkleminin çözümü nedir?',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctIndex: 2,
        explanation: '4x - 3 = 17 → 4x = 20 → x = 5'
      },
      {
        question: '2(x + 3) = 14 denkleminin çözümü nedir?',
        options: ['x = 2', 'x = 4', 'x = 5', 'x = 7'],
        correctIndex: 1,
        explanation: '2(x + 3) = 14 → x + 3 = 7 → x = 4'
      },
      {
        question: '5x + 2 = 3x + 10 denkleminin çözümü nedir?',
        options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
        correctIndex: 2,
        explanation: '5x + 2 = 3x + 10 → 2x = 8 → x = 4'
      }
    ]
  },
  'quadratic-equations': {
    title: 'İkinci Derece Denklemler',
    titleEn: 'Quadratic Equations',
    concept: {
      native: `İkinci derece denklemler, değişkenin en yüksek kuvvetinin 2 olduğu denklemlerdir. Genel formu ax² + bx + c = 0 şeklindedir.

Çözüm yöntemleri:
• Çarpanlara ayırma
• Kareyi tamamlama
• Diskriminant formülü: x = (-b ± √(b²-4ac)) / 2a

Diskriminant (Δ = b² - 4ac):
• Δ > 0: İki farklı gerçek kök
• Δ = 0: Tek kök (çakışık kökler)
• Δ < 0: Gerçek kök yok`,
      english: `Quadratic equations are equations where the highest power of the variable is 2. The general form is ax² + bx + c = 0.

Solution methods:
• Factoring
• Completing the square
• Quadratic formula: x = (-b ± √(b²-4ac)) / 2a

Discriminant (Δ = b² - 4ac):
• Δ > 0: Two distinct real roots
• Δ = 0: One root (repeated roots)
• Δ < 0: No real roots`
    },
    examples: [
      {
        problem: 'x² - 5x + 6 = 0',
        solution: 'x = 2 veya x = 3',
        explanation: `Çarpanlara ayırma yöntemi:
x² - 5x + 6 = 0
(x - 2)(x - 3) = 0

x - 2 = 0 → x = 2
x - 3 = 0 → x = 3

Doğrulama: 
2² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓
3² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓`
      }
    ],
    practiceQuestions: [
      {
        question: 'x² - 4 = 0 denkleminin kökleri nelerdir?',
        options: ['x = ±1', 'x = ±2', 'x = ±3', 'x = ±4'],
        correctIndex: 1,
        explanation: 'x² = 4 → x = ±2'
      }
    ]
  }
};

// Default content for topics without specific content
const defaultContent = {
  title: 'Topic',
  titleEn: 'Topic',
  concept: {
    native: 'Bu konu için içerik yakında eklenecektir. Lütfen daha sonra tekrar kontrol edin.',
    english: 'Content for this topic will be added soon. Please check back later.'
  },
  examples: [],
  practiceQuestions: []
};

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export default function TopicPage() {
  const { subject, grade, topicId } = useParams<{ subject: string; grade: string; topicId: string }>();
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang') || 'en';
  
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);
  const [showStudentsDropdown, setShowStudentsDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(langParam);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'concept' | 'examples' | 'practice'>('concept');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const subjectInfo = subject ? subjectMeta[subject] : null;
  const content = topicId ? (topicContent[topicId] || defaultContent) : defaultContent;
  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];
  const Icon = subjectInfo?.icon || BookOpen;

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleCheckAnswer = (questionIndex: number) => {
    setShowResults(prev => ({ ...prev, [questionIndex]: true }));
  };

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
                    to="/students/study-practice"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    Study & Practice
                  </Link>
                  <Link 
                    to="/students/for-students"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    For Students
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

      {/* Breadcrumb & Language Selector */}
      <section className="py-4 px-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/students/study-practice" className="text-white/50 hover:text-white transition-colors">
              Study & Practice
            </Link>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white/50">Grade {grade}</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white/50">{subjectInfo?.name}</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-white">{selectedLanguage === 'en' ? content.titleEn : content.title}</span>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <Languages className="w-4 h-4" />
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLanguage(lang.code); setShowLanguageDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2 ${selectedLanguage === lang.code ? 'text-white bg-white/10' : 'text-white/70'}`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Topic Header */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/students/study-practice"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${subjectInfo?.color || 'from-blue-500 to-blue-700'}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/50 mb-1">
                Grade {grade} • {subjectInfo?.name}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {selectedLanguage === 'en' ? content.titleEn : content.title}
              </h1>
              {selectedLanguage !== 'en' && (
                <div className="text-sm text-white/50 mt-1">
                  {content.titleEn}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('concept')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'concept' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              Concept
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'examples' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Play className="w-4 h-4" />
              Examples ({content.examples.length})
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'practice' 
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Practice ({content.practiceQuestions.length})
            </button>
          </div>

          {/* Content */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {/* Concept Tab */}
            {activeTab === 'concept' && (
              <div className="p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
                    {selectedLanguage === 'en' ? content.concept.english : content.concept.native}
                  </div>
                  
                  {selectedLanguage !== 'en' && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                        <Languages className="w-4 h-4" />
                        English Version
                      </div>
                      <div className="whitespace-pre-wrap text-white/60 leading-relaxed text-sm">
                        {content.concept.english}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
              <div className="p-6 md:p-8">
                {content.examples.length > 0 ? (
                  <div className="space-y-8">
                    {content.examples.map((example, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                          <span className="bg-white/10 px-2 py-1 rounded font-mono">Example {index + 1}</span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-white/50 mb-1">Problem</div>
                          <div className="text-xl font-mono bg-white/5 px-4 py-3 rounded-lg">
                            {example.problem}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm text-white/50 mb-1">Solution</div>
                          <div className="text-xl font-bold text-green-400">
                            {example.solution}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-white/50 mb-2">Step-by-step Explanation</div>
                          <div className="whitespace-pre-wrap text-white/70 bg-white/5 px-4 py-3 rounded-lg font-mono text-sm">
                            {example.explanation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/50">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Examples will be added soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <div className="p-6 md:p-8">
                {content.practiceQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {content.practiceQuestions.map((q, qIndex) => {
                      const isAnswered = selectedAnswers[qIndex] !== undefined;
                      const isCorrect = selectedAnswers[qIndex] === q.correctIndex;
                      const showResult = showResults[qIndex];
                      
                      return (
                        <div key={qIndex} className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                            <span className="bg-white/10 px-2 py-1 rounded font-mono">Question {qIndex + 1}</span>
                          </div>
                          
                          <div className="text-lg mb-4">{q.question}</div>
                          
                          <div className="space-y-2 mb-4">
                            {q.options.map((option, oIndex) => {
                              const isSelected = selectedAnswers[qIndex] === oIndex;
                              const isCorrectOption = oIndex === q.correctIndex;
                              
                              let optionClass = 'bg-white/5 hover:bg-white/10 border-white/10';
                              if (showResult) {
                                if (isCorrectOption) {
                                  optionClass = 'bg-green-500/20 border-green-500/50';
                                } else if (isSelected && !isCorrectOption) {
                                  optionClass = 'bg-red-500/20 border-red-500/50';
                                }
                              } else if (isSelected) {
                                optionClass = 'bg-[#4361ee]/20 border-[#4361ee]/50';
                              }
                              
                              return (
                                <button
                                  key={oIndex}
                                  onClick={() => !showResult && handleAnswerSelect(qIndex, oIndex)}
                                  disabled={showResult}
                                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center gap-3 ${optionClass}`}
                                >
                                  <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-sm">
                                    {String.fromCharCode(65 + oIndex)}
                                  </span>
                                  <span className="flex-1">{option}</span>
                                  {showResult && isCorrectOption && (
                                    <Check className="w-5 h-5 text-green-400" />
                                  )}
                                  {showResult && isSelected && !isCorrectOption && (
                                    <X className="w-5 h-5 text-red-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          
                          {!showResult && isAnswered && (
                            <button
                              onClick={() => handleCheckAnswer(qIndex)}
                              className="bg-gradient-to-r from-[#4361ee] to-[#7c3aed] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              Check Answer
                            </button>
                          )}
                          
                          {showResult && (
                            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="font-medium text-green-400">Correct!</span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-5 h-5 text-red-400" />
                                    <span className="font-medium text-red-400">Incorrect</span>
                                  </>
                                )}
                              </div>
                              <div className="text-sm text-white/70">
                                <strong>Explanation:</strong> {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/50">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Practice questions will be added soon.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AI Usage Notice */}
      <section className="py-8 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/50">
            <strong className="text-white/70">AI Usage Policy:</strong> AI is used only for guided tutoring and content delivery. 
            AI is not used during live competitions. All learning content aligns with predefined academic standards.
          </p>
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
