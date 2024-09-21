import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./Streaks.css";
import firePNG from "./assets/fire.png";

import { db } from "./firebase";
import { query, getDoc, collection, where, onSnapshot, snapshotEqual } from "firebase/firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Streaks(props) {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };

  }, []);


useEffect(() => {
  if (currentUser) {
    const colRef = collection(db, 'students');
    const q = query(colRef, where('student_email', '==', currentUser.email)); 

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const currentUserData = [];
      snapshot.docs.forEach((doc) => {
        currentUserData.push({ ...doc.data(), id: doc.id });
      });
      setCurrentUserData(currentUserData); 
    });

    return () => unsubscribeSnapshot();
  }
}, [currentUser]);

  return (
    <div>
      <h1 id="Phrase">Your streak count:</h1>
      <h1 id="Number">{props.streak}</h1>
      <img src={firePNG} alt=":fire emoji:"></img>
    </div>
  );
}

Streaks.defaultProps = {
  streak: "Streak value not found"
}
