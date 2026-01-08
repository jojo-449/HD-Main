// import { createContext, useState, useEffect } from "react";
// import api from "../api"; 

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // App starts in loading state

//   useEffect(() => {
//     const initializeAuth = () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (userInfo) {
//         setUser(userInfo);
//       }
//       setLoading(false); // Stop loading ONLY after checking localStorage
//     };
//     initializeAuth();
//   }, []);

//   const login = async (identifier, password) => {
//     try {
//       const { data } = await api.post(`/api/auth/login`, { identifier, password });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setUser(data);
//       return { success: true, user: data };
//     } catch (error) {
//       return { success: false, message: error.response?.data?.message || "Login failed" };
//     }
//   };

//   const register = async (instagramHandle, phoneNumber, password) => {
//     try {
//       const { data } = await api.post(`/api/auth/signup`, { instagramHandle, phoneNumber, password });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setUser(data);
//       return { success: true, user: data };
//     } catch (error) {
//       return { success: false, message: error.response?.data?.message || "Signup failed" };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;





import { createContext, useState, useEffect } from "react";
import api from "../api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Try to get user from localStorage
        const savedUser = localStorage.getItem("userInfo");
        if (savedUser) {
          const userInfo = JSON.parse(savedUser);
          setUser(userInfo);
        }
      } catch (error) {
        // If localStorage is blocked (common in Instagram/Private mode), 
        // we just log it and move on so the app doesn't crash
        console.error("Local storage access denied or corrupted:", error);
      } finally {
        // IMPORTANT: We MUST set loading to false even if it fails,
        // otherwise the app stays stuck on the loading screen.
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (identifier, password) => {
    try {
      const { data } = await api.post(`/api/auth/login`, { identifier, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return { success: true, user: data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (instagramHandle, phoneNumber, password) => {
    try {
      const { data } = await api.post(`/api/auth/signup`, { instagramHandle, phoneNumber, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return { success: true, user: data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.error("Could not clear localStorage", error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;