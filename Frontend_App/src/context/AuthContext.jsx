import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    
    const persistLogin = (token, userObj) => {
        if (token) {
            localStorage.setItem("token", token);
        }
        if (userObj) {
            localStorage.setItem("user", JSON.stringify(userObj));
        }
        setUser(userObj || null);
    };

    
    const login = async ({ email, password }) => {
        setError("");
        setLoading(true);
        try {
            const res = await api.login({ email, password });
            if (!res || res.message) {
                throw new Error(res.message || "Login failed");
            }
            const { user: userObj, token } = res;
            persistLogin(token, userObj);
            setLoading(false);
            return { ok: true };
        } catch (err) {
            setError(err.message || "An error occurred while logging in.");
            setLoading(false);
            return { ok: false, error: err.message };
        }
    };

    
    const signup = async ({ name, email, password }) => {
        setError("");
        setLoading(true);
        try {
            const res = await api.signup({ name, email, password });
            if (!res || res.message) {
                throw new Error(res.message || "Signup failed");
            }

            const { user: userObj, token } = res;
            persistLogin(token, userObj);
            setLoading(false);
            return { ok: true };
        } catch (err) {
            setError(err.message || "Signup failed");
            setLoading(false);
            return { ok: false, error: err.message };
        }
    };

    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setError("");
        
        navigate("/");
    };

    
    useEffect(() => {
        const checkMe = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            setLoading(true);

            try {
                const res = await api.getMe();
                if (res && res.user) {
                    
                    localStorage.setItem("user", JSON.stringify(res.user));
                    setUser(res.user);
                } else {
                    
                    setUser(null);
                }
            } catch (err) {
                console.warn("Auth refresh failed:", err);
                
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkMe();
    }, []);

    
    const value = useMemo(() => ({
        user,
        setUser: (u) => {
            setUser(u);
            if (u) localStorage.setItem("user", JSON.stringify(u));
        },
        login,
        signup,
        logout,
        loading,
        error,
        clearError: () => setError(""),
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
