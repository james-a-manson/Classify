import { useState } from "react";
import reactLogo from "./assets/react.svg"; //delete these two later, not needed anymore
import viteLogo from "/vite.svg"; //also delete the logo files themselves
import Header from "./components/Header";
import Leaderboard from "./Leaderboard";
import Login from "./LoginForm";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
