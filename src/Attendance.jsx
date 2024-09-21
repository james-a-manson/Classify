import React, {useState, useEffect} from "react";
import Header from "./Components/Header";
import "./Attendance.css";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import {getAuth} from "firebase/auth";


export default function Attendance() {
  const [attended, setAttended] = useState("");
  const [missed, setMissed] = useState("");
  const [score, setScore] = useState(null);
  const [streak, setStreak] = useState(null);
  const [userDocumentID, setUserDocumentID] = useState(null);
  
  const auth = getAuth(); //getAuth() is an inbuilt firebase function.
  //It returns the authentication 'instance' that firebase uses.
  //We store this instance into the variable, 'auth'. 
  //We can now use 'auth' to interact with all the firebase authentication features.
  const userEmail = auth.currentUser ? auth.currentUser.email : null;
  //auth.currentUser grabs the 'currentUser' property from auth.
  //this property holds the currently signed-in user's object if they are authenticated.
  //else, it will be null if there is no currently authenticated user
  //So, if auth.currentUser is true, someone is logged in.
  //As such, userEmail = auth.currentUser.email which grabs the email property from the currentUser object.
  //Else, userEmail is set to null.

  useEffect (() => { //Declares a side effect that runs when the component is rendered.
    const fetchUserDocument = async () => { //async lets you use await in the function
    //Using => function syntax. Empty () means no parameters. fetchUserDocument is a function.

      if (!userEmail) {
        setUserDocumentID(null);
        return;
      }
      //If userEmail was set null before, it sets the document ID's state to null too and exits.

      const studentsCollection = collection(db, 'students');
      //the collection() function accesses our firestore collection called 'students'.
      //Stores this collection into my variable called studentsCollection.
      const q = query(studentsCollection, where("student_email", "==", userEmail));
      //Creates a query from the students collection, storing the query in variable, 'q'.
      //The query is looking for when field, student_email, is equal to userEmail.
      const querySnapshot = await getDocs(q);
      //The getDocs() function sends a query to the database, hence the 'q' argument being given.
      //We store the result in the variable 'querySnapshot'.
      //It contains all the *documents* that matched the query.

      if (!querySnapshot.empty) {
        const userScoreDoc = querySnapshot.docs[0];
        //If the snapshot wasn't empty, it stores the first matching document into userScoreDoc.

        setStreak(userScoreDoc.data().streak); 

        setUserDocumentID(userScoreDoc.id); 
        //Our userDocumentID state is meant to hold the DOCUMENT's unique firebase ID thing.
        //.id is a built in property for any document snapshot.
      } else {
        setUserDocumentID(null);
        //If the query snapshot was empty, we set the document ID to null.
      }
    };

    fetchUserDocument();
    //All of the above code was the fetchUserDocument() definition.
    //This actually calls it now.
  }, [userEmail]);
  //This last part defines our useEffect() to run whenever userEmail changes.
  //So, this whole effect is finding the document that matches our user's email,
  //then storing that document's ID into our userDocumentID useState for later use.

  const handleSubmit = async (event) => { 
  //Declare an asynchronous function which will be used when button is pressed.
    event.preventDefault(); //Prevent default page reload
    const attendedNum = parseInt(attended) || 0; //praseInt is needed here, even though the submit type="number", it's still saved as a string
    const missedNum = parseInt(missed) || 0;
    
    if (attendedNum < 0 || missedNum < 0) { //Cheese, if inputs are negative (illegal),
      setScore(-999);                       //set the score state/variable to -999 and exit.
      return;                               //It exits so that nothing is saved or changed.
    } 

    if (missedNum > 0) {
      setStreak(0);
    } else {
      setStreak(prevStreak => (prevStreak || 0) + attendedNum);
    }

    let points;

    if ((attendedNum > 0 && missedNum === 0) || (attendedNum === 0 && missedNum > 0)) {
      points = (attendedNum - missedNum) * 2;
    } else {
      points = attendedNum - missed;
    }

    setScore(points);      //Store into our useState variable.


    const newStreak = missedNum > 0 ? 0 : (streak || 0) + attendedNum;

    try {
      if (userDocumentID) { //If a document ID exists in userDocumentID...
        const docRef = doc(db, 'students', userDocumentID);
        //doc() returns the document instance matching our parameters.
        //We've given it the db instance, the collection name, and the exact document ID we want.
        //We store this document into docRef.

        await updateDoc(docRef, { //Uses updateDoc() function to update the specified document
          streak: newStreak,
          score: points,
          student_email: userEmail
        });
        //console.log("Score updated successfully!");
      } else { //If userDocumentID is nulL, meaning no existing document was found...
        const studentsCollection = collection(db, 'students');
        //This was defined and used earlier in the effect hook, but its scope was limited to that.
        const newDocRef = await addDoc(studentsCollection, {  //Uses addDoc() function to add a document
          streak: streak,                                   //in our specified collection                                //Also saves this new document into newDocRef.
          score: points,
          student_email: userEmail
        });
        setUserDocumentID(newDocRef.id); 
        //After creating a new document for a new user, set the document ID useState to this new document.
        //This is essential, otherwise the documentID useState is never updated,
        //and further submissions will keep creating new documents.
      }
    } catch (error) {
      console.error("Error saving/updating score: ", error);
    }
  };

  //This section handles the actual rendering for the Attendance component.
  return (
    <div className = "attendance">
      <h1>How many classes did you attend or miss today?</h1>
      <form onSubmit={handleSubmit}>
      <div className = "LoginElements">
      <label>Attended:
        <input 
          type="number"
          value={attended} //Binds the input field's value to the attended useState variable.
          onChange={(e) => setAttended(e.target.value)} 
          //onChange event handler. 'e' is the event object being created because of this event handler.
          //e.target refers to the specific DOM element that triggered this event. 
          //In our case, it's the input field being changed.
          //Finally e.target.value grabs the value of this input field, storing it via setAttended().

        />
      </label>
      <label>Missed:
        <input 
          type="number" 
          value={missed}
          onChange={(e) => setMissed(e.target.value)}
        />
      </label>
      <input type="submit" />
      </div>
    </form>
    {score !== null && ( //Uses wack && operator where if score is not null, then it does the following
    <h2>
        {(() => {
            if (score === -999) {
                return `You can't have negative inputs.`;
            } else if (score < 0) {
                return `Lost points! ${score}`;
            } else if (score > 0) {
                return `Gained points! ${score}`;
            } else {
                return `Bruh nothing happened`;
            }
        })()}
    </h2>
    )}

    </div>
  );
};

