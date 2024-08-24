import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import apis from "../../config/apis";
import { toast } from "react-toastify";

// Table item interface
interface TableItem {
  fullName: string;
  roomNo: string;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
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
  status: string;
}

const BookingManagement = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for bookings
  const [bookings, setBookings] = useState<TableItem[]>([
    {
      fullName: "",
      roomNo: "",
      checkInDate: "",
      checkOutDate: "",
      createdAt: "",
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

  // Define columns
  const columns: TableColumn<TableItem>[] = [
    {
      name: "Full Name",
      selector: (row: { fullName: string }) => row.fullName,
      sortable: true,
    },
    {
      name: "Room Number",
      selector: (row: { roomNo: string }) => row.roomNo,
      sortable: true,
    },
    {
      name: "Booking Date",
      selector: (row: { createdAt: string }) => row.createdAt,
      sortable: true,
    },
    {
      name: "Check In Date",
      selector: (row: { checkInDate: string }) => row.checkInDate,
      sortable: true,
    },
    {
      name: "Check Out Date",
      selector: (row: { checkOutDate: string }) => row.checkOutDate,
      sortable: true,
    },
  ];

  // State to store filters
  const [filters, setFilters] = useState<Filters>({
    roomType: "",
    status: "",
  });

  // State to toggle filters
  const [showFilters, setShowFilters] = useState(false);

  // Function to toggle filters
  const toggleFilters = () => setShowFilters(!showFilters);

  // Handle search change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getBooking({ user: searchTerm });
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
  const handleFilter = () => {
    getBooking(filters);
    setSearchTerm("");
    toggleFilters();
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({ roomType: "", status: "" });
  };

  // Get booking
  const getBooking = async (filters: any) => {
    try {
      const response = await apis.getBooking(filters);
      // Transform the booking data to match the TableItem structure
      setBookings(
        response.data.map(
          (booking: {
            user: { fullName: string };
            room: { roomNumber: string };
            guest: { guestName: string };
            checkInDate: string;
            checkOutDate: string;
            createdAt: string;
          }) => ({
            fullName:
              booking.user && booking.user.fullName
                ? booking.user.fullName
                : booking.guest.guestName,
            roomNo: booking.room.roomNumber,
            checkInDate: booking.checkInDate.split("T")[0],
            checkOutDate: booking.checkOutDate.split("T")[0],
            createdAt: new Date(parseInt(booking.createdAt))
              .toISOString()
              .split("T")[0],
          })
        )
      );
    } catch (e) {
      console.log(e);
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
    getBooking({});
    getRoomTypes();
  }, []);

  return (
    <div className="pe-8">
      <div className="flex justify-between items-center">
        <p className="text-3xl my-8">Bookings Management</p>
        <div className="flex items-center">
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <CiFilter className="text-3xl ms-4" onClick={toggleFilters} />
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
            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="" disabled>
                  All
                </option>
                <option value="open">Pending</option>
                <option value="booked">Booked</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
                <option value="cancelled">Cancelled</option>
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
      <div>
        <DataTable
          title="Bookings"
          columns={columns}
          data={bookings}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};
export default BookingManagement;
