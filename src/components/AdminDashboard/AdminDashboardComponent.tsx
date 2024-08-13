import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface TableItem {
  fullName: string;
  status: string;
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
    name: "Status",
    selector: (row: { status: string }) => row.status,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row: { date: string }) => row.date,
    sortable: true,
  },
];

const AdminDashboardComponent = () => {
  const [newBookings, setNewBookings] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [roomAvailability, setRoomAvailability] = useState({
    occupied: 3,
    available: 4,
    reserved: 3,
  });

  const [bookings, setBookings] = useState<TableItem[]>([
    { fullName: "Sdf", status: "Booked", date: new Date().toDateString() },
  ]);

  // State for storing data of the cards data
  const cardData = [
    {
      title: "New Bookings",
      value: newBookings,
    },
    {
      title: "Check-In",
      value: checkIn,
    },
    {
      title: "Total Users",
      value: totalUsers,
    },
  ];

  // State for storing data of the room status
  const roomData = [
    { title: "Occupied", value: roomAvailability.occupied, color: "red" },
    { title: "Available", value: roomAvailability.available, color: "green" },
    { title: "Reserved", value: roomAvailability.reserved, color: "yellow" },
  ];

  const total = 10;
  // roomAvailability.available +
  // roomAvailability.reserved +
  // roomAvailability.occupied;
  const availableWidth = (roomAvailability.available / total) * 100;
  const reservedWidth = (roomAvailability.reserved / total) * 100;
  const occupiedWidth = (roomAvailability.occupied / total) * 100;

  const getNewBookings = () => {
    // fetch total bookings from API
  };

  const getCheckIn = () => {
    // fetch total revenue from API
  };

  const getTotalUsers = () => {
    // fetch total users from API
  };

  useEffect(() => {
    getNewBookings();
    getCheckIn();
    getTotalUsers();
  }, []);

  return (
    <div className="pe-8">
      <p className="text-3xl my-8">Dashboard</p>
      <div className="grid grid-cols-3 gap-6 my-8">
        {cardData.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">
            <p className="text-xl">{item.title}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 my-8">
        <div className="border rounded-lg p-4">
          <p className="text-xl mb-2">Room Availability</p>
          <div className="w-full h-10 flex rounded-xl overflow-hidden">
            <div
              className="bg-green-500"
              style={{ width: `${availableWidth}%` }}
            ></div>
            <div
              className="bg-yellow-500"
              style={{ width: `${reservedWidth}%` }}
            ></div>
            <div
              className="bg-red-500"
              style={{ width: `${occupiedWidth}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2">
            {roomData.map((item, index) => (
              <div
                key={index}
                className="my-3"
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <p className="text-sm ps-3">{item.title}</p>
                <p className="text-xl ps-3">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4 col-span-2"></div>
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

export default AdminDashboardComponent;
