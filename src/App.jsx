import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import reactLogo from "./assets/react.svg"; //delete these two later, not needed anymore
import viteLogo from "/vite.svg"; //also delete the logo files themselves
import Header from "./components/Header";
import Leaderboard from "./Leaderboard";
import Login from "./LoginForm";
import Streaks from "./Streaks";
import "./App.css";
import AuthDetails from "./components/AuthDetails";
import Attendance from "./Attendance";


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

  return (
    <>
      {authUser ? (
        <>
        <h1>Working</h1>
        <Streaks />
        </>
      ) : (
        <AuthDetails />
      )}
        <AuthDetails/>
    </>
  );
}

export default App;
