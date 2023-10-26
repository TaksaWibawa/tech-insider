import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";

export const APIArticles = {
	getAllArticles: async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "articles"));

			const articlePromises = querySnapshot.docs.map((doc) => {
				const id = doc.id;
				return APIArticles.getArticle(id);
			});

			const resolvedArticles = await Promise.all(articlePromises);

			return resolvedArticles;
		} catch (err) {
			throw new Error(err);
		}
	},

	getArticle: async (articleId) => {
		try {
			const docRef = doc(db, "articles", articleId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const articleData = docSnap.data();
				articleData.id = docSnap.id;

				const authorRef = articleData.authorRef;
				const authorDocSnap = await getDoc(authorRef);

				if (authorDocSnap.exists()) {
					const authorData = authorDocSnap.data();
					articleData.author = authorData;
					delete articleData.authorRef;
				} else {
					articleData.author = {};
					delete articleData.authorRef;
				}

				const thumbnailUrl = await APIArticles.getArticleThumbnail(
					articleData.thumbnail
				);

				if (thumbnailUrl) {
					articleData.thumbnailUrl = thumbnailUrl;
				} else {
					articleData.thumbnailUrl = "";
				}

				if (articleData.created) {
					const created = articleData.created;
					const date = new Date(created.seconds * 1000);
					articleData.created = date.toDateString();
				}

				return articleData;
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	getArticleThumbnail: async (thumbnailName) => {
		try {
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);
			const thumbnailUrl = await getDownloadURL(thumbnailRef);
			return thumbnailUrl;
		} catch (err) {
			throw new Error(err);
		}
	},
};
