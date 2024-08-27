import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../../hooks/ContextProvider";
import { toast } from "react-toastify";

interface ProfileInfoProps {
  user: any; // Replace 'any' with a more specific type if possible
  setShowProfile: (show: boolean) => void;
}

const ProfileInfo = ({ user, setShowProfile }: ProfileInfoProps) => {
  const navigate = useNavigate();

  const { setUser } = useContext(ContextProvider);

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleLogOut = async () => {
    setUser({
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
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
    closeProfile();
  };

  return (
    <div className="absolute bg-white shadow-lg rounded-md z-50 top-14 flex right-0 flex-col justify-around items-center px-4 transition-all ease-in-out h-56">
      <div className="flex justify-center items-center gap-3 flex-col">
        <div className="flex items-center gap-3">
          <img
            src={user.profileImage ?? "https://via.placeholder.com/150"}
            className="w-16 h-16 rounded-full object-cover"
            alt="profile-image"
            onClick={closeProfile}
          />
        </div>
        <div className="h-12 flex justify-center items-center p-1">
          <div>
            <h2 className="capitalize">{user.fullName}</h2>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className="mt-4 grid grid-rows-1">
          <button className="p-2 rounded-md" onClick={closeProfile}>
            Manage Account
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogOut}
          className="bg-transparent w-64p-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
