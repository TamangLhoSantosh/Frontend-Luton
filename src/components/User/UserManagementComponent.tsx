import { CiFilter } from "react-icons/ci";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import apis from "../../config/apis";

// Table item interface
interface TableItem {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  isActive: string;
}

// Filters interface
interface Filters {
  role: string;
  isActive: string;
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
    name: "Email",
    selector: (row: { email: string }) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: { role: string }) => row.role.toUpperCase(),
    sortable: true,
  },
  {
    name: "Status",
    selector: (row: { isActive: string }) => row.isActive.toUpperCase(),
    sortable: true,
  },
];

const UserManagementComponent = () => {
  // State to store users data
  const [users, setUsers] = useState<TableItem[]>([
    {
      _id: "string",
      fullName: "string",
      username: "string",
      email: "string",
      role: "string",
      isActive: "string",
    },
  ]);

  // State to store search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State to store filters
  const [filters, setFilters] = useState<Filters>({
    role: "",
    isActive: "",
  });

  // State to toggle filters
  const [showFilters, setShowFilters] = useState(false);

  // Function to toggle filters
  const toggleFilters = () => setShowFilters(!showFilters);

  // Handle search term change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle key press
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const response = await apis.searchUsers(searchTerm);
      setUsers(response.data);
      setFilters({ role: "", isActive: "" });
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
  const handleFilter = async () => {
    getUsers(filters);
    setSearchTerm("");
    toggleFilters();
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({ role: "", isActive: "" });
  };

  // Get users data
  const getUsers = async (filters: any) => {
    const response = await apis.getUsers(filters);
    console.log(response.data);
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers({ role: "user" });
  }, []);

  return (
    <div className="pe-8">
      {/* Title */}
      <div className="flex justify-between items-center">
        <p className="text-3xl my-8">User Management</p>
        <div className="flex items-center">
          <TextField
            label="Search User"
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <CiFilter className="text-3xl ms-4" onClick={toggleFilters} />
          <IoAddCircleOutline className="text-3xl ms-4" />
        </div>
      </div>
      {/* Filters */}
      {showFilters && (
        <div className="relative">
          <div className="absolute top-0 right-0 z-50 p-4 border border-gray-300 rounded-md bg-white shadow-md">
            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                name="role"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={filters.role}
                onChange={handleFilterChange}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="user">User</option>
              </select>
            </div>
            {/* isActive */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="isActive"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={filters.isActive}
                onChange={handleFilterChange}
              >
                <option value="" disabled>
                  All
                </option>
                <option value="true">Active</option>
                <option value="false">Not Active</option>
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
