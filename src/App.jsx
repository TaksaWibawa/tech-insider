import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";
import HomePage from "./pages/home.page";
import NotFoundPage from "./pages/not-found.page";

function App() {
	return (
		<BaseLayout>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
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
					element={<NotFoundPage />}
				/>
			</Routes>
		</BaseLayout>
	);
}

export default App;
