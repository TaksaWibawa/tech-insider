/* eslint-disable react/prop-types */
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { initialArticleContent } from "@/constant/initialArticleContent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

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

export function MarkdownPreview({ content }) {
	return (
		<ReactMarkdown
			components={{
				...ChakraUIRenderer(),
				code: codeHighlighter,
			}}
		>
			{content ? content : initialArticleContent}
		</ReactMarkdown>
	);
}
