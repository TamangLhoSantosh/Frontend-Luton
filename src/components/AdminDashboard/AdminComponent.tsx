import { useState } from "react";
import AdminDashboardComponent from "./AdminDashboardComponent";
import AdminSidebar from "./AdminSidebar";

const AdminComponent = () => {
  const [selectedPage, setselectedPage] = useState("Dashboard");

  return (
    <div className="grid grid-cols-4">
      <AdminSidebar
        selectedPage={selectedPage}
        onSelectPage={(page: string) => setselectedPage(page)}
      />
      <div className="col-span-3">
        <AdminDashboardComponent selectedPage={selectedPage} />
      </div>
    </div>
  );
};

export default AdminComponent;
