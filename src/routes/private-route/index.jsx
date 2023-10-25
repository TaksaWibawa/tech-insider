import { authService } from "../../config/auth";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
	if (!authService.isAuthenticated()) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
}
