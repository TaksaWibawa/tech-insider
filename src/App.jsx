import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseLayout } from "./layouts";
import RegisterPage from "./pages/register.page";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					index
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
		</BrowserRouter>
	);
}

export default App;
