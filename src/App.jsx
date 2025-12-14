import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { app } from './firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load tools
const ToolOne = React.lazy(() => import('./tools/tool1/ToolOne'));
const ToolTwo = React.lazy(() => import('./tools/tool2/ToolTwo'));

function Home() {
    const { currentUser } = useAuth();
    return (
        <div>
            <h1>Welcome to No Gatekeeping</h1>
            <p>Firebase App Initialized: {app.name}</p>
            {!currentUser && <p>Please login to access tools.</p>}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div style={{ padding: '0 2rem' }}>
                    <Suspense fallback={<div>Loading Tools...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/tool1" element={<ToolOne />} />
                            <Route path="/tool2" element={<ToolTwo />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
