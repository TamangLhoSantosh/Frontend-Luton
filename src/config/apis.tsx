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

  getUserFromToken() {
    return axiosClient.post("/auth/getUser");
  },

  addBooking(data: any) {
    return axiosClient.post("/booking", data);
  },

  getBooking(filters = {}) {
    return axiosClient.get("/booking", { params: filters });
  },

  getNewBooking() {
    return axiosClient.get("/booking/new-bookings");
  },

  getLatestBooking() {
    return axiosClient.get("/booking/latest-bookings");
  },

  getRoomAvailability() {
    return axiosClient.get("/booking/room-availability");
  },

  getRoomTypes() {
    return axiosClient.get("/roomtype");
  },

  addRoom(data: any) {
    return axiosClient.post("/room", data);
  },

  getRooms(filters = {}) {
    return axiosClient.get("/room", { params: filters });
  },

  getAvailableRoom(data = {}) {
    return axiosClient.post("/room/available-room", data);
  },

  getUsers(filters = {}) {
    return axiosClient.get("/user", { params: filters });
  },

  getUserById(id: string) {
    return axiosClient.get(`/user/${id}`);
  },

  searchUsers(searchTerm: string) {
    return axiosClient.get("/user/search", {
      params: { search: searchTerm, role: "user" },
    });
  },

  checkAvailability(data: any) {
    return axiosClient.post("/booking/check-availability", data);
  },

  contactUs(data: any) {
    return axiosClient.post("/contactUs", data);
  },

  subscribe(email: string) {
    return axiosClient.post("/subscribe", { email: email });
  },
};

export default apis;
