import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from "react-router-dom";

import './App.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`username ${username}\nPassword ${password}`)
  }

  return (
    
    
    <div className = "LoginOuter">
    <h1>
      Login
    </h1>
    <form onSubmit={handleSubmit}>
      <div className = "LoginElements">
      <label>Username:
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      
      <label>Password:
        <input 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" />
      </div>
    </form>
    </div>

  )
}