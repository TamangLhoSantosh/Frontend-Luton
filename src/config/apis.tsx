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

  getBooking(id: string) {
    return axiosClient.get(`/booking/${id}`);
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
