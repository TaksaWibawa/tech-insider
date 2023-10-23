/* eslint-disable react/prop-types */
import { forwardRef, useEffect } from "react";
import {
	css,
	FormControl,
	FormLabel,
	Textarea,
	VisuallyHidden,
} from "@chakra-ui/react";

const editorStyles = {
	border: "none",
	boxShadow: "none",
	resize: "none",
	fontSize: "16px",
	lineHeight: "1.5",
	padding: "0",
};

const textAreaStyles = {
	padding: "20px",
	border: "none",
	boxShadow: "none",
	fontSize: "16px",
	lineHeight: "1.5",
	width: "100%",
	background: "transparent",
	resize: "none",
	outline: "none",
	overflow: "hidden",
};

export const MarkdownEditor = forwardRef(
	({ content, onContentChange, ...styles }, ref) => {
		const textareaRef = ref;

		useEffect(() => {
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			}
		}, [content, textareaRef]);

		return (
			<FormControl
				id="content"
				css={css(editorStyles)}
			>
				<VisuallyHidden>
					<FormLabel>Content</FormLabel>
				</VisuallyHidden>
				<Textarea
					ref={(el) => {
						textareaRef.current = el;
					}}
					_focus={{ boxShadow: "#00000033 0px 0px 0px 1px" }}
					_placeholder={{ color: "gray.500" }}
					css={css(textAreaStyles)}
					onChange={(e) => onContentChange(e.target.value)}
					placeholder="Write your stories here..."
					rows={10}
					value={content}
					onKeyDown={(e) => {
						if (e.key === "Tab") {
							e.preventDefault();
							const start = e.target.selectionStart;
							const end = e.target.selectionEnd;
							e.target.value =
								e.target.value.substring(0, start) +
								"\t" +
								e.target.value.substring(end);
							e.target.selectionStart = e.target.selectionEnd = start + 1;
						}
					}}
					{...styles}
				/>
			</FormControl>
		);
	}
);

MarkdownEditor.displayName = "MarkdownEditor";
