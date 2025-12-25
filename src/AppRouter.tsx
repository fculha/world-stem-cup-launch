import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './App';
import LoginPage from './pages/LoginPage';
import RegisterSchoolAdminPage from './pages/RegisterSchoolAdminPage';
import RegisterTeacherPage from './pages/RegisterTeacherPage';
import RegisterStudentPage from './pages/RegisterStudentPage';
import DashboardPage from './pages/DashboardPage';

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
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Teacher Routes */}
          <Route 
            path="/teacher/*" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Student Routes */}
          <Route 
            path="/student/*" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                <DashboardPage />
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
