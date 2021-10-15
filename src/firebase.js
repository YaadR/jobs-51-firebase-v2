import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Prod
const firebaseConfigProduction = {
	apiKey: "AIzaSyBlwYofd1KpSUEAaNBW50ZrBMSi-FBcCuM",
	authDomain: "jobs-51.firebaseapp.com",
	databaseURL: "https://jobs-51.firebaseio.com",
	projectId: "jobs-51",
	storageBucket: "jobs-51.appspot.com",
	messagingSenderId: "275815227889",
	appId: "1:275815227889:web:5acc97bb80f2b82e17e450",
	measurementId: "G-5ZFDZB092K",
};

// Dev
const firebaseConfigDevelopment = {
	apiKey: "AIzaSyCzlucLzYhifdRQyBAXhEStCx_dO23HjgM",
	authDomain: "jobs-51-dev.firebaseapp.com",
	databaseURL: "https://jobs-51-dev.firebaseio.com",
	projectId: "jobs-51-dev",
	storageBucket: "jobs-51-dev.appspot.com",
	messagingSenderId: "848181112595",
	appId: "1:848181112595:web:9809ace2ee6408149734e6",
	measurementId: "G-7FBWEKEJNH",
};

if (firebase.apps.length === 0) {
	// firebase.initializeApp(firebaseConfigProduction);

	firebase.initializeApp(
		process.env.NODE_END === "production"
			? firebaseConfigProduction
			: firebaseConfigDevelopment
	);
}

export const db = firebase.firestore();
export const auth = firebase.auth();
