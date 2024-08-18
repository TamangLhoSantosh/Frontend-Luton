import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import apis from "../../config/apis";

interface TableItem {
  fullName: string;
  roomNo: string;
  checkIn: string;
  checkOut: string;
  date: string;
}

const BookingManagement = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for bookings
  const [bookings, setBookings] = useState<TableItem[]>([
    {
      fullName: "",
      roomNo: "",
      checkIn: "",
      checkOut: "",
      date: "",
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
    },
    {
      name: "Booking Date",
      selector: (row: { date: string }) => row.date,
      sortable: true,
    },
    {
      name: "Check In Date",
      selector: (row: { date: string }) => row.date,
      sortable: true,
    },
    {
      name: "Check Out Date",
      selector: (row: { date: string }) => row.date,
      sortable: true,
    },
  ];

  // Handle search change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  // Handle key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  // Get booking
  const getBooking = async () => {
    try {
      const response = await apis.getBooking("");
      // Transform the booking data to match the TableItem structure
      setBookings(
        response.data.map(
          (booking: {
            user: { fullName: any };
            room: any;
            checkInDate: any;
            checkOutDate: any;
            createdAt: string;
          }) => ({
            fullName: booking.user.fullName,
            roomNo: booking.room,
            checkIn: booking.checkInDate,
            checkOut: booking.checkOutDate,
            date: booking.createdAt,
          })
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBooking();
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
          <CiFilter className="text-3xl ms-4" />
        </div>
      </div>
      <div>
        <DataTable
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
