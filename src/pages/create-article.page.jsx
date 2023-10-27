import { ArticleForm } from "../components/form/create-article";
import { Alert, ButtonGroup } from "@chakra-ui/react";
import { ButtonOutlinePrimary } from "../components/button";
import { FlexLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import {
	resetArticleData,
	selectPreviewArticle,
	togglePreview,
	updateArticleData,
} from "../store/articles/previewArticle";
import { useEffect } from "react";
import { PreviewSection } from "../components/section/preview-section";
import { currentUser } from "../store/users/manageUser";
import { addArticle, getAddArticle } from "../store/articles/addArticle";

export default function CreateArticlePage() {
	const { isPreview, formData } = useSelector(selectPreviewArticle);
	const { status, message } = useSelector(getAddArticle);
	const dispatch = useDispatch();
	const user = useSelector(currentUser);

	const previewData = {
		author: user,
		...formData,
	};

	useEffect(() => {
		return () => {
			dispatch(resetArticleData());
		};
	}, [dispatch]);

	const handlePreview = () => {
		dispatch(togglePreview());
	};

	const handleChange = (formData) => {
		dispatch(updateArticleData(formData));
	};

	const handleSubmit = (articleData) => {
		articleData.author = user;
		dispatch(addArticle(articleData));
	};

	return (
		<FlexLayout
			as="section"
			flexDir={"column"}
			justifyContent={"flex-start"}
			py={10}
		>
			{status === "success" && <Alert status="success">{message}</Alert>}

			{status === "error" && (
				<Alert status="error">{message || "Article not published"}</Alert>
			)}

			{status === "loading" && <Alert status="info">Publishing...</Alert>}

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
				<PreviewSection articleData={previewData} />
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
