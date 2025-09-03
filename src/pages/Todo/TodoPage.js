// src/pages/TodoPage.js

import React, { useState, useEffect, useCallback } from "react";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";
import TodoForm from "../../components/TodoForm.js"; 
//import axios from "axios";// ✅ Tambahkan import komponen form

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchTodos = useCallback(
    (searchQuery) => {
      setLoading(true);
      const url = searchQuery
        ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
        : "/api/todos";

      fetch(url, { headers: getAuthHeaders() })
        .then((response) => {
          if (response.status === 401) {
            throw new Error("Anda harus login untuk mengakses halaman ini.");
          }
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTodos(data.todos);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setTodos([]);
        })
        .finally(() => setLoading(false));
    },
    [] // ✅ Mengubah dependency array menjadi kosong
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  // ✅ Fungsi ini akan dipanggil dari TodoForm
  const handleAddTodo = (task) => {
    fetch("/api/todos", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, { id: data.id, task: data.task, completed: false }]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleUpdateTodo = (id, newTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ task: newTask }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task: newTask } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ marginBottom: "15px" }}>Manajemen Tugas</h1>
        
        {/* ✅ Ganti tombol prompt dengan komponen TodoForm */}
        <TodoForm onAddTodo={handleAddTodo} />

        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <TodoList
        todos={todos}
        onToggleCompleted={handleToggleCompleted}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
};

export default TodoPage;