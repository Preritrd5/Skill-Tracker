import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AppRoutes from "./AppRoutes";


import HomePage from "./pages/HomePage";
import PublicLayout from "./components/layout/PublicLayout";


import { AuthProvider } from "./context/AuthContext";

import MoveLogo from "./MoveLogo";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>

            {}
            <Route
              path="/"
              element={
                <>
                  <div className="hide relative w-full min-h-screen bg-gray-100">
                    <PublicLayout>
                      <HomePage />
                    </PublicLayout>
                  </div>

                  {}
                  <MoveLogo />
                </>
              }
            />

            {}
            <Route path="/*" element={<AppRoutes />} />

          </Routes>

        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
