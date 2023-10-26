import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../config/auth";

const initialState = {
	isAuthenticated: false,
	user: {
		uid: "",
		email: "",
		displayName: "",
		firstName: "",
		lastName: "",
		photoURL: "",
		age: null,
		bio: "",
	},
};

const manageUserSlice = createSlice({
	name: "manageUser",
	initialState,
	reducers: {
		setAuthenticated: (state) => {
			state.isAuthenticated = authService.isAuthenticated();
		},

		setUser: (state, action) => {
			const data = action.payload;
			if (state.isAuthenticated) {
				state.user = {
					uid: data.uid,
					email: data.email,
					displayName: data.displayName,
					firstName: data.firstName,
					lastName: data.lastName,
					photoURL: data.photoURL,
					age: data.age,
					bio: data.bio,
				};
			}
		},

		clearUser: (state) => {
			state.isAuthenticated = initialState.isAuthenticated;
			state.user = initialState.user;
		},
	},
});

export const { setAuthenticated, setUser, clearUser } = manageUserSlice.actions;

export const userStatus = (state) => state.manageUser.isAuthenticated;
export const currentUser = (state) => state.manageUser.user;

export default manageUserSlice.reducer;
