import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./users/createAccount";
import { fetchArticleByIdReducer } from "./articles/fetchArticleById";
import manageUserReducer from "./users/manageUser";
import previewArticleReducer from "./articles/previewArticle";
import { fetchArticlesReducer } from "./articles/fetchArticles";
import { addArticleReducer } from "./articles/addArticle";

export const store = configureStore({
	reducer: {
		addArticle: addArticleReducer,
		createAccount: createAccountReducer,
		fetchArticleById: fetchArticleByIdReducer,
		fetchArticles: fetchArticlesReducer,
		manageUser: manageUserReducer,
		previewArticle: previewArticleReducer,
	},
});
