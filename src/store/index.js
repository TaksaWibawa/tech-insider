import { addArticleReducer } from "@/store/articles/addArticle";
import { configureStore } from "@reduxjs/toolkit";
import { createAccountReducer } from "@/store/users/createAccount";
import { deleteArticleByIdReducer } from "@/store/articles/deleteArticleById";
import { deleteThumbnailByUrlReducer } from "@/store/articles/deleteThumbnailByUrl";
import { fetchArticleByAuthorReducer } from "@/store/articles/fetchArticleByAuthor";
import { fetchArticleByIdReducer } from "@/store/articles/fetchArticleById";
import { fetchArticlesReducer } from "@/store/articles/fetchArticles";
import { manageUserReducer } from "@/store/users/manageUser";
import { modalSliceReducer } from "@/store/modal";
import { previewArticleReducer } from "@/store/articles/previewArticle";

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
