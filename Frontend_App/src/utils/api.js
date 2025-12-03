// // Frontend_App/src/api.js
// // Use Vite env var VITE_API_BASE (exposed at build time).
// // Falls back to localhost for local development.

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// const getToken = () => localStorage.getItem("token");

// async function request(path, options = {}) {
//     const token = getToken();
//     const headers = {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//     };
//     if (token) headers.Authorization = `Bearer ${token}`;

//     console.log("API request", options.method || "GET", path, "Authorization:", !!headers.Authorization);

//     const res = await fetch(`${API_BASE}${path}`, {
//         ...options,
//         headers,
//     });

//     const text = await res.text();
//     try {
//         return JSON.parse(text || "{}");
//     } catch {
//         return text;
//     }
// }

// const apiGet = (path) => request(path, { method: "GET" });
// const apiPost = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
// const apiPut = (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) });
// const apiDelete = (path) => request(path, { method: "DELETE" });

// export default {
//     signup: (data) => apiPost("/auth/signup", data),
//     login: (data) => apiPost("/auth/login", data),
//     getMe: () => apiGet("/auth/me"),
//     updateProfile: (data) => apiPut("/auth/me", data),
//     getSkills: () => apiGet("/skills"),
//     createSkill: (data) => apiPost("/skills", data),
//     getSkill: (id) => apiGet(`/skills/${id}`),
//     updateSkill: (id, data) => apiPut(`/skills/${id}`, data),
//     deleteSkill: (id) => apiDelete(`/skills/${id}`),
//     getSessions: (skillId) => apiGet(`/sessions/${skillId}`),
//     addSession: (skillId, data) => apiPost(`/sessions/${skillId}`, data),
//     deleteSession: (sessionId) => apiDelete(`/sessions/single/${sessionId}`),
//     getWeeklyAnalytics: (skillId, weeks = 8) => apiGet(`/analytics/weekly?skillId=${skillId}&weeks=${weeks}`),
//     getSummary: () => apiGet(`/analytics/summary`),
// };



// src/utils/api.js
const API_BASE = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

async function request(path, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    console.log("API request", options.method || "GET", path, "Authorization:", !!headers.Authorization);

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const text = await res.text();
    try {
        return JSON.parse(text || "{}");
    } catch {
        return text;
    }
}

const apiGet = (path) => request(path, { method: "GET" });
const apiPost = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
const apiPut = (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) });
const apiDelete = (path) => request(path, { method: "DELETE" });

export default {
    signup: (data) => apiPost("/auth/signup", data),
    login: (data) => apiPost("/auth/login", data),
    getMe: () => apiGet("/auth/me"),
    updateProfile: (data) => apiPut("/auth/me", data), // <-- added: update profile (PUT /api/auth/me)
    getSkills: () => apiGet("/skills"),
    createSkill: (data) => apiPost("/skills", data),
    getSkill: (id) => apiGet(`/skills/${id}`),
    updateSkill: (id, data) => apiPut(`/skills/${id}`, data),
    deleteSkill: (id) => apiDelete(`/skills/${id}`),
    getSessions: (skillId) => apiGet(`/sessions/${skillId}`),
    addSession: (skillId, data) => apiPost(`/sessions/${skillId}`, data),
    deleteSession: (sessionId) => apiDelete(`/sessions/single/${sessionId}`),
    getWeeklyAnalytics: (skillId, weeks = 8) => apiGet(`/analytics/weekly?skillId=${skillId}&weeks=${weeks}`),
    getSummary: () => apiGet(`/analytics/summary`),
};
