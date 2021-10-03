import { useMutation } from "react-query";
import { auth } from "../../firebase";
import firebase from "firebase";

export default function useSignInWithGoogleMutation() {
	return useMutation(async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider).catch((e) => console.log(e));
	});
}
