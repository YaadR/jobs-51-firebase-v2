import useSignInWithGoogleMutation from "../hooks/auth/useSignInWithGoogleMutation";
import { Container, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import useI18nContext from "../hooks/general/useI18nContext";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import { Box } from "@mui/system";
import Logo from "../assets/Logo";
import useSignInWithEmailMutation from "../hooks/auth/useSignInWithEmailMutation";
import { MdEmail } from "react-icons/md";
import SignInForm from "./SignInForm";
import useToggle from "../hooks/general/useToggle";

export default function SignIn() {
	const { mutateAsync } = useSignInWithGoogleMutation();
	const { mutateAsync: signInWithEmail } = useSignInWithEmailMutation();
	const { t } = useI18nContext();
	const [isSigningInWithEmail, toggleSigningInWithEmail] = useToggle();

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					height: "80vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Logo />
				<PrimaryAndSecondaryTypography
					containerProps={{ style: { textAlign: "center" } }}
					primary={t?.welcomeToAppPrimary}
					secondary={t?.welcomeToAppSecondary}
				/>
				{!isSigningInWithEmail ? (
					<>
						<LoadingButton
							fullWidth
							variant='outlined'
							color='primary'
							onClick={mutateAsync}
							endIcon={<FcGoogle size={24} />}
						>
							{t?.signInWithGoogle}
						</LoadingButton>
						<LoadingButton
							fullWidth
							sx={{ mt: 1 }}
							variant='outlined'
							color='primary'
							onClick={toggleSigningInWithEmail}
							endIcon={<MdEmail size={24} />}
						>
							{t?.signInWithEmail}
						</LoadingButton>
					</>
				) : (
					<>
						<SignInForm onSubmit={signInWithEmail} />
						<LoadingButton
							fullWidth
              sx={{mt: 2}}
							variant='outlined'
							color='primary'
							onClick={mutateAsync}
							endIcon={<FcGoogle size={24} />}
						>
							{t?.signInWithGoogle}
						</LoadingButton>
					</>
				)}
			</Box>
		</Container>
	);
}
