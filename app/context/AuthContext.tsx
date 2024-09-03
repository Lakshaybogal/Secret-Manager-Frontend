// context/AuthContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "../interface/User";
import { refresh } from "../api/Auth";

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  refreshToken: () => Promise<void>;
}

// Create the AuthContext with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the shape of the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await refresh();
        if (response.status === 200 && response.data.data) {
          setUser(response.data.data);
          console.log("running .....");
        } else {
          setUser(null); // Invalidate user on failed refresh
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await refresh();
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null); // Invalidate user on failed refresh
      }
    } catch (error) {
      console.error("Failed to refresh user token", error);
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
