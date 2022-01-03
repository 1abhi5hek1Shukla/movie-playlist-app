/**
 *
 * App.js
 * (client)
 */
import React, { useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Layouts/Header";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Switch,
} from "react-router-dom";
import Footer from "./components/Layouts/Footer";

import PrivateRoute from "./components/Routing/PrivateRoutes";
import { setAuthHeader } from "./api/axiosInstance";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthHeader(token);
    }
  }, []);
  return (
    <div className={styles["app"]}>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/" exact element={<Home />} /> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
