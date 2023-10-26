import { ArticleForm } from "../components/form/create-article";
import { ButtonGroup } from "@chakra-ui/react";
import { ButtonOutlinePrimary } from "../components/button";
import { FlexLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import {
	publishArticle,
	resetArticleData,
	selectPreviewArticle,
	togglePreview,
	updateArticleData,
} from "../store/articles/previewArticle";
import { useEffect } from "react";
import { PreviewSection } from "../components/section/preview-section";
import { currentUser } from "../store/users/manageUser";

export default function CreateArticlePage() {
	const dispatch = useDispatch();
	const { isPreview, formData } = useSelector(selectPreviewArticle);
	const user = useSelector(currentUser);

	const data = {
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

	const handleSubmit = () => {
		dispatch(publishArticle());
	};

	return (
		<FlexLayout
			as="section"
			flexDir={"column"}
			justifyContent={"flex-start"}
			py={10}
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
				<PreviewSection articleData={data} />
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
