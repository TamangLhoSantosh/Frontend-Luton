import { useState } from "react";
import { TextField } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";

interface TableItem {
  fullName: string;
  roomNo: string;
  checkIn: string;
  checkOut: string;
  date: string;
}

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

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [bookings, setBookings] = useState<TableItem[]>([
    {
      fullName: "string",
      roomNo: "string",
      checkIn: "string",
      checkOut: "string",
      date: "string",
    },
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

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
