import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyASP3MFv2666fh7iUz1kaWDTdVPyJNCWuU",
  authDomain: "psb-portal.firebaseapp.com",
  databaseURL: "https://psb-portal-default-rtdb.firebaseio.com",
  projectId: "psb-portal",
  storageBucket: "psb-portal.appspot.com",
  messagingSenderId: "748405053842",
  appId: "1:748405053842:web:045d9864307d5d7f4e894b",
  measurementId: "G-6L9GQ9BCP0"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
if (typeof window !== 'undefined') {
    auth.settings.appVerificationDisabledForTesting = true;
  }