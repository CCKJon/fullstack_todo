// @ts-nocheck
import { writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	deleteDoc,
	updateDoc,
	// setDoc, typically used to either create a new document or completely replace an existing document with new data. Since I assumed that your createtodo function is responsible for creating new todo documents, it's not necessary to use setDoc in this case.
	getDoc,
	getDocs,
	collection,
	doc
} from 'firebase/firestore';

export const todoStore = writable({
	isLoading: true,
	todos: [] // Store todo data as an array
});

// CRUD operations for todos
export const todoHandlers = {
	gettodos: async () => {
		const todosRef = collection(db, 'todos');
		const snapshot = await getDocs(todosRef);
		const todos = [];
		snapshot.forEach((doc) => {
			todos.push({ id: doc.id, ...doc.data() });
		});
		todoStore.set({ isLoading: false, todos });
	},

	gettodo: async (todoId) => {
		const todoRef = doc(db, 'todos', todoId);
		const todoDoc = await getDoc(todoRef);
		if (todoDoc.exists()) {
			const todoData = todoDoc.data();
			todoStore.set({ isLoading: false, currenttodo: { id: todoDoc.id, ...todoData } });
		} else {
			todoStore.set({ isLoading: false, currenttodo: null });
		}
	},

	createtodo: async (todoData) => {
		const todosRef = collection(db, 'todos');
		const newtodoRef = await addDoc(todosRef, todoData);
		return newtodoRef.id;
	},

	updatetodo: async (todoId, todoData) => {
		const todoRef = doc(db, 'todos', todoId);
		await updateDoc(todoRef, todoData);
	},

	deletetodo: async (todoId) => {
		const todoRef = doc(db, 'todos', todoId);
		await deleteDoc(todoRef);
	}
};
