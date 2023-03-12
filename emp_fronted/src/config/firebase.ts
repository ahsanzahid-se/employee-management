import {getStorage} from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRiazHYlc3NWylZZdAUl_-Gkub9Qzs5_Y",
  authDomain: "receeve-ahsan.firebaseapp.com",
  projectId: "receeve-ahsan",
  storageBucket: "receeve-ahsan.appspot.com",
  messagingSenderId: "51417617791",
  appId: "1:51417617791:web:7db0b863362594eefaf64a",
  measurementId: "G-38PK20LH4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage }