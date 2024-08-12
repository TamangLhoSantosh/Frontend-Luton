import RoomCard from "./RoomCard";
import TwinImage from "../../assets/twin.png";
import StandardImage from "../../assets/room.png";
import DeluxeImage from "../../assets/delux.png";
import SuiteImage from "../../assets/view.png";

const roomDetails = [
  {
    image: TwinImage,
    name: "Standard Twin Room",
    link: "/standardTwinRoom",
    header:
      "Enjoy an amazing stay in our cozy & comfortable standard twin rooms. It comes with single, double & twin bed including 43” Smart LED TV, bathtub & independent high speed Wi-Fi.",
    description:
      "The Luton Hotel offers freshly refurnished rooms and suites all with attached bath and shower, air conditioning and heating, International Direct Dial Telephone system, multi Channel color television and mini bar. All rooms have a view over our awards wining gardens or our refreshing swimming pools.",
    fetures: {
      roomSize: "287.3 sq. ft.",
      bedType: "King Size, Double & Twin",
      Occupancy: "Up to 2 people",
      bedSize: "Double 5x7ft",
    },
  },
  {
    image: StandardImage,
    name: "Standard Room",
    link: "/standardRoom",
    header:
      "Enjoy your stay in our inspired standard rooms. It comes with comfortable king size bed or double bed including 43” Smart LED TV, bathtub and independent high speed Wi-Fi.",
    description:
      "Our newly renovated standard room is designed so that our guests can feel a touch of modern cultural elements with all the amenities. We offer freshly refurnished rooms with independent fast Wi-Fi, 43” smart LED televisions with HD channels, linens and personal care products and choice of various Nepali organic teas. All rooms have a view over our awards wining gardens or our refreshing swimming pools.",
    features: {
      roomSize: "275.2 sq. ft.",
      bedType: "King Size, Double & Twin",
      Occupancy: "Up to 2 people",
      bedSize: "Double 5x7ft",
    },
  },
  {
    image: DeluxeImage,
    name: "Deluxe Room",
    link: "/deluxeRoom",
    header:
      "Deluxe Room for our guest, also available for family tourist including 55” Smart LED TV, bathtub & independent high speed Wi-Fi.",
    description:
      "The Luton Hotel offers freshly refurnished deluxe rooms all with attached bath and shower, air conditioning and heating, International Direct Dial Telephone system, multi Channel color television and mini bar. All rooms have a view over our awards wining gardens or our refreshing swimming pools.",
    features: {
      roomSize: "377.9 sq. ft.",
      bedType: "King Size, Double & Twin",
      Occupancy: "Up to 2 people",
      bedSize: "Double 5x7ft",
    },
  },
  {
    image: SuiteImage,
    name: "Suite Room",
    link: "/suiteRoom",
    header:
      "Featuring traditional craftmanship & modern amenities, Deluxe Suite rooms are truly luxurious including 55” Smart LED TV, bathtub & independent high speed WI-FI.",
    description:
      "The Luton Hotel offers freshly refurnished rooms and suites all with attached bath and shower, air conditioning and heating, International Direct Dial Telephone system, multi Channel color television and mini bar. All rooms have a view over our awards wining gardens or our refreshing swimming pools.",
    features: {
      roomSize: "794.9 sq. ft.",
      bedType: "King Size, Double & Twin",
      Occupancy: "Up to 2 people",
      bedSize: "Double 5x7ft",
    },
  },
];

const RoomRateComponent = () => {
  return (
    <div id="roomrate" className="font-ubuntu">
      <p className="text-customDarkOrange text-5xl text-center my-20">
        Rooms & Rates
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 container mx-auto p-10 md:p-0">
        {roomDetails.map((roomDetail) => (
          <RoomCard
            key={roomDetail.link}
            link={`/room${roomDetail.link}`}
            state={{
              image: roomDetail.image,
              name: roomDetail.name,
              description: roomDetail.description,
              features: roomDetail.features,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomRateComponent;
