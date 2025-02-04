// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqQDqxevp_KODvfUBpH6QOjEPY3rgU-Jw",
  authDomain: "fir-training-anderson.firebaseapp.com",
  projectId: "fir-training-anderson",
  storageBucket: "fir-training-anderson.firebasestorage.app",
  messagingSenderId: "1008272863438",
  appId: "1:1008272863438:web:0ba3d45a3492d0be65209f",
  measurementId: "G-XYB7X8BMNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Multiple tabs open, persistence can only be enabled in one tab.");
  } else if (err.code === "unimplemented") {
    console.log("The current browser does not support offline persistence.");
  }
});


export { app, db};
