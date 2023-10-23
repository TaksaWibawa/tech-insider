import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPreview: false,
	formData: {
		title: "",
		thumbnail: null,
		thumbnailName: "",
		selectedCategories: [],
		content: "",
	},
};

const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		togglePreview: (state) => {
			state.isPreview = !state.isPreview;
		},
		updateArticleData: (state, action) => {
			const payload = action.payload;
			const formData = state.formData;

			if (payload.thumbnail && payload.thumbnailName) {
				formData.thumbnail = payload.thumbnail;
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
} = articleSlice.actions;
export default articleSlice.reducer;
