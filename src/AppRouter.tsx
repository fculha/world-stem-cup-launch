import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './App';
import LoginPage from './pages/LoginPage';
import RegisterSchoolAdminPage from './pages/RegisterSchoolAdminPage';
import RegisterTeacherPage from './pages/RegisterTeacherPage';
import RegisterStudentPage from './pages/RegisterStudentPage';
import DashboardPage from './pages/DashboardPage';
import AdminSchoolsPage from './pages/admin/AdminSchoolsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminStatsPage from './pages/admin/AdminStatsPage';
import AdminQuestionsPage from './pages/admin/AdminQuestionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
// Teacher Pages
import TeacherStudentsPage from './pages/teacher/TeacherStudentsPage';
import TeacherTeamsPage from './pages/teacher/TeacherTeamsPage';
import TeacherCompetitionsPage from './pages/teacher/TeacherCompetitionsPage';
import TeacherResultsPage from './pages/teacher/TeacherResultsPage';
// Student Pages
import StudentTeamPage from './pages/student/StudentTeamPage';
import StudentCompetitionsPage from './pages/student/StudentCompetitionsPage';
import StudentGameplayPage from './pages/student/StudentGameplayPage';
import StudentResultsPage from './pages/student/StudentResultsPage';
// Spectator Pages
import WatchLivePage from './pages/WatchLivePage';
import LiveMatchPage from './pages/LiveMatchPage';
// State Qualifier Pages
import StateQualifierPage from './pages/StateQualifierPage';
// School Discovery Pages
import FindSchoolsPage from './pages/FindSchoolsPage';
// World Cup Style Public Pages
import WorldPage from './pages/WorldPage';
import StatePage from './pages/StatePage';
import StatesPage from './pages/StatesPage';
import DoDEAPage from './pages/DoDEAPage';
import GroupPage from './pages/GroupPage';
import MatchPage from './pages/MatchPage';
// About Page
import AboutPage from './pages/AboutPage';
// Public Info Pages
import HowItWorksPage from './pages/HowItWorksPage';
import ParentsSchoolsPage from './pages/ParentsSchoolsPage';
import EducationFundPage from './pages/EducationFundPage';
// Team and Bracket Pages
import TeamPage from './pages/TeamPage';
import BracketPage from './pages/BracketPage';
// Play Match Page (Real Gameplay)
import PlayMatchPage from './pages/play/PlayMatchPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/school-admin" element={<RegisterSchoolAdminPage />} />
          <Route path="/register/teacher" element={<RegisterTeacherPage />} />
          <Route path="/register/student" element={<RegisterStudentPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                                        <Route path="/watch" element={<WatchLivePage />} />
                                        <Route path="/watch/:matchId" element={<LiveMatchPage />} />
                                        <Route path="/state-qualifier/:tournamentId" element={<StateQualifierPage />} />
                    <Route path="/schools" element={<FindSchoolsPage />} />
          <Route path="/find-schools" element={<FindSchoolsPage />} />
          
                    {/* World Cup Style Public Pages */}
                    <Route path="/world" element={<WorldPage />} />
                    <Route path="/states" element={<StatesPage />} />
                    <Route path="/dodea" element={<DoDEAPage />} />
                    <Route path="/state/:stateCode" element={<StatePage />} />
                    <Route path="/state/MD/current" element={<Navigate to="/state/MD" replace />} />
                    <Route path="/tournament/:tournamentId" element={<StateQualifierPage />} />
                    <Route path="/group/:groupId" element={<GroupPage />} />
                    <Route path="/match/:matchId" element={<MatchPage />} />
                    <Route path="/team/:teamId" element={<TeamPage />} />
                    <Route path="/bracket/:tournamentId" element={<BracketPage />} />
                    <Route path="/bracket" element={<BracketPage />} />
                    <Route path="/bracket/current" element={<Navigate to="/bracket" replace />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/who-we-are" element={<AboutPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/parents-schools" element={<ParentsSchoolsPage />} />
                    <Route path="/education-fund" element={<EducationFundPage />} />
          
                    {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/schools" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminSchoolsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminUsersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminSettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/stats" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminStatsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/questions" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminQuestionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/questions/review" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminQuestionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/questions/stats" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminQuestionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/questions/new" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminQuestionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/questions/import" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminQuestionsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Teacher Routes */}
          <Route 
            path="/teacher/students" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherStudentsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/teams" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherTeamsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/teams/:teamId" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherTeamsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/competitions" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherCompetitionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/competitions/:tournamentId" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherCompetitionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/results" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <TeacherResultsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Student Routes */}
          <Route 
            path="/student/team" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                <StudentTeamPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/competitions" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                <StudentCompetitionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/play/:tournamentId" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                <StudentGameplayPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/results" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                <StudentResultsPage />
              </ProtectedRoute>
            } 
          />
                    <Route 
                      path="/student/profile" 
                      element={
                        <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                          <DashboardPage />
                        </ProtectedRoute>
                      } 
                    />
          
                    {/* Play Match Route (Real Gameplay with APIs) */}
                    <Route 
                      path="/play/match/:matchId" 
                      element={
                        <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                          <PlayMatchPage />
                        </ProtectedRoute>
                      } 
                    />
          
                    {/* Catch-all redirect to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
