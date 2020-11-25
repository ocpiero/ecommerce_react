import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import api from "../services/api";

interface User {
  name: string;
  email: string;
}

interface Log {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(data: Log): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = localStorage.getItem("@RNAuth:user");
      const storageToken = localStorage.getItem("@RNAuth:token");

      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(data: { email: string; password: string }) {
    const response = await auth.signIn(data);

    setUser(response.data.user);

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@RNAuth:user", JSON.stringify(response.data.user));
    localStorage.setItem("@RNAuth:token", response.data.token);
  }

  async function signOut() {
    localStorage.clear();
    setUser(null);

    await auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
