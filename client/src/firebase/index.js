import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAozrjnaxHgVbYQ3VBE2UvqJ_PbhYFLk3M",
  authDomain: "mememonarchv2.firebaseapp.com",
  projectId: "mememonarchv2",
  storageBucket: "mememonarchv2.appspot.com",
  messagingSenderId: "992347804688",
  appId: "1:992347804688:web:238df4ab4daf38a1c32695",
  measurementId: "G-H9RZPB0WRE"
};
 
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };