import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apis from "../../config/apis";
import { TextField } from "@mui/material";

// Table Item interface
interface TableItem {
  _id: string;
  roomNumber: string;
  roomType: RoomType;
  availability: string;
}

// RoomType interface
interface RoomType {
  _id: string;
  roomType: string;
  pricePerNight: string;
}

// Filters interface
interface Filters {
  roomType: string;
  availability: string;
}

// Define columns
const columns: TableColumn<TableItem>[] = [
  {
    name: "Room Number",
    selector: (row: { roomNumber: string }) => row.roomNumber,
    sortable: true,
  },
  {
    name: "Room Type",
    selector: (row: TableItem) => row.roomType.roomType,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row: TableItem) => row.roomType.pricePerNight,
    sortable: true,
  },
  {
    name: "Availability",
    selector: (row: { availability: string }) => row.availability.toUpperCase(),
    sortable: true,
  },
];

const RoomManagementComponent = () => {
  // State to store rooms
  const [rooms, setRooms] = useState<TableItem[]>([
    {
      _id: "",
      roomNumber: "",
      roomType: { _id: "", pricePerNight: "", roomType: "" },
      availability: "",
    },
  ]);

  // State to store room types
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    {
      _id: "",
      roomType: "",
      pricePerNight: "",
    },
  ]);

  // State to store filters
  const [filters, setFilters] = useState<Filters>({
    roomType: "",
    availability: "",
  });

  // State to toggle filters
  const [showFilters, setShowFilters] = useState(false);

  // Function to toggle filters
  const toggleFilters = () => setShowFilters(!showFilters);

  // State to store search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle key press on serach term
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const response = await apis.getRooms({ roomNumber: searchTerm });
      setRooms(response.data);
      setFilters({ roomType: "", availability: "" });
    }
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply Filters
  const handleFilter = async () => {
    const response = await apis.getRooms(filters);
    setRooms(response.data);
    setSearchTerm("");
    toggleFilters();
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({ roomType: "", availability: "" });
  };

  // Get rooms
  const getRooms = async () => {
    try {
      const response = await apis.getRooms();
      setRooms(response.data);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  // Get room types
  const getRoomTypes = async () => {
    try {
      const response = await apis.getRoomTypes();
      setRoomTypes(response.data);
    } catch (e: any) {
      toast.error(e.response.data.error);
    }
  };

  useEffect(() => {
    getRoomTypes();
    getRooms();
  }, []);

  return (
    <div className="pe-8">
      {/* Title */}
      <div className="flex justify-between items-center">
        <p className="text-3xl my-8">Room Management</p>
        <div className="flex items-center">
          <TextField
            label="Search Room Number"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <CiFilter
            className="text-3xl ms-4 cursor-pointer"
            onClick={toggleFilters}
          />
          <IoAddCircleOutline className="text-3xl ms-4" />
        </div>
      </div>
      {/* Filters */}
      {showFilters && (
        <div className="relative">
          <div className="absolute top-0 right-0 z-50 p-4 border border-gray-300 rounded-md bg-white shadow-md">
            {/* Room Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                name="roomType"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={filters.roomType}
                onChange={handleFilterChange}
              >
                <option value="" disabled>
                  Select Room Type
                </option>
                {roomTypes.map((roomType) => (
                  <option key={roomType.roomType} value={roomType._id}>
                    {roomType.roomType}
                  </option>
                ))}
              </select>
            </div>
            {/* Availability */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                name="availability"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <option value="" disabled>
                  All
                </option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            {/* Buttons */}
            <div className="flex gap-6">
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-customDarkOrange text-white rounded-md hover:bg-customOrange"
                onClick={handleFilter}
              >
                Apply Filters
              </button>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-customDarkOrange text-white rounded-md hover:bg-customOrange"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div>
        <DataTable
          title="Rooms"
          columns={columns}
          data={rooms}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default RoomManagementComponent;
