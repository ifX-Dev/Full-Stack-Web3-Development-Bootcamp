import { createContext, useState, useEffect } from "react";
import asyncFetch, { asyncWrapper } from "../libs/utils/asyncFetch";

const AppContext = createContext();
const API_URL = "http://localhost:4000";

const AppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch notes from json-server on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) throw new Error("Failed to fetch notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
    asyncWrapper(async () => {
      const response = await asyncFetch(`${API_URL}/notes`, "POST", newNote);
      if (!response.ok) throw new Error("Failed to add note");
      const createdNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, createdNote]);
    });
  };

  const deleteNote = async (id) => {
    asyncWrapper(async () => {
      const response = await asyncFetch(`${API_URL}/notes/${id}`, "DELETE");
      if (!response.ok) throw new Error("Failed to delete note");
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    });
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) throw new Error("Failed to update note");
      const updated = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updated : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = JSON.parse(atob(base64));
    console.log("Decoded user:", decodedData);
    setUser(decodedData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateNote,
        user,
        setUser,
        handleLogin,
        handleLogout,
        loading,
        fetchNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
