
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyCUjBj-qyMOMm3Ei1zhLXJmw0j0e9ByFcY",
    authDomain: "video-1fcff.firebaseapp.com",
    projectId: "video-1fcff",
    storageBucket: "video-1fcff.appspot.com",
    messagingSenderId: "102626674363",
    appId: "1:102626674363:web:0a95c96c6f743d43324b9e",
    measurementId: "G-Z58G24PZRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;