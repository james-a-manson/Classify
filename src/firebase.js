// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//this function is to retrieve data from the database
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZetVJ7uJTas3LutVgoxaxImsg_tZd-Ek",
  authDomain: "jamdonuts-hackathon.firebaseapp.com",
  projectId: "jamdonuts-hackathon",
  storageBucket: "jamdonuts-hackathon.appspot.com",
  messagingSenderId: "536200443741",
  appId: "1:536200443741:web:b29f20f19b808440ec9ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }; 


//database retrieval things
export const db = getFirestore()

// const colref = collection(db, 'students')

// let students = [];
// getDocs(colref)
//   .then((snapshot) => {
    
//     snapshot.docs.forEach((doc) => {
//       students.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(students)
//   });
