import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Auth from "./Auth";
import { AppContext } from "../contexts/AppContext";

function App() {
  const { user, notes, loading } = useContext(AppContext);

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      <Header />
      <CreateArea />
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading notes...
        </div>
      ) : (
        <div className="notes-wrapper">
          {notes.map((noteItem) => (
            <Note key={noteItem.id} id={noteItem.id} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
