import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIAuth } from "@/apis/auth.api";

export const createAccount = createAsyncThunk(
	"users/createAccount",
	APIAuth.register
);

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

const createAccountSlice = createSlice({
	name: "createAccount",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(createAccount.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload;
		});
		builder.addCase(createAccount.pending, (state) => {
			state.status = "loading";
			state.message = "";
		});
		builder.addCase(createAccount.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const createAccountReducer = createAccountSlice.reducer;
export const registerSelector = (state) => state.createAccount;
