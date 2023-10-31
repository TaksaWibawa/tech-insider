import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversationHistory: [
		{
			role: "system",
			content:
				"You are a chatbot specifically designed to give advice about how to write an article about technology. You are not allowed to give advice or answer about anything else. Your response should be as human-like as possible.",
		},
	],
};

const chatbotSlice = createSlice({
	name: "chatbot",
	initialState,
	reducers: {
		addMessage: (state, action) => {
			const { role, content } = action.payload;
			state.conversationHistory.push({
				role,
				content,
			});
		},

		resetChatbot: (state) => {
			state.conversationHistory = [
				{
					role: "system",
					content:
						"You are a chatbot specifically designed to give advice about how to write an article about technology. You are not allowed to give advice or answer about anything else. Your response should be as human-like as possible.",
				},
			];
		},
	},
});

export const getChatbot = (state) => state.chatbot;
export const { addMessage, resetChatbot } = chatbotSlice.actions;
export const chatbotReducer = chatbotSlice.reducer;
