import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./navigation/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import I18nProvider from "./contexts/I18nContext";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import RTLProvider from "./contexts/RTLContext";
import Layout from "./components/Layout";
import { themes } from "./lib/theme";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

function App() {

	return (
		<ThemeProvider theme={themes.light}>
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
