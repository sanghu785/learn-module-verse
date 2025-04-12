
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  phoneLogin: (phoneNumber: string, code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// For demo purposes, we'll simulate users with localStorage
const USERS_KEY = "course_platform_users";
const CURRENT_USER_KEY = "course_platform_current_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (!storedUsers) return [];
    try {
      return JSON.parse(storedUsers);
    } catch (error) {
      console.error("Failed to parse stored users", error);
      localStorage.removeItem(USERS_KEY);
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const users = getUsers();
      if (users.some(user => user.email === email)) {
        toast.error("User with this email already exists");
        return false;
      }

      // Create a new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      };

      // Store password separately (in a real app, this would be hashed)
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      
      // Also save a passwords map (this is ONLY for demo purposes!)
      const passwords = JSON.parse(localStorage.getItem("user_passwords") || "{}");
      passwords[newUser.id] = password;
      localStorage.setItem("user_passwords", JSON.stringify(passwords));

      // Log in the new user
      setCurrentUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Find user with matching email
      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        toast.error("No account found with this email");
        return false;
      }

      // Check password (again, in a real app this would be proper auth)
      const passwords = JSON.parse(localStorage.getItem("user_passwords") || "{}");
      if (passwords[user.id] !== password) {
        toast.error("Incorrect password");
        return false;
      }

      // Set current user
      setCurrentUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Simulate Google login
  const googleLogin = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate OAuth success with mock user
      const mockGoogleUser: User = {
        id: `google_${Date.now()}`,
        name: "Google User",
        email: `user_${Date.now()}@gmail.com`,
        photoURL: "https://ui-avatars.com/api/?name=G+U&background=4285F4&color=fff",
      };

      // Add to users if not exists
      const users = getUsers();
      if (!users.some(user => user.id === mockGoogleUser.id)) {
        const updatedUsers = [...users, mockGoogleUser];
        saveUsers(updatedUsers);
      }

      // Set current user
      setCurrentUser(mockGoogleUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockGoogleUser));
      
      toast.success("Logged in with Google successfully!");
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Simulate phone login
  const phoneLogin = async (phoneNumber: string, code: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate verification code validation (in real apps, this would use SMS verification)
      if (code !== "123456") {
        toast.error("Invalid verification code");
        return false;
      }

      // Create a user based on phone number
      const mockPhoneUser: User = {
        id: `phone_${Date.now()}`,
        name: `User ${phoneNumber.slice(-4)}`,
        email: `phone_user_${Date.now()}@example.com`,
        photoURL: "https://ui-avatars.com/api/?name=Phone+User&background=00C853&color=fff",
      };

      // Add to users if not exists
      const users = getUsers();
      if (!users.some(user => user.id === mockPhoneUser.id)) {
        const updatedUsers = [...users, mockPhoneUser];
        saveUsers(updatedUsers);
      }

      // Set current user
      setCurrentUser(mockPhoneUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockPhoneUser));
      
      toast.success("Logged in with phone successfully!");
      return true;
    } catch (error) {
      console.error("Phone login error:", error);
      toast.error("Failed to log in with phone");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    loading,
    login,
    googleLogin,
    phoneLogin,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
