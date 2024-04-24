"use client";
import * as React from "react";

const AuthContext = React.createContext<{
  authData: AuthData | null;
  isLoading: boolean;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>;
}>({
  authData: null,
  isLoading: true,
  setAuthData: () => {},
});

export type AuthData = {
  id: string;
  role: "user" | "guest";
  email: string;
  name: string;
  username: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setAuthData, isLoading } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        authData: user,
        isLoading,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth hook
export function useAuth() {
  const [isLoading, setLoading] = React.useState(true);
  const [authData, setAuthData] = React.useState<AuthData | null>({
    id: "",
    role: "guest",
    email: "",
    name: "",
    username: "",
  });

  React.useEffect(() => {
    const initializeAuth = async () => {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const json = await response.json();
        setAuthData(json.data);
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return { user: authData, setAuthData, isLoading };
}
