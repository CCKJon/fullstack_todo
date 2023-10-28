// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD9JC8sdvAg5_iskvc-PATjbvw6Pe26emA',
	authDomain: 'task-manager-db5f3.firebaseapp.com',
	projectId: 'task-manager-db5f3',
	storageBucket: 'task-manager-db5f3.appspot.com',
	messagingSenderId: '32043022173',
	appId: '1:32043022173:web:4a84da7a2dbc7189d35ab4',
	measurementId: 'G-1SS7S0V5G2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
