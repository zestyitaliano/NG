import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#efefef', // offwhite
        color: '#1982c4', // primary
        borderBottom: '2px solid #1982c4',
        marginBottom: '2rem'
    };

    const linkStyle = {
        color: '#1982c4',
        textDecoration: 'none',
        marginRight: '1rem',
        fontWeight: 'bold'
    };

    return (
        <nav style={navStyle}>
            <div>
                <Link to="/" style={{ ...linkStyle, fontWeight: 'bold', fontSize: '1.2rem' }}>No Gatekeeping</Link>
            </div>
            <div>
                {currentUser ? (
                    <>
                        <span style={{ marginRight: '1rem', fontSize: '0.9rem' }}>{currentUser.email}</span>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <Link to="/tool1" style={linkStyle}>Tool One</Link>
                        <Link to="/tool2" style={linkStyle}>Tool Two</Link>
                        <button onClick={handleLogout} style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/signup" style={linkStyle}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
