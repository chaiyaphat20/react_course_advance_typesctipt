import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../configs/firebase";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    //register user to firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //save user profile  to firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName,
      photoUrl: "https://codingthailand.com/site/img/nopic.png",
      role: "member",
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
