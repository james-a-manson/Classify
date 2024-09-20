import { useState } from "react";
import reactLogo from "./assets/react.svg"; //delete these two later, not needed anymore
import viteLogo from "/vite.svg"; //also delete the logo files themselves
import Header from "./components/Header";
import Leaderboard from "./Leaderboard";
import Login from "./LoginForm";
import Streaks from "./Streaks";

import "./App.css";
import AuthDetails from "./components/AuthDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Streaks streak={49}/>
      <AuthDetails />
    </>
  );
}

export default App;
