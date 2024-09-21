import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import reactLogo from "./assets/react.svg"; //delete these two later, not needed anymore
import viteLogo from "/vite.svg"; //also delete the logo files themselves
import Header from "./Components/Header";
import Leaderboard from "./Leaderboard";
import Login from "./LoginForm";
import Streaks from "./Streaks";
import "./App.css";
import AuthDetails from "./components/AuthDetails";
import Attendance from "./Attendance";
import {  signOut } from "firebase/auth";


function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {authUser ? (
        <>
        <p>Signed In as {authUser.email}</p>
        <button onClick={userSignOut}>Sign Out</button>
        <Header />
        <div className = "outerContainer">
        <Leaderboard/>
        <Attendance/>
        <Streaks/>
        </div>
        </>
      ) : (
        <AuthDetails />
      )}
    </>
  );
}

export default App;
