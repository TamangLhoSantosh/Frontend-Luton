import { Link } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  link: string;
}
const RoomDetails = ({ image, name, link }: Props) => {
  return (
    <div
      className="flex justify-center items-end bg-cover bg-center rounded-lg h-56 md:h-96"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex flex-col items-center pb-16">
        <p className="text-4xl text-white font-bold mb-5">{name}</p>
        <Link
          to={`/${link}`}
          className="bg-customOrange text-2xl text-white px-14 py-6 rounded-lg hover:bg-customDarkOrange"
        >
          Check Rates
        </Link>
      </div>
    </div>
  );
};

export default RoomDetails;
