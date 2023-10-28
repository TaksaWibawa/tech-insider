import { addArticleReducer } from "./articles/addArticle";
import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "./users/createAccount";
import { deleteArticleByIdReducer } from "./articles/deleteArticleById";
import { deleteThumbnailByUrlReducer } from "./articles/deleteThumbnailByUrl";
import { fetchArticleByAuthorReducer } from "./articles/fetchArticleByAuthor";
import { fetchArticleByIdReducer } from "./articles/fetchArticleById";
import { fetchArticlesReducer } from "./articles/fetchArticles";
import { manageUserReducer } from "./users/manageUser";
import { modalSliceReducer } from "./modal";
import { previewArticleReducer } from "./articles/previewArticle";

export const store = configureStore({
	reducer: {
		addArticle: addArticleReducer,
		createAccount: createAccountReducer,
		deleteArticleById: deleteArticleByIdReducer,
		deleteThumbnailByUrl: deleteThumbnailByUrlReducer,
		fetchArticleByAuthor: fetchArticleByAuthorReducer,
		fetchArticleById: fetchArticleByIdReducer,
		fetchArticles: fetchArticlesReducer,
		manageUser: manageUserReducer,
		modal: modalSliceReducer,
		previewArticle: previewArticleReducer,
	},
});
