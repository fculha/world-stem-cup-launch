// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get auth headers
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

// Generic API fetch function
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

// Team types
export interface Team {
  id: number;
  name: string;
  school_id: number;
  season_id: number;
  division?: string;
  is_active: boolean;
  created_at: string;
}

export interface TeamCreate {
  name: string;
  school_id: number;
  season_id: number;
  division?: string;
}

// Season types
export interface Season {
  id: number;
  name: string;
  year: number;
  start_date: string;
  end_date: string;
  registration_deadline?: string;
  is_active: boolean;
}

// Tournament types
export interface Tournament {
  id: number;
  name: string;
  season_id: number;
  tournament_type: string;
  start_date: string;
  end_date?: string;
  status: string;
  max_teams?: number;
}

// Match types
export interface Match {
  id: number;
  tournament_id: number;
  round_number: number;
  match_number: number;
  team1_id?: number;
  team2_id?: number;
  team1_score?: number;
  team2_score?: number;
  winner_id?: number;
  status: string;
  scheduled_time?: string;
}

// Question types
export interface Question {
  id: number;
  text: string;
  subject: string;
  difficulty: string;
  points: number;
  time_limit_seconds: number;
  options?: string[];
  correct_answer?: string;
}

// Score types
export interface Score {
  id: number;
  match_id: number;
  team_id: number;
  question_id: number;
  points_earned: number;
  time_taken_seconds: number;
  is_correct: boolean;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  team_id: number;
  team_name: string;
  school_name: string;
  total_points: number;
  matches_played: number;
  wins: number;
  losses: number;
}

// API Functions

// Teams
export async function getTeams(params?: { school_id?: number; season_id?: number }) {
  const searchParams = new URLSearchParams();
  if (params?.school_id) searchParams.append('school_id', params.school_id.toString());
  if (params?.season_id) searchParams.append('season_id', params.season_id.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ teams: Team[]; total: number }>(`/api/teams${query}`);
}

export async function createTeam(data: TeamCreate) {
  return apiFetch<Team>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTeam(id: number) {
  return apiFetch<Team>(`/api/teams/${id}`);
}

// Seasons
export async function getSeasons() {
  return apiFetch<{ seasons: Season[]; total: number }>('/api/seasons');
}

export async function getActiveSeason() {
  const { seasons } = await getSeasons();
  return seasons.find(s => s.is_active) || seasons[0];
}

// Tournaments
export async function getTournaments(params?: { season_id?: number }) {
  const searchParams = new URLSearchParams();
  if (params?.season_id) searchParams.append('season_id', params.season_id.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ tournaments: Tournament[]; total: number }>(`/api/tournaments${query}`);
}

export async function getTournament(id: number) {
  return apiFetch<Tournament>(`/api/tournaments/${id}`);
}

// Matches
export async function getMatches(params?: { tournament_id?: number; team_id?: number }) {
  const searchParams = new URLSearchParams();
  if (params?.tournament_id) searchParams.append('tournament_id', params.tournament_id.toString());
  if (params?.team_id) searchParams.append('team_id', params.team_id.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ matches: Match[]; total: number }>(`/api/matches${query}`);
}

export async function getMatch(id: number) {
  return apiFetch<Match>(`/api/matches/${id}`);
}

// Questions (for gameplay)
export async function getMatchQuestions(matchId: number) {
  return apiFetch<{ questions: Question[] }>(`/api/matches/${matchId}/questions`);
}

// Scores
export async function submitAnswer(matchId: number, questionId: number, answer: string, timeTaken: number) {
  return apiFetch<Score>(`/api/matches/${matchId}/answer`, {
    method: 'POST',
    body: JSON.stringify({
      question_id: questionId,
      answer,
      time_taken_seconds: timeTaken,
    }),
  });
}

// Leaderboard
export async function getLeaderboard(seasonId?: number) {
  const query = seasonId ? `?season_id=${seasonId}` : '';
  return apiFetch<{ leaderboard: LeaderboardEntry[] }>(`/api/leaderboard${query}`);
}

// Users (for teacher to see students)
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  school_id?: number;
  team_id?: number;
}

export async function getUsers(params?: { role?: string; school_id?: number }) {
  const searchParams = new URLSearchParams();
  if (params?.role) searchParams.append('role', params.role);
  if (params?.school_id) searchParams.append('school_id', params.school_id.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ users: User[]; total: number }>(`/api/users${query}`);
}

// School types
export interface School {
  id: number;
  name: string;
  country_code: string;
  state_code?: string;
  city?: string;
  is_dodea: boolean;
  dodea_region?: string;
}

// Tournament Group types
export interface TournamentGroup {
  id: number;
  tournament_id: number;
  name: string;
  group_number: number;
  teams: TournamentGroupTeam[];
}

export interface TournamentGroupTeam {
  id: number;
  group_id: number;
  team_id: number;
  team_name: string;
  school_name: string;
  seed?: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  total_score: number;
}

// Playoff Bracket types
export interface PlayoffMatch {
  id: number;
  round_name: string;
  match_number: number;
  team1_name?: string;
  team2_name?: string;
  team1_score?: number;
  team2_score?: number;
  winner_name?: string;
  status: string;
}

export interface PlayoffRound {
  round_name: string;
  matches: PlayoffMatch[];
}

// School Search API
export async function searchSchools(query: string, limit: number = 20) {
  return apiFetch<{ schools: School[]; total: number }>(`/api/schools/search?query=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function getSchools(params?: { country?: string; state?: string; city?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.country) searchParams.append('country', params.country);
  if (params?.state) searchParams.append('state', params.state);
  if (params?.city) searchParams.append('city', params.city);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ schools: School[]; total: number }>(`/api/schools${query}`);
}

export async function getSchoolCountries() {
  return apiFetch<{ countries: string[] }>('/api/schools/countries');
}

export async function getSchoolStates(country: string) {
  return apiFetch<{ states: string[] }>(`/api/schools/states?country=${encodeURIComponent(country)}`);
}

export async function getSchoolCities(country: string, state: string) {
  return apiFetch<{ cities: string[] }>(`/api/schools/cities?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}`);
}

// Tournament Groups API
export async function getTournamentGroups(tournamentId: number) {
  return apiFetch<{ groups: TournamentGroup[]; total_teams: number }>(`/api/tournaments/${tournamentId}/groups`);
}

// Tournament Bracket API
export async function getTournamentBracket(tournamentId: number) {
  return apiFetch<{ rounds: PlayoffRound[]; total_matches: number; advancing_teams: number }>(`/api/tournaments/${tournamentId}/bracket`);
}

// Tournament Leaderboard API (state-level with privacy)
export async function getTournamentLeaderboard(tournamentId: number) {
  return apiFetch<{ leaderboard: LeaderboardEntry[]; tournament_name: string; scope: string }>(`/api/tournaments/${tournamentId}/leaderboard`);
}
