import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthDetails = () => {
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
    }
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
        console.log("User signed out");
    }).catch((error) => {
        console.log(error);
    });
  }
  return (
    <>
      {authUser ? (
        <>
          <p>Signed In as {authUser.email}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </>
  );
};

export default AuthDetails;
