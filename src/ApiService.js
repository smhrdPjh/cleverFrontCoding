import axios from "axios";

const API_BASE_URL = "http://localhost:8099/clever";

class ApiService {
  // fetchUsers() {
  //   return axios.get(USER_API_BASE_URL);
  // }

  // fetchUserByID(userID) {
  //   return axios.get(USER_API_BASE_URL + "/" + userID);
  // }

  // deleteUser(userID) {
  //   return axios.post(USER_API_BASE_URL + "/delete/" + userID);
  // }

  // addUser(user) {
  //   return axios.post(USER_API_BASE_URL, user);
  // }

  // editUser(user) {
  //   return axios.post(USER_API_BASE_URL + "/" + user.id, user);
  // }
  addMember(member) {
    return axios.post(API_BASE_URL+"/join", member);
  }

  saveArrScheduleInfo(saveArrScheduleInfo) {
    return axios.post(API_BASE_URL+"/saveArrScheduleInfo", saveArrScheduleInfo);
  }

  getSchedule() {
    return axios.get(API_BASE_URL+"/getSchedule");
  }
  getDateList(date) {
    return axios.get(API_BASE_URL+"/getDateList/" + date);
  }
}
export default new ApiService();
