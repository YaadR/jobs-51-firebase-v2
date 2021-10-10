import { Switch, Route, BrowserRouter } from "react-router-dom";
import { routes } from "./index";
import Layout from "../components/Layout";

export default function Router() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					{routes.map((route) => (
						<Route {...route} key={route?.path} />
					))}
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}
