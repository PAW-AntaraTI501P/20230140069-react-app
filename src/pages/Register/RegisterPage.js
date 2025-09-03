import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { name, email, password }
      );
      
      alert(response.data.msg);
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Pendaftaran gagal. Silakan coba lagi.";
      setError(errorMessage);
      console.error("Gagal mendaftar:", err.response);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Halaman Registrasi</h2>
      <p style={styles.subHeader}>Buat akun baru untuk melanjutkan.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.errorText}>{error}</div>}
        <div style={styles.formGroup}>
          <label style={styles.label}>Nama:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Daftar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#282c34',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '10px',
  },
  subHeader: {
    fontSize: '1.2em',
    marginBottom: '30px',
    color: '#cccccc',
  },
  form: {
    backgroundColor: '#3a3f47',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '450px',
    width: '90%',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1.1em',
    color: '#e0e0e0',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '12px 10px',
    border: '1px solid #555',
    borderRadius: '5px',
    backgroundColor: '#444',
    color: '#ffffff',
    fontSize: '1em',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: '15px',
    fontSize: '0.95em',
    textAlign: 'center',
  },
};

export default RegisterPage;
