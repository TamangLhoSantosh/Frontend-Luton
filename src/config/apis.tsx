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

  getUserFromToken(token: string) {
    return axiosClient.post("/auth/getUser", { params: token });
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
