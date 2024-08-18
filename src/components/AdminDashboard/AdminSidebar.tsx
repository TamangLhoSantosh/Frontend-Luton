import {
  MdLocalLibrary,
  MdExitToApp,
  MdCalendarMonth,
  MdPerson,
  MdHotel,
} from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

export default function AdminSidebar({ selectedPage, onSelectPage }: Props) {
  const links = [
    {
      name: "Booking Management",
      icon: <MdCalendarMonth className="w-8 h-8 mr-2 text-customDarkOrange" />,
    },
    {
      name: "Room Management",
      icon: <MdHotel className="w-8 h-8 mr-2 text-customDarkOrange" />,
    },
    {
      name: "User Management",
      icon: <MdPerson className="w-8 h-8 mr-2 text-customDarkOrange" />,
    },
    {
      name: "Log Out",
      icon: <MdExitToApp className="w-8 h-8 mr-2 text-customDarkOrange" />,
    },
  ];

  return (
    <div className="bg-gray-200 h-screen fixed">
      <Link to="/adminDashboard">
        <div
          className="text-3xl text-white flex items-center pb-4 p-3 w-full bg-black cursor-pointer"
          onClick={() => onSelectPage("Dashboard")}
        >
          <MdLocalLibrary className="w-10 h-10 text-white" />
          <span>Dashboard</span>
        </div>
      </Link>

      <div className="m-2">
        <ul className="text-customOrange">
          {links.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                link.name === "Log Out"
                  ? (localStorage.removeItem("token"),
                    (window.location.href = "/"))
                  : onSelectPage(link.name);
              }}
              className={`ps-7 py-4 pe-14 hover:cursor-pointer hover:scale-105 hover:bg-gray-300 hover:text-customDarkOrange transition duration-200 ease-in-out flex items-center ${
                selectedPage === link.name
                  ? "font-semibold text-customDarkOrange pl-2 rounded"
                  : ""
              }`}
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
