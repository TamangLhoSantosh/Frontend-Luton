import BookNowComponent from "../BookNow/BookNowComponent";
import FacilitiesComponent from "../Facilities/FacilitiesComponent";
import HeroSectionComponent from "../HeroSection/HeroSectionComponent";
import RoomRateComponent from "../RoomRate/RoomRateComponent";
const HomeComponent = () => {
  return (
    <div>
      <HeroSectionComponent />
      <div className="container mx-auto -translate-y-40 bg-white rounded-xl">
        <FacilitiesComponent />
        <RoomRateComponent />
        <BookNowComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
