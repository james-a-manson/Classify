import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import background from "../../assets/background.png";

const SignUp = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential);
    }).catch((error) => {
        setError(error.message);
        console.log(error);
    });
  }

  return (
    <>
    <div className = "LoginOuter2" style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    width: '100%', 
  }}>
    <div className = "LoginOuter">
      <form onSubmit={signUp}>
     <div className = "LoginElements">

        <h1>Create Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
        <span>Have an account already? <span
                style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={toggleAuthMode}
              >
                Log In
              </span></span>
        </div>

      </form>
      </div>
          </div>
    </>
  );
};

export default SignUp;
