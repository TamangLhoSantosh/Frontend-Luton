import { TextField } from "@mui/material";
import { useState } from "react";
import apis from "../../config/apis";
import { toast } from "react-toastify";
import RoomFormComponent from "./RoomFormComponent";

// Props interface
interface Props {
  onClose: () => void;
  roomTypes: RoomType[];
}

// RoomType interface
interface RoomType {
  _id: string;
  roomType: string;
  pricePerNight: string;
}

interface Room {
  roomNumber: string;
  roomType: string;
  pricePerNight: string;
}

const AddRoomComponent = ({ onClose, roomTypes }: Props) => {
  // State to store room details
  const [addRoom, setAddRoom] = useState<Room>({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
  });

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apis.addRoom(addRoom);
      console.log(response);
      if (response.status !== 200) {
        toast.error(response.data.error);
      }
      toast.success(response.data.message);
      onClose(); // Close form
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  // Close form
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-screen">
        <div className="text-left">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>
          {/* Form */}
          <RoomFormComponent
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            room={addRoom}
            setRoom={setAddRoom}
            roomTypes={roomTypes}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRoomComponent;
