import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPreview: false,
	formData: {
		title: "",
		categories: [],
		content: "",
		created: "",
		thumbnailUrl: null,
		thumbnailName: "",
	},
};

const previewArticleSlice = createSlice({
	name: "previewArticle",
	initialState,
	reducers: {
		togglePreview: (state) => {
			state.isPreview = !state.isPreview;
		},
		setArticleData: (state, action) => {
			state.formData = action.payload;
		},
		updateArticleData: (state, action) => {
			const payload = action.payload;
			const formData = state.formData;

			state.formData = { ...formData, ...payload };
		},
		resetArticleData: (state) => {
			state.isPreview = initialState.isPreview;
			state.formData = initialState.formData;
		},
	},
});

export const {
	togglePreview,
	setArticleData,
	updateArticleData,
	resetArticleData,
} = previewArticleSlice.actions;

export const selectPreviewArticle = (state) => state.previewArticle;

export const previewArticleReducer = previewArticleSlice.reducer;
