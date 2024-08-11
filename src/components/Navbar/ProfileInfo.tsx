import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("Logged out");
  };

  return (
    <div className="absolute bg-white shadow-lg rounded-md z-50 top-14 flex right-0 flex-col justify-around  items-center px-4 transition-all ease-in-out w-72 h-56">
      <div className="flex justify-center items-center gap-3 flex-col">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex justify-center items-center text-xl p-1">
            <img
              src={user.profileImage || ""}
              className="w-12 h-12 object-cover"
              alt="profile-image"
            />
          </div>
          <div>
            <h2 className="capitalize">{user.fullName}</h2>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className="w-64 mt-4 grid grid-rows-1">
          <button className="p-2 rounded-md">Manage Profile</button>
          <button className="p-2 rounded-md">Manage Account</button>
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
