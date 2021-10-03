import useSignInWithGoogleMutation from "../hooks/auth/useSignInWithGoogleMutation";
import { Button } from "@mui/material";

export default function SignIn() {
	const { mutateAsync } = useSignInWithGoogleMutation();

	return (
		<div>
			<Button onClick={mutateAsync}>Sign in</Button>
		</div>
	);
}
