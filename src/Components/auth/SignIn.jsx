import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import background from "../../assets/background.png";

const SignIn = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="LoginOuter2" style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // or a specific height
    width: '100%', // ensure it spans the width
    margin:0
  }}>
        <div className="LoginOuter">
          <form onSubmit={signIn}>
            <div className="LoginElements">
              <h1>Log In</h1>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
              <span>Don't have an Account? <span
                style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={toggleAuthMode}
              >
                Register
              </span></span>
              
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default SignIn;
