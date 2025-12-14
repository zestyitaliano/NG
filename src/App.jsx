import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { app } from './firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load tools
const ToolOne = React.lazy(() => import('./tools/tool1/ToolOne'));
const ToolTwo = React.lazy(() => import('./tools/tool2/ToolTwo'));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                {/* Remove padding to allow LandingPage to be full width */}
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
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
