import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIArticles } from "../../apis/articles.api";

export const deleteArticleById = createAsyncThunk(
	"articles/deleteArticleById",
	APIArticles.deleteArticleById
);

const initialState = {
	status: "idle",
	message: "",
	articleId: "",
};

const deleteArticleByIdSlice = createSlice({
	name: "deleteArticleById",
	initialState,
	reducers: {
		resetStatusDeleteArticle: (state) => {
			state.status = "idle";
			state.message = "";
		},

		setArticleId: (state, action) => {
			state.articleId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteArticleById.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload;
		});
		builder.addCase(deleteArticleById.pending, (state) => {
			state.status = "loading";
			state.message = "Deleting Article...";
		});
		builder.addCase(deleteArticleById.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const getDeleteArticleById = (state) => state.deleteArticleById;
export const { resetStatusDeleteArticle, setArticleId } =
	deleteArticleByIdSlice.actions;

export const deleteArticleByIdReducer = deleteArticleByIdSlice.reducer;
