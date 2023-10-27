import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIArticles } from "../../apis/articles.api";

export const fetchArticles = createAsyncThunk(
	"articles/fetchArticles",
	APIArticles.getAllArticles
);

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

const fetchArticlesSlice = createSlice({
	name: "addArticle",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchArticles.fulfilled, (state, action) => {
			if (action.payload) {
				state.status = "success";
				state.data = action.payload;
			} else {
				state.status = "failed";
				state.message = "No data found";
			}
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
