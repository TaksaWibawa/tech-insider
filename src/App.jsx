import { APIProfile } from "@/apis/profile.api";
import { auth } from "@/config/firebase";
import { PrivateRoute } from "@/routes/private-route";
import { ProtectedRoute } from "@/routes/protected-route";
import { Route, Routes } from "react-router-dom";
import { setAuthenticated, setUser } from "@/store/users/manageUser";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import CreateArticlePage from "@/pages/create-article.page";
import DashboardPage from "@/pages/dashboard.page";
import HomePage from "@/pages/home.page";
import LoginPage from "@/pages/login.page";
import NotFoundPage from "@/pages/not-found.page";
import ReadArticlesPage from "@/pages/read-articles.page";
import ReadCurrentArticlePage from "@/pages/read-current-article";
import RegisterPage from "@/pages/register.page";
import EditArticlePage from "./pages/edit-article.page";

function App() {
	useScrollToTop();
	const dispatch = useDispatch();
	const [isUserLoaded, setIsUserLoaded] = useState(false);

	useEffect(() => {
		const authStateChanged = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(setAuthenticated());
				if (!isUserLoaded) {
					setIsUserLoaded(true);
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
			}
		});

		return () => authStateChanged();
	}, [dispatch, isUserLoaded]);

	return (
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

				<Route
					path="/dashboard"
					element={<DashboardPage />}
				/>

				<Route
					path="/dashboard/edit/:articleId"
					element={<EditArticlePage />}
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
	);
}

export default App;
