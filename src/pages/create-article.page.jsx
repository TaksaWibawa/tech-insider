import { ArticleForm } from "@/components/form/create-article";
import { ButtonGroup, useToast } from "@chakra-ui/react";
import { ButtonOutlinePrimary } from "@/components/button";
import { BaseLayout, FlexLayout } from "@/layouts";
import { useDispatch, useSelector } from "react-redux";
import {
	resetArticleData,
	selectPreviewArticle,
	togglePreview,
	updateArticleData,
} from "@/store/articles/previewArticle";
import { useEffect, useState } from "react";
import { PreviewSection } from "@/components/section/preview-section";
import { currentUser } from "@/store/users/manageUser";
import { addArticle, getAddArticle } from "@/store/articles/addArticle";
import { useChangeDocTitle } from "@/hooks/useChangeDocTitle";
import { SuccessModal } from "@/components/modal/success-modal";
import { useNavigate } from "react-router-dom";
import { FailedModal } from "@/components/modal/failed-modal";

export default function CreateArticlePage() {
	useChangeDocTitle("Create Your Article");
	const [showAlert, setShowAlert] = useState(false);

	const { isPreview, formData } = useSelector(selectPreviewArticle);
	const { status, message } = useSelector(getAddArticle);
	const dispatch = useDispatch();
	const user = useSelector(currentUser);

	const navigate = useNavigate();
	const toast = useToast();

	const previewData = {
		author: user,
		...formData,
	};

	useEffect(() => {
		if (status === "success") {
			setShowAlert(true);
		}
	}, [status]);

	useEffect(() => {
		return () => {
			dispatch(resetArticleData());
		};
	}, [dispatch]);

	const handleCloseModal = () => {
		if (status === "success") {
			setShowAlert(false);
			navigate("/");
		}
	};

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
		<BaseLayout>
			<FlexLayout
				as="section"
				flexDir={"column"}
				justifyContent={"flex-start"}
				py={10}
			>
				{showAlert && status === "success" && (
					<SuccessModal
						title="Article Published"
						description={message}
						isOpen={showAlert}
						onClose={() => handleCloseModal()}
					/>
				)}

				{showAlert && status === "error" && (
					<FailedModal
						title="Failed to Publish Article"
						description={message}
						isOpen={showAlert}
						onClose={() => setShowAlert(false)}
					/>
				)}

				{status === "loading" &&
					toast({
						title: "Publishing Article",
						description: "Please wait a moment",
						status: "info",
						duration: 2000,
						isClosable: true,
						position: "top-right",
					})}

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
		</BaseLayout>
	);
}
