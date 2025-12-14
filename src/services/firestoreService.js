import { db } from '../firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

// Helper to get the subcollection reference
const getPalettesRef = (userId) => collection(db, 'users', userId, 'palettes');

export const addPalette = async (userId, paletteData) => {
    try {
        const docRef = await addDoc(getPalettesRef(userId), {
            ...paletteData,
            createdAt: new Date()
        });
        return { id: docRef.id, ...paletteData };
    } catch (error) {
        console.error("Error adding palette: ", error);
        throw error;
    }
};

export const getPalettes = async (userId) => {
    try {
        const q = query(getPalettesRef(userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting palettes: ", error);
        throw error;
    }
};
