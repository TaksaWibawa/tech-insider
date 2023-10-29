import { APIArticles } from "@/apis/articles.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArticle = createAsyncThunk(
	"articles/fetchArticleById",
	APIArticles.getArticle
);

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

const fetchArticleByIdSlice = createSlice({
	name: "fetchArticles",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchArticle.fulfilled, (state, action) => {
			if (action.payload) {
				state.status = "success";
				state.data = action.payload;
			} else {
				state.status = "failed";
				state.message = "No data found";
			}
		});
		builder.addCase(fetchArticle.pending, (state) => {
			state.status = "loading";
			state.message = "";
		});
		builder.addCase(fetchArticle.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const selectArticle = (state) => state.fetchArticleById;
export const fetchArticleByIdReducer = fetchArticleByIdSlice.reducer;
