import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts";
import RegisterPage from "./pages/register.page";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<BaseLayout />}
			/>
			<Route
				path="/login"
				element={<h1>Hello Login</h1>}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
		</Routes>
	);
}

export default App;
