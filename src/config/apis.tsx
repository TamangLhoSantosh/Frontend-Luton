import axiosClient from "./axiosClient";

const apis = {
  register(signupData: any) {
    return axiosClient.post("/auth/register", signupData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  login(logindata: any) {
    return axiosClient.post("/auth/login", logindata);
  },

  getRoomTypes() {
    return axiosClient.get("/roomtype");
  },

  getRooms(filters = {}) {
    return axiosClient.get("/room", { params: filters });
  },

  getUsers(filters = {}) {
    return axiosClient.get("/user", { params: filters });
  },

  searchUsers(searchTerm: string) {
    return axiosClient.get("/user/search", {
      params: { search: searchTerm, role: "user" },
    });
  },
};

export default apis;
