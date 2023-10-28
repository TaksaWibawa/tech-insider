import { auth, db } from "../config/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from "@firebase/auth";
import { authService } from "../config/auth";
import { doc, setDoc } from "@firebase/firestore";
import { APIProfile } from "./profile.api";

export const APIAuth = {
	login: async ({ email, password }) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await result.user.getIdToken();
			const refreshToken = result.user.refreshToken;
			authService.storeCredentialsToCookie({ idToken, refreshToken });

			const userDoc = await APIProfile.getUserProfile(result.user.uid);

			const data = {
				uid: result.user.uid,
				email: result.user.email,
				displayName: result.user.displayName,
				photoURL: result.user.photoURL,
				...userDoc,
			};

			return data;
		} catch (err) {
			throw new Error(err);
		}
	},

	register: async ({ firstName, lastName, username, email, password }) => {
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = result.user;

			// update profile in firestore
			const data = {
				email: email,
				displayName: username,
				photoURL: `https://ui-avatars.com/api/?name=${username}`,
				firstName: firstName,
				lastName: lastName,
				age: null,
				bio: "",
			};

			// update profile in auth
			await updateProfile(user, {
				displayName: data.displayName,
				photoURL: data.photoURL,
			});

			// add user to database
			await setDoc(doc(db, "users", user.uid), data);

			return "Successfully registered!";
		} catch (err) {
			throw new Error(err);
		}
	},
};
