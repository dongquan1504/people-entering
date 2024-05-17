// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf1PGLPLEmDF3oAy9QYjaDP0OAbCtKHoc",
  authDomain: "ctrlnumberofpentering.firebaseapp.com",
  projectId: "ctrlnumberofpentering",
  storageBucket: "ctrlnumberofpentering.appspot.com",
  messagingSenderId: "188685452002",
  appId: "1:188685452002:web:b87e90ea39df0f950794bb",
  measurementId: "G-R9535913CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;