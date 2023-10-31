import { addMessage, getChatbot } from "@/store/chatbot";
import {
	Box,
	Button,
	Container,
	Input,
	Avatar,
	Flex,
	Divider,
	HStack,
} from "@chakra-ui/react";
import { APIChatbot } from "@/apis/chatbot.api";
import { Controller, useForm } from "react-hook-form";
import { currentUser } from "@/store/users/manageUser";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export function ChatbotSection() {
	const dispatch = useDispatch();
	const { control, handleSubmit, reset } = useForm();
	const { conversationHistory } = useSelector(getChatbot);
	const user = useSelector(currentUser);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		reset();
		dispatch(addMessage({ role: "user", content: data.message }));
		const response = await APIChatbot.getCompletion(
			conversationHistory,
			data.message
		)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw new Error(error);
			})
			.finally(() => {
				setLoading(false);
			});

		dispatch(addMessage({ role: "assistant", content: response }));
	};

	const systemMessages = conversationHistory.filter(
		(message) => message.role === "system"
	);
	const userAndAssistantMessages = conversationHistory.filter(
		(message) => message.role === "user" || message.role === "assistant"
	);

	return (
		<Container
			as={"main"}
			maxW={"100%"}
			height={"100vh"}
			display={"flex"}
			flex={1}
			flexDir={"column"}
			gap={5}
			px={8}
			pb={4}
		>
			<Box
				flex={1}
				p={3}
			>
				{systemMessages.map((message, index) => (
					<Box
						key={index}
						bgColor={"gray.100"}
						border={"1px solid black"}
						boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
						color={"black"}
						fontSize={"sm"}
						fontWeight={"semibold"}
						p={3}
						rounded={"lg"}
						textAlign={"center"}
						wordBreak="break-word"
					>
						{message.content}
					</Box>
				))}
				<Divider
					marginY={3}
					borderColor={"transparent"}
				/>
				{userAndAssistantMessages.map((message, index) => (
					<Box
						key={index}
						display="flex"
						alignItems="flex-end"
						flexDirection={message.role === "user" ? "row-reverse" : "row"}
					>
						{message.role === "user" && (
							<Flex
								justifyContent={"flex-end"}
								flexDirection="row"
								gap={2}
								maxW={"45%"}
							>
								<Box
									bgColor={"blue.500"}
									color={"white"}
									px={3}
									py={2}
									rounded={"lg"}
									boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
									maxWidth={"100%"}
									fontSize="sm"
									wordBreak="break-word"
								>
									{message.content}
								</Box>
								<Avatar
									size="sm"
									src={user.photoURL}
									margin={"0"}
									border={"1px solid black"}
								/>
							</Flex>
						)}
						{message.role === "assistant" && (
							<Flex
								flexDirection={"row"}
								gap={2}
								maxW={"45%"}
							>
								<Avatar
									size="sm"
									src="http://www.openai.com/favicon.ico"
									margin={"0"}
									border={"1px solid black"}
								/>
								<Box
									bgColor={"green.500"}
									color={"white"}
									px={3}
									py={2}
									rounded={"lg"}
									boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
									maxWidth={"100%"}
									fontSize="sm"
									wordBreak="break-word"
								>
									{message.content}
								</Box>
							</Flex>
						)}
					</Box>
				))}
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<HStack
					bgColor="white"
					borderTop="1px solid gray"
					pt={4}
				>
					<Controller
						name="message"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Type your message here"
								variant="filled"
								size="lg"
								rounded="lg"
								bgColor={"gray.200"}
								color={"black"}
								_hover={{
									bgColor: "gray.300",
								}}
							/>
						)}
					/>
					<Button
						type="submit"
						isLoading={loading}
						loadingText="Sending..."
						bgColor="blue.400"
						color="white"
						rounded="lg"
						_hover={{
							bgColor: "blue.600",
						}}
					>
						Send
					</Button>
				</HStack>
			</form>
		</Container>
	);
}
