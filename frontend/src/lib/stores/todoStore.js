// @ts-nocheck
import { writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import {
	addDoc,
	deleteDoc,
	updateDoc,
	// setDoc, typically used to either create a new document or completely replace an existing document with new data. Since I assumed that your createTodo function is responsible for creating new Todo documents, it's not necessary to use setDoc in this case.
	getDoc,
	getDocs,
	collection,
	doc
} from 'firebase/firestore';

export const TodoStore = writable({
	isLoading: true,
	Todos: [] // Store Todo data as an array
});

// CRUD operations for Todos
export const TodoHandlers = {
	getTodos: async () => {
		const TodosRef = collection(db, 'Todos');
		const snapshot = await getDocs(TodosRef);
		const Todos = [];
		snapshot.forEach((doc) => {
			Todos.push({ id: doc.id, ...doc.data() });
		});
		TodoStore.set({ isLoading: false, Todos });
	},

	getTodo: async (TodoId) => {
		const TodoRef = doc(db, 'Todos', TodoId);
		const TodoDoc = await getDoc(TodoRef);
		if (TodoDoc.exists()) {
			const TodoData = TodoDoc.data();
			TodoStore.set({ isLoading: false, currentTodo: { id: TodoDoc.id, ...TodoData } });
		} else {
			TodoStore.set({ isLoading: false, currentTodo: null });
		}
	},

	createTodo: async (TodoData) => {
		const TodosRef = collection(db, 'Todos');
		const newTodoRef = await addDoc(TodosRef, TodoData);
		return newTodoRef.id;
	},

	updateTodo: async (TodoId, TodoData) => {
		const TodoRef = doc(db, 'Todos', TodoId);
		await updateDoc(TodoRef, TodoData);
	},

	deleteTodo: async (TodoId) => {
		const TodoRef = doc(db, 'Todos', TodoId);
		await deleteDoc(TodoRef);
	}
};
