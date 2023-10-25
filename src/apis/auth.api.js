import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { authService } from "../config/auth";

export const APIAuth = {
	login: async ({ email, password }) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await result.user.getIdToken();
			const refreshToken = result.user.refreshToken;
			authService.storeCredentialsToCookie({ idToken, refreshToken });

			const data = {
				uid: result.user.uid,
				email: result.user.email,
				displayName: result.user.displayName,
				photoURL: result.user.photoURL,
			};

			return data;
		} catch (err) {
			throw new Error(err);
		}
	},
};
