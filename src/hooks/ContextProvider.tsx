import { ReactNode, createContext, useEffect, useState } from "react";
import apis from "../config/apis";

// User interface
interface User {
  _id: string;
  address: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  profileImage: string;
  role: string;
  username: string;
}

// ContextProvider interface
interface ContextProviderType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// ContextProvider
export const ContextProvider = createContext<ContextProviderType>({
  user: {
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
  },
  setUser: () => {},
});

export function ContextApp({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
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
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apis.getUserFromToken();
        setUser(response.data);
      } catch (error) {}
    };

    fetchUserData();
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
