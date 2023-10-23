import { ArticleForm } from "../components/form/create-article";
import { ButtonGroup } from "@chakra-ui/react";
import { ButtonOutlinePrimary } from "../components/button";
import { FlexLayout } from "../layouts";
import { MarkdownPreview } from "../components/markdown/markdown-previewer";
import { useDispatch, useSelector } from "react-redux";
import {
	publishArticle,
	resetArticleData,
	togglePreview,
	updateArticleData,
} from "../store/article";
import { useEffect } from "react";

export default function CreateArticlePage() {
	const isPreview = useSelector((state) => state.article.isPreview);
	const formData = useSelector((state) => state.article.formData);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(resetArticleData());
		};
	}, [dispatch]);

	const handlePreview = () => {
		dispatch(togglePreview());
	};

	const handleSubmit = () => {
		dispatch(publishArticle());
	};

	const handleChange = (formData) => {
		dispatch(updateArticleData(formData));
	};

	return (
		<FlexLayout
			as="section"
			flexDir={"column"}
			justifyContent={"flex-start"}
			py={10}
			px={"20px"}
		>
			<ButtonGroup
				display="flex"
				justifyContent="flex-end"
			>
				<ButtonOutlinePrimary
					size="sm"
					type="button"
					onClick={() => handlePreview()}
				>
					{isPreview ? "Edit" : "Preview"}
				</ButtonOutlinePrimary>
			</ButtonGroup>
			{isPreview ? (
				<MarkdownPreview />
			) : (
				<ArticleForm
					formData={formData}
					onFormChange={handleChange}
					onSubmit={handleSubmit}
				/>
			)}
		</FlexLayout>
	);
}
