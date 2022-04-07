import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBUtGmYuvAYIxvzbHMp_AS7FdzUl4MpWpI',
	authDomain: 'pengpeng-330303.firebaseapp.com',
	projectId: 'pengpeng-330303',
	storageBucket: 'pengpeng-330303.appspot.com',
	messagingSenderId: '488183996768',
	appId: '1:488183996768:web:2821d5920799cd9951fe05',
	measurementId: 'G-PCE3ELJG8H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const register = function (email, password) {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log('Register success ' + userCredential.user);
		})
		.catch((e) => {
			console.log(e);
		});
};

const login = function (email, password) {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				resolve(userCredential.user);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

export { db, register, login, auth };

// const messaging = getMessaging();
// getToken(messaging, {
// 	vapidKey:
// 		'BLkPkqRdH-GfAvBmUvDz2npXxRjwS-6-MWE2s8jA1N-lRVJWnmUS3IG50XZ7jzU_RGYXGBzLSMhGdfo8cTg9xpg',
// })
// 	.then((currentToken) => {
// 		if (currentToken) {
// 			console.log(currentToken);
// 		} else {
// 			// Show permission request UI
// 			console.log(
// 				'No registration token available. Request permission to generate one.'
// 			);
// 			// ...
// 		}
// 	})
// 	.catch((err) => {
// 		console.log('An error occurred while retrieving token. ', err);
// 		// ...
// 	});

// onMessage(messaging, (payload) => {
// 	alert('Bạn vừa có 1 tin: ', payload.notification.title);
// });

// export default messaging;
