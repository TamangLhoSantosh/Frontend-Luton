import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../hooks/ContextProvider";

// User date interface
interface userData {
  profileImage: File | null;
  name: String;
  username: String;
  dateOfBirth: Date;
  email: String;
  gender: String;
  phoneNumber: String;
  address: String;
}

const ManageAccountComponent = () => {
  const { user } = useContext(ContextProvider);

  // State to store user data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    setUserData({
      name: user.fullName,
      username: user.username,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      address: user.address,
      profileImage: user.profileImage,
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src={userData.profileImage}
          alt="profile"
          className="h-40 w-40 object-cover rounded-full"
        />
      </div>
    </>
  );
};

export default ManageAccountComponent;
