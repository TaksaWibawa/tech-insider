import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModal: (state) => {
			state.isOpen = !state.isOpen;
		},
		resetModal: (state) => {
			state.isOpen = initialState.isOpen;
		},
	},
});

export const getModal = (state) => state.modal;
export const { toggleModal, resetModal } = modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;
