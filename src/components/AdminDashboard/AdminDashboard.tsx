import BookingManagement from "../Booking/BookingManagement";
import RoomManagementComponent from "../Room/RoomManagementComponent";
import UserManagementComponent from "../User/UserManagementComponent";
import AdminDashboardComponent from "./AdminDashboardComponent";

interface Props {
  selectedPage: string;
}

const AdminDashboard = ({ selectedPage }: Props) => {
  return (
    <>
      {selectedPage === "Dashboard" ? (
        <AdminDashboardComponent />
      ) : selectedPage === "Booking Management" ? (
        <BookingManagement />
      ) : selectedPage === "Room Management" ? (
        <RoomManagementComponent />
      ) : selectedPage === "User Management" ? (
        <UserManagementComponent />
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminDashboard;
