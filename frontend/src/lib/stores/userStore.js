// @ts-nocheck
import { writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import { addDoc, deleteDoc, updateDoc, getDoc, getDocs, collection, doc } from 'firebase/firestore';
// import { authStore } from './authStore';

export const userStore = writable({
	isLoading: true,
	users: [], // Store user data as an array
	currentUser: null,
	currentTechnician: null
});

// authStore.subscribe(($authStore) => {
// 	const uid = $authStore.currentUser?.uid;
// 	if (uid) {
// 		userHandlers.getUser(uid);
// 	}
// });

// CRUD operations for users
export const userHandlers = {
	getUsers: async () => {
		const usersRef = collection(db, 'users');
		const snapshot = await getDocs(usersRef);
		const users = [];
		snapshot.forEach((doc) => {
			users.push({ id: doc.id, ...doc.data() });
		});
		userStore.set({ isLoading: false, users });
	},

	getUser: async (userId) => {
		const userRef = doc(db, 'users', userId);
		const userDoc = await getDoc(userRef);
		if (userDoc.exists()) {
			const userData = userDoc.data();
			userStore.set({ isLoading: false, currentUser: { id: userDoc.id, ...userData } });
		} else {
			userStore.set({ isLoading: false, currentUser: null });
		}
	},

	// this was originally coded for us to update the currentUser as a derived value
	// getUser: async (userId) => {
	// 	const userRef = doc(db, 'users', userId);
	// 	const userDoc = await getDoc(userRef);
	// 	if (userDoc.exists()) {
	// 		const userData = userDoc.data();
	// 		userStore.update((currentState) => ({
	// 			...currentState,
	// 			isLoading: false,
	// 			currentUser: { id: userDoc.id, ...userData }
	// 		}));
	// 	} else {
	// 		userStore.update((currentState) => ({
	// 			...currentState,
	// 			isLoading: false,
	// 			currentUser: null
	// 		}));
	// 	}
	// },

	createUser: async (userData) => {
		const usersRef = collection(db, 'users');
		const newUserRef = await addDoc(usersRef, userData);
		return newUserRef.id;
	},

	updateUser: async (userId, userData) => {
		const userRef = doc(db, 'users', userId);
		await updateDoc(userRef, userData);
	},

	deleteUser: async (userId) => {
		const userRef = doc(db, 'users', userId);
		await deleteDoc(userRef);
	}
};
