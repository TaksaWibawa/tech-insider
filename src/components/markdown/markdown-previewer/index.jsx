/* eslint-disable react/prop-types */
import {
	AspectRatio,
	Badge,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { FlexLayout } from "../../../layouts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const initialContent = `
## Getting Started
1. **Explore Articles**: Start by browsing the articles on the homepage.
2. **Read**: Click on any article title to read it in full.
3. **Sign Up**: To write and publish your own articles, create an account.
## Writing and Publishing Articles
1. **Write**: Click "Write an Article" to create your own article.
2. **Compose**: Write your article using our editor.
3. **Categories**: Select up to three categories that fit your article.
4. **Preview**: Review your article's appearance.
5. **Publish**: Hit "Publish" to share your article with the community.
## Engage with the Community
1. **Comments**: Leave comments on articles to share your thoughts.
2. **Follow**: Follow authors to get updates on their latest articles.
3. **Share**: If you love an article, share it with your friends on social media.
## Need Help?
If you have any questions or need assistance, feel free to contact our support team or visit our community forum. We're here to help.
Enjoy your journey through the world of articles at [Your Blog Name]!
`;

const codeHighlighter = ({ className, children }) => {
	const language = className ? className.replace("language-", "") : "text";
	return (
		<SyntaxHighlighter
			style={dracula}
			language={language}
			wrapLongLines
			showLineNumbers
			lineNumberStyle={{
				fontSize: "0.8rem",
				lineHeight: "2",
			}}
		>
			{children.toString().replace(/\n$/, "")}
		</SyntaxHighlighter>
	);
};

export function MarkdownPreview({
	authorAvatar,
	authorName,
	content,
	createdAt,
	selectedCategories,
	thumbnail,
	title,
}) {
	return (
		<FlexLayout
			as={"article"}
			flexDir={"column"}
			justifyContent={"flex-start"}
		>
			{/* find the best ratio */}
			<AspectRatio ratio={4 / 1}>
				{thumbnail ? (
					<AspectRatio ratio={4 / 1}>
						<Image
							src={URL.createObjectURL(thumbnail)}
							alt="Thumbnail"
							objectFit={"cover"}
						/>
					</AspectRatio>
				) : (
					<AspectRatio ratio={4 / 1}>
						<Text
							fontFamily={"sans-serif"}
							fontSize={"1.5rem"}
							fontWeight={"bold"}
							color={"gray.500"}
							bgColor={"gray.300"}
						>
							No Thumbnail
						</Text>
					</AspectRatio>
				)}
			</AspectRatio>

			<Heading
				as={"h1"}
				size={"3xl"}
				fontFamily={"sans-serif"}
			>
				{title ? title : "Welcome to Our Blog"}
			</Heading>

			<HStack>
				{selectedCategories.length > 0 ? (
					selectedCategories.map((category) => (
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
							Introduction
						</Badge>
					</HStack>
				)}
			</HStack>

			<HStack>
				<Image
					src={
						authorAvatar
							? authorAvatar
							: "https://avatars.githubusercontent.com/u/98959851?s=96&v=4"
					}
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
						{authorName ? authorName : "Taksa Wibawa"}
					</Text>
					<Text
						fontFamily={"sans-serif"}
						fontSize={"xs"}
						color={"gray.500"}
					>
						{createdAt ? createdAt : new Date().toLocaleDateString()} - 5 min
						read
					</Text>
				</VStack>
			</HStack>

			<ReactMarkdown
				components={{
					...ChakraUIRenderer(),
					code: codeHighlighter,
				}}
			>
				{content ? content : initialContent}
			</ReactMarkdown>
		</FlexLayout>
	);
}
