/* eslint-disable react/prop-types */
import {
	AspectRatio,
	Badge,
	Heading,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FlexLayout } from "@/layouts";
import { MarkdownPreview } from "@/components/markdown/markdown-previewer";

export function PreviewSection({ articleData }) {
	const { title, thumbnailUrl, categories, created, content } = articleData;
	const { displayName, photoURL } = articleData.author;

	return (
		<FlexLayout
			as={"article"}
			flexDir={"column"}
			justifyContent={"flex-start"}
		>
			<AspectRatio ratio={3 / 1}>
				{thumbnailUrl ? (
					<Image
						src={thumbnailUrl}
						alt="Thumbnail"
						style={{ objectFit: "contain" }}
					/>
				) : (
					<Text
						fontFamily={"sans-serif"}
						fontSize={"1.5rem"}
						fontWeight={"bold"}
						color={"gray.500"}
						bgColor={"gray.300"}
					>
						No Thumbnail
					</Text>
				)}
			</AspectRatio>

			<Heading
				as={"h1"}
				size={"3xl"}
				fontFamily={"sans-serif"}
			>
				{title ? title : "No Title"}
			</Heading>

			<HStack>
				{categories.length > 0 ? (
					categories.map((category) => (
						<Badge
							key={category.value}
							colorScheme="blue"
							variant={"subtle"}
							w={"fit-content"}
							fontFamily={"sans-serif"}
						>
							{category.label}
						</Badge>
					))
				) : (
					<HStack>
						<Badge
							colorScheme="gray"
							bgColor={"gray.300"}
							variant={"subtle"}
							w={"fit-content"}
							fontFamily={"sans-serif"}
						>
							No Category
						</Badge>
					</HStack>
				)}
			</HStack>

			<HStack>
				<Image
					src={photoURL}
					alt="Profile"
					w={10}
					h={10}
					borderRadius={"full"}
				/>
				<VStack
					alignItems={"flex-start"}
					justifyContent={"flex-start"}
					gap={0}
				>
					<Text
						fontFamily={"sans-serif"}
						fontSize={"sm"}
						fontWeight={"semibold"}
					>
						{displayName}
					</Text>
					<Text
						fontFamily={"sans-serif"}
						fontSize={"xs"}
						color={"gray.500"}
					>
						{created ? created : new Date().toDateString()} - 5 min read
					</Text>
				</VStack>
			</HStack>

			<MarkdownPreview content={content} />
		</FlexLayout>
	);
}
