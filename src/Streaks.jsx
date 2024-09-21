import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import "./Streaks.css";
import firePNG from "./assets/fire.png";
import cryingPNG from "./assets/crying.png";

import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import {getAuth} from "firebase/auth";

export default function Streaks() {

  const [streak, setStreak] = useState(null);

  const auth = getAuth();
  const userEmail = auth.currentUser ? auth.currentUser.email : null;

  useEffect(() => {
    const fetchUserDocument = async () => { 
      if (!userEmail) {
        return;
      }

      const studentsCollection = collection(db, 'students');
      const q = query(studentsCollection, where("student_email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userScoreDoc = querySnapshot.docs[0];
        setStreak(userScoreDoc.data().streak);
      }
    };

    fetchUserDocument();
  }, [userEmail]);

  //rendering section
  return (
    <div className = "streaks">
      <h1 id="Phrase">Your streak count:</h1>
      <h1 id="Number">{streak !== null ? streak : "Loading..."}</h1>
      <img src={streak > 0 ? firePNG : cryingPNG} alt=":emoji:"></img>
    </div>
  );
}

