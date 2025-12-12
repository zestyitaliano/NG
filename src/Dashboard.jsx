import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is a protected page. Only authenticated users can see this.</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}
