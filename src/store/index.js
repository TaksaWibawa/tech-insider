import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./article";
import userReducer from "./user";

export const store = configureStore({
	reducer: {
		article: articleReducer,
		user: userReducer,
	},
});
