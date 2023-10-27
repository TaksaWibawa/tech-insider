import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIArticles } from "../../apis/articles.api";

export const addArticle = createAsyncThunk(
	"articles/addArticle",
	APIArticles.addArticle
);

const initialState = {
	status: "idle",
	message: "",
};

const addArticleSlice = createSlice({
	name: "addArticle",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addArticle.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload;
		});
		builder.addCase(addArticle.pending, (state) => {
			state.status = "loading";
			state.message = "";
		});
		builder.addCase(addArticle.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const getAddArticle = (state) => state.addArticle;
export const addArticleReducer = addArticleSlice.reducer;
