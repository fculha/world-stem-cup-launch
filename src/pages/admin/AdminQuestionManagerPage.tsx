import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, LogOut, ArrowLeft, Plus, Upload, Trash2, Edit, Eye, Filter, FileJson, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface Grade {
  id: number;
  name: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
}

interface StudyQuestion {
  id: number;
  grade: number;
  subject: string;
  topic: string;
  question_type: 'example' | 'practice';
  question_text: string;
  choices: string[] | null;
  correct_choice_index: number | null;
  solution: string | null;
  explanation: string | null;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  language: string;
  tags: string[] | null;
  external_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

interface QuestionFormData {
  grade: number;
  subject: string;
  topic: string;
  question_type: 'example' | 'practice';
  question_text: string;
  choices: string[];
  correct_choice_index: number;
  solution: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  tags: string[];
  external_id: string;
}

interface BulkImportResult {
  message: string;
  inserted: number;
  updated: number;
  deleted: number;
  errors: string[];
  log_id: number;
}

const initialFormData: QuestionFormData = {
  grade: 9,
  subject: '',
  topic: '',
  question_type: 'practice',
  question_text: '',
  choices: ['', '', '', ''],
  correct_choice_index: 0,
  solution: '',
  explanation: '',
  difficulty: 'medium',
  language: 'en',
  tags: [],
  external_id: '',
};

export default function AdminQuestionManagerPage() {
  const { user, accessToken, logout } = useAuth();
  
  // Taxonomy state
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  
  // Filter state
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  
  // Questions state
  const [questions, setQuestions] = useState<StudyQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>(initialFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Bulk upload state
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkJson, setBulkJson] = useState('');
  const [bulkMode, setBulkMode] = useState<'append' | 'replace' | 'upsert'>('append');
  const [bulkPreview, setBulkPreview] = useState<QuestionFormData[]>([]);
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState<BulkImportResult | null>(null);
  
  // View question modal
  const [viewQuestion, setViewQuestion] = useState<StudyQuestion | null>(null);

  // Fetch grades on mount
  useEffect(() => {
    fetchGrades();
  }, [accessToken]);

  // Fetch subjects when grade changes
  useEffect(() => {
    if (selectedGrade) {
      fetchSubjects(selectedGrade);
      setSelectedSubject('');
      setSelectedTopic('');
      setTopics([]);
    }
  }, [selectedGrade]);

  // Fetch topics when subject changes
  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      fetchTopics(selectedGrade, selectedSubject);
      setSelectedTopic('');
    }
  }, [selectedGrade, selectedSubject]);

  // Fetch questions when filters change
  useEffect(() => {
    fetchQuestions();
  }, [selectedGrade, selectedSubject, selectedTopic, selectedType, accessToken]);

  const fetchGrades = async () => {
    if (!accessToken) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/question-manager/grades`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch grades');
      const data = await response.json();
      setGrades(data.grades);
    } catch (err) {
      console.error('Error fetching grades:', err);
    }
  };

  const fetchSubjects = async (grade: number) => {
    if (!accessToken) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/question-manager/subjects?grade=${grade}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch subjects');
      const data = await response.json();
      setSubjects(data.subjects);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  const fetchTopics = async (grade: number, subject: string) => {
    if (!accessToken) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/question-manager/topics?grade=${grade}&subject=${subject}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch topics');
      const data = await response.json();
      setTopics(data.topics);
    } catch (err) {
      console.error('Error fetching topics:', err);
    }
  };

  const fetchQuestions = async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (selectedGrade) params.append('grade', selectedGrade.toString());
      if (selectedSubject) params.append('subject', selectedSubject);
      if (selectedTopic) params.append('topic', selectedTopic);
      if (selectedType) params.append('question_type', selectedType);
      
      const response = await fetch(`${API_URL}/api/admin/question-manager/questions?${params}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data.questions);
      setTotalQuestions(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    
    try {
      setFormLoading(true);
      setError(null);
      
      const payload = {
        ...formData,
        choices: formData.choices.filter(c => c.trim() !== ''),
        tags: formData.tags.filter(t => t.trim() !== ''),
        external_id: formData.external_id || null,
      };
      
      const url = editingId 
        ? `${API_URL}/api/admin/question-manager/questions/${editingId}`
        : `${API_URL}/api/admin/question-manager/questions`;
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save question');
      }
      
      setSuccess(editingId ? 'Question updated successfully' : 'Question created successfully');
      setShowForm(false);
      setFormData(initialFormData);
      setEditingId(null);
      fetchQuestions();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (question: StudyQuestion) => {
    setFormData({
      grade: question.grade,
      subject: question.subject,
      topic: question.topic,
      question_type: question.question_type,
      question_text: question.question_text,
      choices: question.choices || ['', '', '', ''],
      correct_choice_index: question.correct_choice_index || 0,
      solution: question.solution || '',
      explanation: question.explanation || '',
      difficulty: question.difficulty || 'medium',
      language: question.language,
      tags: question.tags || [],
      external_id: question.external_id || '',
    });
    setEditingId(question.id);
    setShowForm(true);
    
    // Update dependent dropdowns
    setSelectedGrade(question.grade);
    fetchSubjects(question.grade).then(() => {
      setSelectedSubject(question.subject);
      fetchTopics(question.grade, question.subject);
    });
  };

  const handleDelete = async (questionId: number) => {
    if (!accessToken) return;
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/admin/question-manager/questions/${questionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      
      if (!response.ok) throw new Error('Failed to delete question');
      
      setSuccess('Question deleted successfully');
      fetchQuestions();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleBulkJsonChange = (json: string) => {
    setBulkJson(json);
    setBulkErrors([]);
    setBulkPreview([]);
    setBulkResult(null);
    
    if (!json.trim()) return;
    
    try {
      const parsed = JSON.parse(json);
      const questions = Array.isArray(parsed) ? parsed : [parsed];
      
      const errors: string[] = [];
      const preview: QuestionFormData[] = [];
      
      questions.forEach((q, i) => {
        if (!q.question_text) errors.push(`Question ${i + 1}: Missing question_text`);
        if (!q.grade) errors.push(`Question ${i + 1}: Missing grade`);
        if (!q.subject) errors.push(`Question ${i + 1}: Missing subject`);
        if (!q.topic) errors.push(`Question ${i + 1}: Missing topic`);
        
        preview.push({
          grade: q.grade || 9,
          subject: q.subject || '',
          topic: q.topic || '',
          question_type: q.question_type || 'practice',
          question_text: q.question_text || '',
          choices: q.choices || [],
          correct_choice_index: q.correct_choice_index ?? 0,
          solution: q.solution || '',
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'medium',
          language: q.language || 'en',
          tags: q.tags || [],
          external_id: q.external_id || '',
        });
      });
      
      setBulkErrors(errors);
      setBulkPreview(preview);
    } catch {
      setBulkErrors(['Invalid JSON format']);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleBulkJsonChange(content);
    };
    reader.readAsText(file);
  };

  const handleBulkImport = async () => {
    if (!accessToken || bulkPreview.length === 0) return;
    
    try {
      setBulkLoading(true);
      setError(null);
      
      const payload = {
        mode: bulkMode,
        scope: {
          grade: selectedGrade,
          subject: selectedSubject || null,
          topic: selectedTopic || null,
          question_type: selectedType || null,
          language: 'en',
        },
        questions: bulkPreview,
      };
      
      const response = await fetch(`${API_URL}/api/admin/question-manager/questions/bulk-import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please logout and login again to continue.');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to import questions');
      }
      
      const result: BulkImportResult = await response.json();
      setBulkResult(result);
      
      if (result.inserted > 0 || result.updated > 0) {
        fetchQuestions();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setBulkLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'example' 
      ? <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Example</span>
      : <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Practice</span>;
  };

  const getDifficultyBadge = (difficulty: string | null) => {
    switch (difficulty) {
      case 'easy':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Easy</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Medium</span>;
      case 'hard':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Hard</span>;
      default:
        return null;
    }
  };

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
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Question Manager</h1>
            <p className="text-white/60">Manage Study & Practice questions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowBulkUpload(true); setShowForm(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Bulk Upload
            </button>
            <button
              onClick={() => { setShowForm(true); setShowBulkUpload(false); setEditingId(null); setFormData(initialFormData); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-white/60" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Grade</label>
              <select
                value={selectedGrade || ''}
                onChange={(e) => setSelectedGrade(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
              >
                <option value="">All Grades</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedGrade}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee] disabled:opacity-50"
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedSubject}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee] disabled:opacity-50"
              >
                <option value="">All Topics</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
              >
                <option value="">All Types</option>
                <option value="example">Example</option>
                <option value="practice">Practice</option>
              </select>
            </div>
          </div>
        </div>

        {/* Manual Entry Form */}
        {showForm && (
          <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{editingId ? 'Edit Question' : 'Add New Question'}</h2>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-white/60 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Grade *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => {
                      const grade = parseInt(e.target.value);
                      setFormData({ ...formData, grade, subject: '', topic: '' });
                      fetchSubjects(grade);
                    }}
                    required
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value, topic: '' });
                      fetchTopics(formData.grade, e.target.value);
                    }}
                    required
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Topic *</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    <option value="">Select Topic</option>
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Type *</label>
                  <select
                    value={formData.question_type}
                    onChange={(e) => setFormData({ ...formData, question_type: e.target.value as 'example' | 'practice' })}
                    required
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    <option value="practice">Practice</option>
                    <option value="example">Example</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Question Text *</label>
                <textarea
                  value={formData.question_text}
                  onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  placeholder="Enter the question text..."
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Choices (A-D)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['A', 'B', 'C', 'D'].map((letter, index) => (
                    <div key={letter} className="flex items-center gap-2">
                      <span className="text-white/40 w-6">{letter}.</span>
                      <input
                        type="text"
                        value={formData.choices[index] || ''}
                        onChange={(e) => {
                          const newChoices = [...formData.choices];
                          newChoices[index] = e.target.value;
                          setFormData({ ...formData, choices: newChoices });
                        }}
                        className="flex-1 bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                        placeholder={`Option ${letter}`}
                      />
                      <input
                        type="radio"
                        name="correct_choice"
                        checked={formData.correct_choice_index === index}
                        onChange={() => setFormData({ ...formData, correct_choice_index: index })}
                        className="w-4 h-4"
                        title="Mark as correct answer"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-1">Select the radio button next to the correct answer</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Solution (for examples)</label>
                  <textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={3}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                    placeholder="Step-by-step solution..."
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Explanation</label>
                  <textarea
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    rows={3}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                    placeholder="Explanation of the answer..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                  >
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">External ID (optional)</label>
                  <input
                    type="text"
                    value={formData.external_id}
                    onChange={(e) => setFormData({ ...formData, external_id: e.target.value })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                    placeholder="Unique identifier for upsert"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 rounded-lg bg-[#4361ee] hover:bg-[#4361ee]/80 transition-colors disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : (editingId ? 'Update Question' : 'Create Question')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bulk Upload Section */}
        {showBulkUpload && (
          <div className="bg-[#16213e] rounded-xl border border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-purple-400" />
                <h2 className="font-semibold">Bulk Upload</h2>
              </div>
              <button onClick={() => setShowBulkUpload(false)} className="text-white/60 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Import Mode</label>
                <select
                  value={bulkMode}
                  onChange={(e) => setBulkMode(e.target.value as 'append' | 'replace' | 'upsert')}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee]"
                >
                  <option value="append">Append (add new questions)</option>
                  <option value="replace">Replace (delete scope, then insert)</option>
                  <option value="upsert">Upsert (update by external_id)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-white/60 text-sm mb-2">Upload JSON File</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee] file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#4361ee] file:text-white file:cursor-pointer"
                />
              </div>
            </div>

            {bulkMode === 'replace' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>Replace mode will delete all existing questions matching the selected filters before importing!</span>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Or Paste JSON</label>
              <textarea
                value={bulkJson}
                onChange={(e) => handleBulkJsonChange(e.target.value)}
                rows={8}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#4361ee] font-mono text-sm"
                placeholder={`[
  {
    "grade": 9,
    "subject": "math",
    "topic": "linear-equations",
    "question_type": "practice",
    "question_text": "Solve for x: 2x + 5 = 15",
    "choices": ["x = 5", "x = 10", "x = 7.5", "x = 2"],
    "correct_choice_index": 0,
    "explanation": "Subtract 5 from both sides: 2x = 10. Divide by 2: x = 5",
    "difficulty": "easy",
    "external_id": "math-9-le-001"
  }
]`}
              />
            </div>

            {/* Validation Errors */}
            {bulkErrors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="text-red-400 font-medium mb-2">Validation Errors:</p>
                <ul className="list-disc list-inside text-red-400/80 text-sm">
                  {bulkErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview Table */}
            {bulkPreview.length > 0 && bulkErrors.length === 0 && (
              <div className="mb-4">
                <p className="text-white/60 text-sm mb-2">Preview ({bulkPreview.length} questions)</p>
                <div className="bg-[#0a0a1a] rounded-lg border border-white/10 overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#16213e] sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 text-white/60">#</th>
                        <th className="text-left px-3 py-2 text-white/60">Grade</th>
                        <th className="text-left px-3 py-2 text-white/60">Subject</th>
                        <th className="text-left px-3 py-2 text-white/60">Topic</th>
                        <th className="text-left px-3 py-2 text-white/60">Type</th>
                        <th className="text-left px-3 py-2 text-white/60">Question</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bulkPreview.slice(0, 10).map((q, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2 text-white/40">{i + 1}</td>
                          <td className="px-3 py-2">{q.grade}</td>
                          <td className="px-3 py-2">{q.subject}</td>
                          <td className="px-3 py-2">{q.topic}</td>
                          <td className="px-3 py-2">{q.question_type}</td>
                          <td className="px-3 py-2 truncate max-w-xs">{q.question_text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bulkPreview.length > 10 && (
                    <p className="text-center text-white/40 text-sm py-2">...and {bulkPreview.length - 10} more</p>
                  )}
                </div>
              </div>
            )}

            {/* Import Result */}
            {bulkResult && (
              <div className={`rounded-lg p-4 mb-4 ${bulkResult.errors.length > 0 ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                <p className={`font-medium mb-2 ${bulkResult.errors.length > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {bulkResult.message}
                </p>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div><span className="text-white/60">Inserted:</span> <span className="text-green-400">{bulkResult.inserted}</span></div>
                  <div><span className="text-white/60">Updated:</span> <span className="text-blue-400">{bulkResult.updated}</span></div>
                  <div><span className="text-white/60">Deleted:</span> <span className="text-red-400">{bulkResult.deleted}</span></div>
                  <div><span className="text-white/60">Errors:</span> <span className="text-yellow-400">{bulkResult.errors.length}</span></div>
                </div>
                {bulkResult.errors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-yellow-400/80 text-sm">Errors:</p>
                    <ul className="list-disc list-inside text-yellow-400/60 text-xs mt-1">
                      {bulkResult.errors.slice(0, 5).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                      {bulkResult.errors.length > 5 && <li>...and {bulkResult.errors.length - 5} more</li>}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setBulkJson(''); setBulkPreview([]); setBulkErrors([]); setBulkResult(null); }}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleBulkImport}
                disabled={bulkLoading || bulkPreview.length === 0 || bulkErrors.length > 0}
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-500/80 transition-colors disabled:opacity-50"
              >
                {bulkLoading ? 'Importing...' : `Import ${bulkPreview.length} Questions`}
              </button>
            </div>
          </div>
        )}

        {/* Questions Table */}
        <div className="bg-[#16213e] rounded-xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-semibold">Questions ({totalQuestions})</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-[#4361ee] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white/60">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-12">
              <FileJson className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No questions found</p>
              <p className="text-white/40 text-sm mt-1">Use the filters above or add new questions</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#0a0a1a]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Grade</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Subject</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Topic</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Difficulty</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Question</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {questions.map((question) => (
                  <tr key={question.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">{question.grade}</td>
                    <td className="px-6 py-4">{question.subject}</td>
                    <td className="px-6 py-4">{question.topic}</td>
                    <td className="px-6 py-4">{getTypeBadge(question.question_type)}</td>
                    <td className="px-6 py-4">{getDifficultyBadge(question.difficulty)}</td>
                    <td className="px-6 py-4">
                      <p className="truncate max-w-xs">{question.question_text}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewQuestion(question)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(question)}
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(question.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* View Question Modal */}
        {viewQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#16213e] rounded-xl border border-white/10 max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Question Details</h2>
                <button onClick={() => setViewQuestion(null)} className="text-white/60 hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Grade</p>
                    <p className="font-medium">{viewQuestion.grade}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Subject</p>
                    <p className="font-medium">{viewQuestion.subject}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Topic</p>
                    <p className="font-medium">{viewQuestion.topic}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Type</p>
                    <div className="mt-1">{getTypeBadge(viewQuestion.question_type)}</div>
                  </div>
                </div>
                
                <div>
                  <p className="text-white/60 text-sm">Question</p>
                  <p className="bg-[#0a0a1a] px-3 py-2 rounded mt-1">{viewQuestion.question_text}</p>
                </div>
                
                {viewQuestion.choices && viewQuestion.choices.length > 0 && (
                  <div>
                    <p className="text-white/60 text-sm">Choices</p>
                    <div className="space-y-1 mt-1">
                      {viewQuestion.choices.map((choice, i) => (
                        <div 
                          key={i} 
                          className={`px-3 py-2 rounded ${i === viewQuestion.correct_choice_index ? 'bg-green-500/20 border border-green-500/30' : 'bg-[#0a0a1a]'}`}
                        >
                          <span className="text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                          {choice}
                          {i === viewQuestion.correct_choice_index && (
                            <CheckCircle className="w-4 h-4 text-green-400 inline ml-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {viewQuestion.solution && (
                  <div>
                    <p className="text-white/60 text-sm">Solution</p>
                    <p className="bg-[#0a0a1a] px-3 py-2 rounded mt-1 whitespace-pre-wrap">{viewQuestion.solution}</p>
                  </div>
                )}
                
                {viewQuestion.explanation && (
                  <div>
                    <p className="text-white/60 text-sm">Explanation</p>
                    <p className="bg-[#0a0a1a] px-3 py-2 rounded mt-1 whitespace-pre-wrap">{viewQuestion.explanation}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Difficulty</p>
                    <div className="mt-1">{getDifficultyBadge(viewQuestion.difficulty)}</div>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Language</p>
                    <p>{viewQuestion.language}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">External ID</p>
                    <p className="text-white/40">{viewQuestion.external_id || 'None'}</p>
                  </div>
                </div>
                
                {viewQuestion.tags && viewQuestion.tags.length > 0 && (
                  <div>
                    <p className="text-white/60 text-sm">Tags</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {viewQuestion.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-white/10 text-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => { handleEdit(viewQuestion); setViewQuestion(null); }}
                  className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setViewQuestion(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
