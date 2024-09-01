import { Link } from "react-router-dom";

const BookNowButton = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-32 font-ubuntu">
      <p className="text-5xl text-customDarkOrange">Get a room already!</p>
      <Link
        to="/booknow"
        className="bg-customOrange text-2xl text-white my-8 px-36 py-6 rounded-xl hover:bg-customDarkOrange"
      >
        Book Now
      </Link>
    </div>
  );
};

export default BookNowButton;
