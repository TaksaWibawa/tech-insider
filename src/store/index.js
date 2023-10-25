import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./user/createAccount";
import articleReducer from "./article";
import manageUserReducer from "./user/manageUser";

export const store = configureStore({
	reducer: {
		article: articleReducer,
		createAccount: createAccountReducer,
		manageUser: manageUserReducer,
	},
});
