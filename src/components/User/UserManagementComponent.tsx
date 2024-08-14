import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { TextField } from "@mui/material";

interface TableItem {
  fullName: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

// Define columns
const columns: TableColumn<TableItem>[] = [
  {
    name: "Full Name",
    selector: (row: { fullName: string }) => row.fullName,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row: { username: string }) => row.username,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: { role: string }) => row.role,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: { status: string }) => row.status,
    sortable: true,
  },
];
const UserManagementComponent = () => {
  const [users, setUsers] = useState<TableItem[]>([
    {
      fullName: "string",
      username: "string",
      email: "string",
      role: "string",
      status: "string",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(searchTerm);
    }
  };

  return (
    <div className="pe-8">
      <div className="flex justify-between items-center">
        <p className="text-3xl my-8">Room Management</p>
        <div className="flex items-center">
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <CiFilter className="text-3xl ms-4" />
          <IoAddCircleOutline className="text-3xl ms-4" />
        </div>
      </div>
      <div>
        <DataTable
          title="Users"
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default UserManagementComponent;
