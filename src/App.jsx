import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { app } from './firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function Home() {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Welcome to No Gatekeeping</h1>
            <p>Firebase App Initialized: {app.name}</p>
            {currentUser ? (
                <div>
                    <p>Logged in as: <strong>{currentUser.email}</strong></p>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </div>
            ) : (
                <nav>
                    <Link to="/signup" style={{ marginRight: '1rem' }}>Go to Sign Up</Link>
                    <Link to="/login">Go to Login</Link>
                </nav>
            )}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
