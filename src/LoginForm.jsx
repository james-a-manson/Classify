import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'

export default function Login() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`username ${username}\nPassword ${password}`)
  }

  return (
    <>
    <h1>
      Login
    </h1>
    <form onSubmit={handleSubmit}>
      <div className = "LoginElements">
      <label>Username:
        <input 
          type="text" 
          value={username}
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
    </>
  )
}