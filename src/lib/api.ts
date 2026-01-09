// API Configuration - Centralized API base URL
// Set VITE_API_URL in environment for custom backend, defaults to Render production
export const API_URL = import.meta.env.VITE_API_URL || 'https://world-stem-cup-backend.onrender.com';

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

// Tournament Admin Actions (ADMIN/NSC only)
export async function generateGroups(tournamentId: number, numGroups: number = 10, matchesPerTeam: number = 2) {
  return apiFetch<{ message: string; groups_created: number; teams_assigned: number; matches_created: number; already_existed?: boolean }>(`/api/tournaments/${tournamentId}/generate-groups`, {
    method: 'POST',
    body: JSON.stringify({ num_groups: numGroups, matches_per_team: matchesPerTeam }),
  });
}

export async function generatePlayoffs(tournamentId: number, topNPerGroup: number = 2) {
  return apiFetch<{ message: string; teams_advancing?: number; playoff_rounds?: number; playoff_matches?: number; already_existed?: boolean }>(`/api/tournaments/${tournamentId}/generate-playoffs`, {
    method: 'POST',
    body: JSON.stringify({ top_n_per_group: topNPerGroup }),
  });
}

export async function resetTournament(tournamentId: number, resetGroups: boolean = true, resetPlayoffs: boolean = true) {
  return apiFetch<{ message: string; deleted: { scores: number; matches: number; groups: number; rounds: number } }>(`/api/tournaments/${tournamentId}/reset?reset_groups=${resetGroups}&reset_playoffs=${resetPlayoffs}`, {
    method: 'POST',
  });
}

// ============================================================================
// PUBLIC COMPETITION API (Launch Site)
// ============================================================================

// Overview types
export interface OverviewStats {
  teams_count: number;
  schools_count: number;
  students_count: number;
  states_count: number;
  matches_count: number;
  season_id: number | null;
  season_year: number | null;
}

// Competition types
export interface CompetitionListItem {
  id: number;
  name: string;
  competition_type: string | null;
  scope_code: string | null;
  status: string;
  teams_count: number;
  schools_count: number;
  start_date: string | null;
  end_date: string | null;
}

export interface GroupStanding {
  team_id: number;
  team_name: string;
  school_name: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  total_score: number;
}

export interface GroupDetail {
  id: number;
  name: string;
  standings: GroupStanding[];
}

export interface MatchSummary {
  id: number;
  team1_name: string;
  team2_name: string;
  team1_score: number | null;
  team2_score: number | null;
  status: string;
  scheduled_at: string | null;
}

export interface CompetitionDetail {
  id: number;
  name: string;
  description: string | null;
  competition_type: string | null;
  scope_code: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  teams_count: number;
  groups: GroupDetail[];
  recent_matches: MatchSummary[];
  upcoming_matches: MatchSummary[];
}

// DoDEA types
export interface DoDEASchool {
  id: number;
  name: string;
  country: string;
  state_region: string | null;
  city: string;
  teams_count: number;
}

export interface DoDEAInfo {
  schools: DoDEASchool[];
  total_schools: number;
  total_teams: number;
  total_students: number;
  competition_id: number | null;
  competition_name: string | null;
  season_id: number | null;
}

// Public Leaderboard types
export interface PublicLeaderboardEntry {
  rank: number;
  team_id: number;
  team_name: string;
  school_name: string;
  country: string;
  state_region: string | null;
  total_points: number;
  matches_played: number;
  wins: number;
}

// School Search types
export interface SchoolSearchResult {
  id: number;
  name: string;
  slug: string | null;
  country: string;
  state_region: string | null;
  city: string;
  school_type: string | null;
  is_dodea: boolean;
  teams_count: number;
}

// Public API Functions

export async function getPublicOverview(seasonYear?: number) {
  const query = seasonYear ? `?season=${seasonYear}` : '';
  return apiFetch<OverviewStats>(`/api/public/overview${query}`);
}

export async function getPublicCompetitions(params?: { season?: number; type?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.season) searchParams.append('season', params.season.toString());
  if (params?.type) searchParams.append('type', params.type);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ competitions: CompetitionListItem[]; total: number; season_id: number | null }>(`/api/public/competitions${query}`);
}

export async function getPublicCompetitionDetail(competitionId: number) {
  return apiFetch<CompetitionDetail>(`/api/public/competitions/${competitionId}`);
}

export async function getPublicDoDEA(seasonYear?: number) {
  const query = seasonYear ? `?season=${seasonYear}` : '';
  return apiFetch<DoDEAInfo>(`/api/public/dodea${query}`);
}

export async function getPublicLeaderboard(params?: { 
  season?: number; 
  scope?: 'global' | 'state' | 'dodea'; 
  state_code?: string;
  limit?: number;
  offset?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.season) searchParams.append('season', params.season.toString());
  if (params?.scope) searchParams.append('scope', params.scope);
  if (params?.state_code) searchParams.append('state_code', params.state_code);
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ leaderboard: PublicLeaderboardEntry[]; total: number; scope: string; season_id: number | null }>(`/api/public/leaderboard${query}`);
}

export async function searchPublicSchools(params?: {
  q?: string;
  country?: string;
  admin_area?: string;
  is_dodea?: boolean;
  limit?: number;
  offset?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.append('q', params.q);
  if (params?.country) searchParams.append('country', params.country);
  if (params?.admin_area) searchParams.append('admin_area', params.admin_area);
  if (params?.is_dodea !== undefined) searchParams.append('is_dodea', params.is_dodea.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<{ schools: SchoolSearchResult[]; total: number; limit: number; offset: number }>(`/api/public/schools/search${query}`);
}
