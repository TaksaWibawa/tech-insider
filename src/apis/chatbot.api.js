import { openai } from "@/config/openai";

export const APIChatbot = {
	getCompletion: async (conversationHistory, userMessage) => {
		try {
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					...conversationHistory,
					{
						role: "user",
						content: userMessage,
					},
				],
				max_tokens: 150,
				temperature: 0.9,
			});
			return response.choices[0].message.content;
		} catch (err) {
			throw new Error(err);
		}
	},
};
