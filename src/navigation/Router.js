import { Switch, Route, BrowserRouter } from "react-router-dom";
import Activity from "../components/Activity";
import Layout from "../components/Layout";
import User from "../components/User";

export default function Router() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route exact path='/' component={Activity} />
					<Route path='/u/:uid' component={User} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}
