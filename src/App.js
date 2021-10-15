import { AuthProvider } from "./contexts/AuthContext";
import Router from "./navigation/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import I18nProvider from "./contexts/I18nContext";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import RTLProvider from "./contexts/RTLContext";
import { baseTheme, themes } from "./lib/theme";
import { CssBaseline } from "@mui/material";
import usePrefersDarkTheme from "./hooks/general/usePrefersDarkTheme";
import { useMemo } from "react";

const queryClient = new QueryClient();

function App() {
	const prefersDarkMode = usePrefersDarkTheme();
	const theme = useMemo(
		() =>
			createTheme({
				...baseTheme,
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<RTLProvider>
					<I18nProvider>
						<AuthProvider>
							<Router />
						</AuthProvider>
					</I18nProvider>
				</RTLProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
