import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://world-stem-cup-backend.onrender.com';

interface Question {
  id: number;
  category: string;
  difficulty: number;
  type: string;
  grade_band: string | null;
  prompt: string;
  choices: string[] | null;
  correct_answer: string;
  explanation: string;
  topic_tags: string[] | null;
  source_type: string;
  status: string;
  quality_score: number | null;
  flags: Record<string, unknown> | null;
  ai_model: string | null;
  created_at: string | null;
  learning_objective: string | null;
  time_limit_sec: number | null;
}

interface Stats {
  status_draft: number;
  status_review: number;
  status_active: number;
  status_retired: number;
  status_rejected: number;
  source_human: number;
  source_ai_draft: number;
  source_ai_approved: number;
  total: number;
  active_total: number;
  avg_quality_score: number;
}

type TabType = 'all' | 'review' | 'new' | 'import' | 'stats';

export default function AdminQuestionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname.endsWith('/review')) {
      setActiveTab('review');
    } else if (location.pathname.endsWith('/new')) {
      setActiveTab('new');
    } else if (location.pathname.endsWith('/import')) {
      setActiveTab('import');
    } else if (location.pathname.endsWith('/stats')) {
      setActiveTab('stats');
    } else {
      setActiveTab('all');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: TabType) => {
    if (tab === 'all') navigate('/admin/questions', { replace: true });
    if (tab === 'review') navigate('/admin/questions/review', { replace: true });
    if (tab === 'new') navigate('/admin/questions/new', { replace: true });
    if (tab === 'import') navigate('/admin/questions/import', { replace: true });
    if (tab === 'stats') navigate('/admin/questions/stats', { replace: true });
  };

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [allStatus, setAllStatus] = useState('');
  const [allCategory, setAllCategory] = useState('');
  const [allDifficulty, setAllDifficulty] = useState('');
  const [allGradeBand, setAllGradeBand] = useState('');

  const [reviewQueue, setReviewQueue] = useState<Question[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewStatus, setReviewStatus] = useState('REVIEW');
  const [reviewCategory, setReviewCategory] = useState('');
  const [reviewDifficulty, setReviewDifficulty] = useState('');
  const [reviewGradeBand, setReviewGradeBand] = useState('');
  const [reviewSourceType, setReviewSourceType] = useState('');

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const [newQuestionForm, setNewQuestionForm] = useState({
    category: 'S',
    difficulty: 2,
    type: 'MCQ',
    grade_band: 'HS',
    prompt: '',
    choice_a: '',
    choice_b: '',
    choice_c: '',
    choice_d: '',
    correct_answer: 'A',
    explanation: '',
  });

  const [generateForm, setGenerateForm] = useState({
    category: 'S',
    difficulty: 2,
    type: 'MCQ',
    grade_band: 'HS',
    count: 5,
    topic_tags: '',
    learning_objective: ''
  });

  const [stats, setStats] = useState<Stats | null>(null);

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvResult, setCsvResult] = useState<{
    imported: number;
    failed: number;
    errors: Array<{ row: number; field: string; message: string }>;
    questions: Array<{ id: number; row: number; question_text: string }>;
  } | null>(null);

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!accessToken) {
      navigate('/login', { state: { from: location } });
      throw new Error('Not authenticated');
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 401 || response.status === 403) {
      navigate('/login', { state: { from: location } });
      throw new Error('Not authorized');
    }
    return response;
  };

  const fetchAllQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('limit', '100');
      if (allStatus) params.append('status', allStatus);
      if (allCategory) params.append('category', allCategory);
      if (allDifficulty) params.append('difficulty', allDifficulty);
      if (allGradeBand) params.append('grade_band', allGradeBand);

      const response = await fetchWithAuth(`${API_BASE}/api/questions/review-queue?${params.toString()}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch questions');
      }
      const data = await response.json();
      setAllQuestions(data.questions);
      setAllTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('status', reviewStatus);
      params.append('limit', '50');
      if (reviewCategory) params.append('category', reviewCategory);
      if (reviewDifficulty) params.append('difficulty', reviewDifficulty);
      if (reviewGradeBand) params.append('grade_band', reviewGradeBand);
      if (reviewSourceType) params.append('source_type', reviewSourceType);

      const response = await fetchWithAuth(`${API_BASE}/api/questions/review-queue?${params.toString()}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch review queue');
      }
      const data = await response.json();
      setReviewQueue(data.questions);
      setReviewTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch review queue');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/stats/summary`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch stats');
      }
      const data: Stats = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (questionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/${questionId}/approve`, {
        method: 'POST',
        body: JSON.stringify({ decision: 'APPROVE', notes: reviewNotes })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to approve question');
      }
      setSuccess('Question approved successfully');
      setSelectedQuestion(null);
      setReviewNotes('');
      fetchReviewQueue();
      fetchAllQuestions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve question');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (questionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/${questionId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ decision: 'REJECT', notes: reviewNotes })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to reject question');
      }
      setSuccess('Question rejected');
      setSelectedQuestion(null);
      setReviewNotes('');
      fetchReviewQueue();
      fetchAllQuestions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject question');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateManual = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/import/manual`, {
        method: 'POST',
        body: JSON.stringify(newQuestionForm)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to create question');
      }
      setSuccess('Question created and sent to review');
      setNewQuestionForm({
        category: 'S',
        difficulty: 2,
        type: 'MCQ',
        grade_band: 'HS',
        prompt: '',
        choice_a: '',
        choice_b: '',
        choice_c: '',
        choice_d: '',
        correct_answer: 'A',
        explanation: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/ai-generate`, {
        method: 'POST',
        body: JSON.stringify({
          ...generateForm,
          topic_tags: generateForm.topic_tags.split(',').map(t => t.trim()).filter(t => t)
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to generate questions');
      }
      const data = await response.json();
      setSuccess(`Generated ${data.generated_count} questions: ${data.review_count} ready for review, ${data.draft_count} need fixes`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const handleImportSample = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/import/sample-bank`, {
        method: 'POST',
        body: JSON.stringify({})
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to import sample questions');
      }
      const data = await response.json();
      setSuccess(`Imported ${data.imported_count || 'sample'} questions`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import sample questions');
    } finally {
      setLoading(false);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) return;
    
    setCsvUploading(true);
    setError(null);
    setSuccess(null);
    setCsvResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      
      const response = await fetch(`${API_BASE}/api/questions/import/csv-file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });
      
      if (response.status === 401 || response.status === 403) {
        navigate('/login', { state: { from: location } });
        throw new Error('Not authorized');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to upload CSV');
      }
      
      setCsvResult(data);
      
      if (data.imported > 0) {
        setSuccess(`Successfully imported ${data.imported} questions. ${data.failed > 0 ? `${data.failed} rows had errors.` : ''}`);
      } else if (data.failed > 0) {
        setError(`No questions imported. ${data.failed} rows had errors.`);
      }
      
      setCsvFile(null);
      const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload CSV');
    } finally {
      setCsvUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/api/questions/import/csv-template`);
      if (!response.ok) {
        throw new Error('Failed to get template');
      }
      const data = await response.json();
      
      const blob = new Blob([data.template], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'question_template.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download template');
    }
  };

  const handleDownloadErrorReport = () => {
    if (!csvResult || csvResult.errors.length === 0) return;
    
    const headers = ['Row', 'Field', 'Error Message'];
    const rows = csvResult.errors.map(e => [e.row.toString(), e.field, e.message]);
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import_errors.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activeTab === 'all') {
      fetchAllQuestions();
    } else if (activeTab === 'review') {
      fetchReviewQueue();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'all') {
      fetchAllQuestions();
    }
  }, [allStatus, allCategory, allDifficulty, allGradeBand]);

  useEffect(() => {
    if (activeTab === 'review') {
      fetchReviewQueue();
    }
  }, [reviewStatus, reviewCategory, reviewDifficulty, reviewGradeBand, reviewSourceType]);

  const categoryNames: Record<string, string> = {
    S: 'Science',
    T: 'Technology',
    E: 'Engineering',
    M: 'Math'
  };

  const statusColors: Record<string, string> = {
    DRAFT: 'bg-yellow-100 text-yellow-800',
    REVIEW: 'bg-blue-100 text-blue-800',
    ACTIVE: 'bg-green-100 text-green-800',
    RETIRED: 'bg-gray-100 text-gray-800',
    REJECTED: 'bg-red-100 text-red-800'
  };

  const renderQuestionCard = (q: Question) => (
    <div
      key={q.id}
      className={`border rounded-lg p-4 cursor-pointer hover:border-blue-300 ${
        selectedQuestion?.id === q.id ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={() => setSelectedQuestion(q)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center flex-wrap gap-1">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
            {categoryNames[q.category] || q.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
            Diff: {q.difficulty}
          </span>
          {q.grade_band && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
              {q.grade_band}
            </span>
          )}
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
            {q.source_type}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[q.status]}`}>
            {q.status}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          QA: {q.quality_score ?? 'N/A'}/100
        </span>
      </div>
      <p className="text-gray-800 font-medium">{q.prompt}</p>
      {q.choices && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {q.choices.map((choice, i) => (
            <div
              key={i}
              className={`text-sm p-2 rounded ${
                choice.toLowerCase().includes(q.correct_answer.toLowerCase())
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100'
              }`}
            >
              {choice}
            </div>
          ))}
        </div>
      )}
      {q.explanation && (
        <p className="mt-2 text-sm text-gray-600">
          <strong>Explanation:</strong> {q.explanation}
        </p>
      )}
    </div>
  );

  const renderFilters = (
    status: string, setStatus: (v: string) => void,
    category: string, setCategory: (v: string) => void,
    difficulty: string, setDifficulty: (v: string) => void,
    gradeBand: string, setGradeBand: (v: string) => void,
    showAllStatus: boolean = false
  ) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          {showAllStatus ? (
            <>
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="REVIEW">Review</option>
              <option value="ACTIVE">Active</option>
              <option value="REJECTED">Rejected</option>
              <option value="RETIRED">Retired</option>
            </>
          ) : (
            <>
              <option value="REVIEW">Ready for Review</option>
              <option value="DRAFT">Drafts</option>
            </>
          )}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">All Categories</option>
          <option value="S">Science</option>
          <option value="T">Technology</option>
          <option value="E">Engineering</option>
          <option value="M">Math</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">All Difficulties</option>
          <option value="1">1 - Basic</option>
          <option value="2">2 - Easy</option>
          <option value="3">3 - Medium</option>
          <option value="4">4 - Hard</option>
          <option value="5">5 - Expert</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Grade Band</label>
        <select
          value={gradeBand}
          onChange={(e) => setGradeBand(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
        >
          <option value="">All Grades</option>
          <option value="ES">Elementary</option>
          <option value="MS">Middle School</option>
          <option value="HS">High School</option>
          <option value="HS9_10">HS 9-10</option>
          <option value="HS11_12">HS 11-12</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-600 mt-2">Manage, review, and create STEM questions for competitions</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => handleTabChange('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Questions
              </button>
              <button
                onClick={() => handleTabChange('review')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'review'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Review Queue
              </button>
              <button
                onClick={() => handleTabChange('new')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'new'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                New Question
              </button>
              <button
                onClick={() => handleTabChange('import')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'import'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Import
              </button>
              <button
                onClick={() => handleTabChange('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Statistics
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'all' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">All Questions ({allTotal})</h2>
            </div>

            {renderFilters(allStatus, setAllStatus, allCategory, setAllCategory, allDifficulty, setAllDifficulty, allGradeBand, setAllGradeBand, true)}

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && allQuestions.length === 0 && (
              <p className="text-gray-500">No questions found.</p>
            )}

            <div className="space-y-4">
              {allQuestions.map((q) => renderQuestionCard(q))}
            </div>

            {selectedQuestion && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Question #{selectedQuestion.id}</h3>
                <div className="flex space-x-4">
                  {(selectedQuestion.status === 'DRAFT' || selectedQuestion.status === 'REVIEW') && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedQuestion.id)}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(selectedQuestion.id)}
                        disabled={loading}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'review' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Review Queue ({reviewTotal} questions)</h2>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600">Quick Filters:</span>
              <button
                onClick={() => {
                  setReviewStatus('REVIEW');
                  setReviewSourceType('IMPORTED');
                  setReviewCategory('');
                  setReviewDifficulty('');
                  setReviewGradeBand('');
                }}
                className={`px-3 py-1 text-sm rounded-md border ${
                  reviewSourceType === 'IMPORTED' && reviewStatus === 'REVIEW'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                Show Imported (Review)
              </button>
              <button
                onClick={() => {
                  setReviewStatus('REVIEW');
                  setReviewSourceType('');
                  setReviewCategory('');
                  setReviewDifficulty('');
                  setReviewGradeBand('');
                }}
                className={`px-3 py-1 text-sm rounded-md border ${
                  reviewSourceType === '' && reviewStatus === 'REVIEW'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Review
              </button>
            </div>

            {renderFilters(reviewStatus, setReviewStatus, reviewCategory, setReviewCategory, reviewDifficulty, setReviewDifficulty, reviewGradeBand, setReviewGradeBand, false)}

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Source Type</label>
              <select
                value={reviewSourceType}
                onChange={(e) => setReviewSourceType(e.target.value)}
                className="w-48 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              >
                <option value="">All Sources</option>
                <option value="IMPORTED">CSV Imported</option>
                <option value="MANUAL">Manual Entry</option>
                <option value="HUMAN">Human Created</option>
                <option value="AI_DRAFT">AI Draft</option>
                <option value="AI_APPROVED">AI Approved</option>
              </select>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && reviewQueue.length === 0 && (
              <p className="text-gray-500">No questions in this queue.</p>
            )}

            <div className="space-y-4">
              {reviewQueue.map((q) => renderQuestionCard(q))}
            </div>

            {selectedQuestion && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Review Question #{selectedQuestion.id}</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Notes (optional)</label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add notes about your decision..."
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(selectedQuestion.id)}
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedQuestion.id)}
                    disabled={loading}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setSelectedQuestion(null);
                      setReviewNotes('');
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Question</h2>
            <p className="text-gray-600 mb-6">
              Manually create a new question. It will be saved with REVIEW status and require approval before use in matches.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newQuestionForm.category}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="S">Science</option>
                  <option value="T">Technology</option>
                  <option value="E">Engineering</option>
                  <option value="M">Math</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={newQuestionForm.difficulty}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, difficulty: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map(d => (
                    <option key={d} value={d}>{d} - {['Basic', 'Easy', 'Medium', 'Hard', 'Expert'][d-1]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newQuestionForm.type}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="MCQ">Multiple Choice</option>
                  <option value="NUMERIC">Numeric</option>
                  <option value="SHORT">Short Answer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade Band</label>
                <select
                  value={newQuestionForm.grade_band}
                  onChange={(e) => setNewQuestionForm({ ...newQuestionForm, grade_band: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="ES">Elementary School</option>
                  <option value="MS">Middle School</option>
                  <option value="HS">High School</option>
                  <option value="HS9_10">HS 9-10</option>
                  <option value="HS11_12">HS 11-12</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Prompt *</label>
              <textarea
                value={newQuestionForm.prompt}
                onChange={(e) => setNewQuestionForm({ ...newQuestionForm, prompt: e.target.value })}
                placeholder="Enter the question text..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {newQuestionForm.type === 'MCQ' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Choice A *</label>
                  <input
                    type="text"
                    value={newQuestionForm.choice_a}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, choice_a: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Choice B *</label>
                  <input
                    type="text"
                    value={newQuestionForm.choice_b}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, choice_b: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Choice C</label>
                  <input
                    type="text"
                    value={newQuestionForm.choice_c}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, choice_c: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Choice D</label>
                  <input
                    type="text"
                    value={newQuestionForm.choice_d}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, choice_d: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer *</label>
                {newQuestionForm.type === 'MCQ' ? (
                  <select
                    value={newQuestionForm.correct_answer}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, correct_answer: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={newQuestionForm.correct_answer}
                    onChange={(e) => setNewQuestionForm({ ...newQuestionForm, correct_answer: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Explanation *</label>
              <textarea
                value={newQuestionForm.explanation}
                onChange={(e) => setNewQuestionForm({ ...newQuestionForm, explanation: e.target.value })}
                placeholder="Explain why this is the correct answer..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <button
              onClick={handleCreateManual}
              disabled={loading || !newQuestionForm.prompt || !newQuestionForm.correct_answer || !newQuestionForm.explanation}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Question'}
            </button>
          </div>
        )}

        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">CSV File Import</h2>
              <p className="text-gray-600 mb-6">
                Upload a CSV file with questions from your professional question-writing team.
                All imported questions will have REVIEW status and require approval before use in matches.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handleDownloadTemplate}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 border border-gray-300"
                >
                  Download CSV Template
                </button>
                <span className="text-sm text-gray-500">
                  Download the template to see required columns and example data
                </span>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                  <input
                    id="csv-file-input"
                    type="file"
                    accept=".csv,text/csv"
                    onChange={(e) => {
                      setCsvFile(e.target.files?.[0] || null);
                      setCsvResult(null);
                    }}
                    className="flex-1"
                  />
                  <button
                    onClick={handleCsvUpload}
                    disabled={!csvFile || csvUploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {csvUploading ? 'Uploading...' : 'Upload CSV'}
                  </button>
                </div>
                {csvFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {csvResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-md ${csvResult.imported > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {csvResult.imported} imported
                    </div>
                    <div className={`px-4 py-2 rounded-md ${csvResult.failed > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                      {csvResult.failed} failed
                    </div>
                    {csvResult.imported > 0 && (
                      <button
                        onClick={() => {
                          setActiveTab('review');
                          navigate('/admin/questions/review', { replace: true });
                        }}
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200"
                      >
                        View in Review Queue
                      </button>
                    )}
                  </div>

                  {csvResult.errors.length > 0 && (
                    <div className="border border-red-200 rounded-lg overflow-hidden">
                      <div className="bg-red-50 px-4 py-2 flex items-center justify-between">
                        <span className="font-medium text-red-800">
                          {csvResult.errors.length} Error{csvResult.errors.length > 1 ? 's' : ''} Found
                        </span>
                        <button
                          onClick={handleDownloadErrorReport}
                          className="text-sm text-red-600 hover:text-red-800 underline"
                        >
                          Download Error Report
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">Row</th>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">Field</th>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">Error</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {csvResult.errors.slice(0, 50).map((err, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-900">{err.row}</td>
                                <td className="px-4 py-2 text-gray-600">{err.field}</td>
                                <td className="px-4 py-2 text-red-600">{err.message}</td>
                              </tr>
                            ))}
                            {csvResult.errors.length > 50 && (
                              <tr>
                                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                                  ... and {csvResult.errors.length - 50} more errors. Download the full report.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {csvResult.questions.length > 0 && (
                    <div className="border border-green-200 rounded-lg overflow-hidden">
                      <div className="bg-green-50 px-4 py-2">
                        <span className="font-medium text-green-800">
                          Successfully Imported Questions
                        </span>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">Row</th>
                              <th className="px-4 py-2 text-left font-medium text-gray-600">Question</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {csvResult.questions.slice(0, 20).map((q) => (
                              <tr key={q.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-900">{q.id}</td>
                                <td className="px-4 py-2 text-gray-600">{q.row}</td>
                                <td className="px-4 py-2 text-gray-800">{q.question_text}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Generate AI Questions</h2>
              <p className="text-gray-600 mb-6">
                Generate draft questions using AI. Questions will go through automated QA checks
                and require human approval before being used in matches.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={generateForm.category}
                    onChange={(e) => setGenerateForm({ ...generateForm, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="S">Science</option>
                    <option value="T">Technology</option>
                    <option value="E">Engineering</option>
                    <option value="M">Math</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={generateForm.difficulty}
                    onChange={(e) => setGenerateForm({ ...generateForm, difficulty: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {[1, 2, 3, 4, 5].map(d => (
                      <option key={d} value={d}>{d} - {['Basic', 'Easy', 'Medium', 'Hard', 'Expert'][d-1]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Count (1-20)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={generateForm.count}
                    onChange={(e) => setGenerateForm({ ...generateForm, count: parseInt(e.target.value) || 5 })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Band</label>
                  <select
                    value={generateForm.grade_band}
                    onChange={(e) => setGenerateForm({ ...generateForm, grade_band: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="ES">Elementary School</option>
                    <option value="MS">Middle School</option>
                    <option value="HS">High School</option>
                    <option value="HS9_10">HS 9-10</option>
                    <option value="HS11_12">HS 11-12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic Tags</label>
                  <input
                    type="text"
                    value={generateForm.topic_tags}
                    onChange={(e) => setGenerateForm({ ...generateForm, topic_tags: e.target.value })}
                    placeholder="e.g., algebra, equations"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Import Sample Questions</h2>
              <p className="text-gray-600 mb-6">
                Import a set of pre-made sample questions for testing and demonstration purposes.
              </p>

              <button
                onClick={handleImportSample}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Importing...' : 'Import Sample Questions'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Question Bank Statistics</h2>

            {loading && <p className="text-gray-500">Loading...</p>}

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800">Total Questions</h3>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800">Active Questions</h3>
                  <p className="text-3xl font-bold text-green-900">{stats.active_total}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-800">Pending Review</h3>
                  <p className="text-3xl font-bold text-yellow-900">{stats.status_review}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800">Avg Quality Score</h3>
                  <p className="text-3xl font-bold text-purple-900">{stats.avg_quality_score}</p>
                </div>

                <div className="col-span-full">
                  <h3 className="text-lg font-semibold mb-4">By Status</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-yellow-100 rounded">
                      <p className="text-2xl font-bold">{stats.status_draft}</p>
                      <p className="text-sm text-gray-600">Draft</p>
                    </div>
                    <div className="text-center p-3 bg-blue-100 rounded">
                      <p className="text-2xl font-bold">{stats.status_review}</p>
                      <p className="text-sm text-gray-600">Review</p>
                    </div>
                    <div className="text-center p-3 bg-green-100 rounded">
                      <p className="text-2xl font-bold">{stats.status_active}</p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                    <div className="text-center p-3 bg-gray-100 rounded">
                      <p className="text-2xl font-bold">{stats.status_retired}</p>
                      <p className="text-sm text-gray-600">Retired</p>
                    </div>
                    <div className="text-center p-3 bg-red-100 rounded">
                      <p className="text-2xl font-bold">{stats.status_rejected}</p>
                      <p className="text-sm text-gray-600">Rejected</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <h3 className="text-lg font-semibold mb-4">By Source</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-100 rounded">
                      <p className="text-2xl font-bold">{stats.source_human}</p>
                      <p className="text-sm text-gray-600">Human Created</p>
                    </div>
                    <div className="text-center p-3 bg-orange-100 rounded">
                      <p className="text-2xl font-bold">{stats.source_ai_draft}</p>
                      <p className="text-sm text-gray-600">AI Draft</p>
                    </div>
                    <div className="text-center p-3 bg-green-100 rounded">
                      <p className="text-2xl font-bold">{stats.source_ai_approved}</p>
                      <p className="text-sm text-gray-600">AI Approved</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
