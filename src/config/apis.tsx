import axiosClient from "./axiosClient";

const apis = {
  login(logindata: any) {
    return axiosClient.post("/auth/login", logindata);
  },

  getRoomTypes() {
    return axiosClient.get("/roomtype");
  },

  getRooms(filters = {}) {
    return axiosClient.get("/room/", { params: filters });
  },
};

export default apis;
