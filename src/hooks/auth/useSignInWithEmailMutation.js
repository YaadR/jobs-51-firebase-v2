import { useMutation } from "react-query";
import { auth } from "../../firebase";

export default function useSignInWithEmailMutation() {
	return useMutation(async (v) => {
		return auth.signInWithEmailAndPassword(v).catch((e) => console.log(e));
	});
}
