import { Link } from "react-router-dom";

// Props interface
interface Props {
  link: string;
  state: {
    image: string;
    name: string;
    description: string;
    features?: {
      roomSize: string;
      bedType: string;
      Occupancy: string;
      bedSize: string;
    };
  };
}

const RoomCard = ({ link, state }: Props) => {
  return (
    // Image as background
    <div
      className="flex justify-center items-end bg-cover bg-center rounded-lg h-56 md:h-[500px]"
      style={{ backgroundImage: `url(${state.image})` }}
    >
      <div className="flex flex-col items-center pb-6">
        <p className="text-4xl text-white mb-5">{state.name}</p>
        <Link
          to={link}
          state={{ roomDetail: state }}
          className="bg-customOrange text-2xl text-white px-14 py-6 rounded-lg hover:bg-customDarkOrange"
        >
          Check Rates
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
