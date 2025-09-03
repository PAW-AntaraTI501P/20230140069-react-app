// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");

    // If a token exists, allow access to the requested page
    // If not, redirect to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;