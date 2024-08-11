import React from "react";
import CheckAvailability from "../CheckAvailability/CheckAvailability";
import HeroSectionComponent from "../HeroSection/HeroSectionComponent";
import FacilitiesComponent from "../Facilities/FacilitiesComponent";
import RoomRateComponent from "../RoomRate/RoomRateComponent";
import BookNowComponent from "../BookNow/BookNowComponent";

const HomeComponent: React.FC = () => {
  return (
    <div>
      <CheckAvailability />
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
