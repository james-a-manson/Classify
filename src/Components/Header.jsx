import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import firePNG from "../assets/fire.png";

//this will hold the title for each page
function Header(props) {
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
      console.log(props.email);

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
    <header>
      <div className="headerDiv2">
      <img src={firePNG} alt=":fire emoji:"></img>
      <h1>Classify</h1>
      </div>
      <div className = "headerDiv">
      <p>Signed in as: <strong >{props.email}</strong></p>
      <button className="sign-out" onClick={userSignOut}>Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
