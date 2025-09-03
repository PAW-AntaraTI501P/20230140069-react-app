// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa data pengguna di local storage saat komponen dimuat
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    // Menghapus token dan data pengguna dari local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Anda telah logout.");
    navigate("/login"); // Mengarahkan ke halaman login
  };

  // Gaya untuk kontainer halaman utama
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#282c34", // Warna latar belakang gelap
    color: "white", // Warna teks putih
    fontFamily: "sans-serif",
  };

  // Gaya untuk tombol
  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#61dafb", // Warna biru terang
    color: "#282c34", // Warna teks gelap untuk tombol
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none", // Menghilangkan garis bawah pada tautan
  };

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>

      {user ? (
        // ✅ Tampilan saat pengguna sudah login
        // Ini tidak akan muncul jika Anda belum login
        <div>
          <h2>Selamat Datang, {user.name || user.email}!</h2>
          <div style={{ marginTop: '20px' }}>
            <Link to="/todos" style={buttonStyle}>
              Lihat Daftar Todo
            </Link>
            <button onClick={handleLogout} style={{ ...buttonStyle, marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        // ✅ Tampilan saat pengguna BELUM login (yang Anda inginkan)
        <div style={{ marginTop: '20px' }}>
          <Link to="/todos" style={buttonStyle}>
            Lihat Daftar Todo
          </Link>
          <Link to="/register" style={{ ...buttonStyle, marginLeft: '10px' }}>
            Register
          </Link>
          <Link to="/login" style={{ ...buttonStyle, marginLeft: '10px' }}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;