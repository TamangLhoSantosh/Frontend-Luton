import { createContext, useState } from "react";

// Create contexts for role and role update
export const ContextProvider = createContext({
  user: {
    address: "",
    dateOfBirth: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    profileImage: "",
    role: "",
    username: "",
  },
  setUser: (user: any) => {},
});

// Provider component to wrap your application
import { ReactNode } from "react";

export function ContextApp({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
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
