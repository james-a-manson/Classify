import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import background from "../../assets/background.png";

const SignIn = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        switch (error.message) {
            case 'Firebase: Error (auth/invalid-credential).':
                setError('Incorrect email or password');
                break;
            case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
                setError('Too many attempts, try again later');
                break;
            default:
                setError(error.message);
                break;
        }
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
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
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
