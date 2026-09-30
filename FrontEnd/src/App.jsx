import React from "react";
import "./app.css";

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

// =====================================
// AUTH PAGES
// =====================================

import Signin from "./pages/Signin_folder/Signin";
import Signup from "./pages/Signup_folder/Signup";

// =====================================
// MAIN PAGES
// =====================================

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import WebSeries from "./pages/WebSeries/WebSeries";
import Anime from "./pages/Anime/Anime";
import Shows from "./pages/Shows/Shows";

// =====================================
// OTHER PAGES
// =====================================

import AboutPage from "./pages/AboutPage/AboutPage";
import ServicesPage from "./pages/PageSrevies/ServicesPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import Wishlist from "./pages/Wishlist/Wishlist";

// =====================================
// ADMIN PAGES
// =====================================

import MoviePostForm from "./Admin Collection/moviePosting/MoviePostform";
import AdminAcc from "./Admin Collection/AdminACC/AdminAcc";
import EditMovieAdmin from "./Admin Collection/EditMovieAdmin/EditMovieAdmin";

// =====================================
// COMPONENTS
// =====================================

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SinglePage from "./components/SinglePage/SinglePage";

// =====================================
// APP
// =====================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================
                        WELCOME PAGE
                    ===================================== */}

        <Route
          path="/"
          element={<WelcomePage />}
        />

        {/* =====================================
                        AUTHENTICATION
                    ===================================== */}

        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* =====================================
                        INFORMATION PAGES
                    ===================================== */}

        <Route
          path="/About"
          element={<AboutPage />}
        />

        <Route
          path="/Services"
          element={<ServicesPage />}
        />

        {/* =====================================
                        MAIN PAGES
                    ===================================== */}

        <Route
          path="/Home"
          element={<Home />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />

        <Route
          path="/webseries"
          element={<WebSeries />}
        />

        <Route
          path="/anime"
          element={<Anime />}
        />

        <Route
          path="/Shows"
          element={<Shows />}
        />

        {/* =====================================
                        WISHLIST
                    ===================================== */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* =====================================
                    SINGLE CONTENT PAGE
                =====================================

          Web Series:
          /content/webseries/:id

          Movie:
          /content/movie/:id

          Anime:
          /content/anime/:id

        ===================================== */}

        <Route
          path="/content/:type/:id"
          element={<SinglePage />}
        />

        {/* =====================================
                    ADMIN DASHBOARD
                ===================================== */}

        <Route
          path="/AdminAcc"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAcc />
            </ProtectedRoute>
          }
        />

        {/* =====================================
                    ADD MOVIE / CONTENT
                ===================================== */}

        <Route
          path="/AddMovie"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MoviePostForm />
            </ProtectedRoute>
          }
        />

        {/* =====================================
                    EDIT CONTENT
                ===================================== */}

        <Route
          path="/AdminAcc/edit/:type/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditMovieAdmin />
            </ProtectedRoute>
          }
        />

        {/* =====================================
                    USER PROFILE
                ===================================== */}

        <Route
          path="/Profile"
          element={
            <ProtectedRoute
              allowedRoles={[
                "user",
                "admin"
              ]}
            >
              <UserProfile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;