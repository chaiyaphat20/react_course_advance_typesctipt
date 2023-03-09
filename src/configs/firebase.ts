import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPld_n6ECp2KOGIroON0pWE1IhQNxz-QM",
  authDomain: "react-app-art.firebaseapp.com",
  projectId: "react-app-art",
  storageBucket: "react-app-art.appspot.com",
  messagingSenderId: "651406130137",
  appId: "1:651406130137:web:bfa0dda96b87a1d819b7c8",
  measurementId: "G-Q90JHRTV1E"
};

export const firebaseApp = initializeApp(firebaseConfig);
