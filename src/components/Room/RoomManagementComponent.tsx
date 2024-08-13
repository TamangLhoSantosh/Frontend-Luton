import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";

interface TableItem {
  roomNo: string;
  roomType: string;
  price: string;
  availability: string;
}

// Define columns
const columns: TableColumn<TableItem>[] = [
  {
    name: "Room Number",
    selector: (row: { roomNo: string }) => row.roomNo,
    sortable: true,
  },
  {
    name: "Room Type",
    selector: (row: { roomType: string }) => row.roomType,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row: { price: string }) => row.price,
    sortable: true,
  },
  {
    name: "Availability",
    selector: (row: { availability: string }) => row.availability,
    sortable: true,
  },
];

const RoomManagementComponent = () => {
  const [rooms, setRooms] = useState<TableItem[]>([
    {
      roomNo: "101",
      roomType: "Single",
      price: "100",
      availability: "Available",
    },
    {
      roomNo: "102",
      roomType: "Double",
      price: "200",
      availability: "Not Available",
    },
    {
      roomNo: "103",
      roomType: "Single",
      price: "100",
      availability: "Available",
    },
    {
      roomNo: "104",
      roomType: "Double",
      price: "200",
      availability: "Not Available",
    },
  ]);

  return (
    <div className="pe-8">
      <div className="flex justify-between items-center">
        <p className="text-3xl my-8">Room Management</p>
        <div className="flex items-center">
          <CiFilter className="text-3xl ms-4" />
          <IoAddCircleOutline className="text-3xl ms-4" />
        </div>
      </div>
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
