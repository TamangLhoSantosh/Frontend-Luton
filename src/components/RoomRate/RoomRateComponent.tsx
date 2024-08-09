import RoomDetails from "./RoomDetails";
import TwinImage from "../../assets/twin.png";
import StandardImage from "../../assets/room.png";
import DeluxeImage from "../../assets/delux.png";
import SuiteImage from "../../assets/view.png";

const roomDetails = [
  {
    image: TwinImage,
    name: "Standard Twin Room",
    link: "/standard-twin-room",
  },
  {
    image: StandardImage,
    name: "Standard Room",
    link: "/standard-room",
  },
  {
    image: DeluxeImage,
    name: "Deluxe Room",
    link: "/deluxe-room",
  },
  {
    image: SuiteImage,
    name: "Suite Room",
    link: "/suite-room",
  },
];

const RoomRateComponent = () => {
  return (
    <div>
      <p className="text-customDarkOrange text-5xl text-center font-semibold my-20">
        Rooms & Rates
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 container mx-auto p-10 md:p-0">
        {roomDetails.map((roomDetail) => (
          <RoomDetails
            key={roomDetail.link}
            image={roomDetail.image}
            name={roomDetail.name}
            link={roomDetail.link}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomRateComponent;
