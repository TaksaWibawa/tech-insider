import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<BaseLayout />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route
				path="*"
				element={
					<BaseLayout>
						<h1>Not Found</h1>
					</BaseLayout>
				}
			/>
		</Routes>
	);
}

export default App;
