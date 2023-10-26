import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPreview: false,
	formData: {
		title: "",
		thumbnailUrl: null,
		thumbnailName: "",
		categories: [],
		content: "",
	},
};

const previewArticleSlice = createSlice({
	name: "previewArticle",
	initialState,
	reducers: {
		togglePreview: (state) => {
			state.isPreview = !state.isPreview;
		},
		updateArticleData: (state, action) => {
			const payload = action.payload;
			const formData = state.formData;

			if (payload.thumbnail && payload.thumbnailName) {
				formData.thumbnailUrl = payload.thumbnail;
				formData.thumbnailName = payload.thumbnailName;
			}

			state.formData = { ...formData, ...payload };
		},
		publishArticle: (state) => {
			console.log({ ...state.formData });
		},
		resetArticleData: (state) => {
			state.isPreview = initialState.isPreview;
			state.formData = initialState.formData;
		},
	},
});

export const {
	togglePreview,
	updateArticleData,
	publishArticle,
	resetArticleData,
} = previewArticleSlice.actions;

export const selectPreviewArticle = (state) => state.previewArticle;

export default previewArticleSlice.reducer;
