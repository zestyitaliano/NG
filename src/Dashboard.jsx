import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from './contexts/AuthContext';
import { addPalette, getPalettes } from './services/firestoreService';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [palettes, setPalettes] = useState([]);
    const [newPaletteName, setNewPaletteName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPalettes() {
            if (currentUser) {
                try {
                    const data = await getPalettes(currentUser.uid);
                    setPalettes(data);
                } catch (error) {
                    console.error("Failed to load palettes", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchPalettes();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleAddPalette = async (e) => {
        e.preventDefault();
        if (!newPaletteName.trim()) return;

        try {
            const newPalette = { name: newPaletteName, colors: ['#ffffff', '#000000'] }; // Dummy colors
            const added = await addPalette(currentUser.uid, newPalette);
            setPalettes([...palettes, added]);
            setNewPaletteName('');
        } catch (error) {
            alert("Failed to add palette");
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {currentUser?.email}!</p>

            <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '15px' }}>
                <h3>My Palettes</h3>

                <form onSubmit={handleAddPalette} style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        value={newPaletteName}
                        onChange={(e) => setNewPaletteName(e.target.value)}
                        placeholder="New Palette Name"
                        style={{ marginRight: '10px' }}
                    />
                    <button type="submit">Add Palette</button>
                </form>

                {loading ? <p>Loading...</p> : (
                    <ul>
                        {palettes.map(p => (
                            <li key={p.id}>
                                <strong>{p.name}</strong> - {p.colors.join(', ')}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
