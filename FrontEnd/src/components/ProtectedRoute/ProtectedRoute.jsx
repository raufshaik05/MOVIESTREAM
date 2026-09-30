import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // 1. User is not logged in
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // 2. Check user's role
    if (!allowedRoles.includes(user.role)) {

        // If admin tries to access a user-only page
        if (user.role === "admin") {
            return <Navigate to="/AdminAcc" replace />;
        }

        // If normal user tries to access an admin-only page
        return <Navigate to="/Profile" replace />;
    }

    // 3. User is allowed
    return children;
}

export default ProtectedRoute;