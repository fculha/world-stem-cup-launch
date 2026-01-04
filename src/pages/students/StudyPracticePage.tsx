import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Calculator, Atom, Code, Dna, Brain, BarChart3, 
  ChevronDown, ChevronRight, Globe, Shield, GraduationCap,
  CheckCircle, Play, FileText, Lightbulb, Languages
} from 'lucide-react';

// Subject domains with icons and colors
const subjects = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    icon: Calculator, 
    color: 'from-blue-500 to-blue-700',
    description: 'Algebra, functions, geometry, logical reasoning, and foundational calculus concepts.'
  },
  { 
    id: 'physics', 
    name: 'Physics', 
    icon: Atom, 
    color: 'from-purple-500 to-purple-700',
    description: 'Mechanics, electricity, waves, energy, and core physical principles.'
  },
  { 
    id: 'cs', 
    name: 'Computer Science & Logical Thinking', 
    icon: Code, 
    color: 'from-green-500 to-green-700',
    description: 'Algorithms, logic structures, computational reasoning, and problem-solving concepts.'
  },
  { 
    id: 'biology', 
    name: 'Biology', 
    icon: Dna, 
    color: 'from-pink-500 to-pink-700',
    description: 'Cell biology, genetics, ecosystems, and scientific interpretation.',
    optional: true
  },
  { 
    id: 'reasoning', 
    name: 'Scientific Reasoning', 
    icon: Lightbulb, 
    color: 'from-yellow-500 to-yellow-700',
    description: 'Hypothesis building, experimental thinking, cause-effect analysis.'
  },
  { 
    id: 'data', 
    name: 'Data Interpretation', 
    icon: BarChart3, 
    color: 'from-cyan-500 to-cyan-700',
    description: 'Reading charts, tables, graphs, and real-world datasets.'
  },
  { 
    id: 'critical', 
    name: 'Critical Thinking', 
    icon: Brain, 
    color: 'from-orange-500 to-orange-700',
    description: 'Multi-step reasoning, inference, analytical judgment, and elimination strategies.'
  },
];

// Topics for each subject by grade level
const topicsBySubject: Record<string, Record<string, { id: string; name: string; nameEn: string }[]>> = {
  math: {
    '9': [
      { id: 'linear-equations', name: 'Doğrusal Denklemler', nameEn: 'Linear Equations' },
      { id: 'inequalities', name: 'Eşitsizlikler', nameEn: 'Inequalities' },
      { id: 'functions-intro', name: 'Fonksiyonlara Giriş', nameEn: 'Introduction to Functions' },
      { id: 'geometry-basics', name: 'Geometri Temelleri', nameEn: 'Geometry Basics' },
      { id: 'ratios-proportions', name: 'Oran ve Orantı', nameEn: 'Ratios and Proportions' },
    ],
    '10': [
      { id: 'quadratic-equations', name: 'İkinci Derece Denklemler', nameEn: 'Quadratic Equations' },
      { id: 'polynomial-functions', name: 'Polinom Fonksiyonlar', nameEn: 'Polynomial Functions' },
      { id: 'trigonometry-intro', name: 'Trigonometriye Giriş', nameEn: 'Introduction to Trigonometry' },
      { id: 'coordinate-geometry', name: 'Analitik Geometri', nameEn: 'Coordinate Geometry' },
      { id: 'sequences', name: 'Diziler', nameEn: 'Sequences' },
    ],
    '11': [
      { id: 'exponential-functions', name: 'Üstel Fonksiyonlar', nameEn: 'Exponential Functions' },
      { id: 'logarithms', name: 'Logaritmalar', nameEn: 'Logarithms' },
      { id: 'trigonometry-advanced', name: 'İleri Trigonometri', nameEn: 'Advanced Trigonometry' },
      { id: 'limits-intro', name: 'Limitlere Giriş', nameEn: 'Introduction to Limits' },
      { id: 'probability', name: 'Olasılık', nameEn: 'Probability' },
    ],
    '12': [
      { id: 'derivatives', name: 'Türev', nameEn: 'Derivatives' },
      { id: 'integrals', name: 'İntegral', nameEn: 'Integrals' },
      { id: 'differential-equations', name: 'Diferansiyel Denklemler', nameEn: 'Differential Equations' },
      { id: 'vectors', name: 'Vektörler', nameEn: 'Vectors' },
      { id: 'matrices', name: 'Matrisler', nameEn: 'Matrices' },
    ],
  },
  physics: {
    '9': [
      { id: 'motion-basics', name: 'Hareket Temelleri', nameEn: 'Motion Basics' },
      { id: 'forces', name: 'Kuvvetler', nameEn: 'Forces' },
      { id: 'energy-intro', name: 'Enerjiye Giriş', nameEn: 'Introduction to Energy' },
      { id: 'heat-temperature', name: 'Isı ve Sıcaklık', nameEn: 'Heat and Temperature' },
    ],
    '10': [
      { id: 'kinematics', name: 'Kinematik', nameEn: 'Kinematics' },
      { id: 'newtons-laws', name: 'Newton Yasaları', nameEn: "Newton's Laws" },
      { id: 'work-energy', name: 'İş ve Enerji', nameEn: 'Work and Energy' },
      { id: 'momentum', name: 'Momentum', nameEn: 'Momentum' },
    ],
    '11': [
      { id: 'electricity', name: 'Elektrik', nameEn: 'Electricity' },
      { id: 'magnetism', name: 'Manyetizma', nameEn: 'Magnetism' },
      { id: 'waves', name: 'Dalgalar', nameEn: 'Waves' },
      { id: 'optics', name: 'Optik', nameEn: 'Optics' },
    ],
    '12': [
      { id: 'modern-physics', name: 'Modern Fizik', nameEn: 'Modern Physics' },
      { id: 'quantum-intro', name: 'Kuantuma Giriş', nameEn: 'Introduction to Quantum' },
      { id: 'relativity', name: 'Görelilik', nameEn: 'Relativity' },
      { id: 'nuclear-physics', name: 'Nükleer Fizik', nameEn: 'Nuclear Physics' },
    ],
  },
  cs: {
    '9': [
      { id: 'logic-basics', name: 'Mantık Temelleri', nameEn: 'Logic Basics' },
      { id: 'algorithms-intro', name: 'Algoritmalara Giriş', nameEn: 'Introduction to Algorithms' },
      { id: 'flowcharts', name: 'Akış Şemaları', nameEn: 'Flowcharts' },
      { id: 'problem-decomposition', name: 'Problem Ayrıştırma', nameEn: 'Problem Decomposition' },
    ],
    '10': [
      { id: 'data-structures-basic', name: 'Temel Veri Yapıları', nameEn: 'Basic Data Structures' },
      { id: 'sorting-searching', name: 'Sıralama ve Arama', nameEn: 'Sorting and Searching' },
      { id: 'pattern-recognition', name: 'Örüntü Tanıma', nameEn: 'Pattern Recognition' },
      { id: 'computational-thinking', name: 'Hesaplamalı Düşünme', nameEn: 'Computational Thinking' },
    ],
    '11': [
      { id: 'recursion', name: 'Özyineleme', nameEn: 'Recursion' },
      { id: 'graph-theory', name: 'Graf Teorisi', nameEn: 'Graph Theory' },
      { id: 'complexity', name: 'Karmaşıklık Analizi', nameEn: 'Complexity Analysis' },
      { id: 'optimization', name: 'Optimizasyon', nameEn: 'Optimization' },
    ],
    '12': [
      { id: 'dynamic-programming', name: 'Dinamik Programlama', nameEn: 'Dynamic Programming' },
      { id: 'advanced-algorithms', name: 'İleri Algoritmalar', nameEn: 'Advanced Algorithms' },
      { id: 'ai-basics', name: 'Yapay Zeka Temelleri', nameEn: 'AI Basics' },
      { id: 'cryptography-intro', name: 'Kriptografiye Giriş', nameEn: 'Introduction to Cryptography' },
    ],
  },
  biology: {
    '9': [
      { id: 'cell-structure', name: 'Hücre Yapısı', nameEn: 'Cell Structure' },
      { id: 'cell-division', name: 'Hücre Bölünmesi', nameEn: 'Cell Division' },
      { id: 'basic-genetics', name: 'Temel Genetik', nameEn: 'Basic Genetics' },
    ],
    '10': [
      { id: 'dna-rna', name: 'DNA ve RNA', nameEn: 'DNA and RNA' },
      { id: 'protein-synthesis', name: 'Protein Sentezi', nameEn: 'Protein Synthesis' },
      { id: 'evolution', name: 'Evrim', nameEn: 'Evolution' },
    ],
    '11': [
      { id: 'ecosystems', name: 'Ekosistemler', nameEn: 'Ecosystems' },
      { id: 'human-biology', name: 'İnsan Biyolojisi', nameEn: 'Human Biology' },
      { id: 'plant-biology', name: 'Bitki Biyolojisi', nameEn: 'Plant Biology' },
    ],
    '12': [
      { id: 'molecular-biology', name: 'Moleküler Biyoloji', nameEn: 'Molecular Biology' },
      { id: 'biotechnology', name: 'Biyoteknoloji', nameEn: 'Biotechnology' },
      { id: 'bioinformatics', name: 'Biyoinformatik', nameEn: 'Bioinformatics' },
    ],
  },
  reasoning: {
    '9': [
      { id: 'hypothesis-formation', name: 'Hipotez Oluşturma', nameEn: 'Hypothesis Formation' },
      { id: 'observation-skills', name: 'Gözlem Becerileri', nameEn: 'Observation Skills' },
      { id: 'cause-effect', name: 'Neden-Sonuç İlişkisi', nameEn: 'Cause and Effect' },
    ],
    '10': [
      { id: 'experimental-design', name: 'Deney Tasarımı', nameEn: 'Experimental Design' },
      { id: 'variables', name: 'Değişkenler', nameEn: 'Variables' },
      { id: 'scientific-method', name: 'Bilimsel Yöntem', nameEn: 'Scientific Method' },
    ],
    '11': [
      { id: 'data-analysis', name: 'Veri Analizi', nameEn: 'Data Analysis' },
      { id: 'error-analysis', name: 'Hata Analizi', nameEn: 'Error Analysis' },
      { id: 'conclusion-drawing', name: 'Sonuç Çıkarma', nameEn: 'Drawing Conclusions' },
    ],
    '12': [
      { id: 'research-methodology', name: 'Araştırma Metodolojisi', nameEn: 'Research Methodology' },
      { id: 'peer-review', name: 'Hakemli Değerlendirme', nameEn: 'Peer Review' },
      { id: 'scientific-communication', name: 'Bilimsel İletişim', nameEn: 'Scientific Communication' },
    ],
  },
  data: {
    '9': [
      { id: 'reading-graphs', name: 'Grafik Okuma', nameEn: 'Reading Graphs' },
      { id: 'tables-charts', name: 'Tablolar ve Grafikler', nameEn: 'Tables and Charts' },
      { id: 'basic-statistics', name: 'Temel İstatistik', nameEn: 'Basic Statistics' },
    ],
    '10': [
      { id: 'data-visualization', name: 'Veri Görselleştirme', nameEn: 'Data Visualization' },
      { id: 'correlation', name: 'Korelasyon', nameEn: 'Correlation' },
      { id: 'trends-patterns', name: 'Trendler ve Örüntüler', nameEn: 'Trends and Patterns' },
    ],
    '11': [
      { id: 'statistical-inference', name: 'İstatistiksel Çıkarım', nameEn: 'Statistical Inference' },
      { id: 'regression', name: 'Regresyon', nameEn: 'Regression' },
      { id: 'data-modeling', name: 'Veri Modelleme', nameEn: 'Data Modeling' },
    ],
    '12': [
      { id: 'advanced-statistics', name: 'İleri İstatistik', nameEn: 'Advanced Statistics' },
      { id: 'big-data-concepts', name: 'Büyük Veri Kavramları', nameEn: 'Big Data Concepts' },
      { id: 'predictive-analysis', name: 'Tahminsel Analiz', nameEn: 'Predictive Analysis' },
    ],
  },
  critical: {
    '9': [
      { id: 'logical-reasoning', name: 'Mantıksal Akıl Yürütme', nameEn: 'Logical Reasoning' },
      { id: 'argument-analysis', name: 'Argüman Analizi', nameEn: 'Argument Analysis' },
      { id: 'deductive-reasoning', name: 'Tümdengelim', nameEn: 'Deductive Reasoning' },
    ],
    '10': [
      { id: 'inductive-reasoning', name: 'Tümevarım', nameEn: 'Inductive Reasoning' },
      { id: 'fallacies', name: 'Mantık Hataları', nameEn: 'Logical Fallacies' },
      { id: 'evidence-evaluation', name: 'Kanıt Değerlendirme', nameEn: 'Evidence Evaluation' },
    ],
    '11': [
      { id: 'problem-solving', name: 'Problem Çözme', nameEn: 'Problem Solving' },
      { id: 'decision-making', name: 'Karar Verme', nameEn: 'Decision Making' },
      { id: 'analytical-thinking', name: 'Analitik Düşünme', nameEn: 'Analytical Thinking' },
    ],
    '12': [
      { id: 'complex-reasoning', name: 'Karmaşık Akıl Yürütme', nameEn: 'Complex Reasoning' },
      { id: 'synthesis', name: 'Sentez', nameEn: 'Synthesis' },
      { id: 'metacognition', name: 'Üstbiliş', nameEn: 'Metacognition' },
    ],
  },
};

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

// Grade levels
const grades = ['9', '10', '11', '12'];

export default function StudyPracticePage() {
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);
  const [showGovernanceDropdown, setShowGovernanceDropdown] = useState(false);
  const [showStudentsDropdown, setShowStudentsDropdown] = useState(false);
  
  const [selectedGrade, setSelectedGrade] = useState<string>('9');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];
  const topics = selectedSubject && selectedGrade ? topicsBySubject[selectedSubject]?.[selectedGrade] || [] : [];

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
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    For Students
                  </Link>
                  <Link 
                    to="/students/study-practice"
                    onClick={() => setShowStudentsDropdown(false)}
                    className="block px-4 py-2 text-sm text-white font-medium hover:bg-white/5 transition-colors"
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
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4361ee]/20 to-[#f72585]/20 px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-[#4361ee]" />
              <span className="text-sm font-medium">Student Learning Module</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Study & Practice
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Prepare for World STEM Cup with structured learning materials. 
              Select your grade, subject, and preferred language to begin.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <Languages className="w-4 h-4" />
                <span className="text-lg">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLanguageDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#16213e] border border-white/10 rounded-lg shadow-xl py-2 z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLanguage(lang.code); setShowLanguageDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-2 ${selectedLanguage === lang.code ? 'text-white bg-white/10' : 'text-white/70'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selection Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Grade Selection */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#4361ee]" />
                Select Grade Level
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {grades.map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedGrade === grade
                        ? 'bg-gradient-to-r from-[#4361ee] to-[#7c3aed] text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white/70'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selection */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#f72585]" />
                Select Subject Domain
              </h2>
              <p className="text-sm text-white/50 mb-4">These subjects reflect the official World STEM Cup competition framework.</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map(subject => {
                  const Icon = subject.icon;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-3 rounded-xl text-left transition-all flex items-center gap-2 ${
                        selectedSubject === subject.id
                          ? `bg-gradient-to-r ${subject.color} text-white shadow-lg`
                          : 'bg-white/10 hover:bg-white/20 text-white/70'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{subject.name}</span>
                      {subject.optional && (
                        <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">Optional</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Subject Description */}
          {selectedSubject && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
              {(() => {
                const subject = subjects.find(s => s.id === selectedSubject);
                if (!subject) return null;
                const Icon = subject.icon;
                return (
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${subject.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                      <p className="text-white/70">{subject.description}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Topics List */}
          {selectedGrade && selectedSubject && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4361ee]" />
                Topics for Grade {selectedGrade} - {subjects.find(s => s.id === selectedSubject)?.name}
              </h2>
              
              {topics.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic, index) => (
                    <Link
                      key={topic.id}
                      to={`/students/topic/${selectedSubject}/${selectedGrade}/${topic.id}?lang=${selectedLanguage}`}
                      className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-white/10 px-2 py-1 rounded font-mono">
                              {index + 1}
                            </span>
                            <span className="text-xs text-white/50">{topic.nameEn}</span>
                          </div>
                          <h3 className="font-medium text-white group-hover:text-[#4361ee] transition-colors">
                            {selectedLanguage === 'en' ? topic.nameEn : topic.name}
                          </h3>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Concept
                        </span>
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" /> Examples
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Practice
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/50">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No topics available for this selection.</p>
                </div>
              )}
            </div>
          )}

          {/* Info Cards */}
          {!selectedGrade && !selectedSubject && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-[#4361ee] to-[#7c3aed] rounded-xl flex items-center justify-center mb-4">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn in Your Language</h3>
                <p className="text-white/70 text-sm">
                  Study concepts in your native language with English scientific terminology. 
                  Language is never a barrier to scientific excellence.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-[#f72585] to-[#7c3aed] rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Understanding Over Memorization</h3>
                <p className="text-white/70 text-sm">
                  All questions measure understanding and reasoning, not memorization. 
                  Focus on concepts, not rote learning.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-[#4361ee] to-[#f72585] rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fair & Transparent</h3>
                <p className="text-white/70 text-sm">
                  Your success is determined only by your academic performance. 
                  Merit, reasoning, and understanding matter most.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Competition Alignment Notice */}
      <section className="py-6 px-6 bg-gradient-to-r from-[#4361ee]/10 to-[#f72585]/10 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/70">
            Practice content is aligned with World STEM Cup reasoning style and difficulty level, but practice scores do not affect competition results.
          </p>
        </div>
      </section>

      {/* AI Usage Notice */}
      <section className="py-8 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/50">
            <strong className="text-white/70">AI Usage Policy:</strong> AI is for learning only. 
            AI is never used during competitions. No student data is used for model training.
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
