import { APIArticles } from "@/apis/articles.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArticleByAuthor = createAsyncThunk(
	"articles/fetchArticleByAuthor",
	APIArticles.getArticlesByAuthor
);

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

const fetchArticleByAuthorSlice = createSlice({
	name: "fetchArticleByAuthor",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchArticleByAuthor.fulfilled, (state, action) => {
			if (action.payload) {
				state.status = "success";
				state.data = action.payload;
			} else {
				state.status = "failed";
				state.message = "No data found";
			}
		});
		builder.addCase(fetchArticleByAuthor.pending, (state) => {
			state.status = "loading";
			state.message = "";
		});
		builder.addCase(fetchArticleByAuthor.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const selectArticleByAuthor = (state) => state.fetchArticleByAuthor;
export const fetchArticleByAuthorReducer = fetchArticleByAuthorSlice.reducer;
