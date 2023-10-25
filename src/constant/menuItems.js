import { authService } from "../config/auth";

export const menuItems = [
	{
		label: "Dashboard",
		path: "/dashboard",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Profile",
		path: "/dashboard/profile",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Sign Out",
		path: "/",
		_hover: {
			bgColor: "red.500",
			color: "white",
		},
		onClick: () => {
			authService.logOut();
		},
	},
];

export const menuItemsMobile = [
	{
		label: "Home",
		path: "/",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Dashboard",
		path: "/dashboard",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Profile",
		path: "/dashboard/profile",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
];

export const menuItemsAnonymous = [
	{
		label: "Home",
		path: "/",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Sign In",
		path: "/login",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
	{
		label: "Sign Up",
		path: "/register",
		_hover: {
			bgColor: "gray.200",
			color: "gray.800",
		},
	},
];
