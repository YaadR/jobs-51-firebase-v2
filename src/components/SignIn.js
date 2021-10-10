import useSignInWithGoogleMutation from "../hooks/auth/useSignInWithGoogleMutation";
import { Container } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import useI18nContext from "../hooks/general/useI18nContext";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import { Box } from "@mui/system";
import Logo from "../assets/Logo";

export default function SignIn() {
	const { mutateAsync } = useSignInWithGoogleMutation();
	const { t } = useI18nContext();

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
				<LoadingButton
					fullWidth
					variant='outlined'
					color='primary'
					onClick={mutateAsync}
					endIcon={<FcGoogle size={24} />}
				>
					{t?.signInWithGoogle}
				</LoadingButton>
			</Box>
		</Container>
	);
}
