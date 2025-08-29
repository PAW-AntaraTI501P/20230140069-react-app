// src/components/TodoItem.js

import React, { useState } from "react";

const TodoItem = ({ index, todo, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim() !== "") {
      onUpdateTodo(todo.id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(todo.task);
    setIsEditing(false);
  };

  return (
    <tr>
      <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
        {index}
      </td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        ) : (
          todo.task
        )}
      </td>
      <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
        {todo.completed ? "Selesai" : "Belum Selesai"}
      </td>
      <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                marginRight: "5px",
                backgroundColor: "lightgreen",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Simpan
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "salmon",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Batal
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              style={{
                marginRight: "5px",
                backgroundColor: "#61dafb",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onToggleCompleted(todo.id, todo.completed)}
              style={{
                marginRight: "5px",
                backgroundColor: todo.completed ? "orange" : "lightgreen",
                border: "none",
                padding: "5px 10px",
              }}
            >
              {todo.completed ? "Belum Selesai" : "Selesai"}
            </button>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              style={{
                backgroundColor: "tomato",
                border: "none",
                padding: "5px 10px",
                color: "white",
              }}
            >
              Hapus
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;