import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./users/createAccount";
import { fetchArticleByIdReducer } from "./articles/fetchArticleById";
import manageUserReducer from "./users/manageUser";
import previewArticleReducer from "./articles/previewArticle";
import { fetchArticlesReducer } from "./articles/fetchArticles";

export const store = configureStore({
	reducer: {
		createAccount: createAccountReducer,
		fetchArticleById: fetchArticleByIdReducer,
		fetchArticles: fetchArticlesReducer,
		manageUser: manageUserReducer,
		previewArticle: previewArticleReducer,
	},
});
