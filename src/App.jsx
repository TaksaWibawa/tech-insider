import { APIProfile } from "./apis/profile.api";
import { auth } from "./config/firebase";
import { BaseLayout } from "./layouts";
import { PrivateRoute } from "./routes/private-route";
import { ProtectedRoute } from "./routes/protected-route";
import { Route, Routes } from "react-router-dom";
import { setAuthenticated, setUser } from "./store/users/manageUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import CreateArticlePage from "./pages/create-article.page";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import NotFoundPage from "./pages/not-found.page";
import ReadArticlesPage from "./pages/read-articles.page";
import ReadCurrentArticlePage from "./pages/read-current-article";
import RegisterPage from "./pages/register.page";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
	const dispatch = useDispatch();

	useScrollToTop();

	useEffect(() => {
		const authStateChanged = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(setAuthenticated());
				try {
					APIProfile.getUserProfile(user.uid).then((profile) => {
						const userData = {
							uid: user.uid,
							email: user.email,
							displayName: user.displayName,
							photoURL: user.photoURL,
							...profile,
						};
						dispatch(setUser(userData));
					});
				} catch (error) {
					throw new Error(error);
				}
			}
		});

		return () => authStateChanged();
	}, [dispatch]);

	return (
		<BaseLayout>
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/read"
					element={<ReadArticlesPage />}
				/>
				<Route
					path="/read/article/:articleId"
					element={<ReadCurrentArticlePage />}
				/>
				<Route
					path="/"
					element={<PrivateRoute />}
				>
					<Route
						path="/write"
						element={<CreateArticlePage />}
					/>
				</Route>
				<Route
					path="/"
					element={<ProtectedRoute />}
				>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
				</Route>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
		</BaseLayout>
	);
}

export default App;
