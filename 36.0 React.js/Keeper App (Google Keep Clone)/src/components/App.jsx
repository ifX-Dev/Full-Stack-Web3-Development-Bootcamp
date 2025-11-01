import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Auth from "./Auth";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null); // store logged-in user

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  }

  function updateNote(id, updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) => (index === id ? updatedNote : note))
    );
  }

  function handleLogin(credentialResponse) {
    // decode the credential to get user info (e.g., name, email)
    const token = credentialResponse.credential;

    // decode JWT token to get user info
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = JSON.parse(atob(base64));

    console.log("Decoded user:", decodedData);
    setUser(decodedData); // store user info
  }

  function handleLogout() {
    setUser(null);
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
