import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedNote(prev => ({ ...prev, [name]: value }));
  }

  function handleUpdate() {
    props.onUpdate(props.id, updatedNote);
    setIsEditing(false);
  }

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
          <h1>{props.title}</h1>
          <p>{props.content}</p>
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
