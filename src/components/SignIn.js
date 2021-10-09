import useSignInWithGoogleMutation from "../hooks/auth/useSignInWithGoogleMutation";
import { Button, Container } from "@mui/material";
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
				<Button
					fullWidth
					variant='outlined'
					color='inherit'
					onClick={mutateAsync}
					endIcon={<FcGoogle size={24} />}
				>
					{t?.signInWithGoogle}
				</Button>
			</Box>
		</Container>
	);
}
