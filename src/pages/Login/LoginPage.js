// src/pages/Login/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import useNavigate dan Link di sini

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // ✅ Tambahkan state untuk error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Hapus error sebelumnya

        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/login",
                { email, password }
            );
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user)); 
            
            alert("Login berhasil!");
            navigate("/");
        } catch (err) { // ✅ Tangani error dengan lebih spesifik
            const errorMessage = err.response?.data?.msg || "Login gagal. Periksa kembali email dan password Anda.";
            setError(errorMessage);
            console.error("Login gagal:", err.response);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Halaman Login</h2>
            <form onSubmit={handleSubmit} style={{ margin: "20px auto", maxWidth: "400px" }}>
                {/* ✅ Tampilkan pesan error jika ada */}
                {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                </div>
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
            </form>
            <p style={{ marginTop: "15px" }}>
                Belum punya akun? <Link to="/register">Daftar di sini.</Link> {/* ✅ Tambahkan tautan navigasi */}
            </p>
        </div>
    );
}

export default LoginPage;