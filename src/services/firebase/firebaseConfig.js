import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjsBpk_xd_St_eSe-a90KwQNPbiCR_-jo",
  authDomain: "fireox-eb715.firebaseapp.com",
  projectId: "fireox-eb715",
  storageBucket: "fireox-eb715.appspot.com",
  messagingSenderId: "555681196734",
  appId: "1:555681196734:web:87d175759576f719abccef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreInstance = () => {
  return getFirestore(app);
};
export const storage = getStorage(app);
//Initialize Firestore
export const db = getFirestore(app)