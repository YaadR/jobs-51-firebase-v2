// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();
// const db = admin.firestore();

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //

// exports.sumActivitiesByRegion = functions.firestore
// 	.document("activities/{docId}")
// 	.onWrite(async (change, context) => {
// 		const statsRef = await db
// 			.collection("stats")
// 			.doc("activities")
// 			.get()
// 			.then((d) => ({ id: d.id, ...d.data() }));
// 		console.log(statsRef);

// 		console.log(change, context);

// 		return null;
// 	});
