import { useState, useEffect, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { APT_URL } from "../constans/apiEndpoints";

const AuthContext = createContext({
  isAuthenticated: false,
  accessToken: "",
  userInfo: {},
  saveUser: () => {},
  logout: () => {},
  isLoading: true,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwt_decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token && !isTokenExpired(token) ? token : null;
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${APT_URL}/refresh`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200 && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    }
  } catch (error) {
    console.error("❌ Error al refrescar el token:", error);
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = (userData) => {
    const { accessToken } = userData;
    setAccessToken(accessToken);
    setUserInfo(jwt_decode(accessToken));
    localStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post(`${APT_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
    setIsAuthenticated(false);
    setAccessToken("");
    setUserInfo({});
    localStorage.removeItem("accessToken");
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      let token = getAccessToken();
      if (!token) {
        token = await refreshAccessToken();
      }

      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
        setUserInfo(jwt_decode(token));
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        userInfo,
        saveUser,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
