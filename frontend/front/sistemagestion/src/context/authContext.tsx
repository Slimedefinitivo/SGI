import React, { useEffect, createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { login, recargarToken } from "../api/auth.api";
import { jwtDecode } from "jwt-decode";

interface Usuario {
  ct_correo: string;
  ct_clave: string;
}

interface AuthContextProps {
  usuario: Usuario | null;
  signin: (usuario: Usuario) => Promise<any>;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  nombrePrueba: string;
  correo : string
  getTokenPayload: () => any;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [nombrePrueba, setNombrePrueba] = useState("");
  const [correo, setCorreo] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const decodeToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const getTokenPayload = () => {
    if (!token) return null;

    return decodeToken(token);
  };

  const signin = async (usuario: Usuario): Promise<any> => {
    try {
      const res = await login(usuario);
      console.log(res);
      setUsuario(res.data);
      const token = res.data.token;
      Cookies.set("token", token);
      setToken(token);
      setNombrePrueba(res.data.nombre);
      setCorreo(res.data.correo);
      setIsAuthenticated(true);
      console.log("Login isAuthenticated: ", isAuthenticated);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await recargarToken(token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setToken(token);
          setUsuario(res.data);
          console.log("Token refresh response: ", res.data);
          setNombrePrueba(res.data.nombre);
          setCorreo(res.data.correo);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUsuario(null);
    setIsAuthenticated(false);
    setNombrePrueba("");
    setCorreo("");
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        usuario,
        isAuthenticated,
        loading,
        logout,
        nombrePrueba,
        correo,
        getTokenPayload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export default AuthContext;
