// src/components/TodoList.js

import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  if (todos.length === 0) {
    return <p>Tidak ada tugas yang ditemukan. Silakan tambahkan satu.</p>;
  }

    return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>No</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Tugas</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index + 1}
            todo={todo}
            onToggleCompleted={onToggleCompleted}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </tbody>
    </table>
  );
};


export default TodoList;