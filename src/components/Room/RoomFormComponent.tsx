import { TextField } from "@mui/material";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

// Props interface
interface Props {
  handleSubmit: () => void;
  handleClose: () => void;
  room: any;
  setRoom: any;
  roomTypes: any;
}

const RoomFormComponent = ({
  handleSubmit,
  handleClose,
  room,
  setRoom,
  roomTypes,
}: Props) => {
  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          value={room.roomNumber}
          onChange={(e) => setRoom({ ...room, roomNumber: e.target.value })}
          name="roomNumber"
          label="Room Number"
          variant="outlined"
          className="w-full mb-4"
        />
        <select
          name="roomType"
          onChange={(e) => {
            const selectedRoomType = roomTypes.find(
              (roomType: { _id: string }) => roomType._id === e.target.value
            ); // Find selected room type
            setRoom({
              ...room,
              roomType: selectedRoomType?._id || "",
              pricePerNight: selectedRoomType?.pricePerNight || "",
            }); // Set room type and price per night
          }}
          value={room.roomType}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md mb-2 h-16"
        >
          <option value="" disabled>
            Select Room Type
          </option>
          {roomTypes.map(
            (roomType: {
              _id: Key | readonly string[] | null | undefined;
              roomType:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            }) => (
              <option key={roomType._id} value={roomType._id}>
                {roomType.roomType}
              </option>
            )
          )}
        </select>
        <TextField
          value={room.pricePerNight}
          name="pricePerNight"
          label="Price Per Night"
          variant="outlined"
          className="w-full mb-4"
          disabled
        />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default RoomFormComponent;
