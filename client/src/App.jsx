import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { CharacterProvider } from './context/CharacterContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatInterface from './components/ChatInterface';
import { useAuth } from './context/AuthContext';
import Characters from './pages/Characters';
import Stories from './pages/Stories';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const AppContent = () => {
  const { mode } = useTheme();

  return (
    <MuiThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <ProtectedRoute>
                <Stories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters"
            element={
              <ProtectedRoute>
                <Characters />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <CustomThemeProvider>
      <CharacterProvider>
        <AppContent />
      </CharacterProvider>
    </CustomThemeProvider>
  );
};

export default App;
