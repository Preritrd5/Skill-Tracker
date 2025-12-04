import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import SkillDetail from "./pages/SkillDetail";
import Analytics from "./pages/Analytics";
import Profile from './pages/Profile';


import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";


const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        <p>404 — Page Not Found</p>
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            {}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Analytics />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/skills"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Skills />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/skills/:id"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <SkillDetail />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
