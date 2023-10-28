import { ArticleSection } from "../components/section/article-section";
import { BaseLayout } from "../layouts";
import { HeroSection } from "../components/section/hero-section";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function HomePage() {
	useChangeDocTitle("Welcome to the Blog");
	return (
		<BaseLayout>
			<HeroSection />
			<ArticleSection />
		</BaseLayout>
	);
}
