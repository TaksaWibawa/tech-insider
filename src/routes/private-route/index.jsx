import { authService } from "../../config/auth";
import { Outlet } from "react-router-dom";
import UnauthorizedPage from "../../pages/unauthorized.page";

export function PrivateRoute() {
	if (!authService.isAuthenticated()) {
		return <UnauthorizedPage />;
	}

	return <Outlet />;
}
