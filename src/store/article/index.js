import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPreview: false,
	formData: {
		title: "",
		thumbnail: "",
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

			if (
				payload.selectedCategories &&
				payload.selectedCategories.length <= 3
			) {
				payload.selectedCategories = payload.selectedCategories.map(
					(category) => category
				);
				state.formData = { ...formData, ...payload };
			} else {
				state.formData = {
					...formData,
					...payload,
					selectedCategories: [...formData.selectedCategories],
				};
			}
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
