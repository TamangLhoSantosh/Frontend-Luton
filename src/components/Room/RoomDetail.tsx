import { useLocation } from "react-router-dom";
import BookNowButton from "../Booking/BookNowButton";

// Room feature interface
interface RoomFeature {
  roomSize: string;
  bedType: string;
  Occupancy: string;
  bedSize: string;
}

// Room detail interface
interface RoomDetailState {
  image: string;
  name: string;
  description: string;
  features?: RoomFeature;
}

const RoomDetails = () => {
  const location = useLocation();
  const roomDetail = location.state?.roomDetail as RoomDetailState;
  console.log(roomDetail);

  // If roomDetail is not found, display a message
  if (!roomDetail) {
    return (
      <div className="text-4xl text-customOrange flex justify-center items-center h-screen">
        Room not found
      </div>
    );
  }

  return (
    <div className="p-6 font-ubuntu tracking-wider">
      <h1 className="font-bold text-5xl text-center text-customOrange my-20">
        {roomDetail.name}
      </h1>
      <div
        className="my-4 mx-auto bg-cover bg-center rounded-lg w-1/2 h-56 md:h-[500px]"
        style={{ backgroundImage: `url(${roomDetail.image})` }}
      ></div>
      <p className="text-xl container mx-auto mt-10">
        {roomDetail.description}
      </p>
      <div className="container mx-auto mt-6">
        <h2 className="text-3xl font-semibold text-customDarkOrange">
          Features:
        </h2>
        <ul className="my-4 space-y-4 text-customOrange text-xl">
          <li>Room Size: {roomDetail.features?.roomSize}</li>
          <li>Bed Type: {roomDetail.features?.bedType}</li>
          <li>Occupancy: {roomDetail.features?.Occupancy}</li>
          <li>Bed Size: {roomDetail.features?.bedSize}</li>
        </ul>
      </div>
      <BookNowButton />
    </div>
  );
};

export default RoomDetails;
