import { APIArticles } from "@/apis/articles.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteThumbnailByUrl = createAsyncThunk(
	"articles/deleteThumbnailByUrl",
	APIArticles.deleteThumbnailByUrl
);

const initialState = {
	status: "idle",
	message: "",
};

const deleteThumbnailByUrlSlice = createSlice({
	name: "deleteThumbnailByUrl",
	initialState,
	reducers: {
		resetStatusDeleteThumbnail: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteThumbnailByUrl.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload;
		});
		builder.addCase(deleteThumbnailByUrl.pending, (state) => {
			state.status = "loading";
			state.message = "Deleting Article...";
		});
		builder.addCase(deleteThumbnailByUrl.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const getDeleteThumbnailByUrl = (state) => state.deleteThumbnailByUrl;
export const { resetStatusDeleteThumbnail } = deleteThumbnailByUrlSlice.actions;
export const deleteThumbnailByUrlReducer = deleteThumbnailByUrlSlice.reducer;
