import React from "react";
import CheckAvailability from "../CheckAvailability/CheckAvailability";
import HeroSectionComponent from "../HeroSection/HeroSectionComponent";
import FacilitiesComponent from "../Facilities/FacilitiesComponent";
import RoomRateComponent from "../Room/RoomRateComponent";
import BookNowButton from "../Booking/BookNowButton";

const HomeComponent: React.FC = () => {
  return (
    <div>
      <CheckAvailability />
      <HeroSectionComponent />
      <div className="container mx-auto -translate-y-40 bg-white rounded-xl">
        <FacilitiesComponent />
        <RoomRateComponent />
        <BookNowButton />
      </div>
    </div>
  );
};

export default HomeComponent;
