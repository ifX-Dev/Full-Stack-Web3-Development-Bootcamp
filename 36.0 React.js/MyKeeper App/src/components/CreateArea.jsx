import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { AppContext } from "../contexts/AppContext";

function CreateArea() {
  const { addNote } = useContext(AppContext);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    addNote(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  const [isClicked, setIsClicked] = React.useState(false);

  function handleClick() {
    setIsClicked(true);
  }

  return (
    <div>
      <form className="create-note">
        {isClicked && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isClicked ? "3" : "1"}
        />
        <Zoom in={isClicked && true}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
