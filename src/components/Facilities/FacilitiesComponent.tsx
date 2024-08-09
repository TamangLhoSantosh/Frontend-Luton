import { MdOutlineLocalTaxi, MdOutlinePool } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { CgGym } from "react-icons/cg";

const facilities = [
  {
    icon: <MdOutlinePool className="text-6xl text-customOrange" />,
    name: "Pool",
  },
  {
    icon: <IoWifi className="text-6xl text-customOrange" />,
    name: "Wifi",
  },
  {
    icon: <CgGym className="text-6xl text-customOrange" />,
    name: "Gym",
  },
  {
    icon: <MdOutlineLocalTaxi className="text-6xl text-customOrange" />,
    name: "Taxi",
  },
];

const FacilitiesComponent = () => {
  return (
    <>
      <p className="text-5xl text-center text-customDarkOrange font-semibold pt-10 pb-20">
        Facilities
      </p>
      <div className="flex container mx-auto justify-around">
        {facilities.map((facility) => (
          <div
            className="flex flex-col justify-center items-center text-customDarkOrange"
            key={facility.name}
          >
            {facility.icon}
            <p className="text-2xl my-4">{facility.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FacilitiesComponent;
