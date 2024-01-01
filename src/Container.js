// Container.jsx
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Todo from "./todo";  // Assuming Todo component is in the same directory
import useClipboard from "react-use-clipboard";
import "./App.css";
import Header from './Header';

function Container(props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isCopied, setCopied] = useClipboard(transcript);
  const [notes, setNotes] = useState([]);
  const name = props.data.name;
  const [user, setUser] = useState(null);

  const startListening = () => {
    resetTranscript(); // Clear the transcript when starting a new speech recognition session
    SpeechRecognition.startListening({ continuous: true });
  };

  const saveNote = async () => {
    if (transcript.trim() !== "") {
      const newNote = { note: transcript };

      try {
        const response = await fetch("http://localhost:3000/saveNote", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            note: newNote.note,
          }),
        });

        if (response.ok) {
          // Update state only after successfully saving to the server
          setNotes((prevNotes) => [...prevNotes, newNote]);
          resetTranscript(); // Clear the transcript after saving
          localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
        } else {
          console.error("Failed to save note to the server");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getNotes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });

        if(response.length==0){
          return 0;
        }

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    // Cleanup speech recognition when component unmounts
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [name,notes]); // Include name in the dependency array to fetch data when name changes

  return (
    <div className="App">
      <div className="container">
        <Header name={props.data.name}/>
        <h1>Welcome {props.data.name}</h1>
        <h2> speech Notes taking app</h2>
        <br />
        <p>A react hook that converts speech from the microphone to text components.</p>
        <p>speak anything</p>

        <div className="live-transcript">
          <p>Live Transcript: {transcript}</p>
        </div>

        {user ? (
          <div className="main-content">
            {user.notes.map((note, index) => (
              <Todo key={index} index={index} note={note} setNotes={setNotes} name={props.data.name}/>
            ))}
          </div>
        ) : (
          <h3>There is no user found</h3>
        )}

        <div className="btn-style">
          <button onClick={startListening}>Start listening</button>
          <button onClick={() => SpeechRecognition.stopListening()}>Stop listening</button>
          <button onClick={saveNote}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Container;
