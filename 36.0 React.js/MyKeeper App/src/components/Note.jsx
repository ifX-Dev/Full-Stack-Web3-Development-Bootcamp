import { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { AppContext } from "../contexts/AppContext";

function Note({ id }) {
  const { notes, deleteNote, updateNote } = useContext(AppContext);
  const note = notes.find((n) => n.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({
    title: note?.title || "",
    content: note?.content || ""
  });

  function handleDelete() {
    deleteNote(id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedNote(prev => ({ ...prev, [name]: value }));
  }

  function handleUpdate() {
    updateNote(id, updatedNote);
    setIsEditing(false);
  }

  if (!note) return null;

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            name="title"
            value={updatedNote.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            value={updatedNote.content}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>
            <DoneIcon />
          </button>
        </>
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={handleEdit}>
            <EditIcon />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
