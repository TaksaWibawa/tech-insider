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
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuthenticated: (state) => {
			state.isAuthenticated = authService.isAuthenticated();
		},

		setUser: (state, action) => {
			const { uid, email, displayName, photoURL } = action.payload;
			if (state.isAuthenticated) {
				state.user = {
					...state.user,
					uid,
					email,
					displayName,
					photoURL,
				};
			}
		},

		clearUser: (state) => {
			state.isAuthenticated = initialState.isAuthenticated;
			state.user = initialState.user;
		},
	},
});

export const { setAuthenticated, setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
