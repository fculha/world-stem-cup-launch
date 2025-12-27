import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface GenerateResponse {
  generated_count: number;
  draft_count: number;
  review_count: number;
  questions: Array<{
    id: number;
    prompt: string;
    status: string;
    quality_score: number;
    flags: Record<string, unknown>;
    passed_qa: boolean;
  }>;
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

export default function AdminQuestionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'generate' | 'review' | 'stats'>('generate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [generateForm, setGenerateForm] = useState({
    category: 'S',
    difficulty: 2,
    type: 'MCQ',
    grade_band: 'HS',
    count: 5,
    topic_tags: '',
    learning_objective: ''
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<GenerateResponse | null>(null);

  const [reviewQueue, setReviewQueue] = useState<Question[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewStatus, setReviewStatus] = useState('REVIEW');
  const [reviewCategory, setReviewCategory] = useState('');
  const [reviewDifficulty, setReviewDifficulty] = useState('');
  const [reviewGradeBand, setReviewGradeBand] = useState('');
  const [reviewSourceType, setReviewSourceType] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const [stats, setStats] = useState<Stats | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      throw new Error('Not authenticated');
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 401 || response.status === 403) {
      navigate('/login');
      throw new Error('Not authorized');
    }
    return response;
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
      const data: GenerateResponse = await response.json();
      setGeneratedQuestions(data);
      setSuccess(`Generated ${data.generated_count} questions: ${data.review_count} ready for review, ${data.draft_count} need fixes`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject question');
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

  useEffect(() => {
    if (activeTab === 'review') {
      fetchReviewQueue();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab, reviewStatus, reviewCategory, reviewDifficulty, reviewGradeBand, reviewSourceType]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Question Pipeline</h1>
          <p className="text-gray-600 mt-2">Generate, review, and approve AI-generated questions</p>
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
                onClick={() => setActiveTab('generate')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Generate Drafts
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'review'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Review Queue
              </button>
              <button
                onClick={() => setActiveTab('stats')}
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

        {activeTab === 'generate' && (
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty (1-5)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <select
                  value={generateForm.type}
                  onChange={(e) => setGenerateForm({ ...generateForm, type: e.target.value })}
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
                  value={generateForm.grade_band}
                  onChange={(e) => setGenerateForm({ ...generateForm, grade_band: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="ES">Elementary School</option>
                  <option value="MS">Middle School</option>
                  <option value="HS">High School</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic Tags (comma-separated)</label>
                <input
                  type="text"
                  value={generateForm.topic_tags}
                  onChange={(e) => setGenerateForm({ ...generateForm, topic_tags: e.target.value })}
                  placeholder="e.g., algebra, equations"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objective</label>
              <textarea
                value={generateForm.learning_objective}
                onChange={(e) => setGenerateForm({ ...generateForm, learning_objective: e.target.value })}
                placeholder="Describe what students should learn from these questions..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Questions'}
            </button>

            {generatedQuestions && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Generated Questions</h3>
                <div className="space-y-4">
                  {generatedQuestions.questions.map((q) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[q.status]}`}>
                          {q.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          Quality: {q.quality_score}/100 {q.passed_qa ? '(Passed)' : '(Needs Review)'}
                        </span>
                      </div>
                      <p className="text-gray-800">{q.prompt}</p>
                      {Object.keys(q.flags).length > 0 && (
                        <div className="mt-2 text-sm text-orange-600">
                          Flags: {Object.keys(q.flags).join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
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
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                >
                  <option value="REVIEW">Ready for Review</option>
                  <option value="DRAFT">Drafts</option>
                  <option value="ACTIVE">Active</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={reviewCategory}
                  onChange={(e) => setReviewCategory(e.target.value)}
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
                  value={reviewDifficulty}
                  onChange={(e) => setReviewDifficulty(e.target.value)}
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
                  value={reviewGradeBand}
                  onChange={(e) => setReviewGradeBand(e.target.value)}
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
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Source</label>
                <select
                  value={reviewSourceType}
                  onChange={(e) => setReviewSourceType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                >
                  <option value="">All Sources</option>
                  <option value="HUMAN">Human</option>
                  <option value="AI_DRAFT">AI Draft</option>
                  <option value="AI_APPROVED">AI Approved</option>
                  <option value="IMPORTED">Imported</option>
                </select>
              </div>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && reviewQueue.length === 0 && (
              <p className="text-gray-500">No questions in this queue.</p>
            )}

            <div className="space-y-4">
              {reviewQueue.map((q) => (
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
                      {q.time_limit_sec && (
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs font-medium">
                          {q.time_limit_sec}s
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
                  {q.learning_objective && (
                    <p className="text-xs text-indigo-600 mb-2">
                      <strong>Objective:</strong> {q.learning_objective}
                    </p>
                  )}
                  <p className="text-gray-800 font-medium">{q.prompt}</p>
                  {q.choices && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {q.choices.map((choice, i) => (
                        <div
                          key={i}
                          className={`text-sm p-2 rounded ${
                            choice.toLowerCase().includes(q.correct_answer.toLowerCase()) ||
                            q.correct_answer.toLowerCase().includes(choice.split(')')[0]?.toLowerCase() || '')
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100'
                          }`}
                        >
                          {choice}
                        </div>
                      ))}
                    </div>
                  )}
                  {!q.choices && (
                    <p className="mt-2 text-sm text-green-700">Answer: {q.correct_answer}</p>
                  )}
                  {q.explanation && (
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  )}
                  {q.flags && Object.keys(q.flags).length > 0 && (
                    <div className="mt-2 text-sm text-orange-600">
                      Flags: {Object.keys(q.flags).join(', ')}
                    </div>
                  )}
                </div>
              ))}
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
