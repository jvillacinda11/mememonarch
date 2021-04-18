import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyA7Vqg4kbQTB_MofCqzZTSnwtsmB9jvbNE",
  // authDomain: "mememonarch-de8e2.firebaseapp.com",
  // projectId: "mememonarch-de8e2",
  // storageBucket: "mememonarch-de8e2.appspot.com",
  // messagingSenderId: "413758978445",
  // appId: "1:413758978445:web:48d88db471dcf45f70a5c4",
  // measurementId: "G-31B6DC0HGP"
  apiKey: "AIzaSyCi5B1WAjk0kS0wERbE_30pwrLlGX3-Hz0",
  authDomain: "fir-react-upload-2.firebaseapp.com",
  projectId: "fir-react-upload-2",
  storageBucket: "fir-react-upload-2.appspot.com",
  messagingSenderId: "627843010163",
  appId: "1:627843010163:web:94f3fd74ad022bae19e406",
  measurementId: "G-RC2WX8B7DB"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };