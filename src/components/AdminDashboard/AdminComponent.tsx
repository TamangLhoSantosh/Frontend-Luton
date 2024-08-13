import { useState } from "react";
import AdminDashboardComponent from "./AdminDashboard";
import AdminSidebar from "./AdminSidebar";

const AdminComponent = () => {
  const [selectedPage, setselectedPage] = useState("Dashboard");

  return (
    <div className="grid grid-cols-4">
      <div className="max-h-screen">
        <AdminSidebar
          selectedPage={selectedPage}
          onSelectPage={(page: string) => setselectedPage(page)}
        />
      </div>
      <div className="col-span-3">
        <AdminDashboardComponent selectedPage={selectedPage} />
      </div>
    </div>
  );
};

export default AdminComponent;
