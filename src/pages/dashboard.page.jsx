import { Container, Flex, VStack } from "@chakra-ui/react";
import { DashboardHeader } from "@/components/navbar/dashboard";
import { DashboardSection } from "@/components/section/dashboard-section";
import { Sidebar } from "@/components/sidebar";
import { useChangeDocTitle } from "@/hooks/useChangeDocTitle";
import { useEffect, useState } from "react";
import { SuccessModal } from "@/components/modal/success-modal";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteArticleById } from "@/store/articles/deleteArticleById";
import { getUpdateArticleById } from "@/store/articles/updateArticleById";
import { FailedModal } from "@/components/modal/failed-modal";
import { ChatbotSection } from "@/components/section/chatbot-section";
import { resetChatbot } from "@/store/chatbot";

export default function DashboardPage() {
	const [content, setContent] = useState("Dashboard");
	const [showAlert, setShowAlert] = useState(false);
	const dispatch = useDispatch();

	useChangeDocTitle(content + " Section");

	const { status: statusDelete } = useSelector(getDeleteArticleById);
	const { status: statusUpdate } = useSelector(getUpdateArticleById);

	useEffect(() => {
		if (statusDelete === "success" || statusUpdate === "success") {
			setShowAlert(true);
		}
	}, [statusDelete, statusUpdate]);

	useEffect(() => {
		return () => {
			dispatch(resetChatbot());
		};
	}, [dispatch]);

	return (
		<Flex minH="100vh">
			<Sidebar
				state={content}
				setState={setContent}
			/>
			<VStack
				as={"main"}
				align={"flex-start"}
				flex={1}
				p={"0"}
				spacing="8"
			>
				<DashboardHeader title={content} />

				{content === "Dashboard" && <DashboardSection />}
				{content === "Profile" && (
					<Container
						as={"main"}
						maxW={"100%"}
						display={"flex"}
						flex={1}
						flexDir={"column"}
						gap={5}
						px={12}
						centerContent
					>
						Profile Page
					</Container>
				)}
				{content === "Chatbot" && <ChatbotSection />}
			</VStack>

			{showAlert && statusUpdate === "success" && (
				<SuccessModal
					title="Success"
					description="Article has been updated"
					isOpen={showAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}

			{showAlert && statusUpdate === "failed" && (
				<FailedModal
					title="Failed"
					description="Failed to update article"
					isOpen={showAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}

			{showAlert && statusDelete === "success" && (
				<SuccessModal
					title="Success"
					description="Article has been deleted"
					isOpen={showAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}

			{showAlert && statusDelete === "failed" && (
				<FailedModal
					title="Failed"
					description="Failed to delete article"
					isOpen={showAlert}
					onClose={() => setShowAlert(false)}
				/>
			)}
		</Flex>
	);
}
