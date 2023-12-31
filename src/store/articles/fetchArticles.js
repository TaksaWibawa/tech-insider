import { APIArticles } from "@/apis/articles.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
	"articles/fetchArticles",
	APIArticles.getArticles
);

const initialState = {
	status: "idle",
	message: "",
	data: [],
};

const fetchArticlesSlice = createSlice({
	name: "fetchArticles",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchArticles.fulfilled, (state, action) => {
			state.status = "success";
			state.message = "success";
			state.data = action.payload;
		});
		builder.addCase(fetchArticles.pending, (state) => {
			state.status = "loading";
			state.message = "";
		});
		builder.addCase(fetchArticles.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const getArticles = (state) => state.fetchArticles;

export const fetchArticlesReducer = fetchArticlesSlice.reducer;
