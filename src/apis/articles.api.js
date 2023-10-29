import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "@/config/firebase";
import { v4 as uuid } from "uuid";

export const APIArticles = {
	getArticles: async () => {
		try {
			// get all articles
			const q = query(collection(db, "articles"));
			const querySnapshot = await getDocs(q);

			// map all articles to get article data
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
			// get article data based on articleId
			const docRef = doc(db, "articles", articleId);
			const docSnap = await getDoc(docRef);

			// if article exists, get article data
			if (docSnap.exists()) {
				const articleData = docSnap.data();
				articleData.id = docSnap.id;

				// get author data based on authorRef
				const authorRef = articleData.authorRef;
				const authorDocSnap = await getDoc(authorRef);

				// if author exists, get author data
				if (!authorDocSnap.exists()) throw new Error("Author does not exist");
				const authorData = authorDocSnap.data();
				articleData.author = authorData;
				delete articleData.authorRef;

				// create created date
				if (!articleData.created) throw new Error("Created date is required");
				const created = articleData.created;
				const date = new Date(created.seconds * 1000);
				articleData.created = date.toDateString();

				return articleData;
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	getArticlesByAuthor: async (authorId) => {
		try {
			// get authorRef based on authorId
			const authorRef = doc(db, "users", authorId);
			const authorDocSnap = await getDoc(authorRef);

			// get articles based on authorId
			if (!authorDocSnap.exists()) throw new Error("Author does not exist");
			const q = query(
				collection(db, "articles"),
				where("authorRef", "==", authorRef)
			);

			// get all articles based on authorRef
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) throw new Error("No articles found");

			// map all articles to get article data
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

	getArticleThumbnail: async (thumbnailName) => {
		try {
			// get thumbnail url based on thumbnailName
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);
			const thumbnailUrl = await getDownloadURL(thumbnailRef);
			return thumbnailUrl;
		} catch (err) {
			throw new Error(err);
		}
	},

	addArticle: async (articleData) => {
		try {
			// add authorRef for reference of author
			const { uid } = articleData.author;
			const authorRef = doc(db, "users", uid);
			articleData.authorRef = authorRef;

			// delete author property
			delete articleData.author;

			// add when article is created
			articleData.created = serverTimestamp();

			// get thumbnailUrl
			if (!articleData.thumbnail) throw new Error("Thumbnail is required");
			const thumbnailUrl = await APIArticles.addArticleThumbnail(
				articleData.thumbnail
			);
			articleData.thumbnailUrl = thumbnailUrl;

			// delete thumbnail property
			delete articleData.thumbnail;

			// add article to firestore
			await addDoc(collection(db, "articles"), articleData);

			// return success message
			return "Article added successfully";
		} catch (err) {
			throw new Error(err);
		}
	},

	addArticleThumbnail: async (thumbnail) => {
		try {
			// give thumbnail a unique name
			const thumbnailName = `${uuid(10)}_${thumbnail.name}`;
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);

			// upload thumbnail to storage
			const uploadThumbnail = await uploadBytesResumable(
				thumbnailRef,
				thumbnail
			);

			// get thumbnail url
			const snapshot = await uploadThumbnail.task;
			const thumbnailUrl = await getDownloadURL(snapshot.ref);

			return thumbnailUrl;
		} catch (err) {
			throw new Error(err);
		}
	},

	deleteArticleById: async (articleId) => {
		try {
			// delete thumbnail based on articleId
			const articleData = await APIArticles.getArticle(articleId);
			const thumbnailUrl = articleData.thumbnailUrl;
			await APIArticles.deleteThumbnailByUrl(thumbnailUrl);

			// get article data based on articleId
			const docRef = doc(db, "articles", articleId);
			const docSnap = await getDoc(docRef);

			// if article exists, delete article
			if (docSnap.exists()) {
				await deleteDoc(docRef);
				return "Article deleted successfully";
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	deleteThumbnailByUrl: async (thumbnailUrl) => {
		try {
			// get thumbnailName based on thumbnailUrl
			const startIndex = thumbnailUrl.indexOf("thumbnails%2F");
			const endIndex = thumbnailUrl.indexOf("?");
			const thumbnailName = thumbnailUrl.substring(startIndex + 13, endIndex);

			// delete thumbnail based on thumbnailName
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);

			if (!thumbnailRef) throw new Error("Thumbnail does not exist");

			await deleteObject(thumbnailRef);
			return "Thumbnail deleted successfully";
		} catch (err) {
			throw new Error(err);
		}
	},
};
