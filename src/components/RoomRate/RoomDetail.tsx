import { useLocation } from "react-router-dom";
import BookNowButton from "../Booking/BookNowButton";

interface RoomFeature {
  roomSize: string;
  bedType: string;
  Occupancy: string;
  bedSize: string;
}

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

  if (!roomDetail) {
    return (
      <div className="text-4xl text-customOrange flex justify-center items-center h-screen">
        Room not found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl text-center text-customOrange">
        {roomDetail.name}
      </h1>
      <img src={roomDetail.image} alt={roomDetail.name} className="my-4" />
      <p className="text-lg">{roomDetail.description}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Features:</h2>
        <ul>
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
