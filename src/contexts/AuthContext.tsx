import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  registerSchoolAdmin: (data: SchoolAdminRegisterData) => Promise<{ success: boolean; error?: string }>;
  registerTeacher: (data: TeacherRegisterData) => Promise<{ success: boolean; error?: string }>;
  registerStudent: (data: StudentRegisterData) => Promise<{ success: boolean; error?: string }>;
}

export interface SchoolAdminRegisterData {
  school_name: string;
  country: string;
  city: string;
  address?: string;
  website?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department?: string;
}

export interface TeacherRegisterData {
  invite_code: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
}

export interface StudentRegisterData {
  invite_code: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  grade?: string;
  age?: number;
  parent_email?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          accessToken: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
        // Verify token is still valid
        verifyToken(storedToken);
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-token`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        // Token is invalid, clear auth state
        logout();
      }
    } catch {
      // Network error, keep the token for now
      console.error('Failed to verify token');
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.detail || 'Login failed' };
      }

      // Save to state and localStorage
      const newState = {
        user: data.user,
        accessToken: data.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
      
      setState(newState);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  const registerSchoolAdmin = async (data: SchoolAdminRegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/school-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.detail || 'Registration failed' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const registerTeacher = async (data: TeacherRegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.detail || 'Registration failed' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const registerStudent = async (data: StudentRegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.detail || 'Registration failed' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, registerSchoolAdmin, registerTeacher, registerStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
