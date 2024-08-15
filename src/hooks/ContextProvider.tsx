import { createContext, useEffect, useState } from "react";

// Create contexts for role and role update
export const ContextProvider = createContext({});

// Provider component to wrap your application
import { ReactNode } from "react";
import apis from "../config/apis";

export function ContextApp({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    _id: "",
    address: "",
    dateOfBirth: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    profileImage: "",
    role: "",
    username: "",
  }); // State for auth

  // Function to get user by id
  const getUserById = async () => {
    try {
      const response = await apis.getUserById(user._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  getUserById();
  // Function to get user from token
  const getUserFromToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await apis.getUserFromToken(token ? token : "");
      setUser((prevUser) => ({
        ...prevUser,
        _id: response.data.user.id,
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  return (
    <ContextProvider.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}
