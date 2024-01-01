// Todo.js

import React, { useEffect, useState } from 'react';
import './todo.css'; // Import the CSS file;

const Todo = ({ index, note, setNotes, name }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(""); // Initialize with an empty string
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setEditedNote(note.note); // Update the editedNote state when the note prop changes
  }, [note]);

  const handleEditChange = (event) => {
    setEditedNote(event.target.value);
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/editNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          noteId: note._id,
          updatedNote: editedNote,
        }),
      });

      if (response.ok) {
        setNotes((prevNotes) => {
          const newNotes = [...prevNotes];
          newNotes[index] = { ...note, note: editedNote };
          localStorage.setItem('notes', JSON.stringify(newNotes));
          return newNotes;
        });

        setEditing(false);
      } else {
        console.error("Failed to save edited note to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedNote).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  const handleDelete = async () => {
    const response = await fetch("http://localhost:3000/deleteNote", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        noteId: note._id,
      }),
    });
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return newNotes;
    });
    alert("note delete successfully")
  };


  return (
    <div className="todo">
      {isEditing ? (
        <div>
          <input type="text" value={editedNote} onChange={handleEditChange} />
          <button onClick={() => handleEditSave()}>Save</button>
        </div>
      ) : (
        <div>
          <p>{note.note}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleCopy}>Copy</button>
          <button onClick={handleDelete}>Delete</button>
          {isCopied ? <span style={{ color: 'green' }}>Copied!</span> : null}
        </div>
      )}
    </div>
  );
};

export default Todo;
