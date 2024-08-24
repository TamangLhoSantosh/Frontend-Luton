import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import apis from "../../config/apis";

// Table Item Interface
interface TableItem {
  fullName: string;
  status: string;
  date: string;
  checkInDate: string;
  checkOutDate: string;
}

// Define columns
const columns: TableColumn<TableItem>[] = [
  {
    name: "Full Name",
    selector: (row: { fullName: string }) => row.fullName,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row: { date: string }) => row.date,
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
  {
    name: "Status",
    selector: (row: { status: string }) => row.status,
    sortable: true,
  },
];

const AdminDashboardComponent = () => {
  const [newBookings, setNewBookings] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [roomAvailability, setRoomAvailability] = useState({
    occupied: 0,
    available: 0,
    reserved: 0,
  });

  const [bookings, setBookings] = useState<TableItem[]>([]);

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

  // Get New Bookings Count
  const getNewBookings = async () => {
    try {
      const response = await apis.getNewBooking();
      setNewBookings(response.data.length);
    } catch (e: any) {}
  };

  // Get Not Checked Out Bookings
  const getNotCheckedOutBookings = async () => {
    try {
      const response = await apis.getNotCheckedOutBookings();
      setCheckIn(response.data.length);
      setRoomAvailability((prevState) => ({
        ...prevState,
        occupied: response.data.length,
      }));
    } catch (E: any) {}
  };

  // Get Room Availability
  const getRoomAvailability = async () => {
    try {
      const response = await apis.getRoomAvailability();
      console.log(response.data);
      setRoomAvailability((prevState) => ({
        ...prevState,
        available: response.data.availableRooms.length,
        reserved: response.data.bookedRooms.length,
      }));
    } catch (E: any) {}
  };

  // Get Total Users Count
  const getTotalUsers = async () => {
    try {
      const response = await apis.getUsers({ role: "user" });
      setTotalUsers(response.data.length);
    } catch (E: any) {}
  };

  // Get Latest Bookings Update
  const getLatestBooking = async () => {
    try {
      const response = await apis.getLatestBooking();
      setBookings(
        response.data.map(
          (booking: {
            user: { fullName: string };
            room: string;
            guest: { guestName: string };
            status: string;
            checkInDate: string;
            checkOutDate: string;
            updatedAt: string;
          }) => ({
            fullName:
              booking.user && booking.user.fullName
                ? booking.user.fullName
                : booking.guest.guestName,
            status: booking.status.toUpperCase(),
            checkInDate: booking.checkInDate.split("T")[0],
            checkOutDate: booking.checkOutDate.split("T")[0],
            date: new Date(parseInt(booking.updatedAt))
              .toISOString()
              .split("T")[0],
          })
        )
      );
    } catch (E: any) {}
  };

  useEffect(() => {
    getNewBookings();
    getNotCheckedOutBookings();
    getRoomAvailability();
    getTotalUsers();
    getLatestBooking();
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
