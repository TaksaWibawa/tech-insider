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
				state.user = data;
			}
		},

		getUser: (state) => {
			if (state.isAuthenticated) {
				return state.user;
			}
		},

		clearUser: (state) => {
			state = initialState;
			return state;
		},
	},
});

export const { setAuthenticated, setUser, clearUser } = manageUserSlice.actions;

export const userStatus = (state) => state.manageUser.isAuthenticated;
export const currentUser = (state) => state.manageUser.user;

export const manageUserReducer = manageUserSlice.reducer;
