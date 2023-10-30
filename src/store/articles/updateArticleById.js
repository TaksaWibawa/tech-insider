import { APIArticles } from "@/apis/articles.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateArticleById = createAsyncThunk(
	"articles/updateArticleById",
	APIArticles.updateArticleById
);

const initialState = {
	status: "idle",
	message: "",
	isPreview: false,
	data: {
		title: "",
		categories: [],
		content: "",
		thumbnailUrl: null,
		thumbnailName: "",
	},
};

const updateArticleByIdSlice = createSlice({
	name: "updateArticleById",
	initialState,
	reducers: {
		resetUpdateArticle: (state) => {
			state.status = "idle";
			state.message = "";
			state.isPreview = false;
			state.data = {
				...state.data,
				...initialState.data,
			};
		},

		setUpdatedData: (state, action) => {
			state.data = {
				...state.data,
				...action.payload,
			};
		},

		toggleEditPreview: (state) => {
			state.isPreview = !state.isPreview;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateArticleById.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload;
		});
		builder.addCase(updateArticleById.pending, (state) => {
			state.status = "loading";
			state.message = "Updating article...";
		});
		builder.addCase(updateArticleById.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const getUpdateArticleById = (state) => state.updateArticleById;
export const { resetUpdateArticle, setUpdatedData, toggleEditPreview } =
	updateArticleByIdSlice.actions;

export const updateArticleByIdReducer = updateArticleByIdSlice.reducer;
