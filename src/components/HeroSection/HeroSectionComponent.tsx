import Image from "../../assets/background.png";

const HeroSectionComponent = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <p className="text-white text-8xl font-bold pt-32">
        WELCOME TO BON HOTEL
      </p>
      <p className="text-white text-2xl pt-2">
        Good people. Good thinking. Good feeling.
      </p>
      <button className="bg-customOrange text-white text-3xl px-32 py-6 rounded-xl mt-8">
        EXPLORE
      </button>
    </div>
  );
};

export default HeroSectionComponent;
