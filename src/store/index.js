import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./article";

export const store = configureStore({
	reducer: {
		article: articlesReducer,
	},
});
