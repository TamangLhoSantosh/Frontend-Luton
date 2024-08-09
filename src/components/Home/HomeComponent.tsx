import React, { useRef } from "react";
import CheckAvailability from "../CheckAvailability/CheckAvailability";
import HeroSectionComponent from "../HeroSection/HeroSectionComponent";
import FacilitiesComponent from "../Facilities/FacilitiesComponent";
import RoomRateComponent from "../RoomRate/RoomRateComponent";
import BookNowComponent from "../BookNow/BookNowComponent";

const HomeComponent: React.FC = () => {
  const facilitiesRef = useRef<HTMLDivElement | null>(null);
  const roomRateRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <CheckAvailability />
      <HeroSectionComponent />
      <div className="container mx-auto -translate-y-40 bg-white rounded-xl">
        <FacilitiesComponent ref={facilitiesRef} />
        <RoomRateComponent ref={roomRateRef} />
        <BookNowComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
