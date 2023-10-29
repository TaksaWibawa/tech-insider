import { Container, Flex, VStack } from "@chakra-ui/react";
import { DashboardHeader } from "@/components/navbar/dashboard";
import { DashboardSection } from "@/components/section/dashboard-section";
import { Sidebar } from "@/components/sidebar";
import { useChangeDocTitle } from "@/hooks/useChangeDocTitle";
import { useState } from "react";

export default function DashboardPage() {
	const [content, setContent] = useState("Dashboard");

	useChangeDocTitle(content + " Section");

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
				{content === "Setting" && (
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
						Setting Page
					</Container>
				)}
			</VStack>
		</Flex>
	);
}
